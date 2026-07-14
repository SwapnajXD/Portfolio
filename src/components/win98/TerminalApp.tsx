"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

type ProjectSummary = { slug: string; title: string; tagline: string };
type Line = { type: "input" | "output"; text: string };

const BANNER = [
  "Microsoft(R) MS-DOS(R) — not really, but nice try",
  "swapnaj's portfolio terminal v1.0",
  "type 'help' for a list of commands",
  "",
];

export default function TerminalApp({
  projects,
  onClose,
}: {
  projects: ProjectSummary[];
  onClose: () => void;
}) {
  const [lines, setLines] = useState<Line[]>(
    BANNER.map((text) => ({ type: "output", text }))
  );
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const print = (text: string) =>
    setLines((ls) => [...ls, { type: "output", text }]);

  const run = (raw: string) => {
    const trimmed = raw.trim();
    setLines((ls) => [...ls, { type: "input", text: raw }]);
    if (!trimmed) return;

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ");

    switch (cmd.toLowerCase()) {
      case "help":
        print(
          "commands: help, whoami, dir, cd, cat, projects, open <slug>, date, time, echo, matrix, sudo, cls, exit"
        );
        break;
      case "whoami":
        print("swapnaj — cloud & devops, currently pretending this terminal is real.");
        break;
      case "dir":
      case "ls":
        print("PROJECTS      <DIR>");
        print("JOURNAL       <DIR>");
        print("README.TXT       1,337 bytes");
        break;
      case "cd":
        if (!arg) {
          print("C:\\SWAPNAJ");
        } else if (["projects", "journal"].includes(arg.toLowerCase())) {
          print(`Directory changed to C:\\SWAPNAJ\\${arg.toUpperCase()}`);
        } else {
          print("The system cannot find the path specified.");
        }
        break;
      case "cat":
      case "type":
        if (arg.toLowerCase() === "readme.txt") {
          print("this terminal is a joke. the rest of the site is not. mostly.");
        } else {
          print(`The system cannot find the file specified: ${arg || "(none)"}`);
        }
        break;
      case "projects":
        if (projects.length === 0) {
          print("no projects found.");
        } else {
          projects.forEach((p) => print(`${p.slug.padEnd(16)} ${p.tagline}`));
          print("");
          print("type 'open <slug>' to visit one.");
        }
        break;
      case "open": {
        const match = projects.find((p) => p.slug === arg.toLowerCase());
        if (match) {
          print(`opening ${match.title}...`);
          window.open(`/projects/${match.slug}`, "_blank", "noopener,noreferrer");
        } else {
          print(`'${arg}' is not a recognized project. try 'projects' to list them.`);
        }
        break;
      }
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
          {line.type === "input" ? `C:\\SWAPNAJ> ${line.text}` : line.text}
        </div>
      ))}
      <div style={{ display: "flex" }}>
        <span>C:\SWAPNAJ&gt;&nbsp;</span>
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
