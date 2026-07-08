---
title: "Isolating Traffic with Private Networking"
date: "2026-04-05"
summary: "Designing a secure network topology to keep lab experiments off the home LAN."
---

As soon as you start spinning up multiple services and testing automated configurations,
keeping them on your default home Wi-Fi network becomes a massive security risk. 

This week, I overhauled the network topology, implementing a strict private networking
model for Olympus. Virtual machines like Hestia and Athena are now contained within their own 
subnets, with firewall rules tightly regulating what can talk to the public internet and 
what can talk back to Artemis. 

It’s a bit more work up front to handle DNS mapping and routing tables manually, but it 
means I can break things internally without accidentally knocking my house offline or exposing 
services to the open web.