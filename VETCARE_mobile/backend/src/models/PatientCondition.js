const mongoose = require("mongoose");

const patientConditionSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    condition: { type: String, required: true, trim: true },
    diagnosedDate: { type: Date, default: null },
    status: { type: String, enum: ["active", "resolved", "monitoring"], default: "active" },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientCondition", patientConditionSchema);
