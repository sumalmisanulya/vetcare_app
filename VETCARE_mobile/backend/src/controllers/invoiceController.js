const Invoice = require("../models/Invoice");
const Product = require("../models/Product");

const generateInvoiceNumber = () => `INV-${Date.now()}`;

const getInvoices = async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const invoices = await Invoice.find(filter)
    .populate("patient", "name ownerName species")
    .populate("createdBy", "fullName")
    .sort({ date: -1 });
  return res.json(invoices);
};

const getInvoice = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)
    .populate("patient", "name ownerName species ownerPhone")
    .populate("createdBy", "fullName email");
  if (!invoice) return res.status(404).json({ message: "Invoice not found." });
  return res.json(invoice);
};

const createInvoice = async (req, res) => {
  try {
    const invoiceNumber = generateInvoiceNumber();
    const invoice = await Invoice.create({ ...req.body, invoiceNumber, createdBy: req.user.userId });
    for (const item of invoice.items || []) {
      if (item.itemType === "product" && item.itemRef) {
        await Product.findByIdAndUpdate(item.itemRef, { $inc: { stockQuantity: -item.quantity } });
      }
    }
    return res.status(201).json(invoice);
  } catch {
    return res.status(400).json({ message: "Invalid invoice data." });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("patient", "name ownerName");
    if (!invoice) return res.status(404).json({ message: "Invoice not found." });
    return res.json(invoice);
  } catch {
    return res.status(400).json({ message: "Invalid data." });
  }
};

const addPayment = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return res.status(404).json({ message: "Invoice not found." });
  invoice.payments.push(req.body);
  const paid = invoice.payments.reduce((s, p) => s + p.amount, 0);
  invoice.status = paid >= invoice.grandTotal ? "paid" : "partial";
  await invoice.save();
  return res.json(invoice);
};

const deleteInvoice = async (req, res) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);
  if (!invoice) return res.status(404).json({ message: "Invoice not found." });
  return res.json({ message: "Invoice deleted." });
};

module.exports = { getInvoices, getInvoice, createInvoice, updateInvoice, addPayment, deleteInvoice };
