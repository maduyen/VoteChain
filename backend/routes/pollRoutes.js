const express = require("express");
const multer = require("multer");

// Correct import for ResVaultSDK
const ResVaultSDK = require("resvault-sdk").default;

let sdk;

// Ensure ResVaultSDK is only used in the browser
try {
  sdk = new ResVaultSDK();
} catch (error) {
  console.error("ResVaultSDK can only be used in a browser environment.");
}

const router = express.Router();

// Multer setup for optional file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${req.body.topic || "poll"}-${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create Poll Route
router.post("/polls", upload.single("image"), async (req, res) => {
  try {
    if (!sdk) {
      return res.status(500).json({ error: "ResVaultSDK is not initialized." });
    }

    const { topic, description, options, startTime, endTime } = req.body;

    // Validate input
    if (!topic || !options || options.length < 2) {
      return res.status(400).json({ error: "Invalid poll data." });
    }

    const poll = {
      topic,
      description: description || "",
      options,
      startTime,
      endTime,
      createdAt: new Date(),
    };

    const resilientData = {
      type: "commit",
      direction: "commit",
      data: poll,
    };

    sdk.sendMessage(resilientData);
    res.status(201).json({ message: "Poll created successfully!" });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ error: "Failed to create poll." });
  }
});

module.exports = router;
