const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "ExpenseCategory", default: null },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
    referenceNo: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "bank_transfer", "cheque"],
      default: "cash"
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
