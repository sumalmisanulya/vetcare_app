const express = require("express");
const { getSchedules, getSchedule, createSchedule, updateSchedule, completeSchedule, deleteSchedule } = require("../controllers/scheduleController");

const router = express.Router();

router.get("/", getSchedules);
router.get("/:id", getSchedule);
router.post("/", createSchedule);
router.put("/:id", updateSchedule);
router.post("/:id/complete", completeSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;
