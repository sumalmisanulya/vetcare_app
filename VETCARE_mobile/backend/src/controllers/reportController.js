const Invoice = require("../models/Invoice");
const Expense = require("../models/Expense");
const Product = require("../models/Product");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const TreatmentSchedule = require("../models/TreatmentSchedule");
const Purchase = require("../models/Purchase");
const Treatment = require("../models/Treatment");

const parseRange = (req) => {
  const from = req.query.from ? new Date(req.query.from) : new Date(new Date().setDate(1));
  const to = req.query.to ? new Date(req.query.to) : new Date();
  to.setHours(23, 59, 59, 999);
  return { from, to };
};

const financialReport = async (req, res) => {
  const { from, to } = parseRange(req);
  const [invoices, expenses] = await Promise.all([
    Invoice.find({ date: { $gte: from, $lte: to } }).populate("patient", "name"),
    Expense.find({ date: { $gte: from, $lte: to } }).populate("category", "name")
  ]);
  const totalRevenue = invoices.reduce((s, i) => s + i.grandTotal, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  return res.json({ from, to, totalRevenue, totalExpenses, netProfit: totalRevenue - totalExpenses, invoices, expenses });
};

const stockReport = async (_req, res) => {
  const products = await Product.find()
    .populate("category", "name")
    .populate("supplier", "name")
    .sort({ stockQuantity: 1 });
  const lowStock = products.filter(p => p.stockQuantity <= p.reorderLevel);
  return res.json({ total: products.length, lowStockCount: lowStock.length, lowStock, products });
};

const treatmentReport = async (req, res) => {
  const { from, to } = parseRange(req);
  const schedules = await TreatmentSchedule.find({ scheduleDate: { $gte: from, $lte: to } })
    .populate("patient", "name ownerName")
    .populate("treatment", "name price")
    .sort({ scheduleDate: -1 });
  return res.json({ from, to, total: schedules.length, schedules });
};

const doctorReport = async (req, res) => {
  const { from, to } = parseRange(req);
  const appointments = await Appointment.find({ appointmentDate: { $gte: from, $lte: to } })
    .populate("patient", "name species ownerName")
    .populate("user", "fullName")
    .sort({ appointmentDate: -1 });
  const byDoctor = {};
  for (const a of appointments) {
    const name = a.user?.fullName || "Unassigned";
    if (!byDoctor[name]) byDoctor[name] = 0;
    byDoctor[name]++;
  }
  return res.json({ from, to, total: appointments.length, byDoctor, appointments });
};

const profitLossReport = async (req, res) => {
  const { from, to } = parseRange(req);
  const monthlyData = await Invoice.aggregate([
    { $match: { date: { $gte: from, $lte: to } } },
    { $group: { _id: { y: { $year: "$date" }, m: { $month: "$date" } }, revenue: { $sum: "$grandTotal" }, count: { $sum: 1 } } },
    { $sort: { "_id.y": 1, "_id.m": 1 } }
  ]);
  const expenseData = await Expense.aggregate([
    { $match: { date: { $gte: from, $lte: to } } },
    { $group: { _id: { y: { $year: "$date" }, m: { $month: "$date" } }, expenses: { $sum: "$amount" } } }
  ]);
  return res.json({ from, to, monthlyRevenue: monthlyData, monthlyExpenses: expenseData });
};

const purchasesReport = async (req, res) => {
  const { from, to } = parseRange(req);
  const purchases = await Purchase.find({ purchaseDate: { $gte: from, $lte: to } })
    .populate("supplier", "name")
    .sort({ purchaseDate: -1 });
  const total = purchases.reduce((s, p) => s + p.totalAmount, 0);
  return res.json({ from, to, total, count: purchases.length, purchases });
};

const trendingReport = async (_req, res) => {
  const invoices = await Invoice.find({ status: { $in: ["paid", "partial"] } });
  const counts = {};
  for (const inv of invoices) {
    for (const item of inv.items || []) {
      const key = item.itemName;
      counts[key] = (counts[key] || 0) + item.quantity;
    }
  }
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([name, quantity]) => ({ name, quantity }));
  return res.json({ trending: sorted });
};

module.exports = { financialReport, stockReport, treatmentReport, doctorReport, profitLossReport, purchasesReport, trendingReport };
