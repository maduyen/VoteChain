const express = require("express");
const Poll = require("../models/Poll");
const router = express.Router();

router.post("/", async (req, res) => {
  const { transactionId, selectedOption } = req.body;

  try {
    const poll = await Poll.findOne({ transactionId });
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    // You can enhance this by maintaining a votes count for each option
    console.log(`Vote received for poll ${transactionId}: ${selectedOption}`);

    res.json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error recording vote:", error);
    res.status(500).json({ error: "Failed to record vote" });
  }
});

module.exports = router;
