import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  pageSize: 8,
  search: "",
  statusFilter: "all",
  sortBy: "vehicleName",
  sortOrder: "asc",
  selectedVehicleId: null,
};

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setPage: (state, action) => { state.page = action.payload; },
    setSearch: (state, action) => { state.search = action.payload; state.page = 1; },
    setStatusFilter: (state, action) => { state.statusFilter = action.payload; state.page = 1; },
    setSort: (state, action) => { state.sortBy = action.payload.sortBy; state.sortOrder = action.payload.sortOrder; },
    setSelectedVehicleId: (state, action) => { state.selectedVehicleId = action.payload; },
  }
});

export const { setPage, setSearch, setStatusFilter, setSort, setSelectedVehicleId } = vehicleSlice.actions;
export default vehicleSlice.reducer;
