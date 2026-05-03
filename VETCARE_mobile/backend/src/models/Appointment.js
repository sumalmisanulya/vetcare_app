const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, default: "" },
    queueNumber: { type: Number, default: 0 },
    concern: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
