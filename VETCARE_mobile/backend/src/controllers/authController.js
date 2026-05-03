const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Full name, email, and password are required." });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: trimmedEmail });
    if (existing) {
      return res.status(409).json({ message: "Email is already in use." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email: trimmedEmail, passwordHash, role });

    console.log(`[Auth] User registered: ${trimmedEmail} (${user.role})`);
    return res.status(201).json({
      message: "User registered successfully.",
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("[Auth] Registration error:", error);
    return res.status(500).json({ message: "Failed to register user." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const trimmedEmail = email.trim();
    const user = await User.findOne({ email: trimmedEmail });
    
    if (!user) {
      console.log(`[Auth] Login failed: User not found for email ${trimmedEmail}`);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      console.log(`[Auth] Login failed: Incorrect password for email ${trimmedEmail}`);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("[Auth] FATAL: JWT_SECRET is not defined in environment variables.");
      return res.status(500).json({ message: "Server configuration error." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log(`[Auth] Login successful: ${trimmedEmail} (${user.role})`);
    return res.json({
      message: "Login successful.",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("[Auth] Login error:", error);
    return res.status(500).json({ message: "Failed to login. Please try again later." });
  }
};

module.exports = { register, login };
