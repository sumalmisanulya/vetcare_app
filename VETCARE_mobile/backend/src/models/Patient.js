const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    petId: { type: String, default: "", trim: true },
    name: { type: String, required: true, trim: true },
    species: { type: String, required: true, trim: true },
    breed: { type: String, default: "", trim: true },
    bloodGroup: { type: String, default: "", trim: true },
    ownerName: { type: String, required: true, trim: true },
    ownerPhone: { type: String, default: "", trim: true },
    ownerAddress: { type: String, default: "", trim: true },
    notes: { type: String, default: "" },
    dob: { type: Date, default: null },
    gender: { type: String, enum: ["male", "female", "unknown"], default: "unknown" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
