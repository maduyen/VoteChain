const express = require("express");
const Vote = require("../models/Vote");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Request received at /api/votes");
  console.log("Incoming request body:", req.body);

  try {
    const { VoteTransactionId, sendpublicKey, receivekey, voteData } = req.body;

    
    if (!VoteTransactionId || !sendpublicKey || !receivekey || !voteData) {
      console.error("Invalid vote data:", req.body);
      return res.status(400).json({ error: "Invalid vote data" });
    }
  
    console.log("VoteTransactionId ID:", VoteTransactionId);
    console.log("Public key:", sendpublicKey);
    console.log("Receive key:", receivekey);
    console.log("Poll Data:", voteData);

    // Decompose pollData and match schema
    const newVote = new Vote({
      VoteTransactionId,
      sendpublicKey, // Provide a default public key if missing
      receivekey,
      Data: {
        pollid: voteData.pollid,
        options: voteData.options,
        createdAt: new Date(voteData.createdAt),
      },
    });
    console.log("newVote:", newVote);

    const savedVote = await newVote.save();
    console.log("Vote successfully stored:", savedVote);

    res.status(201).json({ success: true, poll: savedVote });
  } catch (error) {
    console.error("Error recording vote:", error);
    res.status(500).json({ error: "Failed to record vote" });
  }
});

module.exports = router;
