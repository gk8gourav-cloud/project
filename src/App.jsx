import { useState } from "react";
import "./App.css";
import * as api from "./api";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import FleetStatus from "./components/FleetStatus";
import OccupancyAnalytics from "./components/OccupancyAnalytics";
import RouteOptimizer from "./components/RouteOptimizer";
import DemandSimulation from "./components/DemandSimulation";
import CampusZones from "./components/CampusZones";

export default function App() {
  const [active, setActive] = useState("Fleet Status");
  const [buses, setBuses] = useState(() => api.getBuses());

  return (
    <div className="app">
      <Sidebar active={active} setActive={setActive} />
      <main className="main">
        <Header active={active} count={buses.length} />
        {active === "Fleet Status" && <FleetStatus buses={buses} setBuses={setBuses} />}
        {active === "Occupancy Analytics" && <OccupancyAnalytics buses={buses} />}
        {active === "Route Optimization" && <RouteOptimizer />}
        {active === "Demand Simulation" && <DemandSimulation />}
        {active === "Campus Zones" && <CampusZones />}
      </main>
    </div>
  );
}
