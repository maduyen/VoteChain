const express = require("express");
const Vote = require("../models/Vote");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Request received at /api/votes");
  console.log("Incoming request body:", req.body);

  try {
    const { VoteTransactionId, sendpublicKey, receivekey, voteData } = req.body;

    if(VoteTransactionId.trim() === "") {
      console.error("Empty voteid:", req.body);
      return res.status(400).json({ error: "Invalid vote data" });
    }
    if (!VoteTransactionId || !receivekey || !voteData) {
      console.error("Invalid vote data:", req.body);
      return res.status(400).json({ error: "Invalid vote data" });
    }
  
    //console.log("VoteTransactionId ID:", VoteTransactionId);
    //console.log("Public key:", process.env.PUBLIC_KEY);
    //console.log("Receive key:", receivekey);
    //console.log("Poll Data:", voteData);

    // Decompose pollData and match schema
    const newVote = new Vote({
      VoteTransactionId,
      sendpublicKey: process.env.PUBLIC_KEY || sendpublicKey ,
      receivekey,
      Data: {
        pollid: voteData.pollid,
        options: voteData.options,
        createdAt: new Date(voteData.createdAt),
      },
    });
    //console.log("newVote:", newVote);

    const savedVote = await newVote.save();
    console.log("Vote successfully stored:", savedVote);

    res.status(201).json({ success: true, poll: savedVote });
  } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate VoteTransactionId detected");
      return res.status(400).json({ error: "Duplicate VoteTransactionId" });
    }
    console.error("Error recording vote:", error);
    res.status(500).json({ error: "Failed to record vote" });
  }
});


// Get all polls with pagination
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const votes = await Vote.find({})
      .sort({ "Data.createdAt": -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Vote.countDocuments();
    res.json({
      votes,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch votes." });
  }
});

// Get polls by public key
router.get("/user/:publicKey", async (req, res) => {
  const { publicKey } = req.params;

  try {
    const votes = await Vote.find({ sendpublicKey: publicKey });
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch votes." });
  }
});

// Get a specific poll by transaction ID
router.get("/:transactionId", async (req, res) => {
  const { transactionId } = req.params;

  try {
    const votes = await Vote.findOne({ VoteTransactionId: transactionId });
    if (!votes) return res.status(404).json({ error: "Vote not found." });
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Vote." });
  }
});

module.exports = router;
