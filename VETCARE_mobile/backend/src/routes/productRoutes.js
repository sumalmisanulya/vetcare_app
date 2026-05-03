const express = require("express");
const { getProducts, getProduct, createProduct, updateProduct, updateStock, deleteProduct } = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.post("/:id/stock", updateStock);
router.delete("/:id", deleteProduct);

module.exports = router;
