const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Invoice = require("../models/Invoice");
const Expense = require("../models/Expense");
const Product = require("../models/Product");
const TreatmentSchedule = require("../models/TreatmentSchedule");
const LabRequest = require("../models/LabRequest");
const Purchase = require("../models/Purchase");

const getDashboard = async (_req, res) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalPatients,
    totalAppointments,
    pendingAppointments,
    todayAppointments,
    totalProducts,
    lowStockProducts,
    pendingLabs,
    monthlyInvoices,
    monthlyExpenses,
    recentAppointments,
    pendingSchedules
  ] = await Promise.all([
    Patient.countDocuments(),
    Appointment.countDocuments(),
    Appointment.countDocuments({ status: "pending" }),
    Appointment.countDocuments({ appointmentDate: { $gte: startOfToday } }),
    Product.countDocuments(),
    Product.countDocuments({ $expr: { $lte: ["$stockQuantity", "$reorderLevel"] } }),
    LabRequest.countDocuments({ status: { $in: ["pending", "in_progress"] } }),
    Invoice.aggregate([
      { $match: { date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$grandTotal" }, count: { $sum: 1 } } }
    ]),
    Expense.aggregate([
      { $match: { date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]),
    Appointment.find({ status: "pending" })
      .populate("patient", "name species ownerName")
      .sort({ appointmentDate: 1 })
      .limit(5),
    TreatmentSchedule.find({ status: "pending" })
      .populate("patient", "name")
      .populate("treatment", "name")
      .sort({ scheduleDate: 1 })
      .limit(5)
  ]);

  const monthRevenue = monthlyInvoices[0]?.total || 0;
  const monthInvoiceCount = monthlyInvoices[0]?.count || 0;
  const monthExpenseTotal = monthlyExpenses[0]?.total || 0;

  return res.json({
    stats: {
      totalPatients,
      totalAppointments,
      pendingAppointments,
      todayAppointments,
      totalProducts,
      lowStockProducts,
      pendingLabs,
      monthRevenue,
      monthInvoiceCount,
      monthExpenseTotal,
      netProfit: monthRevenue - monthExpenseTotal
    },
    recentAppointments,
    pendingSchedules
  });
};

module.exports = { getDashboard };
