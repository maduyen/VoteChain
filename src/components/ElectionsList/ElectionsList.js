import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Navbar from "../Navbar2";
import Footer from "../Footer2";
import election_1 from '../../assest/election_1.jpg';
import election_2 from '../../assest/election_2.jpg';
import election_3 from '../../assest/election_3.jpg';
import election_4 from '../../assest/election_4.jpg';



const elections = [
  {
    id: 1,
    name: "Constituency A",
    logo: election_1,
    title: "Constituency A Election",
    description: "Join us on a successful journey towards a brighter future built on innovation, creativity, inclusivity, progress, etc. ",
    dates: "Election Dates: 12/1/2023 - 12/12/2023"
  },
  {
    id: 2,
    name: "Constituency B",
    logo: election_2,
    title: "Constituency B Election",
    description: "We promote community empowerment, fostering strong, vibrant neighborhoods where every voice is heard.",
    dates: "Election Dates: 12/5/2023 - 12/15/2023"
  },
  {
    id: 3,
    name: "Constituency C",
    logo: election_4,
    title: "Constituency C Election",
    description: "Advocating for accountability and transparency, believing in a government that is open, honest, and responsible.",
    dates: "Election Dates: 12/6/2023 - 12/12/2023"
  },
  // Add more elections as needed
];

function ElectionsList({ selectedElection, handleElectionSelect }) {
  useEffect(() => {
    // Reset selectedElection when component unmounts
    return () => {
      handleElectionSelect(null);
    };
  }, [handleElectionSelect]);

  return (
    <>
      <Navbar />
      <Card style={{ padding: 24, margin: 24 }}>
        <Typography variant="h4" align="center" style={{ marginBottom: 24 , marginTop: 30}}>
          Select an Election
        </Typography>
        <Container style={{paddingBottom: "50px"}}>
          <Grid container spacing={4}>
            {elections.map((election) => (
              <Grid item key={election.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <img src={election.logo} alt={`Logo for ${election.name}`} style={{ maxWidth: "100%", marginBottom: 16 }} />
                      <Typography variant="h5" style={{ marginBottom: 16 }}>
                        {election.title}
                      </Typography>
                      <Typography variant="body1" style={{ marginBottom: 16 }}>
                        {election.description}
                      </Typography>
                      <Typography variant="body2" style={{ marginBottom: 16 }}>
                        {election.dates}
                      </Typography>
                      <Button
                        variant="contained"
                        color={
                          selectedElection && selectedElection.includes(election.id)
                            ? "primary"
                            : "default"
                        }
                        onClick={() => handleElectionSelect(election.id)}
                        component={Link}
                        to={`/candidates/${election.id}`}
                        style={{
                          width: "100%",
                          backgroundColor: selectedElection && selectedElection.includes(election.id)
                            ? "#000" // Change background color for selected election
                            : "#000", // Change default background color
                          color: "#fff", // Text color
                          borderRadius: 8, // Button border radius
                          boxShadow: "none", // Remove box-shadow if needed
                          transition: "background-color 0.3s", // Add transition effect
                        }}
                        // Hover effect
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = selectedElection && selectedElection.includes(election.id)
                            ? "#000" // Change background color on hover for selected election
                            : "#000"; // Change default background color on hover
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = selectedElection && selectedElection.includes(election.id)
                            ? "#000" // Revert back to selected election's color
                            : "#000"; // Revert back to default color
                        }}
                      >
                        {election.name}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Card>
      
    <Footer/>
    </>
  );
}

export default ElectionsList;
