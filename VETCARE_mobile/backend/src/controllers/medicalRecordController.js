const MedicalRecord = require("../models/MedicalRecord");

const getRecords = async (req, res) => {
  const records = await MedicalRecord.find({ patient: req.params.patientId }).sort({ createdAt: -1 });
  return res.json(records);
};

const createRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.create({ ...req.body, patient: req.params.patientId });
    return res.status(201).json(record);
  } catch {
    return res.status(400).json({ message: "Invalid record data." });
  }
};

const deleteRecord = async (req, res) => {
  const record = await MedicalRecord.findByIdAndDelete(req.params.id);
  if (!record) return res.status(404).json({ message: "Record not found." });
  return res.json({ message: "Record deleted." });
};

module.exports = { getRecords, createRecord, deleteRecord };
