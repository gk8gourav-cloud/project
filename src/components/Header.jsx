const subtitles = {
  "Fleet Status": "Manage buses and drivers",
  "Occupancy Analytics": "How full is each bus right now",
  "Route Optimization": "Shortest campus route using Dijkstra",
  "Demand Simulation": "Predict passenger load by hour",
  "Campus Zones": "All campus transport locations",
};

export default function Header({ active, count }) {
  return (
    <header className="header">
      <div>
        <h1>{active}</h1>
        <p>{subtitles[active]}</p>
      </div>
      <div className="badge">{count} buses</div>
    </header>
  );
}
