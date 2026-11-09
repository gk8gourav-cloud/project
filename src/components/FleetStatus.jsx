import { useState } from "react";
import { Trash2, Pencil, Check, X, Plus } from "lucide-react";
import * as api from "../api";
import BusForm from "./BusForm";

const STATUSES = ["Running", "Idle", "Maintenance"];

export default function FleetStatus({ buses, setBuses }) {
  const drivers = api.getDrivers();
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({});
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const running = buses.filter((b) => b.status === "Running").length;
  const passengers = buses.reduce((s, b) => s + b.occupancy, 0);
  const capacity = buses.reduce((s, b) => s + b.capacity, 0);
  const visible = filter === "All" ? buses : buses.filter((b) => b.status === filter);

  function startEdit(b) {
    setEditing(b.id);
    setDraft({
      route: b.route, driver: b.driver, capacity: b.capacity,
      occupancy: b.occupancy, status: b.status,
    });
    setError("");
  }

  function saveEdit() {
    const cap = Number(draft.capacity);
    const occ = Number(draft.occupancy);
    if (!draft.route.trim()) return setError("Route cannot be empty.");
    if (!(cap > 0)) return setError("Capacity must be more than 0.");
    if (occ < 0 || occ > cap) return setError("Passengers must be between 0 and capacity.");
    setBuses(api.updateBus(editing, {
      route: draft.route.trim(),
      driver: draft.driver,
      capacity: cap,
      occupancy: draft.status === "Maintenance" ? 0 : occ,
      status: draft.status,
    }));
    setEditing(null);
    setError("");
  }

  function remove(b) {
    if (window.confirm("Delete " + b.id + "?")) setBuses(api.removeBus(b.id));
  }

  const set = (k) => (e) => setDraft({ ...draft, [k]: e.target.value });
  const driverOptions = drivers.includes(draft.driver) ? drivers : [draft.driver, ...drivers];

  return (
    <section>
      <div className="stats">
        <div className="stat"><span>Total buses</span><strong>{buses.length}</strong></div>
        <div className="stat"><span>Running now</span><strong>{running}</strong></div>
        <div className="stat"><span>Passengers</span><strong>{passengers}</strong></div>
        <div className="stat"><span>Total capacity</span><strong>{capacity}</strong></div>
      </div>

      <div className="panel page-panel">
        <div className="toolbar">
          <div className="chips">
            {["All", ...STATUSES].map((s) => (
              <button key={s} className={filter === s ? "chip on" : "chip"} onClick={() => setFilter(s)}>{s}</button>
            ))}
          </div>
          <div className="row-actions">
            <button className="btn ghost" onClick={() => setBuses(api.resetData())}>Reset demo data</button>
            <button className="btn" onClick={() => setShowForm(!showForm)}><Plus size={16} /> Add bus</button>
          </div>
        </div>

        {showForm && (
          <BusForm buses={buses} onAdd={(bus) => setBuses(api.addBus(bus))} onClose={() => setShowForm(false)} />
        )}

        {error && <p className="error">{error}</p>}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Bus</th><th>Route</th><th>Driver</th>
                <th>Passengers</th><th>Capacity</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((b) => {
                const pct = Math.round((b.occupancy / b.capacity) * 100) || 0;
                if (editing === b.id) {
                  return (
                    <tr key={b.id} className="editing">
                      <td><strong>{b.id}</strong></td>
                      <td><input className="edit-input" value={draft.route} onChange={set("route")} /></td>
                      <td>
                        <select className="edit-input" value={draft.driver} onChange={set("driver")}>
                          {driverOptions.map((d) => <option key={d}>{d}</option>)}
                        </select>
                      </td>
                      <td><input className="edit-input narrow" type="number" min="0" value={draft.occupancy} onChange={set("occupancy")} /></td>
                      <td><input className="edit-input narrow" type="number" min="1" value={draft.capacity} onChange={set("capacity")} /></td>
                      <td>
                        <select className="edit-input" value={draft.status} onChange={set("status")}>
                          {STATUSES.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="row-actions">
                        <button className="icon-btn ok" title="Save" onClick={saveEdit}><Check size={18} /></button>
                        <button className="icon-btn" title="Cancel" onClick={() => { setEditing(null); setError(""); }}><X size={18} /></button>
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={b.id}>
                    <td><strong>{b.id}</strong></td>
                    <td>{b.route}</td>
                    <td>{b.driver}</td>
                    <td>
                      <div className="mini-bar">
                        <div className="bar"><div className={"fill " + (pct > 80 ? "high" : pct > 50 ? "mid" : "low")} style={{ width: pct + "%" }} /></div>
                        <span>{b.occupancy}</span>
                      </div>
                    </td>
                    <td>{b.capacity}</td>
                    <td><span className={"status " + b.status.toLowerCase()}>{b.status}</span></td>
                    <td className="row-actions">
                      <button className="icon-btn edit" title="Edit bus" onClick={() => startEdit(b)}><Pencil size={16} /></button>
                      <button className="icon-btn" title="Delete bus" onClick={() => remove(b)}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 && <tr><td colSpan="7">No buses to show.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
