export default function OccupancyAnalytics({ buses }) {
  const active = buses.filter((b) => b.status === "Running");
  const totalCap = buses.reduce((s, b) => s + b.capacity, 0);
  const totalOcc = buses.reduce((s, b) => s + b.occupancy, 0);
  const avg = totalCap ? Math.round((totalOcc / totalCap) * 100) : 0;

  return (
    <section className="panel page-panel">
      <div className="stats">
        <div className="stat"><span>Total buses</span><strong>{buses.length}</strong></div>
        <div className="stat"><span>Running</span><strong>{active.length}</strong></div>
        <div className="stat"><span>Passengers</span><strong>{totalOcc}</strong></div>
        <div className="stat"><span>Fleet load</span><strong>{avg}%</strong></div>
      </div>
      {buses.map((b) => {
        const pct = Math.round((b.occupancy / b.capacity) * 100);
        return (
          <div className="bar-row" key={b.id}>
            <span className="bar-label">{b.id}</span>
            <div className="bar"><div className={"fill " + (pct > 80 ? "high" : pct > 50 ? "mid" : "low")} style={{ width: pct + "%" }} /></div>
            <span className="bar-value">{pct}%</span>
          </div>
        );
      })}
    </section>
  );
}
