import axios from "axios";

const BASE_URL =
  "https://fleetmonitor-d5a8e-default-rtdb.asia-southeast1.firebasedatabase.app/vehicles";

// Fetch all vehicles with IDs preserved
export const fetchVehicles = async () => {
  const res = await axios.get(`${BASE_URL}.json`);
  const data = res.data || {};
  return Object.entries(data).map(([id, vehicle]) => ({ id, ...vehicle }));
};

// Fetch a single vehicle by ID
export const fetchVehicleById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}.json`);
  return { id, ...res.data };
};

// Update vehicle
export const updateVehicle = async (id, updates) => {
  await axios.patch(`${BASE_URL}/${id}.json`, updates);
};
