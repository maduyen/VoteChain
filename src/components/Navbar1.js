import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Navbar = () => {
  const linkStyle = { color: "white", marginRight: "15px" };

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#a2856d" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h6" style={{ color: "white" }}>
        </Typography>

        <div>
          <Button component={Link} to="/login" style={linkStyle}>
            Voter Login
          </Button>
          <Button component={Link} to="/create-poll" style={linkStyle}>
            CREATE POLL
          </Button>
          <Button component={Link} to="/userinfo" style={linkStyle}>
            YOUR VOTES
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
