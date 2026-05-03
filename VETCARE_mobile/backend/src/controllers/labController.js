const LabRequest = require("../models/LabRequest");

const getLabs = async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const labs = await LabRequest.find(filter)
    .populate("patient", "name species ownerName")
    .sort({ createdAt: -1 });
  return res.json(labs);
};

const getLab = async (req, res) => {
  const lab = await LabRequest.findById(req.params.id).populate("patient", "name species ownerName");
  if (!lab) return res.status(404).json({ message: "Lab request not found." });
  return res.json(lab);
};

const createLab = async (req, res) => {
  try {
    const lab = await LabRequest.create({ ...req.body, status: "pending" });
    const populated = await lab.populate("patient", "name species ownerName");
    return res.status(201).json(populated);
  } catch {
    return res.status(400).json({ message: "Invalid lab request data." });
  }
};

const updateLabStatus = async (req, res) => {
  const { status } = req.body;
  const lab = await LabRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!lab) return res.status(404).json({ message: "Lab request not found." });
  return res.json(lab);
};

const deleteLab = async (req, res) => {
  const lab = await LabRequest.findByIdAndDelete(req.params.id);
  if (!lab) return res.status(404).json({ message: "Lab request not found." });
  return res.json({ message: "Lab request deleted." });
};

module.exports = { getLabs, getLab, createLab, updateLabStatus, deleteLab };
