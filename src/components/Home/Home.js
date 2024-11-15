import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Row, Col } from "reactstrap";
import CardContent from "@material-ui/core/CardContent";
import Navbar from "../Navbar1";
import Footer from "../Footer2";
import voting_home from "../../components/images/voting_home_2.svg";
import signup from "../../components/images/signup.svg";
import election from "../../components/images/election.svg";
import report from "../../components/images/report.svg";
import secure from "../../components/images/secure.svg";
import transparent from "../../components/images/Electronic Vote Visualisation in the Admin panel.svg";
import immutable from "../../components/images/Immutable_votes.svg";
import singleVoting from "../../components/images/Single_voting_instance.svg";
import restrictedAccess from "../../components/images/Restricted_access.svg";
import { Button } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(20)
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  navbar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  card: {
    height: "100%",
  },
}));


function Home(props) {
  const classes = useStyles();

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="wrapper" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
        <div className="page-header header-filter">
          <Container>
            <div className="content-center brand">
            </div>
          </Container>
        </div>
        <section className="section section-lg section-safe">
          <Container>
            <Row className="row-grid justify-content-between">
              <Col md="6">
                <div className="px-md-4 text-left" >
                  <hr className="line-success" />
                  <h1 className="display-1" >VoteChain</h1>
                  <h4 style={{ color: "#575989" }}>Make Your Voice Heard: Vote for Change</h4>
                  <p style={{ color: "#575989" , marginTop: '15px'}}>Experience the future of e-voting with VoteChain - our customizable, secure voting app that offers convenience, transparency, and accessibility for all!</p>
                  <div className="btn-wrapper profile">
                    <Button
                      color="primary"
                      href="https://naitikjain3071.wixsite.com/my-site">
                      Blog
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={voting_home}
                />
              </Col>
            </Row>
          </Container>
        </section>

        <div className="page-header header-filter">
          <Container>
            <div className="content-center brand">
              <hr className="line-success" />
              <h1 className="display-2" >How Does VoteChain Work?</h1>
            </div>
          </Container>
        </div>

        <Container className="classes.usestyles">
          <div style={{ padding: 30 }} >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <img
                      alt="..."
                      src={signup}
                      style={{ width: '300px', height: '300px' }} />
                    <h3 style={{ color: "#626FDF", marginBottom: "20px"}}>Registration</h3>
                    <h6>
                      Make an account today! Register to vote and ensure your voice is counted in the upcoming voting polls. Your vote is your power – let's make a difference together.
                    </h6>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <img
                      alt="..."
                      src={election}
                      style={{ width: '300px', height: '300px' }} />
                    <h3 style={{ color: "#626FDF", marginBottom: "20px" }}>Get Ready to Vote</h3>
                    <h6>
                      Mark your calendar! Find essential information about election dates, polling locations, and voting hours on the voting pages. Be prepared to make your voice heard – your participation is crucial for a thriving community!
                    </h6>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <img
                      alt="..."
                      src={report}
                      style={{ width: '300px', height: '300px' }} />
                    <h3 style={{ color: "#626FDF", marginBottom: "20px" }}>Voting Topics
                    </h3>
                    <h6>
                      Explore topic pages to make an informed decision. Your vote shapes our community and influences change. Dive into the details and vote for a future you believe in.
                    </h6>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <img
                      alt="..."
                      src={report}  //FIXME: need to change image later
                      style={{ width: '300px', height: '300px' }} />
                    <h3 style={{ color: "#626FDF", marginBottom: "20px" }}>Disucssion Panels
                    </h3>
                    <h6>
                      With the new addition of VoteChain's discussion panels, users now have the opportunity to provide feedback and ensue in conversation with others about voting topics! Please be mindful when contributing to the discussion panels 😊
                    </h6>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <div className="content-center brand">
              <hr className="line-success" />
              <h1 className="display-2" style={{paddingBottom: "25px"}}>Features</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', backgroundColor: "white", padding: "60px" }}>
                <div style={{ textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={restrictedAccess}
                  />
                  <h3 style={{ marginTop: '25px', color: '#575989'}}>Limited access</h3>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={immutable}
                  />
                   <h3 style={{ marginTop: '25px', color: '#575989' }}>Immutable Votes</h3>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={transparent}
                  />
                   <h3 style={{ marginTop: '25px', color: '#575989' }}>Secure and Transparent Voting</h3>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={singleVoting}
                  />
                   <h3 style={{ marginTop: '25px', color: '#575989' }}>Single Voting</h3>
                </div>
              </div>
            </div>
          </div>
        </Container>

      </div>
      <div>
      <Footer />
      </div>
       
    </div>
  );
}
export default Home;

