"use client";

import { useEffect, useRef, useState } from "react";
import Window, { type WinState } from "./Window";
import {
  AboutApp,
  ProjectsApp,
  NotepadApp,
  CalculatorApp,
  RecycleBinApp,
  DocumentsApp,
} from "./apps";
import TerminalApp from "./TerminalApp";
import IEApp from "./IEApp";

type ProjectSummary = { slug: string; title: string; tagline: string };
type JournalSummary = { slug: string; title: string; summary: string };

type AppDef = {
  id: string;
  title: string;
  icon: string;
  w: number;
  h: number;
};

const APPS: AppDef[] = [
  { id: "about", title: "About Me", icon: "🧑‍💻", w: 380, h: 300 },
  { id: "projects", title: "My Projects", icon: "📁", w: 420, h: 340 },
  { id: "documents", title: "My Documents", icon: "🗂️", w: 360, h: 260 },
  { id: "terminal", title: "Terminal", icon: "💻", w: 420, h: 300 },
  { id: "ie", title: "Internet Explorer", icon: "🌐", w: 500, h: 520 },
  { id: "notepad", title: "Notepad", icon: "📝", w: 380, h: 320 },
  { id: "calculator", title: "Calculator", icon: "🧮", w: 220, h: 320 },
  { id: "recycle", title: "Recycle Bin", icon: "🗑️", w: 340, h: 260 },
];

function renderAppContent(
  id: string,
  projects: ProjectSummary[],
  journal: JournalSummary[],
  onCloseTerminal: () => void
) {
  switch (id) {
    case "about":
      return <AboutApp />;
    case "projects":
      return <ProjectsApp projects={projects} />;
    case "documents":
      return <DocumentsApp />;
    case "terminal":
      return (
        <TerminalApp
          projects={projects}
          journal={journal}
          onClose={onCloseTerminal}
        />
      );
    case "ie":
      return <IEApp />;
    case "notepad":
      return <NotepadApp />;
    case "calculator":
      return <CalculatorApp />;
    case "recycle":
      return <RecycleBinApp />;
    default:
      return null;
  }
}

export default function Win98Desktop({
  projects,
  journal,
  onExit,
}: {
  projects: ProjectSummary[];
  journal: JournalSummary[];
  onExit: () => void;
}) {
  const [windows, setWindows] = useState<WinState[]>([]);
  const [startOpen, setStartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clock, setClock] = useState("");
  const [bsod, setBsod] = useState(false);
  const zRef = useRef(1);
  const offsetRef = useRef(0);

  const focusedId =
    windows
      .filter((w) => !w.minimized)
      .sort((a, b) => b.z - a.z)[0]?.id ?? null;

  useEffect(() => {
    const trigger = () => setBsod(true);
    window.addEventListener("trigger-bsod", trigger);
    return () => window.removeEventListener("trigger-bsod", trigger);
  }, []);

  useEffect(() => {
    if (!bsod) return;
    const dismiss = () => setBsod(false);
    const timeout = setTimeout(dismiss, 3500);
    window.addEventListener("keydown", dismiss);
    window.addEventListener("click", dismiss);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("click", dismiss);
    };
  }, [bsod]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "F4" && focusedId) {
        e.preventDefault();
        setWindows((ws) => ws.filter((w) => w.id !== focusedId));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedId]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const tick = () => {
      setClock(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const focusWindow = (id: string) => {
    zRef.current += 1;
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: zRef.current, minimized: false } : w)));
  };

  const openApp = (appId: string) => {
    setStartOpen(false);
    const existing = windows.find((w) => w.id === appId);
    if (existing) {
      focusWindow(appId);
      return;
    }
    const def = APPS.find((a) => a.id === appId);
    if (!def) return;
    zRef.current += 1;
    offsetRef.current = (offsetRef.current + 1) % 6;
    const off = offsetRef.current * 24;
    setWindows((ws) => [
      ...ws,
      {
        id: appId,
        title: def.title,
        icon: def.icon,
        x: 60 + off,
        y: 40 + off,
        w: def.w,
        h: def.h,
        z: zRef.current,
        minimized: false,
        maximized: isMobile,
      },
    ]);
  };

  const closeWindow = (id: string) =>
    setWindows((ws) => ws.filter((w) => w.id !== id));
  const minimizeWindow = (id: string) =>
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)));
  const maximizeWindow = (id: string) =>
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  const moveWindow = (id: string, x: number, y: number) =>
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
  const resizeWindow = (id: string, w: number, h: number) =>
    setWindows((ws) => ws.map((win) => (win.id === id ? { ...win, w, h } : win)));
  const minimizeAll = () =>
    setWindows((ws) => ws.map((w) => ({ ...w, minimized: true })));

  return (
    <div
      className="fixed inset-0 z-[400] overflow-hidden select-none"
      style={{
        background: "#008080",
        fontFamily: "Tahoma, Verdana, Arial, sans-serif",
      }}
      onMouseDown={() => setStartOpen(false)}
    >
      {/* desktop icons */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => openApp(app.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              width: 72,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 28 }}>{app.icon}</span>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 11,
                textShadow: "1px 1px 1px #000000",
                textAlign: "center",
              }}
            >
              {app.title}
            </span>
          </button>
        ))}
      </div>

      {/* windows */}
      {windows.map((w) => (
        <Window
          key={w.id}
          win={w}
          isMobile={isMobile}
          onFocus={focusWindow}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onMove={moveWindow}
          onResize={resizeWindow}
        >
          {renderAppContent(w.id, projects, journal, () => closeWindow(w.id))}
        </Window>
      ))}

      {/* start menu */}
      {startOpen && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            left: 0,
            bottom: 34,
            width: 220,
            background: "#C0C0C0",
            border: "2px solid #0A0A0A",
            boxShadow: "2px 2px 0 rgba(0,0,0,0.4)",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "linear-gradient(180deg, #000080, #1084D0)",
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: 14,
              padding: "10px 8px",
            }}
          >
            swapnaj&apos;s desktop
          </div>
          <div style={{ padding: 4 }}>
            {APPS.map((app) => (
              <button
                key={app.id}
                onClick={() => openApp(app.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "6px 8px",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                <span>{app.icon}</span>
                {app.title}
              </button>
            ))}
            <hr style={{ margin: "4px 0", border: "none", borderTop: "1px solid #808080" }} />
            <button
              onClick={onExit}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "6px 8px",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              🔌 Shut Down...
            </button>
          </div>
        </div>
      )}

      {/* taskbar */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: 34,
          background: "#C0C0C0",
          borderTop: "2px solid #FFFFFF",
          display: "flex",
          alignItems: "center",
          padding: "0 4px",
          gap: 6,
          zIndex: 9998,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setStartOpen((s) => !s);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontWeight: "bold",
            fontSize: 12,
            padding: "4px 10px",
            border: startOpen ? "2px inset #808080" : "2px outset #FFFFFF",
            background: "#C0C0C0",
            cursor: "pointer",
          }}
        >
          🪟 Start
        </button>

        <button
          onClick={minimizeAll}
          title="Show Desktop"
          style={{
            fontSize: 14,
            padding: "4px 8px",
            border: "2px outset #FFFFFF",
            background: "#C0C0C0",
            cursor: "pointer",
          }}
        >
          🖥️
        </button>

        <div style={{ flex: 1, display: "flex", gap: 4, overflowX: "auto" }}>
          {windows.map((w) => (
            <button
              key={w.id}
              onClick={() => (w.minimized ? focusWindow(w.id) : minimizeWindow(w.id))}
              style={{
                fontSize: 11,
                padding: "4px 10px",
                border: !w.minimized ? "2px inset #808080" : "2px outset #FFFFFF",
                background: "#C0C0C0",
                cursor: "pointer",
                whiteSpace: "nowrap",
                maxWidth: 140,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {w.icon} {w.title}
            </button>
          ))}
        </div>

        <a
          href="/"
          title="Back to the real site"
          style={{
            fontSize: 14,
            padding: "4px 8px",
            border: "2px outset #FFFFFF",
            background: "#C0C0C0",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          🏠
        </a>

        <div
          style={{
            border: "2px inset #808080",
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span title="Volume" style={{ fontSize: 12 }}>
            🔊
          </span>
          <span title="Network" style={{ fontSize: 12 }}>
            🖧
          </span>
          <span style={{ fontFamily: "monospace", fontSize: 11, minWidth: 44, textAlign: "center" }}>
            {clock}
          </span>
        </div>
      </div>

      {bsod && (
        <div
          className="fixed inset-0 flex items-center justify-center p-8"
          style={{
            background: "#0000AA",
            color: "#FFFFFF",
            fontFamily: "monospace",
            fontSize: 14,
            zIndex: 99999,
            cursor: "pointer",
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <p style={{ marginTop: 0 }}>Windows</p>
            <p>
              A fatal exception 0E has occurred at 0028:C0011E36 in VXD
              VMM(01) + 00010E36. The current application will be
              terminated.
            </p>
            <p>
              * Press any key to terminate the current application.
              <br />
              * Press CTRL+ALT+DEL again to restart your computer. You will
              lose any unsaved information in all applications.
            </p>
            <p>
              Press any key to continue{" "}
              <span className="retro-blink" aria-hidden="true">
                _
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
