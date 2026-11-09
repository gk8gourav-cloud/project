import { useState } from "react";
import { simulateDemand } from "../api";

export default function DemandSimulation() {
  const [hour, setHour] = useState(9);
  const [rows, setRows] = useState([]);

  return (
    <section className="panel page-panel">
      <div className="panel-heading">
        <div><h3>Demand Simulation</h3><p>Pick an hour and simulate passenger demand.</p></div>
      </div>
      <div className="route-form">
        <label>HOUR OF DAY: {String(hour).padStart(2, "0")}:00</label>
        <input type="range" min="0" max="23" value={hour} onChange={(e) => setHour(Number(e.target.value))} />
        <button className="btn" onClick={() => setRows(simulateDemand(hour))}>Run simulation</button>
      </div>
      {rows.map((r) => (
        <div className="bar-row" key={r.id}>
          <span className="bar-label">{r.id}</span>
          <div className="bar"><div className={"fill " + (r.load > 80 ? "high" : r.load > 50 ? "mid" : "low")} style={{ width: r.load + "%" }} /></div>
          <span className="bar-value">{r.demand}/{r.capacity}</span>
        </div>
      ))}
    </section>
  );
}
