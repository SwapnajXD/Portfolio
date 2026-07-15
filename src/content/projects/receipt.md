---
title: "Receipt"
tagline: "Bank statements to Cashew imports — and it gets smarter every time you correct it"
description: "A tool that converts bank statement exports (XLSX or CSV) into a Cashew-compatible import CSV, available as both a CLI and a small web UI. XLSX parsing is hand-rolled in pure Python (no pandas or openpyxl), and categorization runs through a two-stage classifier: learned corrections from the web UI are checked first, falling back to ordered regex rules, so it gets more accurate the more you use it."
tech:
  - "Python"
repo: "https://github.com/SwapnajXD/Receipt"
category: "Backend / DevOps"
order: 4
highlights:
  - "Pure-Python XLSX parser built from scratch on zipfile + xml.etree — no external parsing library"
  - "Style-aware date parsing handles both text dates and native Excel date-serial cells, so transactions no longer silently disappear from real-world spreadsheets"
  - "Two-stage classifier: your learned corrections are checked first, falling back to ordered regex rules, guarded against noisy short-key false positives"
  - "Web UI lets you preview and correct rows inline, with live income/expense/net totals, search/filter, category color coding, and bulk edit before the categorizer learns from them"
  - "Regression-tested: self-contained unit tests cover the XLSX edge cases without needing a real bank statement fixture"
  - "Runs as a CLI for batch conversion (with a category/income summary) or a lightweight web UI for interactive review"
---

## The problem

I use [Cashew](https://cashewapp.web.app/) to track spending, and my bank exports statements as XLSX. Cashew wants a very specific CSV schema — a fixed column order, `income`/`expense` as a boolean, a signed amount, a category name that maps to one of its built-in icons. Every month that meant the same manual chore: open the statement, eyeball each row, decide whether "UPI/DR/4471829/DMART AV/SBIN/x8842" was groceries or a transfer, retype it into Cashew's format, and repeat for 100+ rows.

Receipt automates that pipeline: point it at a raw statement, and it produces a Cashew-ready CSV with categories already filled in — using regex rules for known merchant patterns, and a learning layer that remembers corrections I make, so the categorizer gets more accurate every month instead of asking the same question twice.

## Design goals

A few constraints shaped the whole project:

- **Zero runtime dependencies.** This started as a one-off script, and I wanted `pip install -e .` to be instant, with nothing to break on future Python upgrades or platform quirks. That meant writing the XLSX reader myself instead of pulling in `openpyxl`.
- **Two ways in.** A CLI for "just convert the file," and a small web UI for the months where I actually want to eyeball and correct rows before importing.
- **The tool should learn.** Regex rules cover recurring merchants fine, but they can't predict every one-off. Corrections made in the web UI should feed back into future runs without me editing a rules file by hand.

## Architecture

```
Statement (.xlsx/.csv) → Entry (CLI or web) → Parser → Classifier (rules + learned) → CSV Output
                                                              ↑                |
                                                              └── learned_rules.json ←┘
                                                                  (web UI corrections)
```

- **Parser** (`xlsx.py`, `statement.py`) turns the raw file into a list of dict rows, regardless of whether it came in as XLSX or CSV, and regardless of which bank-specific column headers it used.
- **Classifier** (`rules.py`) is two stages, checked in this order: an exact-or-substring match against `learned_rules.json` (corrections made through the web UI) first, then a fallback pass of ordered regex rules against the transaction description (merchant patterns, UPI reference formats, recurring bill names) if nothing learned matches.
- **Output** (`models.py`) maps the result into `CashewRow`, which knows how to serialize itself into Cashew's exact CSV schema, including the icon/color pair Cashew expects per category.
- **Entry points** (`cli.py`, `web.py`) are thin — they just wire the above together for batch use or interactive use.

## The XLSX parser, from scratch

An `.xlsx` file is a ZIP archive of XML documents. Stripped to the essentials, converting one to rows means:

1. Read `xl/workbook.xml` to find the sheet names and their relationship IDs.
2. Read `xl/_rels/workbook.xml.rels` to resolve those relationship IDs to actual file paths inside the zip.
3. Read `xl/sharedStrings.xml` — Excel deduplicates repeated text into a shared string table, and cells just reference an index into it.
4. Walk the sheet's `<row>`/`<c>` (cell) elements, resolving each cell's value depending on its type (`s` for shared string, inline string, or a bare number).

That's the whole trick — no binary parsing, no compiled dependencies, just `zipfile` and `xml.etree.ElementTree` from the standard library. Because different sheets in a workbook might contain other data (summary tabs, disclaimers), the loader parses *every* sheet and scores each one by how many of its header cells match a set of known transaction-column hints ("date", "debit", "credit", "narration", etc.), then picks the best-scoring sheet as the transaction table. That scoring step is what lets the same code handle statements from different banks without per-bank sheet-index configuration.

### Two bugs that only showed up with real-world files

Writing your own parser against one sample file works great — until a slightly different file exposes an assumption you didn't know you'd made. Two showed up during a hardening pass:

**Silent data loss on real date cells.** My own bank happens to export dates as *text* strings ("05/09/2024"), so that's what the parser was tested against. But the XLSX spec's normal way to store a date is as a plain number — a serial count of days from an epoch — styled with a date format so Excel *displays* it as a date. A workbook built with a different tool (or a different bank) hands you a numeric cell like `45540` instead of a string. The parser read that literally, failed to match it against any known date format, and — this was the dangerous part — the row-filtering step silently dropped any row whose date didn't parse. No error, no warning. Transactions just vanished.

The fix: read `xl/styles.xml`, build a map of which cell-style indices carry a date-like number format (matching Excel's built-in date format IDs, plus custom format codes containing date/time tokens), and convert any numeric cell in a date-styled column from an Excel serial number into a real date string before it ever reaches the date parser.

```python
# Excel's epoch for serial date 1 is 1899-12-31 with a phantom leap day;
# anchoring at 1899-12-30 makes `epoch + timedelta(days=serial)` correct
# for every real date — the same trick Excel and openpyxl both rely on.
_EXCEL_EPOCH = datetime(1899, 12, 30)

def _excel_serial_to_date_string(serial_text: str) -> str | None:
    try:
        serial = float(serial_text)
    except ValueError:
        return None
    value = _EXCEL_EPOCH + timedelta(days=serial)
    return value.strftime("%Y-%m-%d") if value.time() == datetime.min.time() else value.strftime("%Y-%m-%d %H:%M:%S")
```

**A worksheet path that only broke on other writers' files.** The relationship-resolution step assumed sheet targets were always relative paths (`worksheets/sheet1.xml`), so it always prefixed them with `xl/`. Some writers — `openpyxl` among them — instead emit package-absolute targets that already start with a slash (`/xl/worksheets/sheet1.xml`). Naively prefixing that produced `xl//xl/worksheets/sheet1.xml`, which doesn't exist in the archive, and the whole conversion crashed with a `KeyError` before it read a single row. The fix checks for a leading slash and strips it instead of blindly prefixing.

Both are now covered by self-contained regression tests that hand-build a minimal `.xlsx` archive in-memory (no `openpyxl` dependency needed just to test against it), so a future refactor can't silently reintroduce either failure mode.

## The learning loop

The regex rules in `rules.py` are ordered and hand-written — good for recurring, structured patterns like UPI transaction IDs or recognizable merchant substrings. But real statements have plenty of one-off or ambiguous descriptions no regex will anticipate. Rather than making me maintain that rules file by hand, the web UI lets me fix a row's category inline, and on request (`/learn`) it persists a normalized version of that row's description mapped to the category I chose, into `learned_rules.json`.

On the next conversion, the classifier checks learned rules *before* the regex rules, falling back to them (and then to an "Uncategorized" default) only if nothing learned matches — an exact match against the transaction's normalized note first, then a substring match against its full normalized description. One subtlety: a learned key that's too short becomes a footgun. If I ever correct a transaction and the normalized key collapses to something like `"pay"`, that would then match almost any UPI payment description going forward, silently overriding otherwise-correct regex rules. The matching loop enforces a minimum key length before allowing a substring match, so short/generic corrections don't quietly hijack unrelated transactions.

## The web UI

The CLI is fine for "just convert it," but the actual value is in the review step — catching a miscategorized row before it lands in Cashew is a lot cheaper than fixing it after. The web UI (a small `wsgiref`-based app, still zero dependencies) renders every converted row as an editable table:

- Every field — date, amount, category, subcategory, note — is directly editable in place.
- A **search box** filters the table live by note, category, or amount, useful once a statement has 100+ rows.
- **Category color dots** next to each category dropdown mirror the colors Cashew itself assigns, so miscategorized rows are visible at a glance without reading every cell.
- **Live income/expense/net totals** recompute as amounts are edited, so a fat-fingered edit shows up immediately as a sanity-check discrepancy instead of surfacing later inside Cashew.
- A **bulk-edit bar** applies a field change to either the selected rows or every currently-visible (i.e. search-filtered) row — handy for "recategorize every DMart transaction this month" in one action instead of row-by-row.
- **Learn Rules** persists the current corrections back into `learned_rules.json` for next time; **Download CSV** exports the edited table client-side, using the exact same noon-anchored timestamp format the server uses, so an edit made in the browser can't accidentally drift a transaction's date by a day once it hits a timezone-aware importer.

### Debugging a UI that looked done but wasn't

During a design pass, the bulk-edit control and the toast notifications got restyled — and quietly broke. The new HTML had a single `<input id="bulk-value">` and a `<div id="toast">`, but the JavaScript from an earlier version was still looking for `#bulk-value-input`, `#bulk-value-select`, and a `.success-banner` element that no longer existed anywhere in the page. Every click just failed silently in the browser console — no visible error, no feedback, the button simply appeared to do nothing. It's the kind of regression that's easy to ship, because the page *renders* fine; only interacting with it reveals the mismatch. The fix was to make the markup and the script agree again (and to keep them agreeing) — I added both element IDs the JS expects, pointed `showToast()` at the actual `#toast` node, and wrote a rendering test that asserts those specific IDs exist in the generated HTML, so a future template edit can't silently drift out of sync with the script again.

## Testing philosophy

Given the "no dependencies" constraint, tests build their own fixtures rather than reaching for a library like `openpyxl` just to construct test input — a small helper writes the handful of XML parts an XLSX needs directly, keeping the test suite as dependency-free as the tool itself. One deliberate exception: the fullest end-to-end test runs against my own real (anonymized-by-omission) bank statement, which isn't committed to the repo for privacy reasons. Rather than let that fixture's absence fail the suite for anyone else who clones it, those specific tests skip with an explicit reason instead of erroring, while a parallel set of synthetic-fixture tests keeps the actual parsing logic — including both bugs above — under regression coverage.

## What I'd build next

- A duplicate-transaction guard, so re-uploading a statement that overlaps a previous one doesn't double-count shared rows.
- Multi-currency support — right now the schema assumes a single home currency throughout.
- A proper packaged desktop build, so the web UI can be launched by double-clicking rather than a terminal command — the single biggest point of friction for anyone other than me trying to use it.

## Stack

Pure Python (3.11+), standard library only — `zipfile`, `xml.etree.ElementTree`, `wsgiref`, `argparse`, `csv`, `unittest`. No pandas, no openpyxl, no Flask.
