---
title: "Cloud Sentinel"
tagline: "Automated AWS security auditing, from queued scan to a CIS-mapped risk score"
description: "A microservice-based tool that scans an AWS account for real misconfigurations — public S3 buckets, exposed security groups, account-wide missing IAM MFA, unencrypted RDS instances, publicly-invokable Lambda functions — and surfaces them on a live dashboard with a transparent risk score and CIS AWS Foundations Benchmark mapping. NGINX routes traffic to a JWT-authenticated Express gateway, which queues scan jobs on Redis for a Python worker to run against real AWS (via boto3) or a local emulator called Floci. Failed scans retry with backoff before landing in a dead-letter queue. A background scheduler enqueues recurring scans on a fixed interval. Findings land in Postgres, and an AI endpoint can turn a report into a plain-English summary."
tech:
  - "Next.js"
  - "TypeScript"
  - "Node.js"
  - "Python"
  - "boto3"
  - "Redis"
  - "PostgreSQL"
  - "Nginx"
  - "Docker"
  - "Jest"
repo: "https://github.com/SwapnajXD/Cloud-Sentinel"
category: "Backend / DevOps"
order: 2
highlights:
  - "Account-wide IAM auditing (every user's MFA and access-key age, not just the scanning identity), port-aware security group checks (SSH/RDP flagged differently from an open web port), plus S3, RDS, and Lambda checks"
  - "Findings mapped to real CIS AWS Foundations Benchmark v1.4.0 control IDs where one genuinely applies — RDS and Lambda findings are deliberately left unmapped, since those services aren't part of that benchmark"
  - "A transparent, hand-reproducible 0-100 risk score and letter grade per scan — no black-box weighting"
  - "Async job queue with automatic retry-with-backoff and a dead-letter queue for scans that fail every attempt, plus a background scheduler for recurring scans"
  - "JWT-authenticated gateway that refuses to start without a real secret, endpoint-specific rate limiting, and a Python worker that runs against real AWS via boto3 or a local emulator (Floci) for safe testing"
  - "88 automated tests across the gateway (supertest against every route, Postgres/Redis mocked) and worker (every scan module, retry logic, and CIS mapping logic covered)"
---

## Why I built this

I wanted a project that would actually force me to think like both a backend engineer and a security engineer at the same time — not a toy scanner that just calls a few boto3 methods and prints the results, but something with the shape of a real tool: a job queue, retries, a real auth layer, and results that map onto something an actual security team would recognize, like the CIS AWS Foundations Benchmark.

Cloud Sentinel is the result: you point it at an AWS account (or a local AWS-API-compatible emulator, for safe testing), it runs a set of security checks, and it comes back with findings, a risk score, and — where it's honestly applicable — a reference to the specific industry control each finding violates.

## Why a queue, not just an API call

The naive version of this tool is a single endpoint that calls boto3 synchronously and returns findings in the response. That falls apart almost immediately: a real scan against an account with dozens of S3 buckets, security groups, and IAM users can take several seconds, and AWS API calls fail intermittently for reasons that have nothing to do with your code (throttling, transient network issues, a temporarily expired session token).

So the gateway never scans anything itself. It validates the request, writes a `queued` row to Postgres, pushes the job onto a Redis list, and returns immediately. A separate Python worker process pulls jobs off that queue, runs the actual checks, and writes results back. The dashboard polls a `/api/audit/:task_id` endpoint to show live status — queued → running → done (or error) — instead of the browser just hanging on a slow request.

This paid for itself directly during development. At one point my worker's AWS session token expired mid-scan (a real day-to-day annoyance when working against a live account), and instead of the whole system hanging or silently failing, I got to watch the retry logic kick in — three attempts with a backoff delay, then the task landing in a dead-letter queue with the actual error message attached, visible right there in the dashboard. That's not a hypothetical resilience feature; it's something that happened while I was using my own tool and worked exactly as designed.

## Two ways to scan, one code path

Every check runs identically whether it's pointed at a real AWS account or at **Floci**, a local AWS-API-compatible emulator I also run as part of my homelab. This matters for two reasons: it means I can test and demo the tool without touching real cloud resources or paying for anything, and it means the exact same scan logic gets exercised against both a "clean" test environment and messier real-world AWS accounts — which is how I actually found several of the bugs described below.

## What it checks, and the design decisions behind each one

- **S3** — public bucket access and encryption-at-rest.
- **EC2 security groups** — not just "is this open to the internet," but *what's* open. A security group exposing SSH or RDP to `0.0.0.0/0` gets flagged critical with the exact service named; a wide-open port range with no recognizable service gets flagged medium; a standard web port like 443 gets flagged low, since a public web server having that open is often intentional. Treating every open rule as equally critical is the kind of thing that makes a security tool noisy enough that people start ignoring it — so severity here is a function of *which* ports are actually exposed, not just whether a rule exists.
- **IAM** — MFA status and access-key age, checked **account-wide**, not just for whichever credentials happen to be running the scan (more on why that distinction mattered below).
- **RDS** — public accessibility and storage encryption.
- **Lambda** — publicly-invokable function URLs, overly-permissive resource policies, and deprecated runtimes no longer receiving security patches.

## Mapping findings to CIS AWS Foundations Benchmark v1.4.0 — and knowing where to stop

This is the feature I'm most particular about, because it would have been easy to do badly. A lot of "security scanner" side projects either skip compliance mapping entirely or slap a framework name on every finding to sound more legitimate than the tool actually is.

Before writing any mapping code, I checked the actual, current CIS AWS Foundations Benchmark control numbers rather than relying on memory. The benchmark itself only covers IAM, S3, logging, monitoring, and networking — it does **not** cover RDS or Lambda (those live under AWS's separate "Foundational Security Best Practices" standard). So Cloud Sentinel only attaches a CIS control ID to findings where one genuinely exists:

| Finding | CIS Control |
|---|---|
| Root account MFA | 1.5 |
| IAM user MFA (account-wide) | 1.10 |
| Stale/unused access keys (90+ days) | 1.12 |
| Public S3 bucket | 2.1.5 |
| Security group open to SSH/RDP specifically | 5.2 |

RDS and Lambda findings stay unmapped — they're still real, useful findings, just not CIS controls. I'd rather the tool be honest about the boundary of what it's actually checking than paper over it for a more impressive-looking label.

On top of that mapping, every scan gets a **0–100 risk score** and a letter grade. Deliberately not a black-box formula: it starts at 100 and subtracts a fixed penalty per finding by severity (critical −15, medium −5, low −1), floored at zero. Anyone looking at a findings list can compute the score by hand. I'd rather have a simple number I can defend and explain than a "smarter"-looking score I can't.

## Bugs I found by actually using the tool

A few of these were only visible once I started running real scans against my own AWS account and homelab emulator, rather than just unit-testing individual functions in isolation:

**Pass/fail wording that didn't match the outcome.** Several checks — S3 encryption, RDS encryption, IAM MFA — return both a "pass" and a "fail" result depending on what they find. Early on, the report-assembly code hardcoded fail-oriented language regardless of which one actually happened: a *passing* root-MFA check still displayed "Root account without MFA is highly dangerous — enable it immediately." I caught this by actually reading a real scan's output and noticing the message didn't match the green "good" badge next to it. Fixed by branching the title/description/remediation text on the real pass/fail outcome, and added a regression test that specifically scans every "good"-severity finding for leftover fail-language like "disabled" or "not enabled."

**IAM checks that only ever looked at themselves.** I created a dedicated test IAM user with a deliberately stale, unused access key specifically to verify the "unused access key" check would catch it — and it silently didn't. The check was written to inspect the *credentials running the scan*, not every IAM user in the account, so it never even looked at the user I'd created. I rewrote both the MFA and access-key checks to be account-wide (iterating every IAM user via `list_users`), which is what "audit your account" should have meant in the first place.

**A misconfiguration that crashed the whole worker instead of failing one scan.** A missing environment variable for the local emulator raised an exception *before* the code entered its own error-handling block, so it escaped cleanly past the retry/dead-letter logic entirely and just printed "worker crash" — the task was silently lost rather than retried or recorded as failed. Moved the client setup inside the try block so any configuration problem now fails that one task through the normal retry → dead-letter path instead of taking down the whole process.

Bugs like these are the actual reason the test suite grew to 88 tests rather than stopping at "the happy path works" — several tests exist specifically because a real bug slipped through once and I didn't want it to slip through silently again.

## Testing approach

- **Gateway (Node/Express)**: every exposed route tested via `supertest`, with Postgres and Redis fully mocked — no live database needed to run the suite. Covers auth validation, JWT issuance/verification, every protected route correctly rejecting missing or invalid tokens, and the auth-specific rate limiter genuinely tripping on the 11th request from one IP (not just asserted, actually triggered).
- **Worker (Python)**: every scan module tested with mocked boto3 clients, plus the retry/dead-letter state machine, the CIS mapping logic (including confirming that, say, an exposed MySQL port does *not* get mis-tagged with the SSH/RDP-specific control), and the risk-score math.

## What's next

The honest next steps, in rough priority order: a CI pipeline that actually runs this test suite on every push (right now it's real, but only provable by cloning the repo); a CloudTrail-enabled check, since "is logging even on" is arguably the single most foundational thing a security tool should check first; and correlating findings instead of treating them independently — a root account with no MFA *and* no CloudTrail is a meaningfully worse combination than either finding alone, and a compound-risk view would be a genuinely differentiated feature rather than just another line item.
