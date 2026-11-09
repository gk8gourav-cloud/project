import { MapPin } from "lucide-react";
import { getZones } from "../api";

export default function CampusZones() {
  return (
    <section className="panel page-panel">
      <div className="zone-grid">
        {getZones().map((zone) => (
          <div className="zone-card" key={zone.id}>
            <div className="zone-icon"><MapPin /></div>
            <span>ZONE {String(zone.id).padStart(2, "0")}</span>
            <h3>{zone.name}</h3>
            <small>Campus transport location</small>
          </div>
        ))}
      </div>
    </section>
  );
}
