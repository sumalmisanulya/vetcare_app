const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing in environment variables.");
  }

  const maskedUri = uri.replace(/\/\/.*@/, "//****:****@");
  console.log(`Connecting to MongoDB: ${maskedUri}`);

  await mongoose.connect(uri, { family: 4 });
  console.log("MongoDB connected successfully");
};

module.exports = connectDB;
