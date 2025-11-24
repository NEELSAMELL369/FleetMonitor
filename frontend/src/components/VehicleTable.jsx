import React from "react";

const VehicleTable = ({
  vehicles,
  sortBy,
  sortOrder,
  onSort,
  onViewDetails,
  onEdit,
}) => (
  <div className="overflow-x-auto">
    {/* Desktop Table */}
    <table className="min-w-full border border-gray-200 rounded-lg hidden md:table shadow-sm table-fixed">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 border-b text-left text-gray-700 w-16">ID</th>
          <th
            className="p-3 border-b text-left text-gray-700 cursor-pointer w-48"
            onClick={() => onSort("vehicleName")}
          >
            Vehicle Name{" "}
            {sortBy === "vehicleName" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </th>
          <th className="p-3 border-b text-left text-gray-700 w-32">Model</th>
          <th className="p-3 border-b text-left text-gray-700 w-24">Status</th>
          <th
            className="p-3 border-b text-left text-gray-700 cursor-pointer w-40"
            onClick={() => onSort("lastSeen")}
          >
            Last Seen{" "}
            {sortBy === "lastSeen" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </th>
          <th className="p-3 border-b text-left text-gray-700 w-32">
            Location
          </th>
          <th className="p-3 border-b text-left text-gray-700 w-40">Actions</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((v, idx) => (
          <tr
            key={v.id}
            className={`transition-all hover:bg-gray-50 ${
              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <td className="p-3 border-b truncate">{v.id}</td>
            <td className="p-3 border-b font-medium truncate">
              {v.vehicleName}
            </td>
            <td className="p-3 border-b truncate">{v.model}</td>
            <td className="p-3 border-b">
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  v.status === "online"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {v.status.toUpperCase()}
              </span>
            </td>
            <td className="p-3 border-b truncate">
              {new Date(v.lastSeen).toLocaleString()}
            </td>
            <td className="p-3 border-b truncate">{v.location}</td>
            <td className="p-3 border-b flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition flex-1"
                onClick={() => onViewDetails(v.id)}
              >
                View
              </button>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition flex-1"
                onClick={() => onEdit(v)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Mobile Cards */}
    <div className="flex flex-col gap-4 md:hidden mt-4">
      {vehicles.map((v) => {
        const statusColor =
          v.status === "online"
            ? "bg-cyan-100 text-cyan-800"
            : "bg-yellow-100 text-yellow-800";

        return (
          <div
            key={v.id}
            className="border border-gray-200 rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg p-5 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            {/* Vehicle Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {v.vehicleName}
              </h3>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColor}`}
              >
                {v.status.toUpperCase()}
              </span>
            </div>

            {/* Vehicle Info */}
            <div className="grid grid-cols-2 gap-3 text-gray-900 mb-4">
              <div className="flex flex-col">
                <span className="font-medium">ID</span>
                <span>{v.id}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Model</span>
                <span>{v.model}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Last Seen</span>
                <span>{new Date(v.lastSeen).toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Location</span>
                <span>{v.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-3">
              <button
                className="flex-1 bg-cyan-500 text-white px-3 py-2 rounded-xl font-semibold hover:bg-cyan-600 transition shadow"
                onClick={() => onViewDetails(v.id)}
              >
                View
              </button>
              <button
                className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-xl font-semibold hover:bg-yellow-600 transition shadow"
                onClick={() => onEdit(v)}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default VehicleTable;
