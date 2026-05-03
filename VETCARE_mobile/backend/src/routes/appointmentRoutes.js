const express = require("express");
const {
  getAppointments, getAppointment, createAppointment,
  updateAppointment, completeAppointment, deleteAppointment
} = require("../controllers/appointmentController");

const router = express.Router();

router.get("/", getAppointments);
router.get("/:id", getAppointment);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.post("/:id/complete", completeAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
