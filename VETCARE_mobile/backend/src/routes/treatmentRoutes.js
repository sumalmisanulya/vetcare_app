const express = require("express");
const { getTreatments, getTreatment, createTreatment, updateTreatment, deleteTreatment } = require("../controllers/treatmentController");

const router = express.Router();

router.get("/", getTreatments);
router.get("/:id", getTreatment);
router.post("/", createTreatment);
router.put("/:id", updateTreatment);
router.delete("/:id", deleteTreatment);

module.exports = router;
