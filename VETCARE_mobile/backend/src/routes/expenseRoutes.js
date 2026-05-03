const express = require("express");
const { getExpenses, getExpense, createExpense, updateExpense, deleteExpense } = require("../controllers/expenseController");
const { getExpenseCategories, createExpenseCategory, updateExpenseCategory, deleteExpenseCategory } = require("../controllers/expenseCategoryController");

const router = express.Router();

router.get("/categories", getExpenseCategories);
router.post("/categories", createExpenseCategory);
router.put("/categories/:id", updateExpenseCategory);
router.delete("/categories/:id", deleteExpenseCategory);

router.get("/", getExpenses);
router.get("/:id", getExpense);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
