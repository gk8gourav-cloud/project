import { useState } from "react";
import { getDrivers } from "../api";

export default function BusForm({ buses, onAdd, onClose }) {
  const drivers = getDrivers();
  const [form, setForm] = useState({
    id: "", route: "", capacity: 40, occupancy: 0, driver: drivers[0], status: "Running",
  });
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function submit() {
    const id = form.id.trim().toUpperCase();
    const capacity = Number(form.capacity);
    const occupancy = Number(form.occupancy);
    if (!id || !form.route.trim()) return setError("Bus ID and route are required.");
    if (buses.some((b) => b.id === id)) return setError("That bus ID already exists.");
    if (!(capacity > 0)) return setError("Capacity must be more than 0.");
    if (occupancy < 0 || occupancy > capacity) return setError("Passengers must be between 0 and capacity.");
    onAdd({
      id,
      route: form.route.trim(),
      driver: form.driver,
      capacity,
      occupancy: form.status === "Maintenance" ? 0 : occupancy,
      status: form.status,
    });
    onClose();
  }

  return (
    <div className="mini-form">
      <h4>Add a new bus</h4>
      <div className="form-grid">
        <input placeholder="Bus ID (e.g. BUS-05)" value={form.id} onChange={set("id")} />
        <input placeholder="Route (e.g. Library - Hostel)" value={form.route} onChange={set("route")} />
        <input type="number" min="1" placeholder="Capacity" value={form.capacity} onChange={set("capacity")} />
        <input type="number" min="0" placeholder="Passengers" value={form.occupancy} onChange={set("occupancy")} />
        <select value={form.driver} onChange={set("driver")}>
          {drivers.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select value={form.status} onChange={set("status")}>
          <option>Running</option>
          <option>Idle</option>
          <option>Maintenance</option>
        </select>
      </div>
      {error && <small className="error">{error}</small>}
      <div className="row-actions">
        <button className="btn" onClick={submit}>Add bus</button>
        <button className="btn ghost" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
