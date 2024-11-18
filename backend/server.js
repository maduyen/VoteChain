require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection URI (from .env file)
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("Error: MONGO_URI is not set in the .env file.");
  process.exit(1);
}

// Create a MongoDB client
const client = new MongoClient(uri, {
  tls: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();

    // Test the connection by sending a ping to the database
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB successfully!");

    return client.db("VoteChain"); // Use the VoteChain database
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

// Initialize the database
let db;
connectToDatabase().then((database) => {
  db = database;
});

// API Endpoint: Create a Poll
app.post("/api/polls", async (req, res) => {
  try {
    const { topic, description, options, startTime, endTime } = req.body;

    // Validate input
    if (!topic || !options || options.length < 2) {
      return res.status(400).json({ error: "Topic and at least two options are required." });
    }

    const poll = {
      topic,
      description: description || "",
      options,
      startTime,
      endTime,
      createdAt: new Date(),
    };

    const result = await db.collection("polls").insertOne(poll);
    res.status(201).json({ message: "Poll created successfully!", pollId: result.insertedId });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ error: "Failed to create poll." });
  }
});

// API Endpoint: Fetch All Polls
app.get("/api/polls", async (req, res) => {
  try {
    const polls = await db.collection("polls").find().toArray();
    res.json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ error: "Failed to fetch polls." });
  }
});

// API Endpoint: Fetch a Single Poll by ID
app.get("/api/polls/:id", async (req, res) => {
  try {
    const pollId = req.params.id;
    const ObjectId = require("mongodb").ObjectId;

    if (!ObjectId.isValid(pollId)) {
      return res.status(400).json({ error: "Invalid poll ID." });
    }

    const poll = await db.collection("polls").findOne({ _id: new ObjectId(pollId) });
    if (!poll) {
      return res.status(404).json({ error: "Poll not found." });
    }

    res.json(poll);
  } catch (error) {
    console.error("Error fetching poll:", error);
    res.status(500).json({ error: "Failed to fetch poll." });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
