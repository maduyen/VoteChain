import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PollDetailPage = () => {
  const { transactionId } = useParams(); // Get the poll's transactionId from the URL
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/polls/${transactionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch poll");
        }
        const data = await response.json();
        setPoll(data);
      } catch (error) {
        console.error("Failed to fetch poll:", error);
        setError("Unable to load poll. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [transactionId]);

  const handleVote = async () => {
    if (!selectedOption) {
      alert("Please select an option before voting.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionId, selectedOption }),
      });

      if (response.ok) {
        alert("Vote submitted successfully!");
      } else {
        throw new Error("Failed to submit vote.");
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("An error occurred while submitting your vote.");
    }
  };

  if (loading)
    return <div className="flex items-center justify-center h-screen text-lg font-semibold">Loading poll...</div>;
  if (error) return <div className="text-center text-red-500 font-medium">{error}</div>;
  if (!poll) return <div className="text-center text-gray-500">No poll found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">{poll.pollData.topic}</h1>
      <p className="text-gray-600 text-center mb-6">{poll.pollData.description}</p>
      <form className="space-y-4">
        {poll.pollData.options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`option-${index}`}
              name="poll-option"
              value={option}
              onChange={() => setSelectedOption(option)}
              className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
            />
            <label
              htmlFor={`option-${index}`}
              className="ml-3 text-gray-700 cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </form>
      <button
        onClick={handleVote}
        className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Submit Vote
      </button>
    </div>
  );
};

export default PollDetailPage;
