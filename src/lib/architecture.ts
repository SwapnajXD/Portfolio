import type { ArchitectureDiagramData } from "@/components/ArchitectureDiagram";

const cloudSentinel: ArchitectureDiagramData = {
  command: "architecture --interactive",
  heading: "How a scan request actually flows",
  viewBox: "0 0 1020 420",
  nodes: [
    { id: "browser", label: "Browser", sublabel: "you", x: 20, y: 170, w: 100, h: 56, info: "Where you view scan results and trigger new audits." },
    { id: "nginx", label: "NGINX", sublabel: "entrypoint", x: 170, y: 170, w: 110, h: 56, info: "Reverse proxy and single entrypoint — routes \u201c/\u201d to the dashboard and \u201c/api/*\u201d + \u201c/health\u201d straight to the gateway." },
    { id: "dashboard", label: "Dashboard", sublabel: "Next.js", x: 330, y: 50, w: 130, h: 56, info: "Next.js frontend rendering the live findings dashboard." },
    { id: "gateway", label: "Gateway", sublabel: "Express + JWT", x: 330, y: 290, w: 140, h: 56, info: "Node/Express API layer. Handles JWT auth, queues scans, serves reports, and can forward a report to Gemini for an AI-written summary." },
    { id: "redis", label: "Redis", sublabel: "queue", x: 520, y: 290, w: 110, h: 56, info: "Message queue (list-based). Decouples the API from the scanning work so requests return instantly." },
    { id: "worker", label: "Worker", sublabel: "Python", x: 680, y: 290, w: 130, h: 56, info: "Python process that pulls jobs off the queue and runs the actual security checks." },
    { id: "aws", label: "AWS / Floci", sublabel: "boto3 or emulator", x: 680, y: 50, w: 150, h: 56, external: true, info: "Either the real AWS account (via boto3), or Floci, a local emulator used for safe testing. External to this system either way." },
    { id: "postgres", label: "PostgreSQL", sublabel: "findings + users", x: 860, y: 290, w: 130, h: 56, info: "Stores every finding and user record, so history and trends are available, not just the latest scan." },
  ],
  edges: [
    { from: "browser", to: "nginx", path: "M 120 198 L 170 198", labelX: 145, labelY: 188, label: "HTTP(S)" },
    { from: "nginx", to: "dashboard", path: "M 280 185 C 300 150, 300 110, 330 85", labelX: 288, labelY: 140, label: "/" },
    { from: "nginx", to: "gateway", path: "M 280 210 C 300 240, 300 280, 330 305", labelX: 288, labelY: 260, label: "/api/*" },
    { from: "dashboard", to: "gateway", path: "M 397 106 L 400 290", labelX: 420, labelY: 200, label: "fetch" },
    { from: "gateway", to: "redis", path: "M 470 318 L 520 318", labelX: 495, labelY: 308, label: "enqueue" },
    { from: "redis", to: "worker", path: "M 630 318 L 680 318", labelX: 655, labelY: 308, label: "dequeue" },
    { from: "worker", to: "aws", path: "M 745 290 L 755 106", labelX: 775, labelY: 200, label: "scan" },
    { from: "worker", to: "postgres", path: "M 810 318 L 860 318", labelX: 835, labelY: 308, label: "write" },
    { from: "postgres", to: "gateway", path: "M 860 346 C 700 410, 500 410, 400 350", labelX: 630, labelY: 400, label: "read (polled)", dashed: true },
  ],
  steps: [
    { edge: 0, narration: "Every request hits NGINX first — the single entrypoint into the system." },
    { edge: 1, narration: "Static and app requests route straight through to the Next.js dashboard." },
    { edge: 3, narration: "Clicking \u201cScan\u201d calls the gateway's API. Every request is checked against a JWT before anything runs." },
    { edge: 4, narration: "Instead of scanning inline, the gateway pushes a scan job onto Redis and returns immediately." },
    { edge: 5, narration: "A Python worker pulls the job off the queue." },
    { edge: 6, narration: "The worker scans the account for real via boto3 — or, in test mode, against Floci, a local AWS emulator." },
    { edge: 7, narration: "Findings get written to Postgres as they're found." },
    { edge: 8, narration: "The dashboard polls the gateway, which reads the latest findings back out of Postgres." },
  ],
};

const homelab: ArchitectureDiagramData = {
  command: "architecture --topology",
  heading: "Three hosts, one lab",
  viewBox: "0 0 900 340",
  nodes: [
    { id: "artemis", label: "Artemis", sublabel: "management", x: 20, y: 140, w: 110, h: 60, info: "The management workstation. Admin access, Terraform, and kubectl all go through here." },
    { id: "apollo", label: "Apollo", sublabel: "Proxmox host", x: 190, y: 140, w: 120, h: 60, info: "The Proxmox VE hypervisor. Runs Athena and Hestia as a VM and an LXC container." },
    { id: "athena", label: "Athena", sublabel: "ops + observability", x: 400, y: 30, w: 190, h: 76, info: "The operations VM. Runs k3s, the full observability stack (Prometheus, Grafana, Loki, Alloy), Portainer, and a FastAPI backend for the dashboard." },
    { id: "hestia", label: "Hestia", sublabel: "frontend edge", x: 400, y: 230, w: 190, h: 76, info: "A lightweight LXC container running the frontend edge — the Homepage dashboard and Vaultwarden for secrets." },
    { id: "telegram", label: "Telegram", sublabel: "alerts", x: 660, y: 30, w: 130, h: 60, external: true, info: "Grafana alerting fires here when a Prometheus rule is breached — the actual notification I get pinged with." },
    { id: "external", label: "External APIs", sublabel: "cron fetch", x: 660, y: 230, w: 150, h: 60, external: true, info: "Cron jobs on Athena pull data from external APIs into JSON files on a schedule, which the dashboard reads." },
  ],
  edges: [
    { from: "artemis", to: "apollo", path: "M 130 170 L 190 170", labelX: 160, labelY: 160, label: "tailscale" },
    { from: "apollo", to: "athena", path: "M 310 155 C 350 130, 370 90, 400 68", labelX: 340, labelY: 110, label: "VM" },
    { from: "apollo", to: "hestia", path: "M 310 185 C 350 210, 370 250, 400 268", labelX: 340, labelY: 235, label: "LXC" },
    { from: "external", to: "athena", path: "M 660 250 C 600 180, 590 120, 590 106", labelX: 620, labelY: 170, label: "cron fetch → JSON" },
    { from: "athena", to: "hestia", path: "M 495 106 L 495 230", labelX: 520, labelY: 170, label: "dashboard API" },
    { from: "athena", to: "telegram", path: "M 590 60 L 660 60", labelX: 625, labelY: 50, label: "grafana alert" },
  ],
  steps: [
    { edge: 0, narration: "I manage the whole lab remotely over Tailscale from Artemis — Terraform, kubectl, and admin access all go through here." },
    { edge: 1, narration: "Apollo, the Proxmox host, runs Athena as a VM — home to k3s, Prometheus, Grafana, Loki, Alloy, and a FastAPI backend." },
    { edge: 2, narration: "Apollo also runs Hestia as a lightweight LXC container for the frontend edge — Homepage and Vaultwarden." },
    { edge: 3, narration: "Cron jobs on Athena pull data from external APIs into JSON files on a schedule." },
    { edge: 4, narration: "The Homepage dashboard on Hestia reads that data straight from Athena's FastAPI backend." },
    { edge: 5, narration: "When a Prometheus metric crosses an alert threshold, Grafana fires and I get pinged directly on Telegram." },
  ],
};

const slugstream: ArchitectureDiagramData = {
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

const receipt: ArchitectureDiagramData = {
  command: "architecture --interactive",
  heading: "From bank statement to Cashew import — and it learns",
  viewBox: "0 0 900 360",
  nodes: [
    { id: "input", label: "Statement", sublabel: ".xlsx / .csv", x: 20, y: 140, w: 110, h: 60, info: "A bank or credit card statement export, in XLSX or CSV." },
    { id: "entry", label: "Entry", sublabel: "CLI or web UI", x: 190, y: 140, w: 130, h: 60, info: "Either the CLI, for batch conversion, or a small web UI for interactive review and correction." },
    { id: "parser", label: "Parser", sublabel: "xlsx / csv", x: 380, y: 140, w: 120, h: 60, info: "Detects the file type and normalizes it into rows — XLSX parsing is pure Python (zipfile + xml.etree), no external library." },
    { id: "classifier", label: "Classifier", sublabel: "rules + learned", x: 560, y: 140, w: 140, h: 60, info: "Two-stage categorization: regex rules first, then any learned merchant-to-category mappings." },
    { id: "output", label: "CSV Output", sublabel: "Cashew-ready", x: 760, y: 140, w: 120, h: 60, info: "A CSV formatted for direct import into the Cashew budgeting app." },
    { id: "learned", label: "Learned Rules", sublabel: "learned_rules.json", x: 560, y: 270, w: 160, h: 56, info: "Corrections made in the web UI are persisted here and used to improve future classifications." },
  ],
  edges: [
    { from: "input", to: "entry", path: "M 130 170 L 190 170", labelX: 160, labelY: 160, label: "select" },
    { from: "entry", to: "parser", path: "M 320 170 L 380 170", labelX: 350, labelY: 160, label: "dispatch" },
    { from: "parser", to: "classifier", path: "M 500 170 L 560 170", labelX: 530, labelY: 160, label: "transactions" },
    { from: "classifier", to: "output", path: "M 700 170 L 760 170", labelX: 730, labelY: 160, label: "CashewRow" },
    { from: "entry", to: "learned", path: "M 255 200 C 300 260, 450 298, 560 298", labelX: 400, labelY: 290, label: "/learn: your edits" },
    { from: "learned", to: "classifier", path: "M 630 270 L 630 200", labelX: 660, labelY: 240, label: "used next run", dashed: true },
  ],
  steps: [
    { edge: 0, narration: "You point the CLI at a file, or upload it through the web UI." },
    { edge: 1, narration: "The file gets dispatched to the right parser — a hand-rolled reader for XLSX or a CSV loader, no pandas or openpyxl involved." },
    { edge: 2, narration: "Each row becomes a transaction, then runs through classification — regex rules first, then any learned mappings." },
    { edge: 3, narration: "The categorized transaction becomes a CashewRow and gets written out as an importable CSV." },
    { edge: 4, narration: "In the web UI, correcting a category posts to /learn, which updates learned_rules.json." },
    { edge: 5, narration: "Next time, that correction is applied automatically — the classifier gets a little smarter every run." },
  ],
};

export const architectures: Record<string, ArchitectureDiagramData> = {
  "cloud-sentinel": cloudSentinel,
  homelab,
  slugstream,
  receipt,
};
