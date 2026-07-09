---
title: "Cloud Sentinel"
tagline: "Automated AWS security auditing across services"
description: "A microservice-based tool that scans an AWS account for common misconfigurations — unencrypted S3 buckets, exposed EC2 security groups, missing IAM MFA — and surfaces them on a live dashboard. Runs a Python worker against boto3 for the actual AWS scanning, behind a Node/Express gateway with JWT-authenticated access to the dashboard."
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
highlights:
  - "Flags exposed S3 buckets, open security groups, and missing IAM MFA keys"
  - "Python worker uses boto3 to run the actual AWS audits, queued through Redis"
  - "JWT-authenticated Node/Express gateway in front of a Next.js dashboard, backed by PostgreSQL"
---

Write your full case study or technical architecture details for Cloud Sentinel here.