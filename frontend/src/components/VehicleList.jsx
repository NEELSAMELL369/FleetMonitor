import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useVehicles } from "../hooks/useVehicles";
import { setPage, setSearch, setStatusFilter, setSort } from "../redux/vehicleSlice";
import VehicleControls from "./VehicleControls";
import VehicleTable from "./VehicleTable";
import VehiclePagination from "./VehiclePagination";
import VehicleEditModal from "./VehicleEditModal";

const VehicleList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vehicles, total, isLoading, isError } = useVehicles();
  const { page, pageSize, search, statusFilter, sortBy, sortOrder } = useSelector(
    (state) => state.vehicle
  );
  const [editingVehicle, setEditingVehicle] = useState(null);

  const handleViewDetails = useCallback(
    (vehicleId) => navigate(`/vehicles/${vehicleId}`),
    [navigate]
  );

  const handleOpenEdit = useCallback((vehicle) => setEditingVehicle(vehicle), []);
  const handleCloseEdit = useCallback(() => setEditingVehicle(null), []);

  if (isLoading)
    return <p className="text-center mt-20 text-blue-400 text-lg font-medium">Loading vehicles...</p>;
  if (isError)
    return <p className="text-center mt-20 text-red-500 text-lg font-medium">Error loading vehicles!</p>;

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">Vehicles</h2>
        <button
          onClick={() => dispatch(setSearch(""))}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition shadow"
        >
          Reset Search
        </button>
      </div>

      {/* Controls */}
      <div className="mb-4">
        <VehicleControls search={search} statusFilter={statusFilter} vehicles={vehicles} />
      </div>

      {/* Vehicle Table */}
      <div className="rounded-2xl shadow-lg overflow-hidden bg-white md:bg-white sm:bg-transparent">
        <VehicleTable
          vehicles={vehicles}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={(field) =>
            dispatch(
              setSort({
                sortBy: field,
                sortOrder: sortOrder === "asc" ? "desc" : "asc",
              })
            )
          }
          onViewDetails={handleViewDetails}
          onEdit={handleOpenEdit}
        />
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <VehiclePagination
          total={total}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={(p) => dispatch(setPage(p))}
        />
      </div>

      {/* Edit Modal */}
      {editingVehicle && (
        <VehicleEditModal vehicle={editingVehicle} onClose={handleCloseEdit} />
      )}
    </div>
  );
};

export default React.memo(VehicleList);
