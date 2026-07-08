---
title: "Automated Deployments via Terraform and Floci"
date: "2026-05-28"
summary: "Moving away from point-and-click virtualization toward code-driven infrastructure."
---

Spinning up virtual machines by clicking through a web GUI is fine for a one-off test, but
it fails the reproducibility test. If a drive drops today, rebuilding the lab from memory 
would be a nightmare.

I've officially codified the state of Olympus. Using Terraform alongside Floci, I can now 
declaratively define our VMs, storage volumes, and network interfaces. 

If I need a fresh instance on Apollo, I don't download an ISO and click next five times; 
I update a `.tf` configuration file, run a pipeline, and let the code handle the provisioning. 
Infrastructure as Code turns cattle into infrastructure, making the entire homelab reproducible.