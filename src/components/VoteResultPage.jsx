import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bar, Pie, PolarArea, Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // Necessary for Chart.js
import Navbar from "./Navbar1";
import Footer from "./Footer2";

const PollResultPage = () => {
  const { transactionId } = useParams(); // Get transactionId from the URL
  const [pollResults, setPollResults] = useState([]);
  const [pollTopic, setPollTopic] = useState(""); // State for poll topic
  const [pollDescription, setPollDescription] = useState(""); // State for poll description
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        // Fetch poll details to get the topic and description
        const pollResponse = await fetch(`http://localhost:3000/api/polls/${transactionId}`);
        if (!pollResponse.ok) {
          throw new Error("Failed to fetch poll data");
        }
        const pollData = await pollResponse.json();
        setPollTopic(pollData.pollData.topic); // Assuming the topic is under pollData.topic
        setPollDescription(pollData.pollData.description); // Assuming description is under pollData.description
      } catch (err) {
        console.error("Error fetching poll data:", err);
        setPollTopic("Unknown Poll");
        setPollDescription("Description not available.");
      }
    };

    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/vote`);
        if (!response.ok) {
          throw new Error("Failed to fetch poll results");
        }
        const data = await response.json();
        const votesArray = Array.isArray(data.votes) ? data.votes : [];
        const filteredResults = votesArray.filter(
          (vote) => vote.Data.pollid === transactionId
        );
        setPollResults(filteredResults);
        console.log("results are",filteredResults);
      } catch (err) {
        console.error("Error fetching poll results:", err);
        setError("Unable to load poll results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPollData(); // Fetch poll topic and description
    fetchResults(); // Fetch poll results
  }, [transactionId]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading results...
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 font-medium">{error}</div>;
  if (pollResults.length === 0)
    return (
      <div className="text-center text-gray-500">
        No results available for this poll.
      </div>
    );

  // Process data for charts
  const optionsData = {};
  pollResults.forEach((vote) => {
    const option = vote.Data.options;
    optionsData[option] = (optionsData[option] || 0) + 1;
  });

  const labels = Object.keys(optionsData);
  const values = Object.values(optionsData);

  // Define colors
  const chartColors = [
    "rgba(255, 99, 132, 0.5)",   // Red
    "rgba(54, 162, 235, 0.5)",   // Blue
    "rgba(255, 206, 86, 0.5)",   // Yellow
    "rgba(75, 192, 192, 0.5)",   // Green
    "rgba(153, 102, 255, 0.5)",  // Purple
    "rgba(255, 159, 64, 0.5)",   // Orange
  ];

  const borderColors = chartColors.map(color => color.replace("0.5", "1")); // Convert opacity to solid

  const barData = {
    labels,
    datasets: [
      {
        label: "Votes",
        data: values,
        backgroundColor: chartColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: chartColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const polarData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: chartColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: chartColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Adjust legend position as needed
      },
    },
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>

      {/* Back Button */}
      <div className="absolute top-[90px] left-5 z-10">
        <button
          onClick={() => window.history.back()}
          className="text-[#312c51] bg-[#f0c38e] hover:bg-[#d9ab78] rounded-3xl px-4 py-2"
        >
          ◄ Go Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-medium text-center text-[#f5cfa8] mt-4 mb-2">{pollTopic} Results</h1> {/* Display poll topic */}
        <p className="text-2xl text-white text-center mb-4">{pollDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-16 bg-[#312c51] shadow-lg rounded-3xl">
          {/* Bar Chart */}
          <div className="p-4 bg-white shadow-lg rounded-3xl">
            <h2 className="text-xl font-semibold text-center mb-4">Bar Chart</h2>
            <Bar data={barData} options={chartOptions} />
          </div>

          {/* Pie Chart */}
          <div className="p-4 bg-white shadow-lg rounded-3xl">
            <h2 className="text-xl font-semibold text-center mb-4">Pie Chart</h2>
            <Pie data={pieData} options={chartOptions} />
          </div>

          {/* Polar Area Chart */}
          <div className="p-4 bg-white shadow-lg rounded-3xl">
            <h2 className="text-xl font-semibold text-center mb-4">Polar Area Chart</h2>
            <PolarArea data={polarData} options={chartOptions} />
          </div>

          {/* Doughnut Chart */}
          <div className="p-4 bg-white shadow-lg rounded-3xl">
            <h2 className="text-xl font-semibold text-center mb-4">Doughnut Chart</h2>
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4">
        <Footer />
      </div>
    </div>
  );
};

export default PollResultPage;
