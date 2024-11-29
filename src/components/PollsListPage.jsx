import React, { useEffect, useState } from "react";

const PollsListPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch("/api/polls?page=1&limit=10");
        const data = await response.json();
        setPolls(data.polls);
      } catch (error) {
        console.error("Failed to fetch polls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  if (loading) return <div>Loading polls...</div>;

  return (
    <div>
      <h1>Polls</h1>
      {polls.map((poll) => (
        <div key={poll.transactionId}>
          <h2>{poll.pollData.topic}</h2>
          <p>{poll.pollData.description}</p>
          <p>Created by: {poll.publicKey}</p>
        </div>
      ))}
    </div>
  );
};

export default PollsListPage;
