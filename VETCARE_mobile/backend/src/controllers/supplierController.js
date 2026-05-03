const Supplier = require("../models/Supplier");

const getSuppliers = async (_req, res) => {
  const suppliers = await Supplier.find().sort({ name: 1 });
  return res.json(suppliers);
};

const getSupplier = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) return res.status(404).json({ message: "Supplier not found." });
  return res.json(supplier);
};

const createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    return res.status(201).json(supplier);
  } catch {
    return res.status(400).json({ message: "Invalid supplier data." });
  }
};

const updateSupplier = async (req, res) => {
  const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!supplier) return res.status(404).json({ message: "Supplier not found." });
  return res.json(supplier);
};

const deleteSupplier = async (req, res) => {
  const supplier = await Supplier.findByIdAndDelete(req.params.id);
  if (!supplier) return res.status(404).json({ message: "Supplier not found." });
  return res.json({ message: "Supplier deleted." });
};

module.exports = { getSuppliers, getSupplier, createSupplier, updateSupplier, deleteSupplier };
