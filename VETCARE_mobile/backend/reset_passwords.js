require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");

const reset = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log("Connected to MongoDB");

    const password = "123456";
    const passwordHash = await bcrypt.hash(password, 10);

    const users = ["admin@vetcare.com", "doctor@vetcare.com", "staff@vetcare.com"];

    for (const email of users) {
      const result = await User.updateOne(
        { email },
        { $set: { passwordHash } }
      );
      if (result.matchedCount > 0) {
        console.log(`Updated password for ${email}`);
      } else {
        console.log(`User ${email} not found, creating...`);
        let fullName = "VetCare User";
        let role = "staff";
        if (email.includes("admin")) { fullName = "VetCare Admin"; role = "admin"; }
        else if (email.includes("doctor")) { fullName = "Dr. Silva"; role = "doctor"; }
        
        await User.create({ fullName, email, passwordHash, role });
        console.log(`Created user ${email}`);
      }
    }

    console.log("All passwords reset to: 123456");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

reset();
