import { useState } from "react";
import { getDrivers } from "../api";

export default function DriverForm({ buses, onChange }) {
  const drivers = getDrivers();
  const [busId, setBusId] = useState("");
  const [driver, setDriver] = useState(drivers[0]);
  const selected = busId || buses[0]?.id || "";

  return (
    <div className="mini-form">
      <h4>Change driver</h4>
      <select value={selected} onChange={(e) => setBusId(e.target.value)}>
        {buses.map((b) => <option key={b.id} value={b.id}>{b.id}</option>)}
      </select>
      <select value={driver} onChange={(e) => setDriver(e.target.value)}>
        {drivers.map((d) => <option key={d}>{d}</option>)}
      </select>
      <button className="btn" disabled={!selected} onClick={() => onChange(selected, driver)}>
        Assign driver
      </button>
    </div>
  );
}
