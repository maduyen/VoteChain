const express = require("express");
const Profile = require("../models/Profile");
const router = express.Router();

router.post('/', async (req, res) => {
    const { publicKey, transactionId, profileData } = req.body;

    if (!publicKey || !transactionId) {
        return res.status(400).json({ error: "publicKey and transactionId are required" });
    }

    try {
        let profile = await Profile.findOne({ publicKey });

        if (!profile) {
            // Create a new profile
            profile = new Profile({
                publicKey,
                transactionId,
                profileData: {}
            });
        } else {
            // Just update the transactionId
            profile.transactionId = transactionId;
        }

        // Only update profileData fields if provided
        if (profileData) {
            if (profileData.userName !== undefined)
                profile.profileData.userName = profileData.userName;

            if (profileData.profilePic !== undefined)
                profile.profileData.profilePic = profileData.profilePic;

            if (profileData.about !== undefined)
                profile.profileData.about = profileData.about;
        }

        await profile.save();
        res.status(200).json(profile);

    } catch (error) {
        console.error("MongoDB save failed:", error);
        res.status(500).json({ error: "Server error: unable to update profile" });
    }
});

router.get('/:publicKey', async (req, res) => {
    const { publicKey } = req.params;

    try {
        const profile = await Profile.findOne({ publicKey });

        if (!profile) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            userName: profile.profileData.userName || "",
            about: profile.profileData.about || "",
            profilePicUrl: profile.profileData.profilePic || ""
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;