---
title: "Lightweight clustering: Deploying K3s on Athena"
date: "2026-07-02"
summary: "Why I chose K3s for container orchestration on my Athena virtual machine."
---

Vanilla Kubernetes is an absolute resource hog, making it a tough sell for a lean home 
infrastructure setup. To practice cloud-native operations without completely draining my 
hardware, I provisioned a dedicated VM named Athena and deployed K3s.

K3s strips out the bulky legacy cloud-provider plugins and storage drivers, packing the 
entire control plane into a single lightweight binary that sips system memory. 

Setting it up on Athena gives me a fully functional, CNCF-certified cluster environment 
to experiment with GitOps, Helm charts, and ingress controllers entirely local to my network.
It’s the perfect playground for breaking and fixing clusters without paying cloud premiums.