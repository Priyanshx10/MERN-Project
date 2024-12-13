import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../../models/User.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Model Test", () => {
  it("should create & save user successfully", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };
    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).not.toBe(userData.password); // Password should be hashed
  });

  it("should fail to create user with duplicate email", async () => {
    const userData = {
      username: "testuser2",
      email: "test@example.com", // Same email as previous test
      password: "password123",
    };
    const validUser = new User(userData);

    await expect(validUser.save()).rejects.toThrow(
      mongoose.Error.ValidationError
    );
  });
});
