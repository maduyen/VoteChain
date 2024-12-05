import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GlobalProvider, GlobalContext } from "./context/GlobalContext"; // Import context

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ElectionsList from "./components/ElectionsList/ElectionsList";
import CandidatesList from "./components/CandidatesList/CandidatesList";
import ResultsPage from "./components/Results/Results";
import PollCreationPage from "./components/PollCreationPage";
import Userinfo from "./components/Userinfo";
import PollsListPage from "./components/PollsListPage";
import PollDetailPage from "./components/PollDetailPage";
import "./App.css";

// ProtectedRoute component for authenticated routes
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("publicKey");  //for testing purpose, related functionality can be removed later
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <GlobalProvider> {/* Wrap the app with GlobalProvider */}
      <div className="App">
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/polls" element={<PollsListPage />} />
            <Route path="/polls/:transactionId" element={<PollDetailPage />} />

            {/* Protected Routes */}
            <Route
              path="/elections"
              element={
                <ProtectedRoute>
                  <ElectionsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidates/:electionId"
              element={
                <ProtectedRoute>
                  <CandidatesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <ResultsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-poll"
              element={
                <ProtectedRoute>
                  <PollCreationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userinfo"
              element={
                <ProtectedRoute>
                  <Userinfo />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </GlobalProvider>
  );
}

export default App;
