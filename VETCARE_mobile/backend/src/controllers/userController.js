const bcrypt = require("bcryptjs");
const User = require("../models/User");

const getUsers = async (_req, res) => {
  const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });
  return res.json(users);
};

const createUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already in use." });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, passwordHash, role });
    return res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email, role: user.role });
  } catch {
    return res.status(400).json({ message: "Failed to create user." });
  }
};

const updateUser = async (req, res) => {
  try {
    const { fullName, email, role, password } = req.body;
    const update = { fullName, email, role };
    if (password) update.passwordHash = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.json(user);
  } catch {
    return res.status(400).json({ message: "Failed to update user." });
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found." });
  return res.json({ message: "User deleted." });
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
