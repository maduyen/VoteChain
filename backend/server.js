require("dotenv").config();
console.log("MongoDB URI:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pollRoutes = require("./routes/pollRoutes");
const storePollRoutes = require("./routes/storePollRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to", mongoose.connection.db.databaseName);
  console.log("URI used:", process.env.MONGO_URI);
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/polls", pollRoutes); // For fetching
app.use("/api/storePollRoutes", storePollRoutes);  // For storing

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
