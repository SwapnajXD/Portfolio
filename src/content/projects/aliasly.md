---
title: "Aliasly"
tagline: "A custom-alias URL shortener with optional password protection and opt-in abuse screening"
description: "A fully containerized URL shortener where your chosen phrase IS the slug — no random ID appended. Supports optional expiry, password-protected links, click tracking, and opt-in malicious-URL screening (Google Safe Browsing) and CAPTCHA (Cloudflare Turnstile), all built on a Vite/React frontend, an Express API, PostgreSQL, and Redis."
tech:
  - "React"
  - "Vite"
  - "Node.js"
  - "Express"
  - "PostgreSQL"
  - "Redis"
  - "Nginx"
  - "Docker Compose"
repo: "https://github.com/SwapnajXD/Aliasly"
category: "Full-stack"
order: 3
highlights:
  - "Phrase-only slugs — the alias you type IS the slug, with a live availability check as you type"
  - "Expired links are automatically reclaimed: create a new link at a phrase whose previous owner already expired, no manual cleanup needed"
  - "Optional password protection per link, hashed with scrypt, verified through a rate-limited unlock endpoint"
  - "Redis caching is skipped entirely for password-protected links, so a stale cache entry can never bypass the password check"
  - "Opt-in Google Safe Browsing and Cloudflare Turnstile integration — both are no-ops unless their API keys are configured, so local dev needs zero external accounts"
  - "Anonymous ownership model: a delete/edit token issued at creation time, stored client-side, required for editing or deleting a link — no user accounts needed"
  - "Deployable either fully containerized (Docker Compose) or split (static frontend on Vercel, API tunneled from a homelab via Tailscale Funnel or ngrok)"
---

## Overview

Aliasly is a URL shortener I built to actually understand the moving parts of a
"simple" full-stack app — collision handling, caching strategy, anonymous
ownership without user accounts, and the tradeoffs between convenience and
abuse-resistance once something is reachable from the public internet.

It started as a fork of an existing "freaky URL" concept (phrase + random ID),
got rebuilt into something closer to a real custom-alias shortener, and ended
up being a good excuse to practice deployment patterns I hadn't used before —
Tailscale Funnel in particular.

## The core design decision: the phrase IS the slug

Most shorteners append a random ID after your custom phrase
(`my-link-4f9k2p`) to sidestep collisions. Aliasly doesn't — whatever phrase
you type becomes the slug directly, which means:

- **Availability has to be checked live.** The UI debounces a call to
  `GET /api/available/:phrase` as you type, so you find out a phrase is taken
  before you submit, not after.
- **Collisions are meaningful, not just noise.** A duplicate phrase returns a
  clear `409`, rather than silently retrying with a new random suffix.
- **Expired links had to become reclaimable.** Without a random ID to fall
  back on, a slug held by a dead link would otherwise squat on that phrase
  forever. `POST /api/shorten` deletes any row at that slug whose `expires_at`
  has already passed *before* attempting the insert — so creating a new link
  at an expired phrase just works, no manual deletion required. A background
  job also purges expired rows every 15 minutes regardless, so the table
  doesn't accumulate dead rows waiting to be reclaimed.

## Anonymous ownership, without accounts

There's no login system, but links still need an owner for editing/deleting.
Each link gets a random `deleteToken` at creation time, stored in the
browser's `localStorage`. Whoever holds that token can edit or delete the
link — anyone else, even someone who knows the exact phrase, gets a generic
`403` rather than any indication the link exists. It's a deliberately simple
trust model: the token is a bearer credential, not tied to an identity, which
keeps the app simple at the cost of the token being unrecoverable if someone
clears their browser data. For a short-lived demo project, that tradeoff is
fine; for anything longer-lived, it's the first thing I'd replace with real
accounts.

## Password protection, and why caching had to change

Adding optional per-link passwords (scrypt-hashed, verified via a
rate-limited `POST /api/unlock/:slug`) surfaced a caching bug before it ever
shipped: the original Redis cache was keyed purely by slug → destination URL.
If a password-protected link's destination were cached the same way, the
`/api/resolve` endpoint could serve the destination straight from Redis
without ever checking the password — the cache would silently bypass the
protection it was never designed to know about.

The fix was to simply never cache password-protected links at all. They
always hit Postgres directly, check the password, and only then respond. It's
a small amount of cache-hit-rate loss on a feature most links won't use, in
exchange for the cache never being able to leak something it shouldn't.

## Abuse resistance that stays out of your way locally

Once a link shortener is reachable from the public internet, two problems
show up that don't matter in local dev: someone could shorten a phishing URL,
and someone could script-spam link creation. Aliasly handles both, but only
when you opt in:

- **Google Safe Browsing** screens the destination URL against Google's
  threat lists on both creation and editing — skipped entirely if
  `GOOGLE_SAFE_BROWSING_API_KEY` isn't set.
- **Cloudflare Turnstile** verifies a CAPTCHA token server-side — skipped
  entirely if `TURNSTILE_SECRET_KEY` isn't set, and the widget doesn't even
  render client-side without a site key.
- **Rate limiting** (via `express-rate-limit`) is always on regardless —
  20 creates/minute and 120 reads/minute per IP, with a tighter 10/minute
  limit specifically on password-unlock attempts to slow brute-forcing.

The opt-in design matters more than it sounds: it means `docker compose up`
on a fresh clone works immediately with zero external accounts, while a real
deployment can turn on meaningful protection just by setting two environment
variables.

## Client-side link previews, deliberately not server-side

Each link shows a favicon and hostname preview. The obvious way to build that
is to have the server fetch the destination URL and scrape its `<title>` —
except that means the backend makes outbound requests to arbitrary
user-submitted URLs, which is a textbook SSRF vector (nothing stops someone
from pointing it at an internal service or a cloud metadata endpoint). Instead,
the favicon is fetched client-side via a public favicon API, keyed only by
hostname. The backend never touches the destination URL beyond validating and
storing it — no server-side fetch, no SSRF surface.

## Deployment: containerized, or split

The reference setup is a single `docker-compose.yml`: Nginx, the API,
Postgres, and Redis, wired together for local development or a homelab VM.
But the frontend is also just a static Vite build, so it deploys cleanly to
Vercel on its own — with the backend staying self-hosted and reachable
through a stable tunnel URL. I used Tailscale Funnel for this rather than
ngrok specifically because it doesn't require owning a domain or having a
static IP, both of which ngrok's free tier effectively assumes you'll work
around eventually (its free URLs rotate on every restart).

## What I'd change next

- **Delete tokens have no recovery path.** If you clear your browser data,
  the links you created are still alive on the server, but you've lost the
  only credential that can edit or delete them. A lightweight
  export/import-as-JSON feature would fix this without requiring real
  accounts.
- **Per-link social previews aren't possible yet.** Sharing an Aliasly link
  in Slack/Discord shows the app's generic Open Graph tags, not the
  destination site's actual title — because the frontend is a static SPA, not
  server-rendered. Fixing this properly needs a small edge function that
  detects social-media crawler user-agents and serves them a dynamically
  generated preview page while everyone else gets the normal SPA.
- **No structured click analytics.** Right now a link's "clicks" is a single
  incrementing counter. A `link_clicks` table with a timestamp per click would
  allow an actual time-series view instead of just a running total.
