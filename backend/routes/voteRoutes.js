import { Router } from "express";
import { ObjectId } from "mongodb";

const router = Router();

const voteRoutes = (db, broadcast) => {
  router.post("/polls/:pollId/vote", async (req, res) => {
    try {
      const pollId = req.params.pollId;
      const { option } = req.body;

      if (!ObjectId.isValid(pollId)) {
        return res.status(400).json({ error: "Invalid poll ID." });
      }

      const poll = await db.collection("polls").findOne({ _id: new ObjectId(pollId) });
      if (!poll) {
        return res.status(404).json({ error: "Poll not found." });
      }

      if (!poll.options.includes(option)) {
        return res.status(400).json({ error: "Invalid option selected." });
      }

      const vote = { pollId, option, timestamp: new Date() };
      await db.collection("votes").insertOne(vote);

      res.status(201).json({ message: "Vote submitted successfully!" });

      // Notify WebSocket clients of new vote
      broadcast({ pollId, option });
    } catch (error) {
      console.error("Error submitting vote:", error);
      res.status(500).json({ error: "Failed to submit vote." });
    }
  });

  return router;
};

export default voteRoutes;
