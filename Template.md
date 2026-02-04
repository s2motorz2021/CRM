


---

# 📘 PRODUCT REQUIREMENT PROPOSAL (PRP)

## **S2 MOTORZ – Integrated CRM + ERP Platform**

**Two-Wheeler Multi-Brand Service & Spare Parts Sales**

**Status:** ✅ FINAL · MASTER · MERGED
**Scope:** 🔒 LOCKED
**Change Authority:** Admin Only
**Purpose:** Development · SOP · Training · Audit · Scale

---

## 1️⃣ P – PROBLEM STATEMENT

S2 Motorz operates a multi-branch two-wheeler workshop and spare parts business. Current operations depend on fragmented tools and manual processes, leading to poor visibility, revenue leakage, weak controls, and scaling challenges.

### 🎯 Core Objective

> Build **one centralized, approval-driven, role-based CRM + ERP** that controls **leads → appointments → workshop → inventory → billing → finance → HR → customer experience**, with **full auditability and configurability**.

---

## 2️⃣ R – REQUIREMENTS (PRD)

---

### 🔹 2.1 Technology & Platform

* Frontend: React.js + Next.js
* Backend: Node.js
* Database: MongoDB
* Responsive: Desktop / Tablet / Mobile

---

### 🔐 2.2 Security & Compliance

* Role-Based Access Control (RBAC)
* Branch-wise data segregation
* Full audit logs (who/what/when)
* No hard delete for transactional data
* Backup & export controls

---

### 🔹 2.3 Roles

Admin · Manager · Advisor · Technician ·
Accounts · Sales · CRM · HR · Customer

---

### 🔹 2.4 Authentication

* Internal users created/reset by Admin
* Phone number = login identity
* Customer login via Email + OTP
* Admin-only password resets

---

### 🔹 2.5 Master Data Management

* Add / Edit / Soft Delete
* Audit logged, branch-aware

**Masters include:**
Customer · Vehicle Brand/Model/Color · Service Type ·
Customer/Technician Voice · Technician Checklist ·
GST % · Coupons · Product Category · HSN · SKU ·
Workshop Time · Lunch Time · Next Service Due ·
Ramp · Feedback Call Days · Labour Type & Cost ·
Outside Work · Supplier (GSTIN)

---

### 🔹 2.6 Leads, CRM & Appointments

* Lead sources: WhatsApp, Walk-in, Referral, Campaign, Service Due
* Status: New / Follow-up / Converted
* Customer Database with financial summary
* Calendar-based Appointments (Pending/Confirmed/Completed/Cancelled)
* Appointment → Job Card / Quick Service
* Scheduled post-service reviews

---

### 🔹 2.7 Job Card Management

* Vehicle & customer details, photos
* Odometer, fuel, oil levels
* Customer voice & technician checklist
* Estimates, approvals, signatures
* Auto next-service scheduling

#### 🔸 2.7.1 Job Card – Board View (Kanban)

**Columns:**
New → Inspection → Awaiting Parts → Technician Allocation →
Ready for Inspection → Completed → Delivered

* Drag & drop (forward only)
* Backward move: Admin + reason + audit
* Completed = Locked | Delivered = Permanently locked

---

### 🔹 2.8 Inventory Management

* Barcode-based spare parts
* Stock list & min-level alerts
* Purchase entry → Finance approval mandatory
* Purchase returns & history

---

### 🔹 2.9 Parts Request & Approval

* Technician requests from Job Card
* Inventory approval mandatory
* Auto stock deduction with audit

---

### 🔹 2.10 Billing & Invoicing

* Import Job Card / Quick Service / Manual
* GST-compliant invoice grid (Parts/Labour/Outside Work)
* Coupons & discounts
* Cash/Card/UPI/Mixed payments
* Paid invoices locked; pending tracked

---

### 🔹 2.11 Quick Service

* Minimal flow
* Fuel & oil capture
* Completion photos mandatory
* Customer & advisor signatures
* Delivery lock enforced

---

### 🔹 2.12 Coupons & Discounts

* Campaign-based coupons
* Expiry & validation rules
* Usage & impact reports

---

### 🔹 2.13 Finance Department

**Modules:** Approvals · Add Expense · Day Book · GST Reports · P&L

* Purchase & expense approvals (Approve/Reject with reason)
* Day Book (date-wise income/expense/balance)
* GST (GSTR-1 & 3B summaries; JSON export)
* P&L (Revenue, COGS, OpEx, Net Profit)
* Finance/Admin only; full audit trail

---

### 🔹 2.14 HR Module

* Staff master
* Attendance
* Performance KPIs (jobs, labour, spares, rework)

---

### 🔹 2.15 Customer Portal

* OTP login
* Vehicle list & live job tracking
* Invoices, next service due
* Loyalty & coupons

---

### 🔹 2.16 Loyalty & Feedback

* Points per bill
* Bonus campaigns
* Auto feedback calls & satisfaction tracking

---

### 🔹 2.17 Dashboards (Role-Based)

Admin · Manager · Advisor · Technician ·
Finance · CRM · Customer

---

### 🔹 2.18 AI Assistant – **JESSI**

* Job card assistance
* Checklist suggestions
* Service reminders
* Advisory only; actions logged

---

## 🔹 **2.19 SETTINGS & ADMIN CONFIGURATION (FINAL)**

### 2.19.1 My Profile

* Profile photo (JPG/PNG, square, ≤800KB)
* Full name, email
* Phone (login identity, non-editable)
* Changes audit logged

### 2.19.2 Workshop Locations (Multi-Branch)

* Add/Edit/Deactivate branch
* Fields: Name, Area, Contact, GSTIN, Status
* Branch deletion blocked if transactions exist

### 2.19.3 Team Management (Staff Directory)

* Employee, phone, designation, branch
* Edit/Deactivate (history retained)
* One staff → one primary branch

### 2.19.4 Role Access Matrix (RBAC)

* Module-wise permissions (Dashboard, Appointments, CRM, Job Cards, Inventory, POS, Accounting, Reports, Staff, Customers)
* Checkbox-based, instant apply
* Admin access immutable
* All changes audited

### 2.19.5 Dashboard Layout Configuration

**Indicators (Toggle):**
Daily Revenue · Active Jobs · Satisfaction · Procurement · Unapproved Estimates
**Widgets:**
AI Business Oracle · Weekly Trends · Shortcut Toolbar

* Live preview; role-based visibility

### 2.19.6 Financial Defaults

* Default GST %
* Default payment method
* Invoice numbering pattern
* Round-off rules
* Admin-only; logged

### 2.19.7 Security & Export

* Password reset controls
* Data export by module/date range
* Admin-only access

### 2.19.8 Audit & Governance

* Every settings change logged (old/new/user/time)
* Critical settings versioned

---

### 🔹 2.20 Non-Functional Requirements

* Page load ≤ 3s
* Barcode scan ≤ 1s
* 99.5% uptime
* Multi-branch scalable
* No hard delete for core data

---

### 🔹 2.21 Testing & Go-Live

* UAT mandatory
* Pilot rollout
* Versioning & rollback

---

## 3️⃣ End-to-End Workflow

Lead → Appointment → Job Card → Board Tracking →
Parts Approval → Billing → Finance Approval →
Payment → Delivery → Feedback → Loyalty → Next Service

---

## 4️⃣ Success Metrics (KPIs)

* Faster turnaround
* Zero unauthorized actions
* Accurate GST & P&L
* Inventory accuracy
* Technician productivity
* Higher customer retention

---

## 5️⃣ Final Product Vision

> **One Platform. One Workflow. Total Control.**

S2 Motorz operates **workshop, inventory, billing, finance, HR, CRM, dashboards, and admin configuration** on a **single intelligent, approval-driven, audit-ready CRM + ERP system**.


