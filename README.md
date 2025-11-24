<center><h1 style="font-size: 60px; font-weight: bold;">🚗 FleetMonitor</h1><center/>

<p align="center">
  FleetMonitor is a lightweight vehicle fleet management dashboard that allows users to monitor vehicle status, track activity, view telemetry, and manage fleet data with filtering, sorting, search, and CSV export support.
</p>

<p align="center">
  <a href="https://expense-tracker-mern-jet.vercel.app/">
    <img src="https://img.shields.io/badge/Frontend-Live%20Demo-blue?style=for-the-badge&logo=react" alt="Frontend Live Demo">
  </a>
</p>

---

## ✨ Features

- 🚘 Dashboard with all vehicles and key info (ID, Name, Model, Status, Last Seen, Location)
- 🔍 Search & Filter by vehicle name and status (online/offline)
- 📊 Sorting by vehicle name or last seen
- 🗂 Pagination for large fleets
- 📄 Vehicle Details Page with telemetry and activity logs
- ✏️ Edit Vehicles with instant, optimistic updates
- 🔔 Toast Notifications for success/error messages

---

## 🚀 Usage

- **Dashboard**: Browse all vehicles with search, filter, sort, and pagination.
- **Details**: Click on any vehicle to view telemetry and activity logs.
- **Edit Vehicle**: Update vehicle name or status; changes are immediately reflected.

---

## 📈 React Query Hooks

- `useVehicles()` → Fetch, filter, sort, and paginate vehicles
- `useVehicleDetails(vehicleId)` → Fetch detailed vehicle info
- `useUpdateVehicle()` → Update vehicle with optimistic UI

---

## 🎯 Redux State

- `page`, `pageSize` → Pagination control
- `search` → Search query
- `statusFilter` → Filter by status
- `sortBy`, `sortOrder` → Sorting options
- `selectedVehicleId` → Selected vehicle for details

---

## 🛠 Tech Stack

| Technology       | Version | Purpose                 |
| ---------------- | ------- | ----------------------- |
| React            | 19.2.0  | UI Library              |
| Redux Toolkit    | 2.11.0  | State Management        |
| React Query      | 5.90.10 | Data Fetching & Caching |
| React Router DOM | 7.9.6   | Routing                 |
| Tailwind CSS     | 4.1.17  | Styling                 |
| Axios            | 1.13.2  | HTTP Requests           |
| React Hot Toast  | 2.6.0   | Notifications           |
| Vite             | 7.2.4   | Build Tool / Dev Server |
| TypeScript       | 5.9.3   | Type Safety (optional)  |
| ESLint           | 9.39.1  | Linting                 |

---

## 📂 Folder Structure

```
frontend/
├─ node_modules/
├─ public/
├─ src/
│  ├─ api/
│  │  └─ vehicleApi.js
│  ├─ assets/
│  ├─ components/
│  │  ├─ VehicleControls.jsx
│  │  ├─ VehicleDetails.jsx
│  │  ├─ VehicleEditModal.jsx
│  │  ├─ VehicleList.jsx
│  │  ├─ VehiclePagination.jsx
│  │  └─ VehicleTable.jsx
│  ├─ hooks/
│  │  ├─ useUpdateVehicle.js
│  │  ├─ useVehicleDetails.js
│  │  └─ useVehicles.js
│  ├─ pages/
│  │  ├─ Dashboard.jsx
│  │  ├─ NotFound.jsx
│  │  └─ VehicleDetailsPage.jsx
│  ├─ redux/
│  │  ├─ store.js
│  │  └─ vehicleSlice.js
│  ├─ utils/
│  │  └─ exportCSV.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.tsx
├─ .gitignore
├─ eslint.config.js
├─ index.html
└─ package.json

```

---

## 📦 Installation & Setup

1️⃣ **Clone the repository**

```bash
git clone https://github.com/NEELSAMELL369/FleetMonitor.git
cd frontend

2️⃣ Install dependencies

npm install react@19.2.0 react-dom@19.2.0 react-router-dom@7.9.6 @reduxjs/toolkit@2.11.0 react-redux@9.2.0 @tanstack/react-query@5.90.10 axios@1.13.2 react-hot-toast@2.6.0 react-icons@5.5.0 tailwindcss@4.1.17 @tailwindcss/vite@4.1.17

3️⃣ Run the application
npm run dev

```
