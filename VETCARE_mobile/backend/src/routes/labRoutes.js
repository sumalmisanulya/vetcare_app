const express = require("express");
const { getLabs, getLab, createLab, updateLabStatus, deleteLab } = require("../controllers/labController");

const router = express.Router();

router.get("/", getLabs);
router.get("/:id", getLab);
router.post("/", createLab);
router.post("/:id/status", updateLabStatus);
router.delete("/:id", deleteLab);

module.exports = router;
