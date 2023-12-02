import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
  },
}));

function Home(props) {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center" className={classes.header}>
            Welcome to the Voting Website
          </Typography>
        </Grid>
        <Grid item xs={6} align="center">
          <Link to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6} align="center">
          <Link to="/signup">
            <Button variant="contained" color="secondary">
              Signup
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer} align="center">
          <Typography variant="h5">
            {props.name ? `Welcome - ${props.name}` : "Login to vote"}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
