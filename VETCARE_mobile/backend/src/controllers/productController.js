const Product = require("../models/Product");

const getProducts = async (req, res) => {
  const search = req.query.search || "";
  const query = search
    ? { $or: [{ name: new RegExp(search, "i") }, { sku: new RegExp(search, "i") }] }
    : {};
  const products = await Product.find(query)
    .populate("category", "name")
    .populate("supplier", "name")
    .sort({ name: 1 });
  return res.json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name")
    .populate("supplier", "name");
  if (!product) return res.status(404).json({ message: "Product not found." });
  return res.json(product);
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch {
    return res.status(400).json({ message: "Invalid product data." });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: "Product not found." });
    return res.json(product);
  } catch {
    return res.status(400).json({ message: "Invalid data." });
  }
};

const updateStock = async (req, res) => {
  const { quantity, operation } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  if (operation === "add") {
    product.stockQuantity += Number(quantity);
  } else if (operation === "subtract") {
    product.stockQuantity = Math.max(0, product.stockQuantity - Number(quantity));
  } else {
    product.stockQuantity = Number(quantity);
  }
  await product.save();
  return res.json(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  return res.json({ message: "Product deleted." });
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, updateStock, deleteProduct };
