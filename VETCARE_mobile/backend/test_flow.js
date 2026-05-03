const axios = require("axios");

async function testFullFlow() {
  const baseUrl = "http://localhost:5000/api/auth";
  const email = `test_${Date.now()}@example.com`;
  const password = "password123";

  try {
    console.log("1. Registering user:", email);
    const regRes = await axios.post(`${baseUrl}/register`, {
      fullName: "Test User",
      email: email,
      password: password,
      role: "staff"
    });
    console.log("Registration Success:", regRes.data);

    console.log("2. Logging in with new user...");
    const loginRes = await axios.post(`${baseUrl}/login`, {
      email: email,
      password: password
    });
    console.log("Login Success:", loginRes.data);

  } catch (error) {
    console.error("Flow Failed:", error.response ? error.response.data : error.message);
  }
}

testFullFlow();
