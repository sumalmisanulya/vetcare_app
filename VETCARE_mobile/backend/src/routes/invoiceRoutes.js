const express = require("express");
const { getInvoices, getInvoice, createInvoice, updateInvoice, addPayment, deleteInvoice } = require("../controllers/invoiceController");

const router = express.Router();

router.get("/", getInvoices);
router.get("/:id", getInvoice);
router.post("/", createInvoice);
router.put("/:id", updateInvoice);
router.post("/:id/payments", addPayment);
router.delete("/:id", deleteInvoice);

module.exports = router;
