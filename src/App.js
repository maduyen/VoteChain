import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ElectionsList from "./components/ElectionsList/ElectionsList";
import CandidatesList from "./components/CandidatesList/CandidatesList";
import ResultsPage from "./components/Results/Results";
import Logout from "./components/Logout/Logout"
import { auth } from "./firebase";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [selectedElection, setSelectedElection] = useState(null);
  const [votedCandidates, setVotedCandidates] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    });
  }, []);

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/"
            element={
              userName ? (
                <Navigate to="/elections" replace />
              ) : (
                <Home
                  name={userName}
                  selectedElection={selectedElection}
                  handleElectionSelect={handleElectionSelect}
                />
              )
            }
          />
          <Route path="/elections" element={<ElectionsList 
                  handleElectionSelect={handleElectionSelect} selectedElection={selectedElection} />} />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
