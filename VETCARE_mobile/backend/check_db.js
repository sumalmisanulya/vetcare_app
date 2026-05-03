require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");

const check = async () => {
  try {
    console.log("Connecting to:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log("Connected successfully!");

    const users = await User.find({}, { passwordHash: 0 });
    console.log("Found users:", users.length);
    console.log(JSON.stringify(users, null, 2));

    process.exit(0);
  } catch (error) {
    console.error("Connection failed:", error.message);
    process.exit(1);
  }
};

check();
