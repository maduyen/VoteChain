const express = require("express");
const Vote = require("../models/Vote");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Request received at /api/votes");
  console.log("Incoming request body:", req.body);

  try {

    const { transactionId, selecteddata } = req.body;

    if (!transactionId || !selecteddata) {
      console.error("Invalid vote data:", req.body);
      return res.status(400).json({ error: "Invalid vote data" });
    }
  
    console.log("Transaction ID:", transactionId);
    console.log("Public key:", process.env.PUBLIC_KEY);
    console.log("Poll Data:", pollData);

    // Decompose pollData and match schema
    const newPoll = new Vote({
      transactionId,
      publicKey: req.body.publicKey || process.env.PUBLIC_KEY, // Provide a default public key if missing
      pollData: {
        topic: pollData.topic,
        description: pollData.description,
        options: pollData.options,
        startTime: new Date(pollData.startTime), // Ensure dates are converted to proper Date objects
        endTime: new Date(pollData.endTime),
        createdAt: new Date(pollData.createdAt),
      },
    });

    // You can enhance this by maintaining a votes count for each option
    console.log(`Vote received for Vote ${transactionId}: ${selectedOption}`);

    res.json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error recording vote:", error);
    res.status(500).json({ error: "Failed to record vote" });
  }
});

module.exports = router;
