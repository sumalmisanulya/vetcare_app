require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    const users = await User.find({}, { passwordHash: 0 });
    console.log(JSON.stringify(users, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

check();
