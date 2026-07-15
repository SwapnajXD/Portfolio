import type { ArchitectureDiagramData } from "@/components/ArchitectureDiagram";

export const receipt: ArchitectureDiagramData = {
  command: "architecture --interactive",
  heading: "From bank statement to Cashew import — and it learns",
  viewBox: "0 0 900 360",
  nodes: [
    { id: "input", label: "Statement", sublabel: ".xlsx / .csv", x: 20, y: 140, w: 110, h: 60, info: "A bank or credit card statement export, in XLSX or CSV. Handles both text-based dates and native Excel date cells." },
    { id: "entry", label: "Entry", sublabel: "CLI or web UI", x: 190, y: 140, w: 130, h: 60, info: "Either the CLI, for batch conversion with an income/expense/category summary, or a web UI with an editable preview, live totals, search, and bulk edit." },
    { id: "parser", label: "Parser", sublabel: "xlsx / csv", x: 380, y: 140, w: 120, h: 60, info: "Detects the file type and normalizes it into rows — XLSX parsing is pure Python (zipfile + xml.etree), no external library. Reads cell styles to correctly convert real Excel date cells, not just text dates." },
    { id: "classifier", label: "Classifier", sublabel: "learned + rules", x: 560, y: 140, w: 140, h: 60, info: "Income transactions are tagged directly. For everything else, learned merchant-to-category mappings are checked first (so your corrections always win), then ordered regex rules as a fallback, guarded by a minimum key length against noisy false-positive matches." },
    { id: "output", label: "CSV Output", sublabel: "Cashew-ready", x: 760, y: 140, w: 120, h: 60, info: "A CSV formatted for direct import into the Cashew budgeting app." },
    { id: "learned", label: "Learned Rules", sublabel: "learned_rules.json", x: 560, y: 270, w: 160, h: 56, info: "Corrections made in the web UI are persisted here and used to improve future classifications." },
  ],
  edges: [
    { from: "input", to: "entry", path: "M 130 170 L 190 170", labelX: 160, labelY: 160, label: "select" },
    { from: "entry", to: "parser", path: "M 320 170 L 380 170", labelX: 350, labelY: 160, label: "dispatch" },
    { from: "parser", to: "classifier", path: "M 500 170 L 560 170", labelX: 530, labelY: 160, label: "transactions" },
    { from: "classifier", to: "output", path: "M 700 170 L 760 170", labelX: 730, labelY: 160, label: "CashewRow" },
    { from: "entry", to: "learned", path: "M 255 200 C 300 260, 450 298, 560 298", labelX: 400, labelY: 290, label: "/learn: your edits" },
    { from: "learned", to: "classifier", path: "M 630 270 L 630 200", labelX: 660, labelY: 240, label: "used next run", dashed: true },
  ],
  steps: [
    { edge: 0, narration: "You point the CLI at a file, or upload it through the web UI." },
    { edge: 1, narration: "The file gets dispatched to the right parser — a hand-rolled reader for XLSX or a CSV loader, no pandas or openpyxl involved." },
    { edge: 2, narration: "Each row becomes a transaction, then runs through classification — learned mappings are checked first, so your past corrections take priority, with regex rules as the fallback." },
    { edge: 3, narration: "The categorized transaction becomes a CashewRow and gets written out as an importable CSV." },
    { edge: 4, narration: "In the web UI, correcting a category posts to /learn, which updates learned_rules.json." },
    { edge: 5, narration: "Next time, that correction is applied automatically — the classifier gets a little smarter every run." },
  ],
};
