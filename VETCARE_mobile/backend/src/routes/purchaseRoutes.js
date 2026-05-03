const express = require("express");
const { getPurchases, getPurchase, createPurchase, updatePurchase, addPayment, addReturn, deletePurchase } = require("../controllers/purchaseController");

const router = express.Router();

router.get("/", getPurchases);
router.get("/:id", getPurchase);
router.post("/", createPurchase);
router.put("/:id", updatePurchase);
router.post("/:id/payments", addPayment);
router.post("/:id/returns", addReturn);
router.delete("/:id", deletePurchase);

module.exports = router;
