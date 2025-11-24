// src/components/VehicleDetails.jsx
import React from "react";
import { useVehicleDetails } from "../hooks/useVehicleDetails";
import { useNavigate } from "react-router-dom";
import { FaBolt, FaTachometerAlt } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// 3D Vehicle Model Component
const VehicleModel = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={1.2} />;
};

// 360° View Component
const Vehicle360View = ({ modelUrl }) => (
  <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <React.Suspense fallback={null}>
        <VehicleModel modelUrl={modelUrl} />
      </React.Suspense>
      <OrbitControls enablePan={false} enableZoom={true} />
    </Canvas>
  </div>
);

const VehicleDetails = React.memo(({ vehicleId }) => {
  const navigate = useNavigate();
  const { vehicle, isLoading, isError, error } = useVehicleDetails(vehicleId);

  if (isLoading)
    return <div className="text-center mt-20 text-teal-400">Loading vehicle details...</div>;
  if (isError)
    return (
      <div className="text-center mt-20 text-red-500">
        Error loading vehicle details: {error?.message}
      </div>
    );
  if (!vehicle)
    return <div className="text-center mt-20 text-teal-400">No vehicle found with this ID</div>;

  const { vehicleName, id, model, status, lastSeen, location, telemetry, model3DUrl } = vehicle;

  // Status badge colors (teal/orange-themed)
  const statusColor =
    status === "online"
      ? "bg-teal-100 text-teal-800"
      : "bg-orange-100 text-orange-800";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative h-48 w-full bg-gradient-to-r from-teal-600 to-teal-400 flex items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg text-center">
          {vehicleName}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 px-4 py-2 rounded-lg bg-white text-teal-700 hover:bg-teal-100 transition shadow"
        >
          Back
        </button>
      </div>

      {/* Content Panels */}
      <div className="max-w-6xl mx-auto -mt-16 px-4 md:px-0 space-y-8">

        {/* 360° Vehicle View */}
        {model3DUrl && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">360° Vehicle View</h2>
            <Vehicle360View modelUrl={model3DUrl} />
          </div>
        )}

        {/* Vehicle Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">Vehicle Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-between">
              <span className="font-medium text-teal-600">Model:</span>
              <span className="text-gray-800">{model}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-teal-600">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
                {status.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-teal-600">Last Seen:</span>
              <span className="text-gray-800">{new Date(lastSeen).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-teal-600">Location:</span>
              <span className="text-gray-800">{location}</span>
            </div>
          </div>
        </div>

        {/* Telemetry */}
        {telemetry && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">Telemetry</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {telemetry.battery !== undefined && (
                <div className="flex flex-col items-center bg-teal-100 rounded-lg p-4 shadow hover:shadow-md transition">
                  <FaBolt className="text-yellow-500 text-3xl mb-2" />
                  <span className="font-medium text-gray-800">Battery</span>
                  <span className="text-gray-800">{telemetry.battery}%</span>
                </div>
              )}
              {telemetry.speed !== undefined && (
                <div className="flex flex-col items-center bg-teal-100 rounded-lg p-4 shadow hover:shadow-md transition">
                  <FaTachometerAlt className="text-teal-500 text-3xl mb-2" />
                  <span className="font-medium text-gray-800">Speed</span>
                  <span className="text-gray-800">{telemetry.speed} km/h</span>
                </div>
              )}
              {Object.entries(telemetry).map(([key, value]) => {
                if (key === "battery" || key === "speed") return null;
                return (
                  <div key={key} className="flex flex-col items-center bg-teal-100 rounded-lg p-4 shadow hover:shadow-md transition">
                    <span className="font-medium capitalize text-gray-800">{key}</span>
                    <span className="text-gray-800">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Activity Logs */}
        {vehicle.activityLogs && vehicle.activityLogs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">Activity Logs</h2>
            <div className="relative border-l-2 border-teal-300 ml-4">
              {vehicle.activityLogs.map((log, idx) => (
                <div key={idx} className="mb-6 ml-6">
                  <div className="absolute -left-3 w-6 h-6 rounded-full bg-teal-500 border-2 border-white"></div>
                  <p className="text-gray-800 font-medium">{log.time}</p>
                  <p className="text-orange-600">{log.action}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
});

export default VehicleDetails;
