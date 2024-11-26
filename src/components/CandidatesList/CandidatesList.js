import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { POST_TRANSACTION, FETCH_TRANSACTION } from "../utils/ResDbApis";
import { sendRequest } from "../utils/ResDbClient";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar2";
import Footer from "../Footer";
import styles from "./CandidatesList.module.css";
import { Container, Row, Col } from "reactstrap";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import back_image_cand from "../../assest/undraw_people_re_8spw.svg";
import c1 from '../../assest/c1.png';
import c2 from '../../assest/c2.png';

const sampleCandidates = [
  { id: "1", name: "Candidate 1" },
  { id: "2", name: "Candidate 2" },
];

const CandidatesList = ({ selectedElection, votedCandidates, handleVote, isElectionVoted }) => {
  const [isVotingDisabled, setVotingDisabled] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [voterList, setVoterList] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const { electionId } = useParams();

  useEffect(() => {
    if (selectedElection) {
      fetchTransactions(selectedElection);
    }
  }, [selectedElection]);

  const fetchTransactions = async (electionId) => {
    try {
      const res = await sendRequest(FETCH_TRANSACTION(localStorage.getItem("publicKey"), localStorage.getItem("publicKey")));
      if (!selectedElection) return;

      if (res && res.data && res.data.getFilteredTransactions) {
        setTransactions(res.data.getFilteredTransactions);
        let voters = res.data.getFilteredTransactions.map((txn) =>
          JSON.parse(txn.asset.replace(/'/g, '"')).data
        );
        setVoterList(voters);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleCandidateVote = async (candidateId) => {
    const voterId = localStorage.getItem("userId");
    if (!voterId) return;

    const metadata = {
      signerPublicKey: localStorage.getItem("publicKey"),
      signerPrivateKey: localStorage.getItem("privateKey"),
      recipientPublicKey: localStorage.getItem("publicKey"),
    };

    const hasVoted = voterList.some((item) => item.electionId === electionId && item.voterId === voterId);

    if (hasVoted) {
      setIsVoted(true);
    } else {
      const dataItem = {
        electionId: electionId,
        candidateId,
        voterId,
        voteCount: 1,
        additionalData: {
          timestamp: Date.now(),
        },
      };
      await sendRequest(POST_TRANSACTION(metadata, JSON.stringify(dataItem)));
      setVotedCandidate(candidateId);
      setVotingDisabled(true);
    }
  };

  return (
    <>
      <Navbar />
      <Container className={styles.container}>
        <Row className="justify-content-center">
          <Col md="6" className={styles.imageCol}>
            <img src={back_image_cand} alt="..." className={styles.back_image_cand} />
          </Col>
          <Col md="6">
            <Typography variant="h3" style={{ padding: "50px" }}>Candidates List</Typography>
            {selectedElection && <Typography variant="h5">Election: {selectedElection.name}</Typography>}
            {isElectionVoted && <Typography variant="h6">You have already voted in this election.</Typography>}
            <ToastContainer />
            <List>
              {sampleCandidates.map((candidate) => (
                <ListItem key={candidate.id}>
                  <ListItemAvatar>
                    <Avatar src={c1} />
                  </ListItemAvatar>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CheckIcon />}
                    onClick={() => handleCandidateVote(candidate.id)}
                    disabled={isVotingDisabled}
                  >
                    Vote
                  </Button>
                </ListItem>
              ))}
            </List>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default CandidatesList;
