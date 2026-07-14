"use client";

import { useEffect, useRef, useState } from "react";
import Window, { type WinState } from "./Window";
import {
  AboutApp,
  ProjectsApp,
  TerminalApp,
  NotepadApp,
  CalculatorApp,
  RecycleBinApp,
} from "./apps";
import IEApp from "./IEApp";

type ProjectSummary = { slug: string; title: string; tagline: string };

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
  { id: "terminal", title: "Terminal", icon: "💻", w: 420, h: 300 },
  { id: "ie", title: "Internet Explorer", icon: "🌐", w: 480, h: 460 },
  { id: "notepad", title: "Notepad", icon: "📝", w: 380, h: 320 },
  { id: "calculator", title: "Calculator", icon: "🧮", w: 220, h: 320 },
  { id: "recycle", title: "Recycle Bin", icon: "🗑️", w: 340, h: 260 },
];

function renderAppContent(id: string, projects: ProjectSummary[]) {
  switch (id) {
    case "about":
      return <AboutApp />;
    case "projects":
      return <ProjectsApp projects={projects} />;
    case "terminal":
      return <TerminalApp />;
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
  onExit,
}: {
  projects: ProjectSummary[];
  onExit: () => void;
}) {
  const [windows, setWindows] = useState<WinState[]>([]);
  const [startOpen, setStartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clock, setClock] = useState("");
  const zRef = useRef(1);
  const offsetRef = useRef(0);

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
        >
          {renderAppContent(w.id, projects)}
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
            padding: "4px 10px",
            fontSize: 11,
            fontFamily: "monospace",
            minWidth: 52,
            textAlign: "center",
          }}
        >
          {clock}
        </div>
      </div>
    </div>
  );
}
