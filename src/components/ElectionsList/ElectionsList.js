import React,{ useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const elections = [
  { id: 1, name: "Election A" },
  { id: 2, name: "Election B" },
  { id: 3, name: "Election C" },
  // Add more elections as needed
];

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

function ElectionsList({ selectedElection, handleElectionSelect }) {
  useEffect(() => {
    // Reset selectedElection when component unmounts
    return () => {
      handleElectionSelect(null);
    };
  }, [handleElectionSelect]);
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h4" align="center" className={classes.header}>
        Select an Election
      </Typography>
      {elections.map((election) => (
        <Button
          key={election.id}
          variant="contained"
          color={selectedElection && selectedElection.includes(election.id) ? "primary" : "default"}
          className={classes.button}
          onClick={() => handleElectionSelect(election.id)}
          component={Link}
          to="/candidates"
        >
          {election.name}
        </Button>
      ))}
    </Container>
  );
}

export default ElectionsList;
