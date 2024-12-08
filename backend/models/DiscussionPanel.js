const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },
    msg:{ type:String, required:true },
    postTime: {type:Date, default:Date.now}
});

const Msg = mongoose.model('msg', msgSchema);
module.exports = Msg;