import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearch, setStatusFilter } from "../redux/vehicleSlice";
import { exportToCSV } from "../utils/exportCSV";

const VehicleControls = ({ search, statusFilter,vehicles }) => {
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => dispatch(setSearch(localSearch)), 300);
    return () => clearTimeout(handler);
  }, [localSearch, dispatch]);

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="Search vehicle"
        className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={statusFilter}
        onChange={(e) => dispatch(setStatusFilter(e.target.value))}
        className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All</option>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </select>
      <button
        onClick={() => exportToCSV(vehicles, "vehicles.csv")}
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        Export CSV
      </button>
    </div>
  );
};

export default VehicleControls;
