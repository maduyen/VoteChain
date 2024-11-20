require("dotenv").config(); // Load environment variables from .env file
const { WebSocketMongoSync } = require("resilient-node-cache");

const mongoConfig = {
  uri: process.env.MONGO_URI,
  dbName: "VoteChain",
  collectionName: "votes",
};

const resilientDBConfig = {
  baseUrl: "resilientdb://crow.resilientdb.com",
  httpSecure: true,
  wsSecure: true,
};

const sync = new WebSocketMongoSync(mongoConfig, resilientDBConfig);

sync.on("connected", () => {
  console.log("WebSocket connected to ResilientDB.");
});

sync.on("data", (newBlocks) => {
  console.log("New blocks synced:", newBlocks);
});

sync.on("error", (error) => {
  console.error("Synchronization error:", error);
});

sync.on("closed", () => {
  console.log("Connection to ResilientDB closed.");
});

(async () => {
  try {
    await sync.initialize();
    console.log("Synchronization initialized successfully.");
  } catch (error) {
    console.error("Error initializing synchronization:", error);
  }
})();
