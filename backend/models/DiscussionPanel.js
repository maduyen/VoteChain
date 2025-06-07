const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },
    username: {type: String, default: "Voter"},  //username is optional (user has to)
    msg:{ type:String, required:true },
    postTime: {type:Date, default:Date.now}
});

const Msg = mongoose.model('msg', msgSchema);
module.exports = Msg;