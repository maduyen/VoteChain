import React, { useState } from "react";
import axios from "axios";

const PollCreationPage = () => {
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

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate input
      if (!pollTopic || options.filter((opt) => opt.trim()).length < 2) {
        alert("Please provide a topic and at least two valid options.");
        return;
      }

      // Prepare form data
      const formData = new FormData();
      formData.append("topic", pollTopic);
      formData.append("description", pollDescription);
      if (pollImage) formData.append("image", pollImage); // Attach the image if uploaded
      formData.append("options", JSON.stringify(options));
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);

      // Send POST request to the backend
      console.log([...formData.entries()]);

      const response = await axios.post("http://localhost:5000/api/polls", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Poll created successfully!");
        // Optionally reset the form
        setPollTopic("");
        setPollDescription("");
        setPollImage(null);
        setOptions(["", ""]);
        setStartTime("");
        setEndTime("");
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      alert("Failed to create poll. Please try again.");
    }
  };

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
