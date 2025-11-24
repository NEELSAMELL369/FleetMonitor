import React, { useState, useEffect, useCallback } from "react";
import { useUpdateVehicle } from "../hooks/useUpdateVehicle";
import toast from "react-hot-toast";

const VehicleEditModal = ({ vehicle, onClose }) => {
  const [name, setName] = useState(vehicle.vehicleName);
  const [status, setStatus] = useState(vehicle.status);

  const { mutate: updateVehicle, isLoading, isSuccess, isError } = useUpdateVehicle();

  useEffect(() => {
    if (vehicle) {
      setName(vehicle.vehicleName);
      setStatus(vehicle.status);
    }
  }, [vehicle]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Vehicle updated successfully!");
      onClose();
    }
  }, [isSuccess, onClose]);

  useEffect(() => {
    if (isError) toast.error("Failed to update vehicle. Please try again.");
  }, [isError]);

  const handleSave = useCallback(() => {
    if (!vehicle) return;
    updateVehicle({ id: vehicle.id, updates: { vehicleName: name, status } });
  }, [vehicle, name, status, updateVehicle]);

  // Status badge
  const statusColor =
    status === "online"
      ? "bg-cyan-100 text-cyan-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        
        {/* Modal Header */}
        <div className="bg-cyan-500 text-white p-5 rounded-t-3xl">
          <h3 className="text-2xl font-bold text-center">Edit Vehicle</h3>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Vehicle Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition shadow-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition shadow-sm"
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${statusColor}`}
            >
              {status.toUpperCase()}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`px-6 py-2 rounded-xl text-white font-semibold transition ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(VehicleEditModal);
