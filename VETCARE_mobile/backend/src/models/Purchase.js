const mongoose = require("mongoose");

const purchaseLineSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitCost: { type: Number, required: true, min: 0 },
  discountPercent: { type: Number, default: 0 },
  lineTotal: { type: Number, required: true },
  profitMargin: { type: Number, default: 0 },
  unitSellingPrice: { type: Number, default: 0 }
});

const purchasePaymentSchema = new mongoose.Schema(
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

const purchaseReturnSchema = new mongoose.Schema(
  {
    returnDate: { type: Date, default: Date.now },
    reason: { type: String, default: "" },
    totalAmount: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
  },
  { timestamps: true }
);

const purchaseSchema = new mongoose.Schema(
  {
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
    referenceNo: { type: String, default: "", trim: true },
    purchaseDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "received", "partial", "cancelled"],
      default: "pending"
    },
    totalAmount: { type: Number, default: 0 },
    discountType: { type: String, enum: ["flat", "percent"], default: "flat" },
    discountAmount: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    additionalNotes: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    items: [purchaseLineSchema],
    payments: [purchasePaymentSchema],
    returns: [purchaseReturnSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
