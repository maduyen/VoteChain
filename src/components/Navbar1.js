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
            <Button component={Link} to="/create-poll" style={linkStyle}>
              + CREATE POLL
            </Button> 

            <Button component={Link} to="/polls" style={linkStyle}>
              VIEW POLLS
            </Button>
            </>   
          )}                

          <Button component={Link}  to={isLoggedIn ? "/user-dashboard" : "/login"} style={linkStyle} >
            <i className="fas fa-user mr-2"></i>  {/*Profile icon */}
            {isLoggedIn ? "ACCOUNT" : "LOGIN"}
          </Button>
          
          {isLoggedIn && (
            <Button style={linkStyle} onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
