const mongoose = require("mongoose");

const treatmentScheduleSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    treatment: { type: mongoose.Schema.Types.ObjectId, ref: "Treatment", required: true },
    scheduleDate: { type: Date, required: true },
    reminderDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending"
    },
    notes: { type: String, default: "" },
    notifyOnReminder: { type: Boolean, default: false },
    notifyBeforeSchedule: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TreatmentSchedule", treatmentScheduleSchema);
