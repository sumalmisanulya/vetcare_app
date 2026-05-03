require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");
const Category = require("../models/Category");
const ExpenseCategory = require("../models/ExpenseCategory");
const Treatment = require("../models/Treatment");
const Supplier = require("../models/Supplier");

const run = async () => {
  await connectDB();

  const adminEmail = "admin@vetcare.com";
  if (!(await User.findOne({ email: adminEmail }))) {
    await User.create({ fullName: "VetCare Admin", email: adminEmail, passwordHash: await bcrypt.hash("123456", 10), role: "admin" });
    console.log("Created admin: admin@vetcare.com / 123456");
  }

  const doctorEmail = "doctor@vetcare.com";
  if (!(await User.findOne({ email: doctorEmail }))) {
    await User.create({ fullName: "Dr. Silva", email: doctorEmail, passwordHash: await bcrypt.hash("123456", 10), role: "doctor" });
    console.log("Created doctor: doctor@vetcare.com / 123456");
  }

  const staffEmail = "staff@vetcare.com";
  if (!(await User.findOne({ email: staffEmail }))) {
    await User.create({ fullName: "VetCare Staff", email: staffEmail, passwordHash: await bcrypt.hash("123456", 10), role: "staff" });
    console.log("Created staff: staff@vetcare.com / 123456");
  }

  const catNames = [{ name: "Medicines", type: "medicine" }, { name: "Vaccines", type: "vaccine" }, { name: "Equipment", type: "equipment" }, { name: "Accessories", type: "accessory" }, { name: "Food & Supplements", type: "food" }];
  for (const c of catNames) {
    if (!(await Category.findOne({ name: c.name }))) { await Category.create(c); }
  }
  console.log("Categories seeded.");

  const expCatNames = ["Salaries", "Utilities", "Rent", "Medical Supplies", "Marketing", "Maintenance", "Other"];
  for (const n of expCatNames) {
    if (!(await ExpenseCategory.findOne({ name: n }))) { await ExpenseCategory.create({ name: n }); }
  }
  console.log("Expense categories seeded.");

  const treatmentNames = [
    { name: "General Consultation", price: 500, description: "Routine check-up and consultation" },
    { name: "Vaccination", price: 800, description: "Standard vaccination" },
    { name: "Deworming", price: 300, description: "Deworming treatment" },
    { name: "Surgery - Minor", price: 5000, description: "Minor surgical procedures" },
    { name: "Surgery - Major", price: 15000, description: "Major surgical procedures" },
    { name: "Dental Cleaning", price: 2500, description: "Professional dental cleaning" },
    { name: "X-Ray", price: 1200, description: "Diagnostic X-ray" },
    { name: "Blood Test", price: 900, description: "Complete blood count" },
    { name: "Grooming", price: 600, description: "Basic grooming service" }
  ];
  for (const t of treatmentNames) {
    if (!(await Treatment.findOne({ name: t.name }))) { await Treatment.create(t); }
  }
  console.log("Treatments seeded.");

  const supplierNames = [
    { name: "MedVet Supplies", contactNumber: "0112345678", email: "medvet@supplies.lk", address: "Colombo 03" },
    { name: "PharmaAnimal Ltd", contactNumber: "0119876543", email: "pharma@animal.lk", address: "Kandy" }
  ];
  for (const s of supplierNames) {
    if (!(await Supplier.findOne({ name: s.name }))) { await Supplier.create(s); }
  }
  console.log("Suppliers seeded.");

  console.log("\nSeed complete!");
  process.exit(0);
};

run().catch((err) => { console.error("Seed failed:", err.message); process.exit(1); });
