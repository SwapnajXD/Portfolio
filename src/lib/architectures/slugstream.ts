import type { ArchitectureDiagramData } from "@/components/ArchitectureDiagram";

export const slugstream: ArchitectureDiagramData = {
  command: "architecture --interactive",
  heading: "Shorten a link, resolve a link",
  viewBox: "0 0 880 320",
  nodes: [
    { id: "browser", label: "Browser", sublabel: "SPA", x: 20, y: 140, w: 110, h: 60, info: "Where you paste a link to shorten, or land after clicking one." },
    { id: "nginx", label: "Nginx", sublabel: "static server", x: 200, y: 140, w: 110, h: 60, info: "Serves the built Vite/React SPA and proxies traffic through to the API." },
    { id: "api", label: "API", sublabel: "Express", x: 380, y: 140, w: 130, h: 60, info: "Generates collision-safe slugs (nanoid + retry), blocks unsafe file extensions, and resolves links Redis-first with a Postgres fallback." },
    { id: "redis", label: "Redis", sublabel: "cache, 1hr TTL", x: 580, y: 40, w: 130, h: 60, info: "Caches slug → URL for 1 hour so resolves are fast, backfilled automatically on a cache miss." },
    { id: "postgres", label: "PostgreSQL", sublabel: "source of truth", x: 580, y: 220, w: 140, h: 60, info: "Stores every slug with a unique constraint — the API retries slug generation up to 3 times on a collision." },
  ],
  edges: [
    { from: "browser", to: "nginx", path: "M 130 170 L 200 170", labelX: 165, labelY: 160, label: "loads SPA" },
    { from: "browser", to: "api", path: "M 75 140 C 75 90, 300 90, 380 165", labelX: 220, labelY: 85, label: "POST /api/shorten" },
    { from: "nginx", to: "api", path: "M 310 170 L 380 170", labelX: 345, labelY: 160, label: "proxy" },
    { from: "api", to: "redis", path: "M 500 145 C 540 110, 550 90, 580 72", labelX: 545, labelY: 100, label: "set / get" },
    { from: "api", to: "postgres", path: "M 500 195 C 540 220, 550 230, 580 245", labelX: 545, labelY: 230, label: "insert / query" },
  ],
  steps: [
    { edge: 0, narration: "You load the app — Nginx serves the built Vite/React SPA." },
    { edge: 1, narration: "Submitting a link sends a POST /api/shorten straight to the API." },
    { edge: 3, narration: "The API validates the URL, blocks unsafe extensions, generates a slug with nanoid, and primes Redis with a 1-hour TTL." },
    { edge: 4, narration: "The slug and destination URL are inserted into Postgres — a collision triggers up to 3 retries." },
    { edge: 2, narration: "Later, when someone visits the short link, Nginx proxies the request through and the API checks Redis first, falling back to Postgres on a miss." },
  ],
};
