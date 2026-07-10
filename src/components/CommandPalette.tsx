"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Command = {
  label: string;
  hint?: string;
  href: string;
  external?: boolean;
};

const commands: Command[] = [
  { label: "Home", hint: "top", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience & Certifications", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
  { label: "Journal", hint: "notes", href: "/journal" },
  { label: "HomeLab", hint: "project", href: "/projects/homelab" },
  { label: "Cloud Sentinel", hint: "project", href: "/projects/cloud-sentinel" },
  { label: "SlugStream", hint: "project", href: "/projects/slugstream" },
  { label: "Receipt", hint: "project", href: "/projects/receipt" },
  { label: "GitHub", hint: "external", href: "https://github.com/SwapnajXD", external: true },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const router = useRouter();

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const normalizedQuery = query.trim().toLowerCase();
  const isSudo = normalizedQuery === "sudo" || normalizedQuery.startsWith("sudo ");
  const isMatrix = normalizedQuery === "matrix";
  const isCoffee = normalizedQuery === "coffee";

  const runMatrix = () => {
    setOpen(false);
    window.dispatchEvent(new Event("trigger-matrix-rain"));
  };

  const runCoffee = () => {
    setOpen(false);
    console.log(
      "%c☕ brewing...\n%cthanks for checking, back to work",
      "color:#F6821F;font-family:monospace;font-size:13px;font-weight:bold;",
      "color:#9A9DA3;font-family:monospace;font-size:11px;"
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const handleCustomOpen = () => setOpen(true);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      itemRefs.current = [];
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const select = (cmd: Command) => {
    setOpen(false);
    if (cmd.external) {
      window.open(cmd.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(cmd.href);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (isMatrix) {
        runMatrix();
      } else if (isCoffee) {
        runCoffee();
      } else if (filtered[activeIndex]) {
        select(filtered[activeIndex]);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="font-mono text-sm text-accent">$</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Jump to..."
            className="w-full bg-transparent font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
          <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
            esc
          </span>
        </div>
        <div className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && isSudo && (
            <div className="px-4 py-6 text-center font-mono text-xs text-text-muted">
              <span className="text-accent">Permission denied</span>
              <br />
              nice try 😏
            </div>
          )}
          {filtered.length === 0 && isMatrix && (
            <button
              onClick={runMatrix}
              className="flex w-full items-center justify-between bg-bg px-4 py-2 text-left font-mono text-sm text-accent"
            >
              <span>🟢 wake up, swapnaj...</span>
              <span className="text-[11px] text-text-muted">enter</span>
            </button>
          )}
          {filtered.length === 0 && isCoffee && (
            <button
              onClick={runCoffee}
              className="flex w-full items-center justify-between bg-bg px-4 py-2 text-left font-mono text-sm text-accent"
            >
              <span>☕ brewing...</span>
              <span className="text-[11px] text-text-muted">enter</span>
            </button>
          )}
          {filtered.length === 0 && !isSudo && !isMatrix && !isCoffee && (
            <div className="px-4 py-6 text-center font-mono text-xs text-text-muted">
              no matches
            </div>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.href}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onClick={() => select(cmd)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex w-full items-center justify-between px-4 py-2 text-left font-mono text-sm transition-colors ${
                i === activeIndex ? "bg-bg text-accent" : "text-text-primary"
              }`}
            >
              <span>{cmd.label}</span>
              {cmd.hint && (
                <span className="text-[11px] text-text-muted">{cmd.hint}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
