"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

type ProjectSummary = { slug: string; title: string; tagline: string };
type JournalSummary = { slug: string; title: string; summary: string };
type Line = { type: "input" | "output"; text: string };
type Cwd = "root" | "projects" | "journal";

const BANNER = [
  "Microsoft(R) MS-DOS(R) — not really, but nice try",
  "swapnaj's portfolio terminal v1.0",
  "type 'help' for a list of commands",
  "",
];

const PROMPT: Record<Cwd, string> = {
  root: "C:\\SWAPNAJ",
  projects: "C:\\SWAPNAJ\\PROJECTS",
  journal: "C:\\SWAPNAJ\\JOURNAL",
};

export default function TerminalApp({
  projects,
  journal,
  onClose,
}: {
  projects: ProjectSummary[];
  journal: JournalSummary[];
  onClose: () => void;
}) {
  const [lines, setLines] = useState<Line[]>(
    BANNER.map((text) => ({ type: "output", text }))
  );
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const [cwd, setCwd] = useState<Cwd>("root");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const print = (text: string) =>
    setLines((ls) => [...ls, { type: "output", text }]);

  const stripExt = (name: string) => name.replace(/\.txt$/i, "").toLowerCase();

  const openSlug = (slugRaw: string) => {
    const slug = stripExt(slugRaw);
    const project = projects.find((p) => p.slug === slug);
    if (project) {
      print(`opening ${project.title}...`);
      window.open(`/projects/${project.slug}`, "_blank", "noopener,noreferrer");
      return;
    }
    const post = journal.find((j) => j.slug === slug);
    if (post) {
      print(`opening ${post.title}...`);
      window.open(`/journal/${post.slug}`, "_blank", "noopener,noreferrer");
      return;
    }
    print(`'${slugRaw}' not found. try 'dir' to see what's here.`);
  };

  const run = (raw: string) => {
    const trimmed = raw.trim();
    setLines((ls) => [...ls, { type: "input", text: raw }]);
    if (!trimmed) return;

    const [cmdRaw, ...rest] = trimmed.split(/\s+/);
    const cmd = cmdRaw.toLowerCase();
    const arg = rest.join(" ");

    switch (cmd) {
      case "help":
        print(
          "commands: help, whoami, dir, cd <dir>, cat <file>, projects, journal, open <slug>, date, time, echo, matrix, bsod, sudo, cls, exit"
        );
        break;

      case "whoami":
        print("swapnaj — cloud & devops, currently pretending this terminal is real.");
        break;

      case "dir":
      case "ls":
        if (cwd === "root") {
          print("PROJECTS      <DIR>");
          print("JOURNAL       <DIR>");
          print("README.TXT       1,337 bytes");
        } else if (cwd === "projects") {
          if (projects.length === 0) print("(empty)");
          projects.forEach((p) =>
            print(`${(p.slug.toUpperCase() + ".TXT").padEnd(24)} ${p.tagline}`)
          );
        } else {
          if (journal.length === 0) print("(empty)");
          journal.forEach((j) =>
            print(`${(j.slug.toUpperCase() + ".TXT").padEnd(24)} ${j.title}`)
          );
        }
        break;

      case "cd": {
        const target = arg.toLowerCase().replace(/\\/g, "");
        if (!target) {
          print(PROMPT[cwd]);
        } else if (cwd === "root" && target === "projects") {
          setCwd("projects");
        } else if (cwd === "root" && target === "journal") {
          setCwd("journal");
        } else if (cwd !== "root" && (target === ".." || target === "")) {
          setCwd("root");
        } else if (target === "~") {
          setCwd("root");
        } else {
          print("The system cannot find the path specified.");
        }
        break;
      }

      case "cat":
      case "type": {
        if (!arg) {
          print("usage: cat <file>");
        } else if (cwd === "root" && stripExt(arg) === "readme") {
          print("this terminal is a joke. the rest of the site is not. mostly.");
        } else if (cwd === "projects") {
          const p = projects.find((pr) => pr.slug === stripExt(arg));
          if (p) {
            print(p.tagline);
            print(`type 'open ${p.slug}' to visit.`);
          } else {
            print(`The system cannot find the file specified: ${arg}`);
          }
        } else if (cwd === "journal") {
          const j = journal.find((jr) => jr.slug === stripExt(arg));
          if (j) {
            print(j.summary);
            print(`type 'open ${j.slug}' to visit.`);
          } else {
            print(`The system cannot find the file specified: ${arg}`);
          }
        } else {
          print(`The system cannot find the file specified: ${arg}`);
        }
        break;
      }

      case "projects":
        if (projects.length === 0) {
          print("no projects found.");
        } else {
          projects.forEach((p) => print(`${p.slug.padEnd(16)} ${p.tagline}`));
          print("");
          print("type 'open <slug>' to visit one.");
        }
        break;

      case "journal":
        if (journal.length === 0) {
          print("no journal entries found.");
        } else {
          journal.forEach((j) => print(`${j.slug.padEnd(24)} ${j.title}`));
          print("");
          print("type 'open <slug>' to visit one.");
        }
        break;

      case "open":
        if (!arg) {
          print("usage: open <slug>");
        } else {
          openSlug(arg);
        }
        break;

      case "date":
        print(new Date().toLocaleDateString());
        break;

      case "time":
        print(new Date().toLocaleTimeString());
        break;

      case "echo":
        print(arg);
        break;

      case "matrix":
        print("waking up...");
        window.dispatchEvent(new Event("trigger-matrix-rain"));
        break;

      case "bsod":
      case "crash":
        print("Segmentation fault (core dumped)");
        setTimeout(() => window.dispatchEvent(new Event("trigger-bsod")), 50);
        break;

      case "sudo":
        print("Permission denied. Nice try.");
        break;

      case "cls":
      case "clear":
        setLines([]);
        break;

      case "exit":
        print("closing terminal...");
        setTimeout(onClose, 300);
        break;

      default:
        print(
          `'${cmd}' is not recognized as an internal or external command, operable program or batch file.`
        );
    }
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setCmdHistory((h) => (input.trim() ? [...h, input] : h));
      setInput("");
      setHistIndex(null);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = histIndex === null ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === null) return;
      const next = histIndex + 1;
      if (next >= cmdHistory.length) {
        setHistIndex(null);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(cmdHistory[next]);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        fontFamily: "monospace",
        fontSize: 12,
        color: "#00FF00",
        background: "#000000",
        padding: 12,
        height: "100%",
        boxSizing: "border-box",
        overflowY: "auto",
        lineHeight: 1.6,
        cursor: "text",
      }}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {line.type === "input" ? `${PROMPT[cwd]}> ${line.text}` : line.text}
        </div>
      ))}
      <div style={{ display: "flex" }}>
        <span>{PROMPT[cwd]}&gt;&nbsp;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          spellCheck={false}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#00FF00",
            fontFamily: "monospace",
            fontSize: 12,
          }}
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
