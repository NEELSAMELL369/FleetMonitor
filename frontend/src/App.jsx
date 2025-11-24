import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./redux/store";
import Dashboard from "./pages/Dashboard";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* Toast messages appear at top-center */}
      <Toaster position="top-center" reverseOrder={false} />
      
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vehicles/:vehicleId" element={<VehicleDetailsPage />} />
           <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </Provider>
);

export default App;
