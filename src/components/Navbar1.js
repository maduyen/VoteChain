import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const linkStyle = { color: "white", marginRight: "15px" };
  const topicStyle = { fontFamily: "Poppins", textTransform: "none", color: "#f5cfa8", marginRight: "15px", fontSize: "20px"};
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Check if publicKey exists in sessionStorage
    const publicKey = sessionStorage.getItem("publicKey");
    setIsLoggedIn(!!publicKey); // Update state based on presence of publicKey
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("publicKey"); // Clear publicKey from sessionStorage
    setIsLoggedIn(false); // Update state
    alert("You are logged out!");
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();  //keeps menu open
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const closeDropdown = () => setDropdownOpen(false);  //set dropdown to open == false
    window.addEventListener("click", closeDropdown);  //clicking off the menu => close
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#312c51" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        {/* left */}
        <div>
          <Button component={Link} to="/" style={topicStyle}>
            <i className="fas fa-home mr-2"></i>  {/*Home icon */}
              VoteChain
          </Button>
        </div>
        {/* main */}
        <Typography>
        </Typography>
        {/* left */}
        <div>
          {isLoggedIn && (
            <>
            {/* Create Poll */}
            <Button component={Link} to="/create-poll" style={linkStyle}>
              + CREATE POLL
            </Button> 

            {/* View Polls */}
            <Button component={Link} to="/polls" style={linkStyle}>
              VIEW POLLS
            </Button>
            </>   
          )}                

          {/* Account Dropdown */}
          {isLoggedIn ? (
            <>
              <Button onClick={toggleDropdown} style={linkStyle}>
                <i className="fas fa-user mr-2"></i>  {/*Profile icon */}
                ACCOUNT
              </Button>
              {dropdownOpen && (
                <div
                  className="absolute right-2 mt-2 rounded-md shadow-lg bg-white text-[#312c51] z-50"
                  style={{ minWidth: "150px", marginTop: "5px" }}
                >
                  {/* LOGGED IN -> ACCESS TO USER DASHBOARD + LOGOUT BUTTON */}
                  <Link to="/user-dashboard" className="block px-4 py-2 text-[#312c51] hover:bg-gray-100 rounded-md transition duration-200">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md transition duration-200"
                  >
                    Logout▸
                  </button>
                </div>
              )}
            </>
          ) : (
            <Button component={Link}  to="/login" style={linkStyle} >
              <i className="fas fa-user mr-2"></i>  {/*Profile icon */}
              LOGIN
            </Button>
          )}










    
          
          {dropdownOpen && (
            <div
              className="absolute right-2 mt-2 rounded-md shadow-lg bg-white text-[#312c51] z-50"
              style={{ minWidth: "150px", marginTop: "5px" }}
            >
              {isLoggedIn ? (
                <>
                  {/* LOGGED IN -> ACCESS TO USER DASHBOARD + LOGOUT BUTTON */}
                  <Link to="/user-dashboard" className="block px-4 py-2 text-[#312c51] hover:bg-gray-100 rounded-md transition duration-200">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md transition duration-200"
                  >
                    Logout▸
                  </button>
                </>
              ) : (
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 ">Login</Link>
              )}
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
