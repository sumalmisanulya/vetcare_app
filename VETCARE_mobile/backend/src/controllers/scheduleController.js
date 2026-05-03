const TreatmentSchedule = require("../models/TreatmentSchedule");

const getSchedules = async (req, res) => {
  const filter = {};
  if (req.query.patient) filter.patient = req.query.patient;
  if (req.query.status) filter.status = req.query.status;
  const schedules = await TreatmentSchedule.find(filter)
    .populate("patient", "name species ownerName")
    .populate("treatment", "name price")
    .sort({ scheduleDate: 1 });
  return res.json(schedules);
};

const getSchedule = async (req, res) => {
  const schedule = await TreatmentSchedule.findById(req.params.id)
    .populate("patient", "name species ownerName")
    .populate("treatment", "name price description");
  if (!schedule) return res.status(404).json({ message: "Schedule not found." });
  return res.json(schedule);
};

const createSchedule = async (req, res) => {
  try {
    const schedule = await TreatmentSchedule.create(req.body);
    const populated = await schedule.populate([
      { path: "patient", select: "name species ownerName" },
      { path: "treatment", select: "name price" }
    ]);
    return res.status(201).json(populated);
  } catch {
    return res.status(400).json({ message: "Invalid schedule data." });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const schedule = await TreatmentSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("patient", "name species ownerName")
      .populate("treatment", "name price");
    if (!schedule) return res.status(404).json({ message: "Schedule not found." });
    return res.json(schedule);
  } catch {
    return res.status(400).json({ message: "Invalid data." });
  }
};

const completeSchedule = async (req, res) => {
  const schedule = await TreatmentSchedule.findByIdAndUpdate(req.params.id, { status: "completed" }, { new: true });
  if (!schedule) return res.status(404).json({ message: "Schedule not found." });
  return res.json(schedule);
};

const deleteSchedule = async (req, res) => {
  const schedule = await TreatmentSchedule.findByIdAndDelete(req.params.id);
  if (!schedule) return res.status(404).json({ message: "Schedule not found." });
  return res.json({ message: "Schedule deleted." });
};

module.exports = { getSchedules, getSchedule, createSchedule, updateSchedule, completeSchedule, deleteSchedule };
