import React, { useState, useEffect, useContext, useRef } from "react";
import ResVaultSDK from "resvault-sdk";
import { GlobalContext } from "../context/GlobalContext";
import { fetchTransactionDetails } from "./utils/ResilientDB";
import Navbar from "./Navbar1";

const sdk = new ResVaultSDK();

const PollCreationPage = () => {
  const { publicKey, setPublicKey } = useContext(GlobalContext);

  const [pollTopic, setPollTopic] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [pollImage, setPollImage] = useState(null);
  const [options, setOptions] = useState(["", ""]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [transactionId, setTransactionId] = useState(null);

  const sdkRef = useRef(sdk); // Ref to manage SDK instance

  // Add an option
  const handleAddOption = () => setOptions([...options, ""]);

  // Update an option value
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  // Handle image upload
  const handleImageUpload = (event) => setPollImage(event.target.files[0]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (!publicKey) {
        alert("You must be logged in to create a poll.");
        return;
      }
      console.log("My public key: " + publicKey);
  
      if (!pollTopic || options.filter((opt) => opt.trim()).length < 2) {
        alert("Please provide a topic and at least two valid options.");
        return;
      }
  
      const pollData = {
        topic: pollTopic,
        description: pollDescription,
        options: options.filter((opt) => opt.trim()),
        startTime,
        endTime,
        createdAt: new Date().toISOString(),
      };
  
      const transactionMessage = {
        type: "commit",
        direction: "commit",
        amount: "1",
        data: pollData,
        recipient: publicKey,
      };
  
      console.log("Submitting transaction:", transactionMessage);
  
      // Send the transaction to the SDK
      sdkRef.current.sendMessage(transactionMessage);

    } catch (error) {
      console.error("Error submitting poll:", error);
      alert("Failed to submit poll. Please try again.");
    }
  };

  // Message Listener to Fetch Transaction ID
  useEffect(() => {
    const messageHandler = async (event) => {
      console.log("Start to ftech");
      const message = event.data;

      if (message.data?.success) {
        const txnId = message.data.data.postTransaction?.id;
        if (txnId) {
          setTransactionId(txnId); // Update state with transaction ID
        }

        // Fetch transaction details if needed
        try {
          const transactionDetails = await fetchTransactionDetails(txnId);
          if (transactionDetails?.publicKey) {
            setPublicKey(transactionDetails.publicKey);
          }
        } catch (error) {
          console.error("Error fetching transaction details:", error);
        }
      } else {
        console.error("Message format invalid or success flag is false.");
      }
    };
    //console.log("Start to ftech");
    sdkRef.current.addMessageListener(messageHandler);

    return () => {
      sdkRef.current.removeMessageListener(messageHandler);
    };
  }, [setPublicKey]);

  useEffect(() => {
    const storePollInMongoDB = async () => {
      if (transactionId) {
        try {
          const pollData = {
            topic: pollTopic,
            description: pollDescription,
            options: options.filter((opt) => opt.trim()),
            startTime,
            endTime,
            createdAt: new Date().toISOString(),
          };

          console.log("Sending data to backend:", {
            transactionId,
            publicKey,
            pollData,
          });

          const response = await fetch("http://localhost:3000/api/storePollRoutes", {
          // const response = await fetch("/api/storePollRoutes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              transactionId,
              publicKey,
              pollData,
            }),
          });

          if (response.ok) {
            alert("Poll stored successfully in MongoDB!");
          } else {
            console.error("Failed to store poll in MongoDB:", await response.text());
            alert("Failed to store poll.");
          }
        } catch (error) {
          console.error("Error storing poll in MongoDB:", error);
        }
      }
    };

    storePollInMongoDB();
  }, [transactionId, pollTopic, pollDescription, options, startTime, endTime]);
  

  return (
    <div>
      <div>
        <Navbar />
      </div>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center py-10 px-6">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-10">Create a Poll</h1>

          {/* Basic Info */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Basic Info</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Poll Topic"
                value={pollTopic}
                onChange={(e) => setPollTopic(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="Poll Description (optional)"
                value={pollDescription}
                onChange={(e) => setPollDescription(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-500 file:rounded-lg hover:file:bg-blue-600"
              />
            </div>
          </div>

          {/* Options Setting */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Options Setting</h2>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-grow p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                />
                {options.length > 2 && (
                  <button
                    onClick={() => setOptions(options.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={handleAddOption}
              className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
            >
              + Add Option
            </button>
          </div>

          {/* Time Setting */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Time Setting</h2>
            <div className="flex gap-6">
              <div className="flex-grow">
                <label className="block text-gray-600 mb-2">Start Time:</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex-grow">
                <label className="block text-gray-600 mb-2">End Time:</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-200 text-xl"
          >
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollCreationPage;
