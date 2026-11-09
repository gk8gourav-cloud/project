export function dijkstra(roads, start, end) {
  const graph = {};
  roads.forEach(([a, b, w]) => {
    (graph[a] ||= []).push([b, w]);
    (graph[b] ||= []).push([a, w]);
  });

  const dist = {};
  const prev = {};
  const visited = new Set();
  Object.keys(graph).forEach((k) => (dist[k] = Infinity));
  dist[start] = 0;

  while (true) {
    let u = null;
    for (const k of Object.keys(dist)) {
      if (!visited.has(k) && (u === null || dist[k] < dist[u])) u = k;
    }
    if (u === null || dist[u] === Infinity || u === String(end)) break;
    visited.add(u);
    for (const [v, w] of graph[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
      }
    }
  }

  if (dist[end] === Infinity || dist[end] === undefined) return null;
  const path = [];
  let cur = String(end);
  while (cur !== undefined) {
    path.unshift(Number(cur));
    cur = prev[cur];
  }
  return { path, distance: dist[end] };
}
