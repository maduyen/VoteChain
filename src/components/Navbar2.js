import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const linkStyle = { color: 'white', marginRight: '15px' };

  return (
    <AppBar position="fixed">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          {/* <Button component={Link} to="/login" style={linkStyle}>Voter Login</Button>
          <Button component={Link} to="/signup" style={linkStyle}>Voter Signup</Button> */}
          <Button component={Link} to="/logout" style={linkStyle}>Logout</Button>
        </Typography>
      </Toolbar>
      {/* Responsive Menu */}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem component={Link} to="/" onClick={handleClose}>Home</MenuItem> */}
        {/* <MenuItem component={Link} to="/signup" onClick={handleClose}>Voter Signup</MenuItem>
        <MenuItem component={Link} to="/login" onClick={handleClose}>Admin Login</MenuItem> */}
      </Menu>
    </AppBar>
  );
};

export default Navbar;
