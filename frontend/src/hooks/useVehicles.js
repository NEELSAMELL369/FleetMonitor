import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import * as api from "../api/vehicleApi";

export const useVehicles = () => {
  const queryClient = useQueryClient();
  const { page, pageSize, search, statusFilter, sortBy, sortOrder } =
    useSelector((state) => state.vehicle);

  const { data: allVehicles = [], isLoading, isError, error } = useQuery({
    queryKey: ["vehicles"],
    queryFn: api.fetchVehicles,
    keepPreviousData: true,
  });

  // Filter
  const filtered = allVehicles.filter(
    (v) =>
      (statusFilter === "all" || v.status === statusFilter) &&
      v.vehicleName.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  filtered.sort((a, b) =>
    sortOrder === "asc"
      ? a[sortBy] > b[sortBy]
        ? 1
        : -1
      : a[sortBy] < b[sortBy]
      ? 1
      : -1
  );

  // Pagination
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return {
    vehicles: paginated,
    total: filtered.length,
    isLoading,
    isError,
    error,
  };
};
