# VetCare Mobile - Full Stack Mobile Application

> **Separate project** from the existing `VETCARE` Laravel web app. This folder (`VETCARE_mobile`) is completely independent.

---

## Project Structure

```
VETCARE_mobile/
├── backend/          Node.js + Express.js + MongoDB REST API
└── mobile/           React Native (Expo) mobile app
```

---

## Modules Implemented (from VETCARE Laravel analysis)

| Module | Backend API | Mobile Screens |
|---|---|---|
| Auth (Login/Register) | ✅ JWT | ✅ LoginScreen |
| Dashboard | ✅ Stats + Recent | ✅ DashboardScreen |
| Users | ✅ Admin CRUD | ✅ UsersScreen + UserFormScreen |
| Patients | ✅ Full CRUD + Search | ✅ PatientsScreen + PatientFormScreen + PatientDetailScreen |
| Medical Records | ✅ Per Patient | ✅ PatientDetailScreen (tab) |
| Patient Conditions | ✅ Per Patient | ✅ PatientDetailScreen (tab) |
| Appointments | ✅ Full CRUD + Complete | ✅ AppointmentsScreen + AppointmentFormScreen |
| Treatments | ✅ Full CRUD | ✅ TreatmentsScreen + TreatmentFormScreen |
| Treatment Schedules | ✅ Full CRUD + Complete | ✅ SchedulesScreen + ScheduleFormScreen |
| Lab Requests | ✅ Full CRUD + Status Update | ✅ LabScreen + LabFormScreen |
| Products / Inventory | ✅ Full CRUD + Stock Adjust | ✅ ProductsScreen + ProductFormScreen |
| Categories | ✅ CRUD | ✅ ProductFormScreen (selector) |
| Suppliers | ✅ CRUD | ✅ ProductFormScreen (selector) |
| Purchases | ✅ + Payments + Returns | ✅ PurchasesScreen + PurchaseFormScreen + PurchaseDetailScreen |
| Invoices & Billing | ✅ + Payments | ✅ InvoicesScreen + InvoiceFormScreen + InvoiceDetailScreen |
| Expenses | ✅ Full CRUD | ✅ ExpensesScreen + ExpenseFormScreen |
| Expense Categories | ✅ CRUD | ✅ ExpensesScreen (tab) |
| Reports | ✅ 7 Report Types | ✅ ReportsScreen |

---

## 1 — Backend Setup

```powershell
cd "C:\dev\UNI ITP\VETCARE_fin\VETCARE_mobile\backend"
npm install
copy .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/vetcare_mobile
JWT_SECRET=change_this_to_something_secure
```

Start dev server:
```powershell
npm run dev
```

Seed initial data (run ONCE after server starts):
```powershell
npm run seed:admin
```

This creates:
- admin@vetcare.com / 123456 (admin)
- doctor@vetcare.com / 123456 (doctor)
- staff@vetcare.com / 123456 (staff)
- Default categories, expense categories, treatments, suppliers

---

## 2 — Mobile Setup

```powershell
cd "C:\dev\UNI ITP\VETCARE_fin\VETCARE_mobile\mobile"
npm install
npm run start
```

Then press `a` for Android emulator or `i` for iOS simulator.

### API URL (edit `src/api/client.js`)

| Environment | URL |
|---|---|
| Android Emulator | `http://10.0.2.2:5000/api` (default) |
| iOS Simulator | `http://localhost:5000/api` |
| Real Device (Wi-Fi) | `http://YOUR_PC_IP:5000/api` |

---

## 3 — API Endpoints Summary

```
GET    /api/health
POST   /api/auth/register
POST   /api/auth/login

GET/POST       /api/patients
GET/PUT/DELETE /api/patients/:id
GET/POST       /api/patients/:id/records
GET/POST       /api/patients/:id/conditions

GET/POST       /api/appointments
POST           /api/appointments/:id/complete

GET/POST       /api/treatments
GET/POST       /api/schedules
POST           /api/schedules/:id/complete

GET/POST       /api/lab
POST           /api/lab/:id/status

GET/POST       /api/products
POST           /api/products/:id/stock

GET/POST       /api/categories
GET/POST       /api/suppliers
GET/POST       /api/purchases
POST           /api/purchases/:id/payments
POST           /api/purchases/:id/returns

GET/POST       /api/invoices
POST           /api/invoices/:id/payments

GET/POST       /api/expenses
GET/POST       /api/expenses/categories

GET            /api/dashboard
GET            /api/reports/financial
GET            /api/reports/stock
GET            /api/reports/treatments
GET            /api/reports/doctors
GET            /api/reports/profit-loss
GET            /api/reports/purchases
GET            /api/reports/trending

GET/POST/PUT/DELETE /api/users  (admin only)
```

---

## 4 — Deployment

### Backend (Render / Railway)
1. Push `backend/` to GitHub
2. Set environment variables: `MONGODB_URI` (use MongoDB Atlas), `JWT_SECRET`, `PORT`
3. Build command: `npm install`
4. Start command: `npm start`

### MongoDB Atlas (Cloud DB)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vetcare_mobile
```

### Mobile App (EAS Build)
```powershell
npm install -g eas-cli
eas build --platform android
```
Update `src/api/client.js` `API_BASE_URL` to your deployed backend URL before building.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native (Expo SDK 51) |
| Navigation | React Navigation v6 |
| HTTP Client | Axios |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken + bcryptjs) |

---

*Developed based on VetCare Laravel web app analysis. All modules replicated.*
