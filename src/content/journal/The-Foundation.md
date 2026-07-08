---
title: "Provisioning the Pillars: Setting up Apollo and Artemis"
date: "2026-03-10"
summary: "Bootstrapping the physical hardware layer of the Olympus HomeLab."
---

Every infrastructure project needs a solid foundation. For the Olympus HomeLab, that
means two primary nodes: Apollo, my heavy-lifting hypervisor, and Artemis, the dedicated
management workstation. 

Instead of treating these machines like consumer PCs, I’ve architected them as isolated
infrastructure blocks. Apollo is configured to slice up resources for downstream virtual 
machines, while Artemis serves as the command center for running playbooks, keeping secrets, 
and managing network states. 

Getting the base operating systems flashed, configuring static IPs, and mapping the initial
topology was a night of terminal commands, but the core compute layer is now locked down.