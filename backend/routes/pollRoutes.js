const express = require("express");
const Poll = require("../models/Poll");
const router = express.Router();

// Get all polls with pagination
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const polls = await Poll.find({})
      .sort({ "pollData.createdAt": -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Poll.countDocuments();
    res.json({
      polls,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch polls." });
  }
});

// Get polls by public key
router.get("/user/:publicKey", async (req, res) => {
  console.log("Request is:", req.params);
  const { publicKey } = req.params;
  console.log("publicKey is:", publicKey);


  try {
    const polls = await Poll.find({ publicKey });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch polls." });
  }
});

// Get a specific poll by transaction ID
router.get("/:transactionId", async (req, res) => {
  const { transactionId } = req.params;

  try {
    const poll = await Poll.findOne({ transactionId });
    if (!poll) return res.status(404).json({ error: "Poll not found." });
    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch poll." });
  }
});

module.exports = router;
