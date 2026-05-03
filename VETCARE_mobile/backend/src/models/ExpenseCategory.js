const mongoose = require("mongoose");

const expenseCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExpenseCategory", expenseCategorySchema);
