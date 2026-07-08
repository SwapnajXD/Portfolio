---
title: "Setting up observability across the Olympus HomeLab"
date: "2026-06-18"
summary: "Bringing Prometheus, Grafana, and Loki into the lab to stop flying blind."
---

Running a home lab without metrics is fine until a service suddenly drops or a disk
fills up unexpectedly. To get a clear picture of what’s happening across Apollo and Artemis,
I spun up a centralized monitoring stack using Prometheus, Grafana, and Loki.

The goal wasn't just pretty dashboards. I wanted to see resource exhaustion patterns
in real-time and collect logs across scattered services without SSH'ing into three
different boxes every time something misbehaved. 

Now, Node Exporter feeds hardware metrics into Prometheus, while Promtail handles log 
forwarding to Loki. Having a single pane of glass makes debugging configuration drifts 
in the lab feel a lot closer to a production enterprise environment.