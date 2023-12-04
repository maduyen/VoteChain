// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">
          <Link to="/">Home</Link>
          <Link to="/logout">Logout</Link>
        </Typography>
        {/* Add other navbar items as needed */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
