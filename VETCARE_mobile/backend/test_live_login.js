const axios = require("axios");

const testLogin = async () => {
  try {
    const url = "https://vetcare-app-3.onrender.com/api/auth/login";
    console.log("Testing live login at:", url);
    const response = await axios.post(url, {
      email: "admin@vetcare.com",
      password: "123456"
    });
    console.log("Live Login successful!");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("Live Login failed:", error.response?.data || error.message);
  }
};

testLogin();
