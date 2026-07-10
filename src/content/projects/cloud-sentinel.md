---
title: "Cloud Sentinel"
tagline: "Automated AWS security auditing, from queued scan to AI-written summary"
description: "A microservice-based tool that scans an AWS account for common misconfigurations — unencrypted S3 buckets, exposed EC2 security groups, missing IAM MFA — and surfaces them on a live dashboard. NGINX routes traffic to a JWT-authenticated Express gateway, which queues scan jobs on Redis for a Python worker to run against real AWS (via boto3) or a local emulator called Floci. Findings land in Postgres, and an AI endpoint can turn a report into a plain-English summary."
tech:
  - "Next.js"
  - "Node.js"
  - "Python"
  - "boto3"
  - "Redis"
  - "PostgreSQL"
  - "Nginx"
repo: "https://github.com/SwapnajXD/Cloud-Sentinel"
category: "Backend / DevOps"
order: 2
highlights:
  - "Flags exposed S3 buckets, open security groups, and missing IAM MFA keys"
  - "Python worker runs against real AWS via boto3 or a local emulator (Floci), same emulator reused in HomeLab"
  - "JWT-authenticated gateway queues scans through Redis instead of blocking on the request"
  - "An /api/ai/summary endpoint turns a raw findings report into a plain-English summary"
---

Full case study coming soon — the queueing design, the two scan modes, and how the AI summary endpoint works.
