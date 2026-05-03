const axios = require("axios");

const testRegAndLogin = async () => {
  const email = `test_${Date.now()}@example.com`;
  const password = "password123";
  const url = "http://localhost:5000/api/auth";

  try {
    console.log("Registering:", email);
    const regRes = await axios.post(`${url}/register`, {
      fullName: "Test User",
      email: email,
      password: password,
      role: "staff"
    });
    console.log("Registration successful:", regRes.data.message);

    console.log("Logging in:", email);
    const loginRes = await axios.post(`${url}/login`, {
      email: email,
      password: password
    });
    console.log("Login successful!");
    console.log("Token:", loginRes.data.token);
  } catch (error) {
    console.error("Failed:", error.response?.data || error.message);
  }
};

testRegAndLogin();
