const Expense = require("../models/Expense");

const getExpenses = async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  const expenses = await Expense.find(filter)
    .populate("category", "name")
    .populate("createdBy", "fullName")
    .sort({ date: -1 });
  return res.json(expenses);
};

const getExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id).populate("category", "name");
  if (!expense) return res.status(404).json({ message: "Expense not found." });
  return res.json(expense);
};

const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, createdBy: req.user.userId });
    return res.status(201).json(expense);
  } catch {
    return res.status(400).json({ message: "Invalid expense data." });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("category", "name");
    if (!expense) return res.status(404).json({ message: "Expense not found." });
    return res.json(expense);
  } catch {
    return res.status(400).json({ message: "Invalid data." });
  }
};

const deleteExpense = async (req, res) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);
  if (!expense) return res.status(404).json({ message: "Expense not found." });
  return res.json({ message: "Expense deleted." });
};

module.exports = { getExpenses, getExpense, createExpense, updateExpense, deleteExpense };
