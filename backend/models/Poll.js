const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true, required: true },
  publicKey: { type: String, required: true },
  pollData: {
    topic: { type: String, required: true },
    description: { type: String },
    options: { type: [String], required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    createdAt: { type: Date, required: true },
  },
  syncedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TestPoll", PollSchema);
