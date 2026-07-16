# FulfillFlow — Walmart-Inspired Fulfillment Dashboard

FulfillFlow is a full‑stack fulfillment management system inspired by real Walmart operations. It provides a clean dashboard for monitoring orders, tracking activity logs, managing priorities, and visualizing workflow performance.

Built with **Next.js**, **TypeScript**, **Prisma**, and **PostgreSQL**, FulfillFlow demonstrates real-world engineering skills including API design, database modeling, UI/UX, and full‑stack integration.

---

## 🚀 Features

### 📦 Order Management
- View all orders with status, priority, and timestamps  
- Real-time **search filtering**  
- Status filters: All, Pending, Completed, Canceled  
- Order details page  

### 📊 Dashboard KPIs
- Total orders  
- Pending / Completed / Canceled counts  
- Daily activity metrics  

### 🔄 Activity Log
- Picked  
- Packed  
- Staged  
- Delivered  
- Timestamped workflow history  

### 🧩 Backend API
- REST endpoints built with Express  
- Prisma ORM for database access  
- Seed script for mock data  
- Fully typed TypeScript backend  

### 🎨 Frontend
- Next.js App Router  
- Tailwind CSS  
- Reusable components (StatusBadge, KPI cards, tables)  
- Clean dark UI inspired by modern dashboards  

---

## 🛠 Tech Stack

### Frontend
- Next.js 14  
- React  
- TypeScript  
- Tailwind CSS  

### Backend
- Node.js  
- Express  
- Prisma ORM  
- PostgreSQL  

### Dev Tools
- Nodemon  
- ts-node  
- Prisma Studio  

---

## 📦 Installation

Clone the repository:

```
git clone https://github.com/YOUR_USERNAME/FulfillFlow.git
cd FulfillFlow
```

---

## 🔧 Backend Setup

```
cd backend
npm install
```

Create `.env`:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/fulfillflow"
```

Run migrations:

```
npx prisma migrate dev
```

Seed mock data:

```
npm run seed
```

Start backend:

```
npm run dev
```

Backend runs on:

```
http://localhost:5001
```

---

## 🎨 Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## 📁 Project Structure

```
FulfillFlow/
│── backend/
│   ├── prisma/
│   ├── src/
│   ├── dist/
│   └── server.ts
│
│── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
```

---

## 📊 Screenshots
(Pending)

---

## 🤝 About the Developer

FulfillFlow is built by **Ruwaidah**, a Walmart Fulfillment Team Lead transitioning into a full‑stack web developer.  
This project showcases real operational knowledge combined with modern engineering skills.

---


