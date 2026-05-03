const ExpenseCategory = require("../models/ExpenseCategory");

const getExpenseCategories = async (_req, res) => {
  const categories = await ExpenseCategory.find().sort({ name: 1 });
  return res.json(categories);
};

const createExpenseCategory = async (req, res) => {
  try {
    const category = await ExpenseCategory.create(req.body);
    return res.status(201).json(category);
  } catch {
    return res.status(400).json({ message: "Invalid data." });
  }
};

const updateExpenseCategory = async (req, res) => {
  const category = await ExpenseCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!category) return res.status(404).json({ message: "Category not found." });
  return res.json(category);
};

const deleteExpenseCategory = async (req, res) => {
  const category = await ExpenseCategory.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found." });
  return res.json({ message: "Category deleted." });
};

module.exports = { getExpenseCategories, createExpenseCategory, updateExpenseCategory, deleteExpenseCategory };
