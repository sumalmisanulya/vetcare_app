const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing in environment variables.");
  }

  await mongoose.connect(uri, { family: 4 });
  const dbName = mongoose.connection.name;
  const host = mongoose.connection.host;
  console.log(`[DB] Connected to MongoDB host: ${host}, database: ${dbName}`);
};

module.exports = connectDB;
