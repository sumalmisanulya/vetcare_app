const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema({
  itemType: { type: String, enum: ["treatment", "product", "lab", "other"], default: "other" },
  itemRef: { type: mongoose.Schema.Types.ObjectId, default: null },
  itemName: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  totalPrice: { type: Number, required: true, min: 0 }
});

const invoicePaymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "bank_transfer", "cheque"],
      default: "cash"
    },
    note: { type: String, default: "" }
  },
  { timestamps: true }
);

const invoiceSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", default: null },
    invoiceNumber: { type: String, required: true, unique: true, trim: true },
    date: { type: Date, default: Date.now },
    customerName: { type: String, default: "", trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    totalAmount: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "bank_transfer", "cheque", "mixed"],
      default: "cash"
    },
    status: {
      type: String,
      enum: ["pending", "paid", "partial", "cancelled"],
      default: "pending"
    },
    items: [invoiceItemSchema],
    payments: [invoicePaymentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
