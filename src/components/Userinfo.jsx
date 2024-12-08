import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar1";

const VoteHistoryPage = () => {
  const [voteHistory, setVoteHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const publicKey = sessionStorage.getItem('publicKey');

  useEffect(() => {
    const fetchVoteHistory = async () => {
      try {
        console.log("Current user public key is",publicKey);

        const response = await fetch(`http://localhost:3000/api/vote/user/${publicKey}`);
        if (!response.ok) {
          throw new Error("Failed to fetch vote history");
        }
        const votes = await response.json();

        // Enrich votes with poll details
        const enrichedVotes = await Promise.all(
          votes.map(async (vote) => {
            try {
              const pollResponse = await fetch(`http://localhost:3000/api/polls/${vote.Data.pollid}`);
              if (pollResponse.ok) {
                const poll = await pollResponse.json();
                return {
                  ...vote,
                  pollDetails: {
                    topic: poll.pollData?.topic || "Unknown Poll",
                    description: poll.pollData?.description || "No description available.",
                  },
                };
              }
            } catch (pollError) {
              console.error(`Failed to fetch poll details for pollId: ${vote.Data.pollid}`, pollError);
            }
            return { ...vote, pollDetails: null }; // Fallback in case poll details fetch fails
          })
        );

        setVoteHistory(enrichedVotes);
      } catch (err) {
        console.error("Error fetching vote history:", err);
        setError("Unable to load vote history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVoteHistory();
  }, []);

  if (loading) return <div>Loading vote history...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (voteHistory.length === 0)
    return <div>No vote history found for this user.</div>;

  return (
    <div>
    <div>
      <Navbar />
    </div>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Your Vote History</h1>
        <p className="text-center text-gray-500 mb-8">Public Key: {publicKey}</p> {/* Display Public Key */}
        <div className="space-y-4">
          {voteHistory.map((vote, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-lg rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {vote.pollDetails?.topic || "Unknown Poll"}
                </h2>
                <p className="text-gray-600">
                  {vote.pollDetails?.description || "No description available."}
                </p>
                <p className="text-sm text-gray-500">
                  Selected Option: {vote.Data.options}
                </p>
              </div>
              <Link
                to={`/polls/result/${vote.Data.pollid}`}
                className="text-blue-500 hover:underline"
              >
                View Results
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoteHistoryPage;
