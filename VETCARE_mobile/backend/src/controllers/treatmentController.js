const Treatment = require("../models/Treatment");

const getTreatments = async (_req, res) => {
  const treatments = await Treatment.find().sort({ name: 1 });
  return res.json(treatments);
};

const getTreatment = async (req, res) => {
  const treatment = await Treatment.findById(req.params.id);
  if (!treatment) return res.status(404).json({ message: "Treatment not found." });
  return res.json(treatment);
};

const createTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.create(req.body);
    return res.status(201).json(treatment);
  } catch {
    return res.status(400).json({ message: "Invalid treatment data." });
  }
};

const updateTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!treatment) return res.status(404).json({ message: "Treatment not found." });
    return res.json(treatment);
  } catch {
    return res.status(400).json({ message: "Invalid data." });
  }
};

const deleteTreatment = async (req, res) => {
  const treatment = await Treatment.findByIdAndDelete(req.params.id);
  if (!treatment) return res.status(404).json({ message: "Treatment not found." });
  return res.json({ message: "Treatment deleted." });
};

module.exports = { getTreatments, getTreatment, createTreatment, updateTreatment, deleteTreatment };
