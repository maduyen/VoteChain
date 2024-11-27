import React, { useState, useEffect, useContext } from "react";
import ResVaultSDK from "resvault-sdk";
import { GlobalContext } from "../context/GlobalContext";

const sdk = new ResVaultSDK();

const PollCreationPage = () => {
  const { publicKey, setPublicKey } = useContext(GlobalContext);

  const [pollTopic, setPollTopic] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [pollImage, setPollImage] = useState(null);
  const [options, setOptions] = useState(["", ""]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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

  // Fetch public key if missing
  useEffect(() => {
    const fetchPublicKey = async () => {
      if (!publicKey) {
        try {
          // Fetch the transaction ID from the ResVaultSDK context
          const transactionId = sessionStorage.getItem("transactionId"); // Store transaction ID in sessionStorage during login

          if (!transactionId) {
            alert("Transaction ID not found. Please log in again.");
            return;
          }

          // Fetch transaction details via GraphQL
          const response = await fetch("http://<your-graphql-server-endpoint>", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                query {
                  getTransaction(id: "${transactionId}") {
                    publicKey
                  }
                }
              `,
            }),
          });

          const result = await response.json();
          if (result.data && result.data.getTransaction) {
            const fetchedPublicKey = result.data.getTransaction.publicKey;
            setPublicKey(fetchedPublicKey); // Update context
            sessionStorage.setItem("publicKey", fetchedPublicKey); // Store in session storage
          } else {
            console.error("Failed to fetch public key.");
          }
        } catch (error) {
          console.error("Error fetching public key:", error);
        }
      }
    };

    fetchPublicKey();
  }, [publicKey, setPublicKey]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (!publicKey) {
        alert("You must be logged in to create a poll.");
        return;
      }
  
      if (!pollTopic || options.filter((opt) => opt.trim()).length < 2) {
        alert("Please provide a topic and at least two valid options.");
        return;
      }
  
      // Validate and prepare the amount
      let validatedAmount = 1; // Assuming a fixed amount
      if (typeof validatedAmount !== "string" && typeof validatedAmount !== "number") {
        console.error("Invalid amount:", validatedAmount);
        alert("Transaction amount is invalid.");
        return;
      }
      if (typeof validatedAmount === "number") {
        validatedAmount = validatedAmount.toString(); // Ensure it's a string
      }
  
      // Prepare poll data
      const pollData = {
        topic: pollTopic,
        description: pollDescription,
        options: options.filter((opt) => opt.trim()), // Remove empty options
        startTime,
        endTime,
        createdAt: new Date().toISOString(),
      };
  
      // Prepare transaction message
      const transactionMessage = {
        type: "commit",
        direction: "commit",
        amount: validatedAmount, // Validated amount
        data: pollData, // Poll data in JSON format
        recipient: publicKey, // User's public key
      };
  
      console.log("Submitting transaction:", transactionMessage);
  
      // Send the transaction to ResilientDB
      sdk.sendMessage(transactionMessage);
    } catch (error) {
      console.error("Error submitting poll:", error);
      alert("Failed to submit poll. Please try again.");
    }
  };
  
  

  useEffect(() => {
    const handleMessage = (event) => {
      const message = event.data;
      if (
        event.source === window &&
        event.data &&
        event.data.type === "FROM_CONTENT_SCRIPT"
      ) {
        if (message.data.success) {
          alert("Poll created successfully! Transaction ID: " + message.data.data.postTransaction.id);
        } else {
          alert("Failed to create poll: " + (event.data.error || "Unknown error."));
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
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
  );
};

export default PollCreationPage;
