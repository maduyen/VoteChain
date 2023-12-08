// import React from "react";
// import { Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(5),
//   },
//   header: {
//     marginBottom: theme.spacing(3),
//   },
//   buttonContainer: {
//     marginTop: theme.spacing(2),
//   },
// }));

// function Home(props) {
//   const classes = useStyles();

//   return (
//     <Container className={classes.container}>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Typography variant="h3" align="center" className={classes.header}>
//             Welcome to the Voting Website
//           </Typography>
//         </Grid>
//         <Grid item xs={6} align="center">
//           <Link to="/login">
//             <Button variant="contained" color="primary">
//               Login
//             </Button>
//           </Link>
//         </Grid>
//         <Grid item xs={6} align="center">
//           <Link to="/signup">
//             <Button variant="contained" color="secondary">
//               Signup
//             </Button>
//           </Link>
//         </Grid>
//         <Grid item xs={12} className={classes.buttonContainer} align="center">
//           <Typography variant="h5">
//             {props.name ? `Welcome - ${props.name}` : "Login to vote"}
//           </Typography>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// export default Home;

//2:25am
// import React from "react";
// import { Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(8),
//   },
//   header: {
//     marginBottom: theme.spacing(3),
//   },
//   navbar: {
//     display: "flex",
//     justifyContent: "flex-end",
//   },
//   title: {
//     marginRight: "auto", // Pushes the title to the extreme left
//   },
// }));

// function Home(props) {
//   const classes = useStyles();

//   return (
//     <div>
//       <AppBar position="fixed">
//         <Toolbar>
//           <Typography variant="h6" className={classes.title}>
//             Voting Website
//           </Typography>
//           <div className={classes.navbar}>
//             <Button color="inherit" component={Link} to="/login">
//               Voter Login
//             </Button>
//             <Button color="inherit" component={Link} to="/signup">
//               Voter Signup
//             </Button>
//             <Button color="inherit" component={Link} to="/login">
//               Admin Login
//             </Button>
//           </div>
//         </Toolbar>
//       </AppBar>
//       <Container className={classes.container}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Typography variant="h3" align="center" className={classes.header}>
//               Welcome 
//             </Typography>
//           </Grid>
//           <Grid item xs={12} align="center">
//             <Typography variant="h5">
//               {props.name ? `Welcome - ${props.name}` : "Login to vote"}
//             </Typography>
//           </Grid>
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default Home;


//commented on 10:29pm - 12/7/23
// import React from "react";
// import { Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(8),
//   },
//   header: {
//     marginBottom: theme.spacing(3),
//   },
//   navbar: {
//     display: "flex",
//     justifyContent: "flex-end",
//   },
//   title: {
//     marginRight: "auto", // Pushes the title to the extreme left
//   },
//   card: {
//     height: "100%",
//   },
// }));

// function Home(props) {
//   const classes = useStyles();

//   return (
//     <div>
//       <AppBar position="fixed">
//         <Toolbar>
//           <Typography variant="h6" className={classes.title}>
//             VoteChain
//           </Typography>
//           <div className={classes.navbar}>
//             <Button color="inherit" component={Link} to="/login">
//               Voter Login
//             </Button>
//             <Button color="inherit" component={Link} to="/signup">
//               Voter Signup
//             </Button>
//             <Button color="inherit" component={Link} to="/login">
//               Admin Login
//             </Button>
//           </div>
//         </Toolbar>
//       </AppBar>
//       <Container className={classes.container}>
//       {/* <Grid item xs={12}>
//           <Typography variant="h3">
//             {props.name ? `Welcome - ${props.name}` : "Login to vote"}
//           </Typography>
//         </Grid> */}
//         <Typography variant="h3" align="center" className={classes.header}>
//           VoteChain
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={4}>
//             <Card className={classes.card}>
//               <CardContent>
//                 <Typography variant="h6">Card 1</Typography>
//                 <Typography variant="body1">
//                 Lorem Ipsum is simply dummy text of the printing and typesetting
//                  i when an unknown printer took a galley of type and scrambled it to 
//                  make a type electronic typesetting, remaining essentially unchanged. 
//                  It was popularised in the 1960s with the release of Letraset sheets conta
//                  ining Lorem Ipsum passages, 
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Card className={classes.card}>
//               <CardContent>
//                 <Typography variant="h6">Card 2</Typography>
//                 <Typography variant="body1">
//                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
//                 the industry's standard dummy text ever since the 1500s, when an unknown printer took a 
//                 galley of type and scrambled it to make a type specimen book. 
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Card className={classes.card}>
//               <CardContent>
//                 <Typography variant="h6">Card 3</Typography>
//                 <Typography variant="body1">
//                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
//                 the industry's standard dummy text ever since the 1500s, when an unknown printer took a 
//                 galley of type and scrambled it to make a type specimen book. 
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
        
//       </Container>
//     </div>
//   );
// }

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Row, Col } from "reactstrap";
// import { Color } from "reactstrap";
// import {Typography} from "reactstrap";
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

// const SvgGrid = () => {
//   const svgImages = [
//     restrictedAccess,
//     singleVoting,
//     immutable,
//     transparent
//   ];

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
  // title: {
  //   marginRight: "auto", // Pushes the title to the extreme left
  // },
  card: {
    height: "100%",
    // marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(8)
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
              {/* <h4 className="d-none d-sm-block" style={{ color: "#FFFBBA" }}>
              A secure and transparent e-voting system
              </h4> */}
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
                  <p style={{ color: "#575989" , marginTop: '15px'}}>Revolutionize democracy with our secure and user-friendly e-voting system. Experience the future of voting – convenient, transparent, and accessible to all.</p>
                  {/* <h5 style={{ color: "#575989", marginTop: '30px', marginBottom: '15px'}}>Learn more about us on our blog!</h5> */}
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
              <h1 className="display-2" >How it works?</h1>
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
                    <h3 style={{ color: "#626FDF", marginBottom: "20px"}}>Voter registration</h3>
                    <h6>
                      Get started on your civic journey! Register to vote and ensure your voice is counted in the upcoming elections. Your vote is your power – let's make a difference together.
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
                    <h3 style={{ color: "#626FDF", marginBottom: "20px" }}>Election day details</h3>
                    <h6>
                      Mark your calendar! Find essential information about election dates, polling locations, and voting hours. Be prepared to make your voice heard on Election Day – your participation is crucial for a thriving democracy.
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
                    <h3 style={{ color: "#626FDF", marginBottom: "20px" }}>Candidate profiles and issues
                    </h3>
                    <h6>
                      Know your candidates and their stands on key issues. Explore comprehensive profiles to make an informed decision. Your vote shapes policies and influences change. Dive into the details and vote for a future you believe in.
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
                   <h3 style={{ marginTop: '25px', color: '#575989' }}>Immutable votes</h3>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={transparent}
                  />
                   <h3 style={{ marginTop: '25px', color: '#575989' }}>Secure and Transparent Election</h3>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img
                    alt="..."
                    style={{ width: '300px', height: '300px' }}
                    className="img-fluid floating"
                    src={singleVoting}
                  />
                   <h3 style={{ marginTop: '25px', color: '#575989' }}>Single voting</h3>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* </section> */}
      </div>
      <div>
      <Footer />
      </div>
       
    </div>
  );
}
export default Home;

