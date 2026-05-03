require("dotenv").config();
const express = require("express");
const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const auth = require("./middleware/auth");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const treatmentRoutes = require("./routes/treatmentRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const labRoutes = require("./routes/labRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "vetcare-mobile-api", version: "2.0.0" }));

app.use("/api/auth", authRoutes);

app.use("/api/users", auth, userRoutes);
app.use("/api/patients", auth, patientRoutes);
app.use("/api/appointments", auth, appointmentRoutes);
app.use("/api/treatments", auth, treatmentRoutes);
app.use("/api/schedules", auth, scheduleRoutes);
app.use("/api/lab", auth, labRoutes);
app.use("/api/categories", auth, categoryRoutes);
app.use("/api/suppliers", auth, supplierRoutes);
app.use("/api/products", auth, productRoutes);
app.use("/api/purchases", auth, purchaseRoutes);
app.use("/api/invoices", auth, invoiceRoutes);
app.use("/api/expenses", auth, expenseRoutes);
app.use("/api/dashboard", auth, dashboardRoutes);
app.use("/api/reports", auth, reportRoutes);

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`VetCare Mobile API running on port ${port}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
