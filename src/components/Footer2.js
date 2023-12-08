// Footer.js
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CopyrightImage from "../assest/82954a041b27eadab9a9bd64e718c0a9-removebg-preview.png";
const useStyles = makeStyles((theme) => ({
  footer: {
    position: "fixed-bottom",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    padding: theme.spacing(2),
    display: "flex", // Ensuring items are displayed in a row
    alignItems: "center", // Align items in the center
    justifyContent: "center", 
    width: "100%",
  },
  copyrightImage: {
    width: "20px", // Set the width as per your design
    marginRight: "5px", // Adjust margin if needed
    verticalAlign: "middle",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <img
        src={CopyrightImage}
        alt="Copyright"
        className={classes.copyrightImage}
      />
      <Typography variant="body2" style={{color: "white"}}>
        2023 VoteChain
      </Typography>
    </div>
  );
};

export default Footer;

