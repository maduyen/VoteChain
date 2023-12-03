// Footer.js
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography variant="body2">
        Your footer content goes here.
      </Typography>
    </div>
  );
};

export default Footer;

