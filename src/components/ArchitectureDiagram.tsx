"use client";

import { useState } from "react";

export type DiagramNode = {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  external?: boolean;
  info: string;
};

export type DiagramEdge = {
  from: string;
  to: string;
  path: string;
  dashed?: boolean;
  labelX: number;
  labelY: number;
  label: string;
};

export type DiagramStep = {
  edge: number;
  narration: string;
};

export type ArchitectureDiagramData = {
  command: string;
  heading: string;
  viewBox: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  steps: DiagramStep[];
  legend?: boolean;
};

export default function ArchitectureDiagram({
  command,
  heading,
  viewBox,
  nodes,
  edges,
  steps,
  legend = true,
}: ArchitectureDiagramData) {
  const [selected, setSelected] = useState<string | null>(null);
  const [traceStep, setTraceStep] = useState<number | null>(null);

  const hasExternal = nodes.some((n) => n.external);
  const hasDashedEdge = edges.some((e) => e.dashed);
  const showLegend = legend && (hasExternal || hasDashedEdge);

  const activeEdgeIndex = traceStep !== null ? steps[traceStep].edge : null;
  const activeEdge = activeEdgeIndex !== null ? edges[activeEdgeIndex] : null;

  const selectedNode = nodes.find((n) => n.id === selected) ?? null;

  const startTrace = () => {
    setSelected(null);
    setTraceStep(0);
  };
  const stopTrace = () => setTraceStep(null);
  const next = () =>
    setTraceStep((s) => (s === null ? 0 : Math.min(s + 1, steps.length - 1)));
  const prev = () => setTraceStep((s) => (s === null ? 0 : Math.max(s - 1, 0)));

  const isNodeActive = (id: string) => {
    if (traceStep !== null && activeEdge) {
      return activeEdge.from === id || activeEdge.to === id;
    }
    return selected === id;
  };

  const isEdgeActive = (i: number) => traceStep !== null && activeEdgeIndex === i;

  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="font-mono text-xs text-text-muted">$ {command}</div>
          <h3 className="font-mono text-sm font-medium text-text-primary">{heading}</h3>
        </div>
        {traceStep === null ? (
          <button
            onClick={startTrace}
            className="rounded border border-accent px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-surface"
          >
            trace flow →
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={traceStep === 0}
              className="rounded border border-border px-2.5 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              ← prev
            </button>
            <span className="font-mono text-[11px] text-text-muted">
              {traceStep + 1} / {steps.length}
            </span>
            <button
              onClick={next}
              disabled={traceStep === steps.length - 1}
              className="rounded border border-border px-2.5 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              next →
            </button>
            <button
              onClick={stopTrace}
              className="rounded border border-border px-2.5 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-accent hover:text-accent"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <svg
        viewBox={viewBox}
        className="w-full select-none"
        role="img"
        aria-label={heading}
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-text-muted)" />
          </marker>
          <marker
            id="arrow-active"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-accent)" />
          </marker>
        </defs>

        {edges.map((edge, i) => {
          const active = isEdgeActive(i);
          return (
            <g key={`${edge.from}-${edge.to}-${i}`}>
              <path
                d={edge.path}
                fill="none"
                stroke={active ? "var(--color-accent)" : "var(--color-border)"}
                strokeWidth={active ? 2.5 : 1.5}
                strokeDasharray={edge.dashed ? "4 4" : undefined}
                markerEnd={active ? "url(#arrow-active)" : "url(#arrow)"}
                className="transition-all duration-300"
              />
              <text
                x={edge.labelX}
                y={edge.labelY}
                textAnchor="middle"
                className="font-mono transition-all duration-300"
                style={{
                  fontSize: 10,
                  fill: active ? "var(--color-accent)" : "var(--color-text-muted)",
                  opacity: active ? 1 : 0.6,
                }}
              >
                {edge.label}
              </text>
            </g>
          );
        })}

        {nodes.map((node) => {
          const active = isNodeActive(node.id);
          return (
            <g
              key={node.id}
              onMouseEnter={() => traceStep === null && setSelected(node.id)}
              onClick={() =>
                traceStep === null &&
                setSelected((s) => (s === node.id ? null : node.id))
              }
              className="cursor-pointer"
            >
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx={8}
                fill={active ? "var(--color-bg)" : "var(--color-surface)"}
                stroke={active ? "var(--color-accent)" : "var(--color-border)"}
                strokeWidth={active ? 2 : 1.5}
                strokeDasharray={node.external ? "5 3" : undefined}
                className="transition-all duration-300"
              />
              <text
                x={node.x + node.w / 2}
                y={node.y + node.h / 2 - (node.sublabel ? 4 : -4)}
                textAnchor="middle"
                className="pointer-events-none font-mono"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  fill: active ? "var(--color-accent)" : "var(--color-text-primary)",
                }}
              >
                {node.label}
              </text>
              {node.sublabel && (
                <text
                  x={node.x + node.w / 2}
                  y={node.y + node.h / 2 + 14}
                  textAnchor="middle"
                  className="pointer-events-none font-mono"
                  style={{ fontSize: 10, fill: "var(--color-text-muted)" }}
                >
                  {node.sublabel}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {showLegend && (
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-3 font-mono text-[10px] text-text-muted">
          <div className="flex items-center gap-2">
            <svg width="20" height="8" className="shrink-0">
              <line x1="0" y1="4" x2="20" y2="4" stroke="var(--color-text-muted)" strokeWidth="1.5" />
            </svg>
            direct flow
          </div>
          {hasDashedEdge && (
            <div className="flex items-center gap-2">
              <svg width="20" height="8" className="shrink-0">
                <line
                  x1="0"
                  y1="4"
                  x2="20"
                  y2="4"
                  stroke="var(--color-text-muted)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </svg>
              secondary / feedback path
            </div>
          )}
          {hasExternal && (
            <div className="flex items-center gap-2">
              <svg width="16" height="12" className="shrink-0">
                <rect
                  x="1"
                  y="1"
                  width="14"
                  height="10"
                  rx="2"
                  fill="none"
                  stroke="var(--color-text-muted)"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />
              </svg>
              external system
            </div>
          )}
        </div>
      )}

      <div className="mt-4 min-h-[52px] rounded-lg bg-bg px-4 py-3 font-mono text-xs leading-relaxed text-text-muted">
        {traceStep !== null ? (
          <>
            <span className="text-accent">step {traceStep + 1}:</span>{" "}
            {steps[traceStep].narration}
          </>
        ) : selectedNode ? (
          <>
            <span className="text-accent">{selectedNode.label}:</span> {selectedNode.info}
          </>
        ) : (
          "Hover or tap a node for what it does, or click \u201ctrace flow\u201d to follow it step by step."
        )}
      </div>
    </div>
  );
}
