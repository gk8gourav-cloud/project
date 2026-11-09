import { Bus, Gauge, Route, Activity, MapPin } from "lucide-react";

const items = [
  { name: "Fleet Status", icon: Bus },
  { name: "Occupancy Analytics", icon: Gauge },
  { name: "Route Optimization", icon: Route },
  { name: "Demand Simulation", icon: Activity },
  { name: "Campus Zones", icon: MapPin },
];

export default function Sidebar({ active, setActive }) {
  return (
    <aside className="sidebar">
      <div className="brand"><Bus /><span>CampusFlow</span></div>
      <nav>
        {items.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={active === name ? "nav active" : "nav"}
            onClick={() => setActive(name)}
          >
            <Icon size={18} /> {name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
