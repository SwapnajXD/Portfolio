"use client";

import {
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type CSSProperties,
} from "react";

export type WinState = {
  id: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

export default function Window({
  win,
  isMobile,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  children,
}: {
  win: WinState;
  isMobile: boolean;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  children: ReactNode;
}) {
  const dragState = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);

  if (win.minimized) return null;

  const fullscreen = isMobile || win.maximized;

  const onTitleBarPointerDown = (e: ReactPointerEvent) => {
    onFocus(win.id);
    if (fullscreen) return;
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      winX: win.x,
      winY: win.y,
    };
    const onMove_ = (ev: PointerEvent) => {
      if (!dragState.current) return;
      const dx = ev.clientX - dragState.current.startX;
      const dy = ev.clientY - dragState.current.startY;
      onMove(
        win.id,
        dragState.current.winX + dx,
        Math.max(0, dragState.current.winY + dy)
      );
    };
    const onUp = () => {
      dragState.current = null;
      window.removeEventListener("pointermove", onMove_);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove_);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div
      onMouseDown={() => onFocus(win.id)}
      style={{
        position: "fixed",
        left: fullscreen ? 0 : win.x,
        top: fullscreen ? 0 : win.y,
        width: fullscreen ? "100%" : win.w,
        height: fullscreen ? "calc(100% - 34px)" : win.h,
        zIndex: win.z,
        fontFamily: "Tahoma, Verdana, Arial, sans-serif",
        border: "2px solid #0A0A0A",
        boxShadow: "2px 2px 0 rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        background: "#C0C0C0",
      }}
    >
      <div
        onPointerDown={onTitleBarPointerDown}
        onDoubleClick={() => !isMobile && onMaximize(win.id)}
        style={{
          background: "linear-gradient(90deg, #000080 0%, #1084D0 100%)",
          color: "#FFFFFF",
          fontSize: 12,
          fontWeight: "bold",
          padding: "3px 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: fullscreen ? "default" : "grab",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 6, overflow: "hidden" }}>
          <span aria-hidden="true">{win.icon}</span>
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {win.title}
          </span>
        </span>
        <span style={{ display: "flex", gap: 2 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(win.id);
            }}
            aria-label="Minimize"
            style={winButtonStyle}
          >
            _
          </button>
          {!isMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize(win.id);
              }}
              aria-label={win.maximized ? "Restore" : "Maximize"}
              style={winButtonStyle}
            >
              {win.maximized ? "❐" : "□"}
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(win.id);
            }}
            aria-label="Close"
            style={{ ...winButtonStyle, background: "#C0C0C0" }}
          >
            ×
          </button>
        </span>
      </div>
      <div
        style={{
          flex: 1,
          overflow: "auto",
          background: "#FFFFFF",
          minHeight: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

const winButtonStyle: CSSProperties = {
  width: 18,
  height: 16,
  border: "1px solid #000000",
  background: "#C0C0C0",
  fontSize: 11,
  lineHeight: "14px",
  fontWeight: "bold",
  cursor: "pointer",
  padding: 0,
  color: "#000000",
};
