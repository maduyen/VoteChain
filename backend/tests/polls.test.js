require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server"); // Import the Express app
const Poll = require("../models/Poll"); // MongoDB model

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Poll API Tests", () => {
  beforeEach(async () => {
    await Poll.deleteMany({});
    await Poll.create({
      transactionId: "123",
      publicKey: "testPublicKey",
      pollData: {
        topic: "Test Poll",
        description: "This is a test poll",
        options: ["Option 1", "Option 2"],
        startTime: new Date(),
        endTime: new Date(),
        createdAt: new Date(),
      },
    });
  });

  it("should fetch all polls", async () => {
    const res = await request(app).get("/api/polls").query({ page: 1, limit: 10 });
    expect(res.statusCode).toBe(200);
    expect(res.body.polls.length).toBeGreaterThan(0);
  });

  it("should fetch a poll by transaction ID", async () => {
    const res = await request(app).get("/api/polls/123");
    expect(res.statusCode).toBe(200);
    expect(res.body.pollData.topic).toBe("Test Poll");
  });

  it("should fetch polls by public key", async () => {
    const res = await request(app).get("/api/polls/user/testPublicKey");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
