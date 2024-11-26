import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ElectionsList from "./components/ElectionsList/ElectionsList";
import CandidatesList from "./components/CandidatesList/CandidatesList";
import ResultsPage from "./components/Results/Results";
import PollCreationPage from "./components/PollCreationPage";
import Userinfo from "./components/Userinfo";
import "./App.css";

function App() {
  const [selectedElection, setSelectedElection] = useState(null);
  const [votedCandidates, setVotedCandidates] = useState([]);

  const handleElectionSelect = (election) => {
    setSelectedElection(election);
  };

  const handleVote = (candidateId) => {
    setVotedCandidates((prevVotedCandidates) => [...prevVotedCandidates, candidateId]);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route
            path="/"
            element={
              sessionStorage.getItem("token") ? (
                <Navigate to="/elections" replace />
              ) : (
                <Home
                  selectedElection={selectedElection}
                  handleElectionSelect={handleElectionSelect}
                />
              )
            }
          />
          <Route
            path="/elections"
            element={
              <ElectionsList
                handleElectionSelect={handleElectionSelect}
                selectedElection={selectedElection}
              />
            }
          />
          <Route
            path="/candidates/:electionId"
            element={
              <CandidatesList
                selectedElection={selectedElection}
                votedCandidates={votedCandidates}
                handleVote={handleVote}
              />
            }
          />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/create-poll" element={<PollCreationPage />} />
          <Route path="/userinfo" element={<Userinfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
