import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const PollsListPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); // State for search input
  const navigate = useNavigate();

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

  // Filter polls based on search input
  const filteredPolls = polls.filter((poll) =>
    poll.pollData.topic.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center h-screen text-lg font-semibold">Loading polls...</div>;
  if (error) return <div className="text-center text-red-500 font-medium">{error}</div>;
  if (polls.length === 0) return <div className="text-center text-gray-500">No polls available.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Polls</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search polls by topic..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Polls Grid */}
      <div className="grid gap-3">
        {filteredPolls.length > 0 ? (
          filteredPolls.map((poll) => (
            <div
              key={poll.transactionId}
              className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{poll.pollData.topic}</h2>
              <p className="text-gray-600 mb-4">{poll.pollData.description}</p>
              <p className="text-sm text-gray-500">Created by: {poll.publicKey}</p>
              <Link
                to={`/polls/${poll.transactionId}`}
                style={{ backgroundColor: "#8fac86", color: "#fff" }}
                className="block mt-4 bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600"
              >
                View & Vote
              </Link>
              <Link
                to={`/polls/discussion`}
                style={{ backgroundColor: "#8fac86", color: "#fff" }}
                className="block mt-4 bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Join Discussion
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No matching polls found.</div>
        )}
      </div>

      {/* Pagination */}
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
