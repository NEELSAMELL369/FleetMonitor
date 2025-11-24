import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/vehicleApi";

export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }) => api.updateVehicle(id, updates),

    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["vehicles"] });
      await queryClient.cancelQueries({ queryKey: ["vehicle", id] });

      const previousVehicles = queryClient.getQueryData({ queryKey: ["vehicles"] });
      const previousVehicle = queryClient.getQueryData({ queryKey: ["vehicle", id] });

      if (previousVehicles) {
        queryClient.setQueryData(
          { queryKey: ["vehicles"] },
          previousVehicles.map(v => (v.id === id ? { ...v, ...updates } : v))
        );
      }

      if (previousVehicle) {
        queryClient.setQueryData(
          { queryKey: ["vehicle", id] },
          { ...previousVehicle, ...updates }
        );
      }

      return { previousVehicles, previousVehicle };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousVehicles)
        queryClient.setQueryData({ queryKey: ["vehicles"] }, context.previousVehicles);
      if (context?.previousVehicle)
        queryClient.setQueryData({ queryKey: ["vehicle", context.previousVehicle.id] }, context.previousVehicle);

      alert("Failed to update vehicle.");
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["vehicle", variables.id] });
    }
  });
};
