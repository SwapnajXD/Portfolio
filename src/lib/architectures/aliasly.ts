import type { ArchitectureDiagramData } from "@/components/ArchitectureDiagram";

export const aliasly: ArchitectureDiagramData = {
  command: "architecture --interactive",
  heading: "Shorten a link, resolve a link",
  viewBox: "0 0 980 320",
  nodes: [
    { id: "browser", label: "Browser", sublabel: "SPA", x: 20, y: 140, w: 110, h: 60, info: "Where you paste a link to shorten, or land after clicking one." },
    { id: "nginx", label: "Nginx", sublabel: "static server", x: 200, y: 140, w: 110, h: 60, info: "Serves the built Vite/React SPA and proxies traffic through to the API. In the split deployment (Vercel + a tunnel), Vercel plays this role instead." },
    { id: "api", label: "API", sublabel: "Express", x: 380, y: 140, w: 130, h: 60, info: "Validates and (optionally) safety-screens the URL, hashes an optional password with scrypt, and resolves links Redis-first with a Postgres fallback — except for password-protected links, which always hit Postgres so the password check can't be bypassed via a stale cache entry." },
    { id: "redis", label: "Redis", sublabel: "cache, 1hr TTL", x: 580, y: 40, w: 130, h: 60, info: "Caches slug → URL so resolves are fast, backfilled automatically on a cache miss. Never used for password-protected links, and its TTL is capped to the link's own expiry so it can't outlive the link." },
    { id: "postgres", label: "PostgreSQL", sublabel: "source of truth", x: 580, y: 220, w: 140, h: 60, info: "Stores each slug (a unique, user-chosen phrase — no random ID appended), an anonymous delete/edit token, optional password hash, expiry, and click count. A background job purges expired rows every 15 minutes." },
    { id: "safety", label: "Safety checks", sublabel: "optional", x: 780, y: 140, w: 160, h: 60, info: "Google Safe Browsing (malicious-URL screening) and Cloudflare Turnstile (CAPTCHA) — both entirely opt-in via API keys. If unset, they're skipped with zero friction, which keeps local dev simple while still letting a public deployment turn on real protection." },
  ],
  edges: [
    { from: "browser", to: "nginx", path: "M 130 170 L 200 170", labelX: 165, labelY: 160, label: "loads SPA" },
    { from: "browser", to: "api", path: "M 75 140 C 75 90, 300 90, 380 165", labelX: 220, labelY: 85, label: "POST /api/shorten" },
    { from: "nginx", to: "api", path: "M 310 170 L 380 170", labelX: 345, labelY: 160, label: "proxy" },
    { from: "api", to: "redis", path: "M 500 145 C 540 110, 550 90, 580 72", labelX: 545, labelY: 100, label: "set / get" },
    { from: "api", to: "postgres", path: "M 500 195 C 540 220, 550 230, 580 245", labelX: 545, labelY: 230, label: "insert / query" },
    { from: "api", to: "safety", path: "M 510 170 L 780 170", labelX: 645, labelY: 160, label: "screen (optional)" },
  ],
  steps: [
    { edge: 0, narration: "You load the app — Nginx (or Vercel, in the split deployment) serves the built Vite/React SPA." },
    { edge: 1, narration: "Submitting a link — with your chosen phrase, an optional expiry, and an optional password — sends a POST /api/shorten straight to the API." },
    { edge: 5, narration: "If configured, the URL is screened against Google Safe Browsing and the request's CAPTCHA token is verified via Cloudflare Turnstile — both skipped entirely if their API keys aren't set." },
    { edge: 4, narration: "The phrase itself becomes the slug — no random ID appended. A duplicate returns 409, unless the existing link at that phrase already expired, in which case it's automatically reclaimed for the new one." },
    { edge: 3, narration: "Unless the link is password-protected, Redis is primed with the destination, TTL-capped to whichever comes first: 1 hour, or the link's own expiry." },
    { edge: 2, narration: "Later, visiting the short link resolves Redis-first with a Postgres fallback, increments the click count, and enforces expiry (410 if expired) — password-protected links always check Postgres directly and require the correct password before revealing anything." },
  ],
};
