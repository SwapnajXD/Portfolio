import type { ArchitectureDiagramData } from "@/components/ArchitectureDiagram";

export const cloudSentinel: ArchitectureDiagramData = {
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
