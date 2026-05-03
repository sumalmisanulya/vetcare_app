const axios = require("axios");

async function testLogin() {
  const url = "https://vetcare-app-4.onrender.com/api/auth/login";
  const data = {
    email: "admin@vetcare.com",
    password: "password123" // Common default
  };

  try {
    console.log("Testing login with:", data.email, data.password);
    const response = await axios.post(url, data);
    console.log("Login Success:", response.data);
  } catch (error) {
    if (error.response) {
      console.log("Login Failed:", error.response.status, error.response.data);
      // Try another common password
      if (error.response.status === 401) {
          data.password = "123456";
          console.log("Retrying with:", data.password);
          try {
              const res2 = await axios.post(url, data);
              console.log("Login Success (123456):", res2.data);
          } catch (e2) {
              console.log("Login Failed (123456):", e2.response ? e2.response.data : e2.message);
          }
      }
    } else {
      console.error("Error:", error.message);
    }
  }
}

testLogin();
