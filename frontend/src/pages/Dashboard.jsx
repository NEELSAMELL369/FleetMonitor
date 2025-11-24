// src/pages/Dashboard.js
import React from "react";
import VehicleList from "../components/VehicleList";
import { useVehicles } from "../hooks/useVehicles";

const Dashboard = () => {
  const { vehicles } = useVehicles();

  // Stats
  const totalVehicles = vehicles?.length || 0;
  const onlineCount = vehicles?.filter(v => v.status === "online").length || 0;
  const offlineCount = vehicles?.filter(v => v.status === "offline").length || 0;
  const avgSpeed =
    vehicles && vehicles.length
      ? Math.round(
          vehicles.reduce((sum, v) => sum + (v.telemetry?.speed || 0), 0) / vehicles.length
        )
      : 0;

  const stats = [
    { title: "Total Vehicles", value: totalVehicles },
    { title: "Online", value: onlineCount },
    { title: "Offline", value: offlineCount },
    { title: "Avg Speed", value: avgSpeed + " km/h" },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Vibrant Hulk-style Hero Header */}
      <div className="relative bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 text-white py-20 px-6 md:px-12 mb-10 rounded-b-3xl shadow-2xl overflow-hidden">
        <h1 className="text-6xl md:text-8xl font-extrabold uppercase tracking-widest text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]">
          FLEET DASHBOARD
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-semibold opacity-95 drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
          Command your fleet, monitor telemetry & activity logs
        </p>

        {/* Glowing decorative circles */}
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-cyan-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute -top-16 -left-16 w-96 h-96 bg-teal-300 rounded-full opacity-30 blur-3xl animate-pulse delay-200"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center hover:shadow-2xl transition transform hover:scale-105"
            >
              <p className="text-gray-500 font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-teal-600 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Vehicle List */}
        <VehicleList />
      </div>
    </div>
  );
};

export default Dashboard;
