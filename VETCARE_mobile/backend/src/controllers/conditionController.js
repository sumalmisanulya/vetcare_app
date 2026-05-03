const PatientCondition = require("../models/PatientCondition");

const getConditions = async (req, res) => {
  const conditions = await PatientCondition.find({ patient: req.params.patientId }).sort({ createdAt: -1 });
  return res.json(conditions);
};

const createCondition = async (req, res) => {
  try {
    const condition = await PatientCondition.create({ ...req.body, patient: req.params.patientId });
    return res.status(201).json(condition);
  } catch {
    return res.status(400).json({ message: "Invalid condition data." });
  }
};

const updateCondition = async (req, res) => {
  try {
    const condition = await PatientCondition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!condition) return res.status(404).json({ message: "Condition not found." });
    return res.json(condition);
  } catch {
    return res.status(400).json({ message: "Invalid data." });
  }
};

const deleteCondition = async (req, res) => {
  const condition = await PatientCondition.findByIdAndDelete(req.params.id);
  if (!condition) return res.status(404).json({ message: "Condition not found." });
  return res.json({ message: "Condition deleted." });
};

module.exports = { getConditions, createCondition, updateCondition, deleteCondition };
