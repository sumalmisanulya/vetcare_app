const mongoose = require("mongoose");
require("dotenv").config();

async function testQuery() {
  await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
  const userSchema = new mongoose.Schema({
    email: { type: String, lowercase: true }
  });
  const User = mongoose.model("UserTest", userSchema, "users");
  
  const emails = ["admin@vetcare.com", "Admin@vetcare.com", "ADMIN@VETCARE.COM"];
  for (const e of emails) {
    const u = await User.findOne({ email: e });
    console.log(`Query for ${e}: ${u ? "Found" : "Not Found"}`);
  }
  process.exit(0);
}

testQuery();
