import type { ArchitectureDiagramData } from "@/components/ArchitectureDiagram";

export const homelab: ArchitectureDiagramData = {
  command: "architecture --topology",
  heading: "Three hosts, one lab",
  viewBox: "0 0 900 340",
  nodes: [
    { id: "artemis", label: "Artemis", sublabel: "management", x: 20, y: 140, w: 110, h: 60, info: "The management workstation. Admin access, Terraform, and kubectl all go through here." },
    { id: "apollo", label: "Apollo", sublabel: "Proxmox host", x: 190, y: 140, w: 120, h: 60, info: "The Proxmox VE hypervisor and network gateway. Runs Athena and Hestia as a VM and an LXC container, and handles NAT/port forwarding via iptables." },
    { id: "athena", label: "Athena", sublabel: "ops + observability", x: 400, y: 30, w: 190, h: 76, info: "The operations VM. Runs K3s, Prometheus, Grafana, Loki, Grafana Alloy, Node Exporter, Proxmox Exporter, and Portainer." },
    { id: "hestia", label: "Hestia", sublabel: "frontend edge", x: 400, y: 230, w: 190, h: 76, info: "A lightweight Alpine LXC running a stock, unmodified Homepage dashboard and Vaultwarden. Previously ran a custom widget backed by a FastAPI aggregator on Athena — both were decommissioned after proving too fragile to maintain, and Homepage now has zero external dependencies." },
    { id: "telegram", label: "Telegram", sublabel: "alerts", x: 660, y: 30, w: 130, h: 60, external: true, info: "Grafana alerting fires here when a Prometheus rule is breached — the actual notification I get pinged with." },
    { id: "floci", label: "Floci", sublabel: "AWS emulation", x: 660, y: 230, w: 150, h: 60, external: true, info: "A local AWS emulator (S3, DynamoDB, and more). Terraform changes get validated against it before ever touching a real AWS account." },
  ],
  edges: [
    { from: "artemis", to: "apollo", path: "M 130 170 L 190 170", labelX: 160, labelY: 160, label: "tailscale" },
    { from: "apollo", to: "athena", path: "M 310 155 C 350 130, 370 90, 400 68", labelX: 340, labelY: 110, label: "VM" },
    { from: "apollo", to: "hestia", path: "M 310 185 C 350 210, 370 250, 400 268", labelX: 340, labelY: 235, label: "LXC" },
    { from: "athena", to: "floci", path: "M 590 106 C 610 160, 630 200, 660 245", labelX: 640, labelY: 170, label: "terraform apply" },
    { from: "athena", to: "telegram", path: "M 590 60 L 660 60", labelX: 625, labelY: 50, label: "grafana alert" },
  ],
  steps: [
    { edge: 0, narration: "I manage the whole lab remotely over Tailscale from Artemis — Terraform, kubectl, and admin access all go through here." },
    { edge: 1, narration: "Apollo, the Proxmox host, runs Athena as a VM — home to K3s, Prometheus, Grafana, Loki, Alloy, and Portainer." },
    { edge: 2, narration: "Apollo also runs Hestia as a lightweight LXC container. It's a stock Homepage dashboard now — a custom widget and its FastAPI backend used to live here, but both got decommissioned once they stopped earning their complexity." },
    { edge: 3, narration: "Terraform changes get validated against Floci, a local AWS emulator, before touching real cloud spend." },
    { edge: 4, narration: "When a Prometheus metric crosses an alert threshold, Grafana fires and I get pinged directly on Telegram." },
  ],
};
