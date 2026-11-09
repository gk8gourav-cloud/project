function peakFactor(hour) {
  if ((hour >= 8 && hour <= 10) || (hour >= 16 && hour <= 18)) return 1.0;
  if (hour >= 11 && hour <= 15) return 0.6;
  return 0.25;
}

export function simulateDemand(buses, hour) {
  const factor = peakFactor(hour);
  return buses.map((b) => {
    const demand = Math.min(
      b.capacity,
      Math.round(b.capacity * factor * (0.8 + Math.random() * 0.4))
    );
    return { ...b, demand, load: Math.round((demand / b.capacity) * 100) };
  });
}
