const express = require("express");
const Poll = require("../models/Poll");
const router = express.Router();

router.post("/", async (req, res) => {
    console.log("Request received at /api/storePollRoutes");
    console.log("Incoming request body:", req.body);
  
    try {
      const { transactionId, pollData } = req.body;
  
      if (!transactionId || !pollData) {
        console.error("Invalid request data:", req.body);
        return res.status(400).json({ error: "Invalid request data" });
      }
  
      console.log("Transaction ID:", transactionId);
      console.log("Poll Data:", pollData);
  
      // Decompose pollData and match schema
      const newPoll = new Poll({
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
  
      const savedPoll = await newPoll.save();
      console.log("Poll successfully stored:", savedPoll);
  
      res.status(201).json({ success: true, poll: savedPoll });
    } catch (error) {
      console.error("Error storing poll:", error);
  
      if (error.code === 11000) {
        return res.status(400).json({ error: "Transaction ID already exists." });
      }
  
      res.status(500).json({ error: "Failed to store poll" });
    }
  });
  

module.exports = router;
