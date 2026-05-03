const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

const getPurchases = async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const purchases = await Purchase.find(filter)
    .populate("supplier", "name contactNumber")
    .populate("createdBy", "fullName")
    .populate("items.product", "name sku")
    .sort({ purchaseDate: -1 });
  return res.json(purchases);
};

const getPurchase = async (req, res) => {
  const purchase = await Purchase.findById(req.params.id)
    .populate("supplier", "name contactNumber email address")
    .populate("createdBy", "fullName")
    .populate("items.product", "name sku unit");
  if (!purchase) return res.status(404).json({ message: "Purchase not found." });
  return res.json(purchase);
};

const createPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.create({ ...req.body, createdBy: req.user.userId });
    if (purchase.status === "received" && purchase.items?.length) {
      for (const item of purchase.items) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stockQuantity: item.quantity } });
      }
    }
    return res.status(201).json(purchase);
  } catch {
    return res.status(400).json({ message: "Invalid purchase data." });
  }
};

const updatePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("supplier", "name")
      .populate("items.product", "name sku");
    if (!purchase) return res.status(404).json({ message: "Purchase not found." });
    return res.json(purchase);
  } catch {
    return res.status(400).json({ message: "Invalid data." });
  }
};

const addPayment = async (req, res) => {
  const purchase = await Purchase.findById(req.params.id);
  if (!purchase) return res.status(404).json({ message: "Purchase not found." });
  purchase.payments.push(req.body);
  await purchase.save();
  return res.json(purchase);
};

const addReturn = async (req, res) => {
  const purchase = await Purchase.findById(req.params.id);
  if (!purchase) return res.status(404).json({ message: "Purchase not found." });
  purchase.returns.push(req.body);
  await purchase.save();
  return res.json(purchase);
};

const deletePurchase = async (req, res) => {
  const purchase = await Purchase.findByIdAndDelete(req.params.id);
  if (!purchase) return res.status(404).json({ message: "Purchase not found." });
  return res.json({ message: "Purchase deleted." });
};

module.exports = { getPurchases, getPurchase, createPurchase, updatePurchase, addPayment, addReturn, deletePurchase };
