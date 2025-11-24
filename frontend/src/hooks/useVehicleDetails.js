import { useQuery } from "@tanstack/react-query";
import * as api from "../api/vehicleApi";

export const useVehicleDetails = (vehicleId) => {
  const { data: vehicle, isLoading, isError, error } = useQuery({
    queryKey: ["vehicle", vehicleId],
    queryFn: () => api.fetchVehicleById(vehicleId),
    enabled: !!vehicleId, // only fetch if vehicleId exists
    staleTime: 5 * 60 * 1000, // optional caching
  });

  return { vehicle, isLoading, isError, error };
};
