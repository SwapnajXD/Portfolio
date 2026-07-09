---
title: "Receipt"
tagline: "Bank statements to Cashew imports — and it gets smarter every time you correct it"
description: "A tool that converts bank statement exports (XLSX or CSV) into a Cashew-compatible import CSV, available as both a CLI and a small web UI. XLSX parsing is hand-rolled in pure Python (no pandas or openpyxl), and categorization runs through a two-stage classifier: regex rules first, then a learned-rules layer that persists corrections made in the web UI, so it gets more accurate the more you use it."
tech:
  - "Python"
repo: "https://github.com/SwapnajXD/Receipt"
category: "Backend / DevOps"
order: 4
highlights:
  - "Pure-Python XLSX parser built from scratch on zipfile + xml.etree — no external parsing library"
  - "Two-stage classifier: regex rules, then a learned-rules layer that persists your corrections"
  - "Web UI lets you preview and correct rows inline before the categorizer learns from them"
  - "Runs as a CLI for batch conversion or a lightweight web UI for interactive review"
---

Full case study coming soon — the learned-rules design and the XLSX parser internals.
