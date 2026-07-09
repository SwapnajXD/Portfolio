---
title: "HomeLab"
tagline: "A self-hosted infrastructure lab with named hosts, full observability, and tested recovery"
description: "A Proxmox VE homelab with three purpose-built hosts — Apollo runs the hypervisor, Athena runs operations (k3s, Prometheus, Grafana, Loki, Alloy, a FastAPI dashboard backend), and Hestia runs the frontend edge (Homepage, Vaultwarden). Managed remotely over Tailscale from a workstation called Artemis, with Terraform-provisioned infra tested against a custom AWS emulator before touching real cloud spend, and alerting that actually reaches me on Telegram."
tech:
  - "Proxmox"
  - "Terraform"
  - "k3s"
  - "Prometheus"
  - "Grafana"
  - "Grafana Alloy"
  - "Loki"
  - "FastAPI"
  - "Tailscale"
repo: "https://github.com/SwapnajXD/HomeLab"
category: "Infrastructure"
order: 1
highlights:
  - "Three-host topology: Apollo (Proxmox hypervisor), Athena (ops/k3s/observability), Hestia (frontend edge)"
  - "Full observability stack — Prometheus, Grafana, Loki, Grafana Alloy — with alerts routed to Telegram"
  - "Terraform-provisioned infra validated against a custom local AWS emulator before any real cloud spend"
  - "A cron-driven data pipeline feeds a FastAPI backend that powers a self-hosted homepage dashboard"
---

Full case study coming soon — architecture, the recovery runbooks, and what broke along the way.
