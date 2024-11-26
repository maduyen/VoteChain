import express from "express";
import multer from "multer";
import { ObjectId } from "mongodb";
import { GraphQLClient, gql } from "graphql-request";

const router = express.Router();
const resilientDBClient = new GraphQLClient("https://cloud.resilientdb.com/graphql");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${req.body.topic || "poll"}-${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const pollRoutes = (db) => {
  // Create a Poll
  router.post("/polls", upload.single("image"), async (req, res) => {
    try {
      const { topic, description, options, startTime, endTime } = req.body;
      const parsedOptions = typeof options === "string" ? JSON.parse(options) : options;

      if (!topic || !parsedOptions || parsedOptions.length < 2) {
        return res.status(400).json({ error: "Topic and at least two options are required." });
      }

      const poll = {
        topic,
        description: description || "",
        options: parsedOptions,
        imagePath: req.file ? req.file.path : null,
        startTime,
        endTime,
        createdAt: new Date(),
      };

      // Store the poll in MongoDB
      const result = await db.collection("polls").insertOne(poll);
      const pollId = result.insertedId;

      // Prepare data for ResilientDB
      const mutation = gql`
        mutation PostTransaction($data: TransactionInput!) {
          postTransaction(data: $data) {
            id
          }
        }
      `;
      const resilientData = {
        data: {
          operation: "CREATE",
          amount: 0,
          signerPublicKey: process.env.PUBLIC_KEY, // Replace with your key logic
          signerPrivateKey: process.env.PRIVATE_KEY, // Replace with your key logic
          asset: JSON.stringify({ pollId, poll }),
        },
      };

      // Save the poll to ResilientDB
      const resilientResponse = await resilientDBClient.request(mutation, resilientData);

      // Update MongoDB with ResilientDB transaction ID
      await db.collection("polls").updateOne(
        { _id: pollId },
        { $set: { resilientDBId: resilientResponse.postTransaction.id } }
      );

      res.status(201).json({
        message: "Poll created successfully!",
        pollId,
        resilientDBId: resilientResponse.postTransaction.id,
      });
    } catch (error) {
      console.error("Error creating poll:", error);
      res.status(500).json({ error: "Failed to create poll." });
    }
  });

  // Fetch Poll Results
  router.get("/polls/:pollId/results", async (req, res) => {
    try {
      const pollId = req.params.pollId;

      // Validate poll ID
      if (!ObjectId.isValid(pollId)) {
        return res.status(400).json({ error: "Invalid poll ID." });
      }

      // Get the poll document to retrieve the ResilientDB transaction ID
      const poll = await db.collection("polls").findOne({ _id: new ObjectId(pollId) });
      if (!poll || !poll.resilientDBId) {
        return res.status(404).json({ error: "Poll not found or not synced to ResilientDB." });
      }

      // Fetch results from ResilientDB
      const query = gql`
        query GetTransaction($id: String!) {
          getTransaction(id: $id) {
            id
            asset
            operation
          }
        }
      `;

      const resilientResponse = await resilientDBClient.request(query, { id: poll.resilientDBId });
      const resilientPoll = JSON.parse(resilientResponse.getTransaction.asset).poll;

      res.json({ results: resilientPoll.options });
    } catch (error) {
      console.error("Error fetching poll results:", error);
      res.status(500).json({ error: "Failed to fetch poll results." });
    }
  });

  return router;
};

export default pollRoutes;
