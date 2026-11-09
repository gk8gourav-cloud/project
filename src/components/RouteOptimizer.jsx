import { useState } from "react";
import { Route } from "lucide-react";
import { getZones, optimizeRoute } from "../api";

export default function RouteOptimizer() {
  const zones = getZones();
  const [source, setSource] = useState(zones[0].name);
  const [target, setTarget] = useState(zones[4].name);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  function find() {
    const from = zones.find((z) => z.name === source).id;
    const to = zones.find((z) => z.name === target).id;
    if (from === to) { setResult(null); return setMessage("Choose two different zones."); }
    const r = optimizeRoute(from, to);
    setResult(r);
    setMessage(r ? "" : "No route found.");
  }

  return (
    <section className="panel page-panel">
      <div className="panel-heading">
        <div>
          <h3>Smart Route Optimizer</h3>
          <p>Find the shortest campus route using Dijkstra's algorithm</p>
        </div>
        <Route />
      </div>
      <div className="route-form">
        <label>STARTING ZONE</label>
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          {zones.map((z) => <option key={z.id} value={z.name}>{z.name}</option>)}
        </select>
        <label>DESTINATION ZONE</label>
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          {zones.map((z) => <option key={z.id} value={z.name}>{z.name}</option>)}
        </select>
        <button className="btn" onClick={find}>Find shortest route</button>
      </div>
      {message && <p className="error">{message}</p>}
      {result && (
        <div className="result">
          <h4>{result.names.join("  ->  ")}</h4>
          <p>{result.distance} m &middot; about {result.minutes} min by bus</p>
        </div>
      )}
    </section>
  );
}
