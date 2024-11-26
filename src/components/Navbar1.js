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
    <AppBar position="fixed" style={{ backgroundColor: '#a2856d' }}>
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
<<<<<<< HEAD
          <Button component={Link} to="/login" style={linkStyle}>Voter Login</Button>
          <Button component={Link} to="/login" style={linkStyle}>Admin Login</Button>
=======
          <Button component={Link} to="/login" style={linkStyle}>Login</Button>
          <Button component={Link} to="/signup" style={linkStyle}>Signup</Button>
>>>>>>> 90f5305d74015504a6ea030c4e96ed6f0f538bad
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

// ^^deleted Admin Login beause it routed to the same login page as Voter Login (simplifying UI)

export default Navbar;
