const mongoose = require("mongoose");
require("dotenv").config();

async function checkDB() {
  try {
    console.log("Connecting to:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log("Connected to MongoDB");

    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const collInfo of collections) {
      const count = await mongoose.connection.db.collection(collInfo.name).countDocuments();
      console.log(`Collection: ${collInfo.name.padEnd(20)} Count: ${count}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error checking DB:", error);
    process.exit(1);
  }
}

checkDB();
