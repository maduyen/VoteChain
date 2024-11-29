require("dotenv").config();
const { WebSocketMongoSync } = require("resilient-node-cache");
const Poll = require("../models/Poll");
const fs = require("fs");
const path = require("path");

// Setup log file
const logFile = path.join(__dirname, "syncPolls.log");
const logStream = fs.createWriteStream(logFile, { flags: "a" }); // Append mode

// Redirect console.log and console.error to the log file
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = (...args) => {
  originalConsoleLog(...args);
  logStream.write(`[LOG] ${new Date().toISOString()} ${args.join(" ")}\n`);
};

console.error = (...args) => {
  originalConsoleError(...args);
  logStream.write(`[ERROR] ${new Date().toISOString()} ${args.join(" ")}\n`);
};

const mongoConfig = {
  uri: process.env.MONGO_URI,
  dbName: "myDatabase",
  collectionName: "polls",
};

const resilientDBConfig = {
  baseUrl: "resilientdb://crow.resilientdb.com",
  httpSecure: true,
  wsSecure: true,
};

const sync = new WebSocketMongoSync(mongoConfig, resilientDBConfig);

sync.on("connected", () => {
  console.log("WebSocket connection established with ResilientDB.");
});

sync.on("data", async (newBlocks) => {
  try {
    console.log(`Received ${newBlocks.length} blocks.`);
    console.log("Blocks:", JSON.stringify(newBlocks, null, 2));

    const transactions = newBlocks.flatMap((block) => block.transactions);

    const pollTransactions = transactions.filter(
      (tx) =>
        tx.operation === "CREATE" &&
        tx.asset &&
        tx.asset.data &&
        tx.asset.data.electionId
    );

    console.log(
      "Filtered poll transactions:",
      JSON.stringify(pollTransactions, null, 2)
    );

    const formattedPolls = pollTransactions.map((tx) => ({
      transactionId: tx.id,
      publicKey: tx.inputs[0]?.owners_before[0],
      pollData: {
        electionId: tx.asset.data.electionId,
        candidateId: tx.asset.data.candidateId,
        voterId: tx.asset.data.voterId,
        voteCount: tx.asset.data.voteCount,
        additionalData: tx.asset.data.additionalData,
      },
      syncedAt: new Date(),
    }));

    if (formattedPolls.length > 0) {
      const result = await Poll.insertMany(formattedPolls, { ordered: false });
      console.log(`Inserted ${result.length} polls into MongoDB.`);
    } else {
      console.log("No new polls to insert.");
    }
  } catch (error) {
    console.error("Error syncing poll data:", error);
  }
});

sync.on("message", (message) => {
  console.log("Raw WebSocket message received:", message);
});

sync.on("error", (error) => {
  console.error("WebSocket error:", error);
});

sync.on("closed", () => {
  console.log("WebSocket connection closed.");
});

(async () => {
  try {
    console.log("Initializing WebSocketMongoSync...");
    await sync.initialize();
    console.log("Synchronization initialized.");
  } catch (error) {
    console.error("Error during sync initialization:", error);
  }
})();
