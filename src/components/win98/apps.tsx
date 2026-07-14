"use client";

import { useState, type CSSProperties } from "react";
import { EMAIL, EMAIL_HREF, GITHUB_URL } from "@/lib/constants";

const appTextStyle: CSSProperties = {
  fontFamily: "Tahoma, Verdana, Arial, sans-serif",
  fontSize: 12,
  color: "#000000",
  padding: 12,
  lineHeight: 1.6,
};

export function AboutApp() {
  return (
    <div style={appTextStyle}>
      <h3 style={{ marginTop: 0 }}>👋 About Swapnaj</h3>
      <p>
        Cloud &amp; DevOps engineer building infrastructure, security tooling,
        and the occasional deeply unnecessary desktop simulator inside a
        portfolio website.
      </p>
      <p>
        Interests: Proxmox, Terraform, breaking things in a homelab before
        they break in production, and clearly, retro computing.
      </p>
      <p style={{ marginBottom: 0 }}>
        Reach me at{" "}
        <a href={EMAIL_HREF} style={{ color: "#0000EE" }}>
          {EMAIL}
        </a>{" "}
        or on{" "}
        <a href={GITHUB_URL} style={{ color: "#0000EE" }} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p>
    </div>
  );
}

export function ProjectsApp({
  projects,
}: {
  projects: { slug: string; title: string; tagline: string }[];
}) {
  return (
    <div style={appTextStyle}>
      <h3 style={{ marginTop: 0 }}>📁 My Projects</h3>
      <p style={{ color: "#666666", fontSize: 11 }}>
        double-click is hard to simulate in a joke browser window, so these
        are just links. sorry.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {projects.map((p) => (
            <tr key={p.slug} style={{ borderBottom: "1px solid #C0C0C0" }}>
              <td style={{ padding: "8px 4px", verticalAlign: "top" }}>📄</td>
              <td style={{ padding: "8px 4px" }}>
                <a
                  href={`/projects/${p.slug}`}
                  style={{ color: "#0000EE", fontWeight: "bold" }}
                >
                  {p.title}
                </a>
                <div style={{ color: "#444444", fontSize: 11 }}>{p.tagline}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TerminalApp() {
  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: 12,
        color: "#00FF00",
        background: "#000000",
        padding: 12,
        height: "100%",
        lineHeight: 1.7,
      }}
    >
      <p style={{ margin: 0 }}>Microsoft(R) MS-DOS(R) — not really</p>
      <p style={{ margin: "8px 0 0" }}>C:\\SWAPNAJ&gt; whoami</p>
      <p style={{ margin: 0 }}>
        swapnaj — cloud &amp; devops, currently pretending this terminal is
        real. again.
      </p>
      <p style={{ margin: "8px 0 0" }}>C:\\SWAPNAJ&gt; dir</p>
      <p style={{ margin: 0 }}>
        PROJECTS &lt;DIR&gt;
        <br />
        JOURNAL &lt;DIR&gt;
        <br />
        EASTEREGG EXE 1,337 bytes
      </p>
      <p style={{ margin: "8px 0 0" }}>C:\\SWAPNAJ&gt; _</p>
    </div>
  );
}

export function NotepadApp() {
  return (
    <textarea
      defaultValue={`untitled - Notepad

note to self: stop adding features to the
easter egg and go write the case studies.

also: the calculator app actually works.
i'm weirdly proud of that.

- swapnaj`}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        resize: "none",
        outline: "none",
        fontFamily: "monospace",
        fontSize: 12,
        padding: 8,
        boxSizing: "border-box",
      }}
    />
  );
}

export function RecycleBinApp() {
  return (
    <div style={{ ...appTextStyle, textAlign: "center", color: "#666666" }}>
      <div style={{ fontSize: 40, margin: "20px 0 8px" }}>🗑️</div>
      <p>The Recycle Bin is empty.</p>
      <p style={{ fontSize: 11 }}>
        (all the bad code has already been refactored)
      </p>
    </div>
  );
}

export function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [pending, setPending] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState(false);

  const inputDigit = (d: string) => {
    if (display === "0" || resetNext) {
      setDisplay(d);
      setResetNext(false);
    } else {
      setDisplay(display + d);
    }
  };

  const compute = (a: number, b: number, operator: string) => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? NaN : a / b;
      default:
        return b;
    }
  };

  const chooseOp = (nextOp: string) => {
    const current = parseFloat(display);
    if (pending !== null && op) {
      const result = compute(pending, current, op);
      setDisplay(String(result));
      setPending(result);
    } else {
      setPending(current);
    }
    setOp(nextOp);
    setResetNext(true);
  };

  const equals = () => {
    if (pending !== null && op) {
      const result = compute(pending, parseFloat(display), op);
      setDisplay(String(result));
      setPending(null);
      setOp(null);
      setResetNext(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPending(null);
    setOp(null);
    setResetNext(false);
  };

  const btn = (label: string, onClick: () => void, wide = false) => (
    <button
      key={label}
      onClick={onClick}
      style={{
        gridColumn: wide ? "span 2" : undefined,
        padding: "10px 0",
        fontFamily: "Tahoma, Verdana, Arial, sans-serif",
        fontSize: 13,
        background: "#C0C0C0",
        border: "2px outset #FFFFFF",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ padding: 8, height: "100%", boxSizing: "border-box" }}>
      <div
        style={{
          background: "#FFFFFF",
          border: "2px inset #808080",
          textAlign: "right",
          padding: "6px 8px",
          marginBottom: 8,
          fontFamily: "monospace",
          fontSize: 20,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {display}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
        {btn("C", clear)}
        {btn("÷", () => chooseOp("÷"))}
        {btn("×", () => chooseOp("×"))}
        {btn("-", () => chooseOp("-"))}
        {["7", "8", "9"].map((d) => btn(d, () => inputDigit(d)))}
        {btn("+", () => chooseOp("+"))}
        {["4", "5", "6"].map((d) => btn(d, () => inputDigit(d)))}
        {btn("=", equals)}
        {["1", "2", "3"].map((d) => btn(d, () => inputDigit(d)))}
        {btn("0", () => inputDigit("0"), true)}
        {btn(".", () => {
          if (!display.includes(".")) setDisplay(display + ".");
        })}
      </div>
    </div>
  );
}
