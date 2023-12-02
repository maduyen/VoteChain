import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const sampleCandidates = [
  { id: "1", name: "Candidate 1" },
  { id: "2", name: "Candidate 2" },
  { id: "3", name: "Candidate 3" },
];

const CandidatesList = ({ selectedElection, votedCandidates, handleVote, isElectionVoted }) => {
  // const { electionId } = useParams(); // Removed unused variable
  const [isVotingDisabled, setVotingDisabled] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState(null);

  console.log("selectedElection:", selectedElection);
  console.log("votedCandidates:", votedCandidates);
  console.log("isVotingDisabled:", isVotingDisabled);
  console.log("votedCandidate:", votedCandidate);

  const handleCandidateVote = (candidateId) => {
    console.log("Voting for candidate:", candidateId);

    // Check if the election is already voted
    if (isElectionVoted) {
      // Show a message that the election is already voted
      setVotedCandidate(null); // Reset votedCandidate state
      setVotingDisabled(true);
    } else {
      // Vote for the candidate
      handleVote(candidateId);
      // Set the voted candidate for displaying a success message
      setVotedCandidate(candidateId);
      // Disable further voting for this election
      setVotingDisabled(true);
    }
  };

  return (
    <div>
      <Typography variant="h4">Candidates List</Typography>
      {selectedElection && (
        <Typography variant="h5">Election: {selectedElection.name}</Typography>
      )}
      {selectedElection && votedCandidates.includes(selectedElection.id) && (
  <Typography variant="h6">You have already voted in this election.</Typography>
)}



      {sampleCandidates.map((candidate) => (
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
            {votedCandidate === candidate.id && (
              <Typography color="primary" style={{ marginTop: 10 }}>
                You have successfully voted for {candidate.name}.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CandidatesList;
