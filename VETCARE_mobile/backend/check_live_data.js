const axios = require("axios");

async function checkLiveData() {
  const baseUrl = "https://vetcare-app-4.onrender.com/api";
  const loginData = { email: "admin@vetcare.com", password: "123456" };

  try {
    console.log("1. Logging in...");
    const loginRes = await axios.post(`${baseUrl}/auth/login`, loginData);
    const token = loginRes.data.token;
    console.log("Login Success.");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("2. Fetching dashboard...");
    const dashRes = await axios.get(`${baseUrl}/dashboard`, config);
    console.log("Dashboard:", JSON.stringify(dashRes.data, null, 2));

    console.log("3. Fetching patients...");
    const patientsRes = await axios.get(`${baseUrl}/patients`, config);
    console.log("Patients found:", patientsRes.data.length);

  } catch (error) {
    console.error("Data Fetch Failed:", error.response ? error.response.data : error.message);
  }
}

checkLiveData();
