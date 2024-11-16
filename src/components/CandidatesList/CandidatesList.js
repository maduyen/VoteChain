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
      const res = await sendRequest(FETCH_TRANSACTION("B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gD", "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gD"));
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
        signerPublicKey: "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gD",
        signerPrivateKey: "5xFSv5y3HYJv5YSNJ78cSS7Tuaf38Lu6UYj2ajngFuwH",
        recipientPublicKey: "B8GFzNi6vfVhA9crXSC2S8s9K2eoNJd1HhwEbCLwT6gD",
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
