// import React, { useState } from "react";
// // import { useParams } from "react-router-dom";
// import { Button, Card, CardContent, Typography } from "@material-ui/core";
// import CheckIcon from "@material-ui/icons/Check";

// const sampleCandidates = [
//   { id: "1", name: "Candidate 1" },
//   { id: "2", name: "Candidate 2" },
//   { id: "3", name: "Candidate 3" },
// ];

// const CandidatesList = ({ selectedElection, votedCandidates, handleVote, isElectionVoted }) => {
//   // const { electionId } = useParams(); // Removed unused variable
//   const [isVotingDisabled, setVotingDisabled] = useState(false);
//   const [votedCandidate, setVotedCandidate] = useState(null);

//   console.log("selectedElection:", selectedElection);
//   console.log("votedCandidates:", votedCandidates);
//   console.log("isVotingDisabled:", isVotingDisabled);
//   console.log("votedCandidate:", votedCandidate);

//   const handleCandidateVote = (candidateId) => {
//     console.log("Voting for candidate:", candidateId);

//     // Check if the election is already voted
//     if (isElectionVoted) {
//       // Show a message that the election is already voted
//       setVotedCandidate(null); // Reset votedCandidate state
//       setVotingDisabled(true);
//     } else {
//       // Vote for the candidate
//       handleVote(candidateId);
//       // Set the voted candidate for displaying a success message
//       setVotedCandidate(candidateId);
//       // Disable further voting for this election
//       setVotingDisabled(true);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h4">Candidates List</Typography>
//       {selectedElection && (
//         <Typography variant="h5">Election: {selectedElection.name}</Typography>
//       )}
//       {selectedElection && votedCandidates.includes(selectedElection.id) && (
//   <Typography variant="h6">You have already voted in this election.</Typography>
// )}



//       {sampleCandidates.map((candidate) => (
//         <Card key={candidate.id} style={{ marginTop: 20 }}>
//           <CardContent>
//             <Typography variant="h6">{candidate.name}</Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               startIcon={<CheckIcon />}
//               onClick={() => handleCandidateVote(candidate.id)}
//               disabled={isVotingDisabled}
//             >
//               Vote
//             </Button>
//             {votedCandidate === candidate.id && (
//               <Typography color="primary" style={{ marginTop: 10 }}>
//                 You have successfully voted for {candidate.name}.
//               </Typography>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default CandidatesList;


// import React, { useState, useEffect } from "react";
// import { Button, Card, CardContent, Typography } from "@material-ui/core";
// import CheckIcon from "@material-ui/icons/Check";
// import { FETCH_TRANSACTION, POST_TRANSACTION } from "../utils/ResDbApis";
// import { sendRequest } from "../utils/ResDbClient";

// const sampleCandidates = [
//   { id: "1", name: "Candidate 1" },
//   { id: "2", name: "Candidate 2" },
//   { id: "3", name: "Candidate 3" },
// ];

// const CandidatesList = ({ selectedElection }) => {
//   const [votedCandidates, setVotedCandidates] = useState([]);
//   const [isElectionVoted, setIsElectionVoted] = useState(false);
//   const [isVotingDisabled, setVotingDisabled] = useState(false);
//   const [votedCandidate, setVotedCandidate] = useState(null);

//   useEffect(() => {
//     fetchVotedCandidates(); // Fetch voted candidates when the component mounts
//   }, []);

//   // Function to fetch voted candidates for a specific election
//   const fetchVotedCandidates = async () => {
//     // Assuming you have the public key available
//     const signerPublicKey = "CP7FpTw83LnnoyfDAiUS52LDTejaSRKuDBSTjK8XUcWh";
//     const recipientPublicKey = "CP7FpTw83LnnoyfDAiUS52LDTejaSRKuDBSTjK8XUcWh";

//     const query = FETCH_TRANSACTION(signerPublicKey, recipientPublicKey);
//     try {
//       const res = await sendRequest(query);
//       if (res && res.data && res.data.getFilteredTransactions) {
//         // Extracting voted candidates from the response
//         const votedCandidates = res.data.getFilteredTransactions.map(
//           (item) => JSON.parse(item.asset.replace(/'/g, '"')).data
//         );
//         setVotedCandidates(votedCandidates);

//         // Check if the current election is among the voted ones
//         const isVoted = votedCandidates.some(
//           (candidate) => candidate.electionId === selectedElection.id
//         );
//         setIsElectionVoted(isVoted);
//       }
//     } catch (error) {
//       console.log("Error fetching voted candidates: ", error);
//     }
//   };

//   // Function to handle voting for a candidate
//   const handleVote = async (candidateId) => {
//     console.log("Voting for candidate:", candidateId);

//     // TODO: Prepare the payload or data to be sent in the transaction
//     const metadata = {
//       // ... Include necessary metadata for the transaction
//       signerPublicKey: "CP7FpTw83LnnoyfDAiUS52LDTejaSRKuDBSTjK8XUcWh",
//       signerPrivateKey: "3A8QKRCULxHdUgMrXXjagNdE19gCTwTzTizet6JpUewu",

//     };
//     const dataItem = {
//       timestamp: new Date().toString(),
//     };

//     try {
//       const res = await sendRequest(
//         POST_TRANSACTION(metadata, JSON.stringify(dataItem))
//       );

//       // Handle the response if needed
//       console.log("Transaction response: ", res);

//       // Assuming the voting is successful, update the voted candidate state
//       setVotedCandidate(candidateId);
//       setVotingDisabled(true); // Disable further voting for this election
//     } catch (error) {
//       console.log("Error while voting: ", error);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h4">Candidates List</Typography>
//       {selectedElection && (
//         <Typography variant="h5">Election: {selectedElection.name}</Typography>
//       )}
//       {isElectionVoted && (
//         <Typography variant="h6">You have already voted in this election.</Typography>
//       )}

//       {sampleCandidates.map((candidate) => (
//         <Card key={candidate.id} style={{ marginTop: 20 }}>
//           <CardContent>
//             <Typography variant="h6">{candidate.name}</Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               startIcon={<CheckIcon />}
//               onClick={() => handleVote(candidate.id)}
//               disabled={isVotingDisabled || isElectionVoted}
//             >
//               Vote
//             </Button>
//             {votedCandidate === candidate.id && (
//               <Typography color="primary" style={{ marginTop: 10 }}>
//                 You have successfully voted for {candidate.name}.
//               </Typography>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default CandidatesList;

////9:35pm - 3/12
import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { POST_TRANSACTION, FETCH_TRANSACTION } from "../utils/ResDbApis"; // Import the POST_TRANSACTION API
import { sendRequest } from "../utils/ResDbClient"; // Import the sendRequest function
import { app, auth } from '../../firebase';
import { useParams } from "react-router-dom";
import withAuthProtection from "../AuthProtect/AuthProtect";
import Navbar from "../Navbar2";
import Footer from "../Footer";
import styles from "./CandidatesList.module.css";
import { Container, Row, Col, Form, FormGroup, Label, Input, Alert } from "reactstrap";
// GUI imports
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import c1 from '../../assest/c1.png';
import c2 from '../../assest/c2.png';
import c3 from '../../assest/c3.png';
import c4 from '../../assest/c4.png';
import c5 from '../../assest/c5.png';
import c6 from '../../assest/c6.png';
import c7 from '../../assest/c7.png';
import c8 from '../../assest/c8.png';
import c9 from '../../assest/c9.png';
import c10 from '../../assest/c10.png';
import c11 from '../../assest/c11.png';
import c12 from '../../assest/c12.png';
import c13 from '../../assest/c13.png';
import c14 from '../../assest/c14.png';
import c15 from '../../assest/c15.png';
import c16 from '../../assest/c16.png';
import c17 from '../../assest/c17.png';
//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import back_image_cand from "../../assest/undraw_people_re_8spw.svg";
// Inside your CandidatesList component


const sampleCandidates = [
  { id: "1", name: "Candidate 1" },
  { id: "2", name: "Candidate 2" },
  { id: "3", name: "Candidate 3" },
];

const elections = [
  { id: 1, name: "Constituency A" },
  { id: 2, name: "Constituency B" },
  { id: 3, name: "Constituency C" },
];

const CandidatesList = ({ selectedElection, votedCandidates, handleVote, isElectionVoted }) => {
  const [isVotingDisabled, setVotingDisabled] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [voterList, setVoterList] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const { electionId } = useParams();
  console.log("Election ID from URL:", electionId);
  useEffect(() => {
    if (selectedElection) {
      // Fetch transactions for the selected election
      console.log("Selected Election is this:", selectedElection);
      console.log("Selected Election id is this:",selectedElection.id);
      fetchTransactions(selectedElection);
    }
  }, [selectedElection]);

  const fetchTransactions = async (electionId) => {
    try {
      // Fetch transactions using the FETCH_TRANSACTION API
      const res = await sendRequest(FETCH_TRANSACTION("B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC", "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC"));
      if (!selectedElection) {
        console.error("Selected election is null or undefined");
        return;
      }
      console.log("Fetch Transactions Response:", res); // Log the response
      
      if (res && res.data && res.data.getFilteredTransactions) {
        // Process the transaction data as needed
        setTransactions(res.data.getFilteredTransactions);
        console.log("Fetched Transactions:", res.data.getFilteredTransactions); // Log the fetched transactions
        let voters = [...voterList];
        res.data.getFilteredTransactions?.forEach(element => {
          
          voters.push(JSON.parse(element.asset.replace(/'/g, '"')).data);
         
        });
        setVoterList(voters);
         console.log(voters);

      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // Handle error scenarios here
    }
  };

  // const fetchTransactions = async (selectedElection) => {
  //   try {
  //     const user = auth.currentUser;

  //     // Ensure the user is authenticated
  //     if (!user) {
  //       console.error("User not authenticated.");
  //       // Handle authentication error
  //       return;
  //     }

  //     // Fetch transactions for the user and the selected election
  //     const fetchTransactionQuery = FETCH_TRANSACTION(user.uid, metadata.recipientPublicKey);
  //     const transactionResponse = await sendRequest(fetchTransactionQuery);

  //     // Check if there are transactions for the selected election
  //     const transactionsForElection = transactionResponse.data.getFilteredTransactions;
  //     const hasVotedForElection = transactionsForElection.some(
  //       (transaction) => transaction.asset.includes(`"electionId":"${selectedElection.id}"`)
  //     );

  //     // Update the state to reflect whether the user has voted in the selected election
  //     setTransactions(transactionsForElection);
  //     setVotingDisabled(hasVotedForElection);
  //   } catch (error) {
  //     console.error("Error while fetching transactions:", error);
  //     // Handle error scenarios here
  //   }
  // };


  // const handleCandidateVote = async (candidateId) => {
  //   console.log("Voting for candidate:", candidateId);
  //   if (!candidateId) {
  //     console.error("Candidate ID is null or undefined");
  //     return;
  //   }
  //   if (isElectionVoted) {
  //     setVotedCandidate(null);
  //     setVotingDisabled(true);
  //   } else {
  //     try {
  //       const user = auth.currentUser;

  //       // Ensure the user is authenticated
  //       if (!user) {
  //         console.error("User not authenticated.");
  //         // Handle authentication error
  //         return;
  //       }
  

  //       const metadata = {
  //         signerPublicKey: "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC",
  //         signerPrivateKey: "5xFSv5y3HYJv5YSNJ78cSS7Tuaf38Lu6UYj2ajngFuwH",
  //         recipientPublicKey: "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC", // Change this according to your requirement
  //       };

  //       // Create a data object for the transaction
  //       const dataItem = { // Add the candidate ID or any necessary data
  //         // Add other necessary data properties here
  //         electionId: electionId,
  //         candidateId: candidateId,
  //         voterId: user.uid, // Replace with the actual voter ID
  //         voteCount: 1, // Initial vote count
  //         additionalData: {
  //           timestamp: Date.now(),
  //           location: "Precinct 123", // Replace with actual location data
  //           verificationCode: "ABCDEF", // Replace with actual verification code
  //         },
  //       };

  //       voterList.forEach((item)=>{
  //         if(item["electionId"]==electionId && item["voterId"]==user.uid){
  //           console.log("Vote already casted") //TODO
  //           setIsVoted(true);
  //         }
  //       })
        
  //       if(!isVoted){
  //       // Call the API to post the transaction
  //       const res = await sendRequest(POST_TRANSACTION(metadata, JSON.stringify(dataItem)));

  //       console.log("Transaction response:", res);

  //       // Update the state to reflect the successful vote
  //       setVotedCandidate(candidateId);
  //       setVotingDisabled(true);
  //       }
  //     } catch (error) {
  //       console.error("Error while voting:", error);
  //       // Handle error scenarios here
  //     }
  //   }
  // };

  const handleCandidateVote = async (candidateId) => {
    console.log("Voting for candidate:", candidateId);
    if (!candidateId) {
      console.error("Candidate ID is null or undefined");
      return;
    }
    try {
      const user = auth.currentUser;
  
      // Ensure the user is authenticated
      if (!user) {
        console.error("User not authenticated.");
        // Handle authentication error
        return;
      }
  
      const metadata = {
        signerPublicKey: "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC",
        signerPrivateKey: "5xFSv5y3HYJv5YSNJ78cSS7Tuaf38Lu6UYj2ajngFuwH",
        recipientPublicKey: "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gC",
      };
  
      // Check if the user has already voted in the current election
      const hasVoted = voterList.some((item) => item.electionId === electionId && item.voterId === user.uid);
  
      if (hasVoted) {
        console.log("Vote already casted");
        setIsVoted(true);
      } else {
        // Create a data object for the transaction
        const dataItem = {
          electionId: electionId,
          candidateId: candidateId,
          voterId: user.uid,
          voteCount: 1,
          additionalData: {
            timestamp: Date.now(),
            location: "Precinct 123",
            verificationCode: "ABCDEF",
          },
        };
  
        // Call the API to post the transaction
        const res = await sendRequest(POST_TRANSACTION(metadata, JSON.stringify(dataItem)));
  
        console.log("Transaction response:", res);
  
        // Update the state to reflect the successful vote
        setVotedCandidate(candidateId);
        setVotingDisabled(true);
        setIsVoted(false); // Clear the isVoted state for the next election
      }
    } catch (error) {
      console.error("Error while voting:", error);
      // Handle error scenarios here
    }
  };
  
  //random image icon
  // Assume you have a list of SVG images
const svgImages = [
  c1,
  c2,
  c3,
  c4,
  c5,
  c6,
  c7,
  c8,
  c9,
  c10,
  c11,
  c12,
  c13,
  c14,
  c15,
  c16,
  // Add more SVG image paths as needed
];

const getRandomSvgImage = () => {
  const randomIndex = Math.floor(Math.random() * svgImages.length);
  return svgImages[randomIndex];
};

useEffect(() => {
  if (isVoted) {
    toast.info('You have already voted.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } else if (votedCandidate) {
    toast.success(`You have successfully voted for ${votedCandidate}.`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
}, [isVoted, votedCandidate]);

  return (
    <>
    <Navbar />
    <Container className={styles.container}>
    <Row className="justify-content-center">
      <Col md="6" className={styles.imageCol} style={{paddingRight: "100px", paddingTop: "100px"}}>
          {/* Left half of the page for the image */}
          <div className={styles.imageContainer}>
            <img src={back_image_cand} alt="..." className={styles.back_image_cand} />
          </div>
        </Col>
        <Col md="6">
        <div>
      <Typography variant="h3" style={{padding: "50px"}}>Candidates List</Typography>
      {selectedElection && (
        <Typography variant="h5">Election: {selectedElection.name}</Typography>
      )}
 
      {isElectionVoted && (
        <Typography variant="h6">You have already voted in this election.</Typography>
      )}
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
      {/* {sampleCandidates.map((candidate) => (
        <Card key={candidate.id} style={{ marginTop: 20 }}>
          <CardContent>
            <Typography variant="h6">{candidate.name}</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
              onClick={() => handleCandidateVote(candidate.id)}
              
              
              disabled={isVotingDisabled}
            >
              Vote
            </Button>
         
           {isVoted? 
              <Typography color="primary" style={{ marginTop: 10 }}>
                You have already voted.
              </Typography>
            :  votedCandidate === candidate.id && (
              <Typography color="primary" style={{ marginTop: 10 }}>
                You have successfully voted for {candidate.name}.
              </Typography>
            )}
          </CardContent>
        </Card>
              ))} */}

      {/* {sampleCandidates.map((candidate) => (
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', marginBottom: 2 }} key={candidate.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              style={{ flex: 'column', marginLeft: 10 }}
              primary={candidate.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
            <div style={{ marginLeft: 'auto', marginRight: 10 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                onClick={() => handleCandidateVote(candidate.id)}
                disabled={isVotingDisabled}
                style={{ whiteSpace: 'nowrap' }}
              >
                Vote
              </Button>
              {isVoted ?
                <Typography color="primary" style={{ marginTop: 10 }}>
                  You have already voted.
                </Typography>
                : votedCandidate === candidate.id && (
                  <Typography color="primary" style={{ marginTop: 10 }}>
                    You have successfully voted for {candidate.name}.
                  </Typography>
                )}
            </div>
          </ListItem>
          {/* <Divider variant="inset" component="li" /> */}
        {/* </List> */}
        {/* ))}  */}
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: '20px' }}>
        {sampleCandidates.map((candidate) => (
      <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper', marginBottom: 2 }} key={candidate.id}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {/* Use the randomly selected SVG image for each candidate */}
            <Avatar alt={candidate.name} src={getRandomSvgImage()} style={{ width: '80px', height: '80px' }}/>
          </ListItemAvatar>
          <ListItemText
            style={{ flex: 'column', marginLeft: 15, marginTop: '25px' }}
            // primary={candidate.name}
            primary={<Typography variant="h5">{candidate.name}</Typography>}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {/* Ali Connors */}
                </Typography>
                
              </React.Fragment>
            }
          />
          <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '100px', marginRight: 10 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
              onClick={() => {
                handleCandidateVote(candidate.id);
                
              }}
               disabled={isVotingDisabled}
              style={{ whiteSpace: 'nowrap' }}
            >
              Vote
            </Button>
 
          </div>
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}
      </List>
    ))}
    </div>
    </div>

        </Col>
        </Row>
    </Container>
    
    
   <Footer />
    </>
  );
};
export default withAuthProtection(CandidatesList);
