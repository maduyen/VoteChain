import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GlobalProvider, GlobalContext } from "./context/GlobalContext"; // Import context

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ResultsPage from  "./components/VoteResultPage";
import PollCreationPage from "./components/PollCreationPage";
import Userinfo from "./components/Userinfo";
import PollsListPage from "./components/PollsListPage";
import PollDetailPage from "./components/PollDetailPage";
import DiscussionPanel from "./components/DiscussionPanel/DiscussionPanel";
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
            <Route path="/polls/:transactionId/discussion" element={<DiscussionPanel />} />
            <Route path="/polls/result/:transactionId" element={<ResultsPage />} />
            {/* Protected Routes */}
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
