import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PollsListPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/polls?page=${page}&limit=10`);
        if (!response.ok) {
          throw new Error("Failed to fetch polls");
        }
        const data = await response.json();
        setPolls(data.polls);
      } catch (error) {
        console.error("Failed to fetch polls:", error);
        setError("Unable to load polls. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, [page]);

  if (loading) return <div className="flex items-center justify-center h-screen text-lg font-semibold">Loading polls...</div>;
  if (error) return <div className="text-center text-red-500 font-medium">{error}</div>;
  if (polls.length === 0) return <div className="text-center text-gray-500">No polls available.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Polls</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll) => (
          <div
            key={poll.transactionId}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{poll.pollData.topic}</h2>
            <p className="text-gray-600 mb-4">{poll.pollData.description}</p>
            <p className="text-sm text-gray-500">Created by: {poll.publicKey}</p>
            <Link
              to={`/polls/${poll.transactionId}`}
              className="block mt-4 bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600"
            >
              View & Vote
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PollsListPage;
