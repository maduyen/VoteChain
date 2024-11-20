require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

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

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${req.body.topic || "poll"}-${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage });

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

// API Endpoints
app.post("/api/polls", upload.single("image"), async (req, res) => {
  try {

    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);


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

    console.log("ResilientDB Response:", resilientDBResponse.data);

    const result = await db.collection("polls").insertOne(poll);
    
    res.status(201).json({ message: "Poll created successfully!", pollId: result.insertedId });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ error: "Failed to create poll." });
  }
});

app.get("/api/polls", async (req, res) => {
  try {
    const polls = await db.collection("polls").find().toArray();
    res.json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ error: "Failed to fetch polls." });
  }
});

app.get("/api/polls/:id", async (req, res) => {
  try {
    const pollId = req.params.id;
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

app.get("/api/votes/:publicKey", async (req, res) => {
  const publicKey = req.params.publicKey;

  if (!publicKey || publicKey.length < 5) {
    return res.status(400).json({ error: "Invalid public key." });
  }

  try {
    const collection = db.collection("votes");
    const pipeline = [
      { $unwind: "$transactions" },
      { $unwind: "$transactions.value.inputs" },
      { $match: { "transactions.value.inputs.owners_before": publicKey } },
      { $sort: { "transactions.value.asset.data.timestamp": -1 } },
      { $project: { transaction: "$transactions", _id: 0 } },
    ];

    const votes = await collection.aggregate(pipeline).toArray();

    if (votes.length > 0) {
      res.json({ votes });
    } else {
      res.status(404).json({ error: "No votes found for the given public key." });
    }
  } catch (error) {
    console.error("Error fetching votes:", error);
    res.status(500).json({ error: "Failed to fetch votes." });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
