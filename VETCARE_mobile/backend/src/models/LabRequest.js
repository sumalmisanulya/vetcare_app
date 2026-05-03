const mongoose = require("mongoose");

const labRequestSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice", default: null },
    type: { type: String, required: true, trim: true },
    testType: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "cancelled"],
      default: "pending"
    },
    notes: { type: String, default: "" },
    reportFile: { type: String, default: "" },
    labName: { type: String, default: "", trim: true },
    price: { type: Number, default: 0, min: 0 },
    reportFolder: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LabRequest", labRequestSchema);
