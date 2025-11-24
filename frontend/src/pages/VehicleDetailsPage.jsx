// src/pages/VehicleDetailsPage.js
import React from "react";
import { useParams } from "react-router-dom";
import VehicleDetails from "../components/VehicleDetails";

const VehicleDetailsPage = () => {
  const { vehicleId } = useParams();
  return <VehicleDetails vehicleId={vehicleId} />;
};

export default VehicleDetailsPage;
