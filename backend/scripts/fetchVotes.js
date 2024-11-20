require("dotenv").config(); // Load environment variables from .env file
const { MongoClient } = require("mongodb");

const mongoConfig = {
  uri: process.env.MONGO_URI,
  dbName: "VoteChain",
  collectionName: "votes",
};

const targetPublicKey = "8LUKr81SmkdDhuBNAHfH9C8G5m6Cye2mpUggVu61USbD";

(async () => {
  const client = new MongoClient(mongoConfig.uri);

  try {
    await client.connect();
    const db = client.db(mongoConfig.dbName);
    const collection = db.collection(mongoConfig.collectionName);

    console.log("Connected to MongoDB for fetching votes.");

    // Create an index for optimized querying
    const indexName = await collection.createIndex({ "transactions.value.inputs.owners_before": 1 });
    console.log(`Index created: ${indexName}`);

    // Aggregation pipeline to match the public key
    const pipeline = [
      { $unwind: "$transactions" },
      { $unwind: "$transactions.value.inputs" },
      { 
        $match: { 
          "transactions.value.inputs.owners_before": targetPublicKey 
        }
      },
      { $sort: { "transactions.value.asset.data.timestamp": -1 } },
      { $project: { transaction: "$transactions", _id: 0 } }
    ];

    const cursor = collection.aggregate(pipeline);
    const votes = await cursor.toArray();

    if (votes.length > 0) {
      console.log("Votes found:", JSON.stringify(votes, null, 2));
    } else {
      console.log(`No votes found for public key: ${targetPublicKey}`);
    }
  } catch (error) {
    console.error("Error fetching votes:", error);
  } finally {
    await client.close();
  }
})();
