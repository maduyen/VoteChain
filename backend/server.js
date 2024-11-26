import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import { WebSocketServer } from "ws";
import pollRoutes from "./routes/pollRoutes.mjs";
import voteRoutes from "./routes/voteRoutes.js";

dotenv.config();

const app = express();
const PORT = 5000;
const WEBSOCKET_PORT = 8080;

// Validate environment variables
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in .env file.");
  process.exit(1);
}

// WebSocket setup
const wss = new WebSocketServer({ port: WEBSOCKET_PORT });
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on("error", (err) => {
  console.error("WebSocket error:", err);
});

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "*", methods: ["GET", "POST"] })); // Adjust for production

// MongoDB Connection
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1 } });

let db;

// Start Server
const startServer = async () => {
  try {
    await client.connect();
    db = client.db("VoteChain");
    console.log("Connected to MongoDB");

    // Use Routes
    app.use("/api", pollRoutes(db));
    app.use("/api", voteRoutes(db, broadcast));

    // Start HTTP server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      console.log("Closing server...");
      await client.close();
      wss.close(() => console.log("WebSocket server closed."));
      process.exit(0);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit process on failure
  }
};

startServer();
