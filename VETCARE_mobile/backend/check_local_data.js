const axios = require("axios");

async function checkLocalData() {
  const baseUrl = "http://localhost:5000/api";
  const loginData = { email: "admin@vetcare.com", password: "123456" };

  try {
    console.log("1. Logging in...");
    const loginRes = await axios.post(`${baseUrl}/auth/login`, loginData);
    const token = loginRes.data.token;
    console.log("Login Success.");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("2. Fetching dashboard...");
    const dashRes = await axios.get(`${baseUrl}/dashboard`, config);
    console.log("Dashboard stats:", JSON.stringify(dashRes.data.stats, null, 2));

  } catch (error) {
    console.error("Data Fetch Failed:", error.response ? error.response.data : error.message);
  }
}

checkLocalData();
