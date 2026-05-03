const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, default: "", trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", default: null },
    costPrice: { type: Number, default: 0, min: 0 },
    sellingPrice: { type: Number, default: 0, min: 0 },
    stockQuantity: { type: Number, default: 0, min: 0 },
    reorderLevel: { type: Number, default: 0, min: 0 },
    unit: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    expiryDate: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
