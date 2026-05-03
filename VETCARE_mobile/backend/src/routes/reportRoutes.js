const express = require("express");
const { financialReport, stockReport, treatmentReport, doctorReport, profitLossReport, purchasesReport, trendingReport } = require("../controllers/reportController");

const router = express.Router();

router.get("/financial", financialReport);
router.get("/stock", stockReport);
router.get("/treatments", treatmentReport);
router.get("/doctors", doctorReport);
router.get("/profit-loss", profitLossReport);
router.get("/purchases", purchasesReport);
router.get("/trending", trendingReport);

module.exports = router;
