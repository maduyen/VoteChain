const mongoose = require("mongoose");

const uri = "mongodb+srv://shzhang0907:Lushpurple83@votechain.j3kpu.mongodb.net/myDatabase?retryWrites=true&w=majority";

(async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB Atlas successfully!");

    const Poll = mongoose.model("Poll", new mongoose.Schema({ name: String }));
    await Poll.create({ name: "Test Poll" });
    console.log("Test poll inserted successfully!");

    const polls = await Poll.find();
    console.log("Polls in the database:", polls);

    await mongoose.connection.close();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();
