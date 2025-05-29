const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },
    publicKey: { type: String, required: true, unique: true },
    profileData: {
        userName: { type:String },         // optional
        profilePic: { type: String },      // optional
        about: { type: String },           // optional
    }
});

const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;