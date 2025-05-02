import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar1";
import Footer from "./Footer2";
import voteHist from "./images/voteHistory.svg"

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
      <div className="max-w-5xl mx-auto p-6">
        <div className="w-full flex justify-start items-end max-w-4xl mx-auto mt-4">
            <h1 className="text-4xl font-medium text-[#f5cfa8] text-center mb-2">Vote History</h1>
            <img
              src={voteHist}
              alt="..."
              className="img-fluid floating"
              style={{ width: "150px", height: "150px"}}
            />
          </div>
        <p className="text-white mt-4 mb-4">Public Key: {publicKey}</p> {/* Display Public Key */}
        <div className="space-y-4 bg-[#312c51] rounded-3xl shadow-lg p-12">
          {voteHistory.map((vote, index) => (
            <div
              key={index}
              className="p-4 bg-[#48426d] shadow-lg rounded-3xl flex justify-between items-center"
            >
              <div>
                <h2 className="text-[#f5cfa8] text-2xl font-semibold mb-2">
                  {vote.pollDetails?.topic || "Unknown Poll"}
                </h2>
                <p className="text-white mb-4">
                  {vote.pollDetails?.description || "No description available."}
                </p>
                <p className="text-sm text-white">
                  Selected Option: {vote.Data.options}
                </p>
              </div>
              <Link
                to={`/polls/result/${vote.Data.pollid}`}
                className="block mt-4 bg-[#f0c38e] text-[#312c51] text-center py-2 px-4 rounded-3xl hover:text-[#312c51] hover:bg-[#d9ab78]"
              >
                View Results
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4">
        <Footer />
      </div>
    </div>
  );
};

export default VoteHistoryPage;
