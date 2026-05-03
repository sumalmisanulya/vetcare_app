const Appointment = require("../models/Appointment");

const getAppointments = async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const appointments = await Appointment.find(filter)
    .populate("patient", "name species ownerName ownerPhone")
    .populate("user", "fullName email role")
    .sort({ appointmentDate: 1 });
  return res.json(appointments);
};

const getAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate("patient", "name species ownerName ownerPhone")
    .populate("user", "fullName email role");
  if (!appointment) return res.status(404).json({ message: "Appointment not found." });
  return res.json(appointment);
};

const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({ ...req.body, user: req.user.userId });
    const populated = await appointment.populate("patient", "name species ownerName");
    return res.status(201).json(populated);
  } catch {
    return res.status(400).json({ message: "Invalid appointment data." });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("patient", "name species ownerName");
    if (!appointment) return res.status(404).json({ message: "Appointment not found." });
    return res.json(appointment);
  } catch {
    return res.status(400).json({ message: "Invalid data." });
  }
};

const completeAppointment = async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: "completed" }, { new: true });
  if (!appointment) return res.status(404).json({ message: "Appointment not found." });
  return res.json(appointment);
};

const deleteAppointment = async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) return res.status(404).json({ message: "Appointment not found." });
  return res.json({ message: "Appointment deleted." });
};

module.exports = { getAppointments, getAppointment, createAppointment, updateAppointment, completeAppointment, deleteAppointment };
