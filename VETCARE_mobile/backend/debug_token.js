const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function debugToken() {
  const baseUrl = "https://vetcare-app-4.onrender.com/api";
  const loginData = { email: "admin@vetcare.com", password: "123456" };

  try {
    const loginRes = await axios.post(`${baseUrl}/auth/login`, loginData);
    const token = loginRes.data.token;
    console.log("Token received.");

    // Try to decode locally with the local secret
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded locally with local secret:", decoded);
    } catch (e) {
      console.log("Failed to decode locally with local secret:", e.message);
      // Try with undefined
      try {
          const decoded2 = jwt.decode(token);
          console.log("Token Payload (decoded without secret):", decoded2);
      } catch (e2) {}
    }

  } catch (error) {
    console.error("Login Failed:", error.message);
  }
}

debugToken();
