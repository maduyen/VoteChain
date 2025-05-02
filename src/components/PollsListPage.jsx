import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import Navbar from "./Navbar1";
import Footer from "./Footer2";
import pollsIcon from "./images/polls.svg"

const PollsListPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Add total pages state
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
        setTotalPages(data.totalPages || 1); // Assuming API provides total pages
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
  const [search, setSearch] = useState("");
  const filteredPolls = polls.filter((poll) =>
    poll.pollData.topic.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center h-screen text-lg font-semibold text-white">Loading polls...</div>;
  if (error) return <div className="text-center text-red-500 font-medium">{error}</div>;
  if (polls.length === 0) return <div className="text-center text-gray-500">No polls available.</div>;

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="w-full flex justify-start items-end max-w-4xl mx-auto">
          <h1 className="text-4xl font-medium text-[#f5cfa8] text-center mb-4">Active Polls</h1>
          <img
            src={pollsIcon}
            alt="..."
            className="img-fluid floating"
            style={{ width: "200px", height: "200px", marginLeft: '20px'}}
          />
        </div>
        {/* Search Input */}
        <div className="mb-6" >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search polls by topic..."
            className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Polls Grid */}
        <div className="grid gap-8 w-full max-w-4xl bg-[#312c51] rounded-3xl shadow-lg p-12">
          {filteredPolls.length > 0 ? (
            filteredPolls.map((poll) => (
              <div
                key={poll.transactionId}
                className="bg-[#48426d] shadow-md rounded-3xl p-5 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-[#f5cfa8] text-2xl font-semibold mb-2">{poll.pollData.topic}</h2>
                <p className="text-white mb-4">{poll.pollData.description}</p>
                <p className="text-sm text-white ml-4">Created by: {poll.publicKey}</p>
                <Link
                  to={`/polls/${poll.transactionId}`}
                  className="block mt-4 bg-[#f0c38e] text-[#312c51] text-center py-2 px-4 rounded-3xl hover:text-[#312c51] hover:bg-[#d9ab78]"
                >
                  View & Vote
                </Link>
                <Link
                  to={`/polls/${poll.transactionId}/discussion`}
                  className="block mt-4 bg-[#f0c38e] text-[#312c51] text-center py-2 px-4 rounded-3xl hover:text-[#312c51] hover:bg-[#d9ab78]"
                >
                  Join Discussion Panel
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No matching polls found.</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-3xl ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-3xl ${
              page === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4">
        <Footer />
      </div>
    </div>
    );
};

export default PollsListPage;
