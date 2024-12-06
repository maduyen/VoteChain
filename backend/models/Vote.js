const mongoose = require("mongoose");

const Votechema = new mongoose.Schema({
  transactionId: { type: String, unique: true, required: true },
  sendpublicKey: { type: String, required: true },
  receivpublickey: { type: String, required: true },
  pollData: {
    pollid : { type: String, required: true },
    options: { type: [String], required: true },
    createdAt: { type: Date, required: true },
  },
  syncedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("VotePoll", Votechema);
