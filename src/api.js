import { initialBuses } from "./data/buses";
import { drivers } from "./data/drivers";
import { zones, roads } from "./data/zones";
import { load, save } from "./utils/storage";
import { dijkstra } from "./utils/dijkstra";
import { simulateDemand as runSimulation } from "./utils/simulation";

const KEY = "campusflow-buses";

export const getZones = () => zones;
export const getDrivers = () => drivers;
export const getBuses = () => load(KEY, initialBuses);

export function addBus(bus) {
  const buses = [...getBuses(), bus];
  save(KEY, buses);
  return buses;
}

export function removeBus(id) {
  const buses = getBuses().filter((b) => b.id !== id);
  save(KEY, buses);
  return buses;
}

export function changeDriver(id, driver) {
  const buses = getBuses().map((b) => (b.id === id ? { ...b, driver } : b));
  save(KEY, buses);
  return buses;
}

export function resetData() {
  save(KEY, initialBuses);
  return initialBuses;
}

export function optimizeRoute(fromId, toId) {
  const result = dijkstra(roads, Number(fromId), Number(toId));
  if (!result) return null;
  return {
    distance: result.distance,
    minutes: Math.max(1, Math.round(result.distance / 250)),
    names: result.path.map((id) => zones.find((z) => z.id === id).name),
  };
}

export const simulateDemand = (hour) => runSimulation(getBuses(), hour);

export function updateBus(id, changes) {
  const buses = getBuses().map((b) => (b.id === id ? { ...b, ...changes } : b));
  save(KEY, buses);
  return buses;
}
