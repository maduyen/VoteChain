// import React,{ useEffect } from "react";
// import { Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";

// const elections = [
//   { id: 1, name: "Constituency A" },
//   { id: 2, name: "Constituency B" },
//   { id: 3, name: "Constituency C" },
//   // Add more elections as needed
// ];

// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(5),
//   },
//   header: {
//     marginBottom: theme.spacing(3),
//   },
//   button: {
//     margin: theme.spacing(2),
//   },
// }));

// function ElectionsList({ selectedElection, handleElectionSelect }) {
//   useEffect(() => {
//     // Reset selectedElection when component unmounts
//     return () => {
//       handleElectionSelect(null);
//     };
//   }, [handleElectionSelect]);
//   const classes = useStyles();

//   return (
//     <Container className={classes.container}>
//       <Typography variant="h4" align="center" className={classes.header}>
//         Select an Election
//       </Typography>
//       {elections.map((election) => (
//         <Button
//           key={election.id}
//           variant="contained"
//           color={selectedElection && selectedElection.includes(election.id) ? "primary" : "default"}
//           className={classes.button}
//           onClick={() => handleElectionSelect(election.id)}
//           component={Link}
//           to="/candidates"
//         >
//           {election.name}
//         </Button>
//       ))}
//     </Container>
//   );
// }

// export default ElectionsList;
// 6:51


// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Navbar from "../Navbar";
// import Footer from "../Footer";

// const elections = [
//   { id: 1, name: "Constituency A" },
//   { id: 2, name: "Constituency B" },
//   { id: 3, name: "Constituency C" },
//   // Add more elections as needed
// ];

// const useStyles = makeStyles((theme) => ({
//   outerCard: {
//     padding: theme.spacing(3),
//     margin: theme.spacing(3),
//   },
//   container: {
//     marginTop: theme.spacing(3),
//   },
//   header: {
//     marginBottom: theme.spacing(3),
//   },
//   card: {
//     marginBottom: theme.spacing(2),
//     border: "1px solid black",
//   },
//   cardContent: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: theme.spacing(2),
//   },
//   button: {
//     width: "100%", // Adjust button width to fill the card content
//   },
// }));

// function ElectionsList({ selectedElection, handleElectionSelect }) {
//   useEffect(() => {
//     // Reset selectedElection when component unmounts
//     return () => {
//       handleElectionSelect(null);
//     };
//   }, [handleElectionSelect]);
//   const classes = useStyles();

//   return (
//     <>
//     <Navbar />
//     <Card className={classes.outerCard}>
//       <Typography variant="h4" align="center" className={classes.header}>
//         Select an Election
//       </Typography>
//       <Container className={classes.container}>
//         {elections.map((election) => (
//           <Card key={election.id} className={classes.card}>
//             <CardContent className={classes.cardContent}>
//               <Button
//                 variant="contained"
//                 color={selectedElection && selectedElection.includes(election.id) ? "primary" : "default"}
//                 onClick={() => handleElectionSelect(election.id)}
//                 component={Link}
//                 to={`/candidates/${election.id}`}
//                 className={classes.button}
//               >
//                 {election.name}
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </Container>
//     </Card>
//     <Footer />
//     </>
//   );
// }

// export default ElectionsList;

//9:35pm - 3/12
// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Navbar from "../Navbar2";
// import Footer from "../Footer";
// import withAuthProtection from "../AuthProtect/AuthProtect";
// const elections = [
//   { id: 1, name: "Constituency A" },
//   { id: 2, name: "Constituency B" },
//   { id: 3, name: "Constituency C" },
//   // Add more elections as needed
// ];

// const useStyles = makeStyles((theme) => ({
//   outerCard: {
//     padding: theme.spacing(3),
//     margin: theme.spacing(3),
//   },
//   container: {
//     marginTop: theme.spacing(3),
//   },
//   header: {
//     marginBottom: theme.spacing(3),
//   },
//   card: {
//     marginBottom: theme.spacing(2),
//     border: "1px solid black",
//   },
//   cardContent: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: theme.spacing(2),
//   },
//   button: {
//     width: "100%", // Adjust button width to fill the card content
//   },
// }));

// function ElectionsList({ selectedElection, handleElectionSelect }) {
//   useEffect(() => {
//     // Reset selectedElection when component unmounts
//     return () => {
//       handleElectionSelect(null);
//     };
//   }, [handleElectionSelect]);
//   const classes = useStyles();

//   return (
//     <>
//       <Navbar />
//       <Card className={classes.outerCard}>
//         <Typography variant="h4" align="center" className={classes.header}>
//           Select an Election
//         </Typography>
//         <Container className={classes.container}>
//           {elections.map((election) => (
//             <Card key={election.id} className={classes.card}>
//               <CardContent className={classes.cardContent}>
//                 <Button
//                   variant="contained"
//                   color={
//                     selectedElection && selectedElection.includes(election.id)
//                       ? "primary"
//                       : "default"
//                   }
//                   onClick={() => handleElectionSelect(election.id)}
//                   component={Link}
//                  to={`/candidates/${election.id}`} 
//                  //to ="/candidates"
//                   className={classes.button}
//                 >
//                   {election.name}
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </Container>
//       </Card>
//       <Footer />
//     </>
//   );
// }

// export default withAuthProtection(ElectionsList);

//1:36am
// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import Navbar from "../Navbar2";
// import Footer from "../Footer";
// import withAuthProtection from "../AuthProtect/AuthProtect";
// import c1 from '../../assest/c1.png';
// import c2 from '../../assest/c2.png';
// import c3 from '../../assest/c3.png';

// const elections = [
//   {
//     id: 1,
//     name: "Constituency A",
//     logo: c1,
//     title: "Constituency A Election",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam odio non bibendum consectetur. Proin vel semper justo.",
//     dates: "Election Dates: 05/15/2023 - 05/20/2023"
//   },
//   {
//     id: 2,
//     name: "Constituency B",
//     logo: c2,
//     title: "Constituency B Election",
//     description: "Vestibulum at leo quis metus tincidunt lobortis vel ac risus. Quisque id justo eu risus vulputate fermentum. Nulla facilisi.",
//     dates: "Election Dates: 05/18/2023 - 05/23/2023"
//   },
//   {
//     id: 3,
//     name: "Constituency C",
//     logo: c3,
//     title: "Constituency C Election",
//     description: "Curabitur nec elit eu lectus vehicula fermentum. Morbi auctor ipsum eu arcu cursus, at consectetur dolor euismod. In hac habitasse platea dictumst.",
//     dates: "Election Dates: 05/20/2023 - 05/25/2023"
//   },
//   // Add more elections as needed
// ];

// function ElectionsList({ selectedElection, handleElectionSelect }) {
//   useEffect(() => {
//     // Reset selectedElection when component unmounts
//     return () => {
//       handleElectionSelect(null);
//     };
//   }, [handleElectionSelect]);

//   return (
//     <>
//       <Navbar />
//       <Card style={{ padding: 24, margin: 24 }}>
//         <Typography variant="h4" align="center" style={{ marginBottom: 24 }}>
//           Select an Election
//         </Typography>
//         <Container style={{ marginTop: 24 }}>
//           <Grid container spacing={2}>
//             {elections.map((election) => (
//               <Grid item key={election.id} xs={12} sm={6} md={4}>
//                 <Card>
//                   <CardContent>
//                     <img src={election.logo} alt={`Logo for ${election.name}`} style={{ maxWidth: "100%" }} />
//                     <Typography variant="h5" style={{ marginTop: 16 }}>
//                       {election.title}
//                     </Typography>
//                     <Typography variant="body1" style={{ marginBottom: 16 }}>
//                       {election.description}
//                     </Typography>
//                     <Typography variant="body2" style={{ marginBottom: 16 }}>
//                       {election.dates}
//                     </Typography>
//                     <Button
//                       variant="contained"
//                       color={
//                         selectedElection && selectedElection.includes(election.id)
//                           ? "primary"
//                           : "default"
//                       }
//                       onClick={() => handleElectionSelect(election.id)}
//                       component={Link}
//                       to={`/candidates/${election.id}`}
//                       style={{ width: "100%" }}
//                     >
//                       {election.name}
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Card>
//       <Footer />
//     </>
//   );
// }

// export default withAuthProtection(ElectionsList);

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Navbar from "../Navbar2";
import Footer from "../Footer";
import withAuthProtection from "../AuthProtect/AuthProtect";
import election_1 from '../../assest/election_1.jpg';
import election_2 from '../../assest/election_2.jpg';
// import election_3 from '../../assest/election_3.jpg';
import election_4 from '../../assest/election_4.jpg';


const elections = [
  {
    id: 1,
    name: "Constituency A",
    logo: election_1,
    title: "Constituency A Election",
    description: "Join us on a journey towards a brighter future built on innovation, inclusivity, and progress. Envision a tomorrow where unity prevails, every citizen thrives, and cutting-edge solutions drive economic growth.",
    dates: "Election Dates: 05/15/2023 - 05/20/2023"
  },
  {
    id: 2,
    name: "Constituency B",
    logo: election_2,
    title: "Constituency B Election",
    description: "We promote community empowerment, fostering strong, vibrant neighborhoods where every voice is heard.",
    dates: "Election Dates: 05/18/2023 - 05/23/2023"
  },
  {
    id: 3,
    name: "Constituency C",
    logo: election_4,
    title: "Constituency C Election",
    description: "Advocating for accountability and transparency, believing in a government that is open, honest, and responsible.Join us in ushering in a new era of politics, where the power is returned to the people, and decisions are made with clarity and integrity.",
    dates: "Election Dates: 05/20/2023 - 05/25/2023"
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
        <Container>
          <Grid container spacing={2}>
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
                        style={{ width: "100%" }}
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
      <Footer />
    </>
  );
}

export default withAuthProtection(ElectionsList);
