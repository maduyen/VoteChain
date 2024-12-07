// Footer.js 
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CopyrightImage from "../assest/82954a041b27eadab9a9bd64e718c0a9-removebg-preview.png";

const Footer = () => {
  return (
    <Box
      sx={{
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
        padding: 2, // Equivalent to theme.spacing(2)
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        component="img"
        src={CopyrightImage}
        alt="Copyright"
        sx={{
          width: "20px",
          marginRight: "5px",
          verticalAlign: "middle",
        }}
      />
      <Typography variant="body2" sx={{ color: "white" }}>
        VoteChain 2024
      </Typography>
    </Box>
  );
};

export default Footer;

