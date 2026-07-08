---
title: "Simulating AWS locally with LocalStack"
date: "2026-05-12"
summary: "Why I test Terraform against LocalStack before ever touching real AWS."
---

Running `terraform apply` against a real AWS account while still learning is a good way to
rack up a surprise bill or leave something exposed. LocalStack solves this by emulating
AWS services locally, so I can iterate on Terraform configs safely before pointing them
at a real account.

For the homelab, this meant I could test S3 bucket policies, IAM roles, and networking
rules entirely offline, then only "graduate" a config to real AWS once it behaved
correctly in the simulated environment.

The tradeoff: LocalStack doesn't perfectly replicate every AWS service, so some things
still need a final check against the real thing. But for iterating fast without cost or
risk, it's been worth it.
