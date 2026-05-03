const LabRequest = require("../models/LabRequest");
const Patient = require("../models/Patient");
const { sendSMS } = require("../services/smsService");

const getLabs = async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const labs = await LabRequest.find(filter)
    .populate("patient", "name species ownerName ownerPhone")
    .sort({ createdAt: -1 });
  return res.json(labs);
};

const getLab = async (req, res) => {
  const lab = await LabRequest.findById(req.params.id).populate("patient", "name species ownerName ownerPhone");
  if (!lab) return res.status(404).json({ message: "Lab request not found." });
  return res.json(lab);
};

const createLab = async (req, res) => {
  try {
    const lab = await LabRequest.create({ ...req.body, status: "pending" });
    const populated = await lab.populate("patient", "name species ownerName ownerPhone");
    
    // Send SMS on creation
    if (populated.patient && populated.patient.ownerPhone) {
      const msg = `Lashura VetCare: A new lab request (${populated.type}) has been created for ${populated.patient.name}. Status: Pending.`;
      await sendSMS(populated.patient.ownerPhone, msg);
    }

    return res.status(201).json(populated);
  } catch (error) {
    console.error("Create lab error:", error);
    return res.status(400).json({ message: "Invalid lab request data." });
  }
};

const updateLabStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const lab = await LabRequest.findByIdAndUpdate(req.params.id, { status }, { new: true })
      .populate("patient", "name species ownerName ownerPhone");
    
    if (!lab) return res.status(404).json({ message: "Lab request not found." });

    // Send SMS on status change
    if (lab.patient && lab.patient.ownerPhone) {
      let msg = "";
      if (status === "completed") {
        msg = `Lashura VetCare: ${lab.patient.name}'s lab report is ready! Please visit the clinic to collect the report. Thank you.`;
      } else {
        msg = `Lashura VetCare: The status of ${lab.patient.name}'s lab request has been updated to: ${status.toUpperCase()}.`;
      }
      await sendSMS(lab.patient.ownerPhone, msg);
    }

    return res.json(lab);
  } catch (error) {
    console.error("Update lab status error:", error);
    return res.status(400).json({ message: "Error updating lab status." });
  }
};

const deleteLab = async (req, res) => {
  const lab = await LabRequest.findByIdAndDelete(req.params.id);
  if (!lab) return res.status(404).json({ message: "Lab request not found." });
  return res.json({ message: "Lab request deleted." });
};

module.exports = { getLabs, getLab, createLab, updateLabStatus, deleteLab };
