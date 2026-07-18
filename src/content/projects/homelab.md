---
title: "HomeLab"
tagline: "A self-hosted infrastructure lab with full observability, tested recovery, and an honest postmortem for what didn't work"
description: "A Proxmox VE homelab with three purpose-built hosts — Apollo runs the hypervisor, Athena runs operations (K3s, Prometheus, Grafana, Loki, Alloy), and Hestia runs a stock, dependency-free Homepage dashboard plus Vaultwarden. Managed remotely over Tailscale from a workstation called Artemis, with Terraform-provisioned infra tested against Floci, a local AWS emulator, before touching real cloud spend. A custom FastAPI dashboard backend was built here too — then fully decommissioned once it stopped earning its maintenance cost, a call that's documented rather than hidden."
tech:
  - "Proxmox"
  - "Terraform"
  - "K3s"
  - "Prometheus"
  - "Grafana"
  - "Grafana Alloy"
  - "Loki"
  - "Floci"
  - "Tailscale"
repo: "https://github.com/SwapnajXD/HomeLab"
category: "Infrastructure"
order: 1
featured: true
highlights:
  - "Three-host topology: Apollo (Proxmox hypervisor), Athena (ops/K3s/observability), Hestia (frontend edge)"
  - "Full observability stack — Prometheus, Grafana, Loki, Grafana Alloy — with alerts routed to Telegram"
  - "Terraform-provisioned infra validated against Floci, a local AWS emulator, before any real cloud spend"
  - "Built a custom FastAPI dashboard backend, then made the call to fully decommission it once it stopped earning its complexity — documented as a postmortem, not swept under the rug"
---

## Why this exists

Most homelabs run Plex and call it a day. This one is built to be a genuine practice environment for infrastructure engineering and SRE work — virtualization, Kubernetes, observability, Infrastructure as Code, incident response, and disaster recovery, all against real (if small-scale) hardware, with real outages and real fixes.

## The three-host topology

**Apollo** is the bare-metal Proxmox VE host — hypervisor, virtual networking, and NAT gateway. It runs `iptables` to give the internal `10.10.10.0/24` network outbound internet access and selectively forwards specific ports to internal services.

**Athena** (Ubuntu VM) is the operational core: Prometheus, Grafana, Loki, Grafana Alloy, Node Exporter, Proxmox Exporter, Portainer, and a single-node K3s cluster, managed remotely from Artemis over `kubectl`.

**Hestia** (Alpine LXC) is the lightweight frontend — Homepage and Vaultwarden, chosen specifically for fast startup and strong workload isolation from the heavier services on Athena.

**Artemis** is the external management workstation. Keeping admin tooling off the infrastructure itself means I can still manage the lab during a partial outage.

## Built it, used it, then took it apart

The most interesting part of this project isn't a feature — it's a decision to remove one.

Early on, I extended Homepage into a custom "Olympus" command center: a `custom.js`/`custom.css` widget showing now-playing music, weather, anime tracking, investments, and a dynamic wallpaper engine, backed by a FastAPI aggregation service on Athena (`/pokemon`, `/lastfm`, `/weather`, `/mal`, and an aggregate `/olympus` endpoint). Getting there involved real bugs: a Pokémon API response with unescaped newlines breaking naive JSON construction, a `curl`-built JSON heredoc corrupted by a song title containing quotes, cron jobs with no concurrency control overlapping and spamming logs, and a GitHub API rate limit with no fallback that left the dashboard's hero image pointing at a broken URL.

Every one of those got fixed — `jq -n --arg` instead of hand-built JSON, `flock` on every cron entry, a `default.jpg` fallback for rate-limited responses. But the widget itself kept accumulating DOM-manipulation JavaScript and duplicated CSS across redesigns, and a mobile-timing bug (the widget assumed panels existed before Homepage had finished building the page on faster mobile load times) made it clear this was **too fragile and too tightly coupled to Homepage's internals** to maintain safely across updates.

So I tore it out. The frontend widget went first. The FastAPI backend survived a while longer, kept alive on the theory it might still be useful — until it became clear that a backend nobody's consuming isn't earning its complexity either, and it got decommissioned too. Hestia's Homepage now runs in its stock, default configuration: service links only, no custom code, no backend dependency.

I kept all of it documented — the build, the bugs, the rollback, the final decommission — instead of quietly deleting the history. The lesson mattered more than the feature: **only keep an aggregation backend around if something is still consuming it**, and Homepage works better as a dashboard than as an application platform.

## Real incidents, real fixes

A few from the postmortem log that generalize well beyond this specific lab:

**Athena went unreachable on the Tailnet.** Grafana, Prometheus, Loki — all looked dead from Artemis. Before assuming Tailscale was broken, I worked a troubleshooting ladder: gateway (`ping 10.10.10.1`) → internet (`ping 8.8.8.8`) → HTTPS (`curl -I https://google.com`) → Tailscale (`tailscale status`) → peer reachability. Turned out to be a transient upstream ISP interruption — Tailscale's "logged out" error was a downstream symptom, not the root cause. Everything recovered with zero configuration changes. The actual lesson was the ladder itself: check layers in order instead of chasing the most visible error message first.

**Vaultwarden looked broken but wasn't.** DNAT packet counters were increasing (proof packets were arriving), ping worked, Docker's port mapping was correct — yet `curl` returned `Received HTTP/0.9 when not allowed`. The container logs said `Rocket has launched from https://0.0.0.0:80` — it was serving HTTPS on that port, not HTTP. No networking was broken at all; I was just sending plain HTTP to a TLS listener. Fix: use `https://`. Zero config changes required.

**K3s pods stuck in `ContainerCreating`.** Root cause was Ubuntu still running cgroup v1 while modern K3s/containerd expects cgroup v2. Fixed with `systemd.unified_cgroup_hierarchy=1` in GRUB, then verified via `stat -fc %T /sys/fs/cgroup` returning `cgroup2fs`.

## What's still broken

I'd rather say this plainly than leave it out: **Grafana Alloy is only discovering 2 of 9 running Docker containers on Athena.** The socket is mounted correctly, permissions look right, but `prometheus`, `cadvisor`, `node-exporter`, `proxmox-exporter`, `portainer`, and `floci_aws` logs aren't reaching Loki. Suspected cause is an incomplete `discovery.docker` block, not investigated to a conclusion yet. Metrics are unaffected — Prometheus, Grafana dashboards, and Telegram alerting have stayed fully healthy throughout. It's on the roadmap, not hidden from it.

## Disaster recovery, actually tested

Recovery follows a dependency-aware model with defined targets, not just a document that says "we have a DR plan":

| Priority | Components | Target RTO |
|---|---|---|
| 1 | Apollo, network bridge, NAT gateway, Tailscale | < 5 min |
| 2 | Athena, K3s cluster | < 3 min |
| 3 | Hestia, Homepage, Vaultwarden | < 2 min |
| 4 | Observability stack (Grafana, Prometheus, Loki, Alloy) | < 2 min |
| 5 | Floci and Terraform services | < 1 min |

Foundational infrastructure recovers before application services, deliberately — there's no point bringing up a dashboard before the network it depends on is back. A formal validation pass covering compute, networking, Kubernetes, observability, and recovery procedures has been run and passed across every component currently in the stack.

## What's next

Fixing the Alloy log-discovery gap is the immediate priority. Beyond that: automated backup validation instead of just documented procedures, CI/CD experimentation against the K3s cluster, longer-term metrics retention, and — mostly for fun — ESP32 telemetry integration into the observability stack.
