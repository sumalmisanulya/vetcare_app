const axios = require("axios");

const testLogin = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email: "admin@vetcare.com",
      password: "123456"
    });
    console.log("Login successful!");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
  }
};

testLogin();
