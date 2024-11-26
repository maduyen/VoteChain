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
import election from "../../components/images/election.svg";
import report from "../../components/images/report.svg";
import discussion from "../../components/images/discussion.svg";  //added discussion panel image to "images" folder
import secure from "../../components/images/secure.svg";
import transparent from "../../components/images/Electronic Vote Visualisation in the Admin panel.svg";
import immutable from "../../components/images/Immutable_votes.svg";
import singleVoting from "../../components/images/Single_voting_instance.svg";
import restrictedAccess from "../../components/images/Restricted_access.svg";
import blockchain from "../../components/images/blockchain.svg"  //added blockchain image to "images" folder
import customize from "../../components/images/customize.svg"  //added customizable voting mech image to "images" folder
import immutable_vote from "../../components/images/immutable_vote.svg"  //added immutable vote image to "images folder"
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
                  <h1 className="display-1" style={{ color: "#221c1c" }}>VoteChain</h1>
                  <h4 style={{ color: "#555b69" }}>Decentralizing Voting with Blockchain, One Vote at a Time</h4>
                  <p style={{ color: "#555b69" , marginTop: '15px'}}>Experience the future of e-voting with VoteChain - our customizable, secure voting app that offers convenience, transparency, and accessibility for all!</p>
                  <div className="btn-wrapper profile">
                    <Button
                      href="https://xiuyuanqi799.wixsite.com/expanded-votechain"
                      style={{ backgroundColor: "#8fac86" }}>
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
              <h1 className="display-2" style={{ color: "#221c1c" }}>How Does VoteChain Work?</h1>
            </div>
          </Container>
        </div>

        <Container className="classes.usestyles">
          <div style={{ padding: 30 }} >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <img
                      alt="..."
                      // src={signup}
                      style={{ width: '300px', height: '300px' }} />
                    <h3 style={{ color: "#8fac86", marginBottom: "20px"}}>Registration</h3>
                    <h6 style={{ color: "#555b69"}}>
                      Create an account today to participate in the upcoming polls! Each voter is assigned a unique digital token that is stored on the blockchain, ensuring identity integrity and preventing unauthorized access.
                    </h6>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <img
                      alt="..."
                      src={election}
                      style={{ width: '300px', height: '300px' }} />
                    <h3 style={{ color: "#8fac86", marginBottom: "20px" }}>Get Ready to Vote!</h3>
                    <h6 style={{ color: "#555b69"}}>
                      Dive into the details and vote for what you believe in. Explore the topic pages to find essential information about the polls and be prepared to make your voice heard. Your participation is crucial for shaping our community!
                    </h6>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <img
                      alt="..."
                      src={discussion}  //image for discussion panel description
                      style={{ width: '300px', height: '300px' }} />
                    <h3 style={{ color: "#8fac86", marginBottom: "20px" }}>Participate in Discussions
                    </h3>
                    <h6 style={{ color: "#555b69"}}>
                      Poll Creators can create configurable discussion panels with options for public or private access, integrating anonymity features. Users now have the opportunity to provide feedback and engage in conversations about voting topics! Please be mindful when participating 😊
                    </h6>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <img
                      alt="..."
                      src={blockchain}  //image for infrastructure description
                      style={{ width: '300px', height: '300px' }} />
                    <h3 style={{ color: "#8fac86", marginBottom: "20px" }}>Secured by Blockchain
                    </h3>
                    <h6 style={{ color: "#555b69"}}>
                      VoteChain is powered by the ResilientDB and Graph QL blockchain infrastructure. By decentralizing our voting system, we guarantee that voting data is secure and immutable. Poll outcomes are fully determined by the people, creating a transparent voting environment.
                    </h6>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <div className="content-center brand">
              <hr className="line-success" />
              <h1 className="display-2" style={{ color: "#221c1c", paddingBottom: "25px"}}>Features</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', backgroundColor: "white", padding: "60px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={customize}  //image for customizable voting
                  />
                  <h3 style={{ marginTop: '25px', color: '#555b69'}}>Customizable Voting Mechanisms</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={immutable} 
                  />
                   <h3 style={{ marginTop: '25px', color: '#555b69' }}>Discussion Panels</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={transparent}
                  />
                   <h3 style={{ marginTop: '25px', color: '#555b69' }}>Secure and Transparent Voting</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={immutable_vote}
                  />
                   <h3 style={{ marginTop: '25px', color: '#555b69' }}>Immutable Votes</h3>
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

