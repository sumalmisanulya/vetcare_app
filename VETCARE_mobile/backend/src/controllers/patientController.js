const Patient = require("../models/Patient");

const getPatients = async (req, res) => {
  const search = req.query.search || "";
  const query = search
    ? { $or: [{ name: new RegExp(search, "i") }, { ownerName: new RegExp(search, "i") }, { petId: new RegExp(search, "i") }] }
    : {};
  const patients = await Patient.find(query).sort({ createdAt: -1 });
  return res.json(patients);
};

const getPatient = async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ message: "Patient not found." });
  return res.json(patient);
};

const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    return res.status(201).json(patient);
  } catch {
    return res.status(400).json({ message: "Invalid patient data." });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!patient) return res.status(404).json({ message: "Patient not found." });
    return res.json(patient);
  } catch {
    return res.status(400).json({ message: "Invalid patient data." });
  }
};

const deletePatient = async (req, res) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);
  if (!patient) return res.status(404).json({ message: "Patient not found." });
  return res.json({ message: "Patient deleted." });
};

module.exports = { getPatients, getPatient, createPatient, updatePatient, deletePatient };
