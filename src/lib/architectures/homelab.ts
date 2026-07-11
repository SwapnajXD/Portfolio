import type { ArchitectureDiagramData } from "@/components/ArchitectureDiagram";

export const homelab: ArchitectureDiagramData = {
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
