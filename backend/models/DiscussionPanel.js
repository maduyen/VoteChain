const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    msg:{ type:String, required:true },
    postTime: {type:Date, default:Date.now}
})

const Msg = mongoose.model('msg', msgSchema);
module.exports = Msg;