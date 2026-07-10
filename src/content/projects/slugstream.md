---
title: "SlugStream"
tagline: "A URL shortener with collision-safe slugs and Redis-first resolution"
description: "A fully containerized URL-shortening service with a Vite-powered React frontend served by Nginx, and an Express API that generates collision-safe slugs (nanoid + retry-on-conflict), blocks unsafe file extensions, and resolves links Redis-first with a Postgres fallback and 1-hour TTL cache."
tech:
  - "React"
  - "Vite"
  - "Node.js"
  - "Express"
  - "PostgreSQL"
  - "Redis"
  - "Nginx"
repo: "https://github.com/SwapnajXD/SlugStream"
category: "Full-stack"
order: 3
highlights:
  - "Slug generation retries up to 3x on collision, backed by a unique constraint in Postgres"
  - "Blocks unsafe file extensions before a link is ever created"
  - "Redis-first resolution with Postgres fallback and automatic cache backfill, 1-hour TTL"
  - "Fully containerized: Nginx, frontend, API, Postgres, and Redis wired together with Docker Compose"
---

Full case study coming soon — the caching strategy and what I'd change about the slug collision handling.
