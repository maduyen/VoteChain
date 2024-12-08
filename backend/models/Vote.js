const mongoose = require("mongoose");

const Votechema = new mongoose.Schema({
  VoteTransactionId: { type: String, require: true, unique: true },
  sendpublicKey: { type: String, required: true },
  receivekey: { type: String, required: true },
  Data: {
    pollid : { type: String, required: true },
    options: { type: String, required: true },
    createdAt: { type: Date, required: true },
  },
  syncedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("VotePoll", Votechema);
