"use client";

import { useState } from "react";

type NodeId =
  | "browser"
  | "dashboard"
  | "gateway"
  | "redis"
  | "worker"
  | "aws"
  | "postgres";

type Node = {
  id: NodeId;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  w: number;
  h: number;
  external?: boolean;
  info: string;
};

type Edge = {
  from: NodeId;
  to: NodeId;
  path: string;
  dashed?: boolean;
  labelX: number;
  labelY: number;
  label: string;
};

type Step = {
  edge: number;
  narration: string;
};

const nodes: Node[] = [
  {
    id: "browser",
    label: "Browser",
    sublabel: "you",
    x: 20,
    y: 160,
    w: 110,
    h: 60,
    info: "Where you view scan results and trigger new audits.",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    sublabel: "Next.js",
    x: 190,
    y: 160,
    w: 130,
    h: 60,
    info: "Next.js frontend that renders the live findings dashboard.",
  },
  {
    id: "gateway",
    label: "Gateway",
    sublabel: "Express + JWT",
    x: 380,
    y: 160,
    w: 140,
    h: 60,
    info: "Node/Express API layer. Every request is checked against a JWT before it's allowed through.",
  },
  {
    id: "redis",
    label: "Redis",
    sublabel: "queue",
    x: 570,
    y: 50,
    w: 110,
    h: 60,
    info: "Message queue. Decouples the API from the actual scanning work so requests return instantly instead of blocking.",
  },
  {
    id: "worker",
    label: "Worker",
    sublabel: "Python + boto3",
    x: 740,
    y: 160,
    w: 140,
    h: 60,
    info: "A Python process that pulls jobs off the queue and talks to AWS directly via boto3.",
  },
  {
    id: "aws",
    label: "AWS Account",
    sublabel: "external",
    x: 740,
    y: 30,
    w: 140,
    h: 60,
    external: true,
    info: "The AWS account being audited — S3 buckets, EC2 security groups, IAM. Lives outside this system entirely.",
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    sublabel: "findings store",
    x: 570,
    y: 270,
    w: 130,
    h: 60,
    info: "Every finding gets written here, so you get history and trends, not just the latest scan.",
  },
];

const edges: Edge[] = [
  {
    from: "browser",
    to: "dashboard",
    path: "M 130 190 L 190 190",
    labelX: 160,
    labelY: 180,
    label: "load",
  },
  {
    from: "dashboard",
    to: "gateway",
    path: "M 320 190 L 380 190",
    labelX: 350,
    labelY: 180,
    label: "API call",
  },
  {
    from: "gateway",
    to: "redis",
    path: "M 500 160 C 540 110, 540 100, 580 108",
    labelX: 545,
    labelY: 120,
    label: "enqueue",
  },
  {
    from: "redis",
    to: "worker",
    path: "M 635 110 C 660 130, 690 145, 745 158",
    labelX: 690,
    labelY: 130,
    label: "dequeue",
  },
  {
    from: "worker",
    to: "aws",
    path: "M 810 160 L 810 90",
    labelX: 830,
    labelY: 125,
    label: "boto3",
  },
  {
    from: "worker",
    to: "postgres",
    path: "M 780 220 C 760 250, 700 265, 700 270",
    labelX: 730,
    labelY: 255,
    label: "write",
  },
  {
    from: "postgres",
    to: "gateway",
    path: "M 570 290 C 470 300, 420 240, 445 220",
    labelX: 480,
    labelY: 275,
    label: "read (polled)",
    dashed: true,
  },
];

const steps: Step[] = [
  { edge: 0, narration: "You open the dashboard in your browser." },
  {
    edge: 1,
    narration:
      "The dashboard calls the API gateway. Every request is checked against a JWT before anything runs.",
  },
  {
    edge: 2,
    narration:
      "Instead of scanning inline, the gateway pushes a scan job onto a Redis queue and returns immediately.",
  },
  { edge: 3, narration: "A Python worker pulls the job off the queue." },
  {
    edge: 4,
    narration:
      "The worker calls AWS directly through boto3 — checking S3 bucket ACLs, security group rules, and IAM MFA status.",
  },
  { edge: 5, narration: "Findings get written to PostgreSQL as they're found." },
  {
    edge: 6,
    narration:
      "The dashboard polls the gateway, which reads the latest findings from PostgreSQL and returns them to you.",
  },
];

export default function CloudSentinelArchitecture() {
  const [selected, setSelected] = useState<NodeId | null>(null);
  const [traceStep, setTraceStep] = useState<number | null>(null);

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

  const isNodeActive = (id: NodeId) => {
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
          <div className="font-mono text-xs text-text-muted">
            $ architecture --interactive
          </div>
          <h3 className="font-mono text-sm font-medium text-text-primary">
            How a scan request actually flows
          </h3>
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
        viewBox="0 0 920 360"
        className="w-full select-none"
        role="img"
        aria-label="Cloud Sentinel architecture diagram"
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
            <g key={`${edge.from}-${edge.to}`}>
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
                y={node.y + node.h / 2 - 4}
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
              <text
                x={node.x + node.w / 2}
                y={node.y + node.h / 2 + 14}
                textAnchor="middle"
                className="pointer-events-none font-mono"
                style={{ fontSize: 10, fill: "var(--color-text-muted)" }}
              >
                {node.sublabel}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-4 min-h-[52px] rounded-lg bg-bg px-4 py-3 font-mono text-xs leading-relaxed text-text-muted">
        {traceStep !== null ? (
          <>
            <span className="text-accent">step {traceStep + 1}:</span>{" "}
            {steps[traceStep].narration}
          </>
        ) : selectedNode ? (
          <>
            <span className="text-accent">{selectedNode.label}:</span>{" "}
            {selectedNode.info}
          </>
        ) : (
          "Hover or tap a node for what it does, or click \u201ctrace flow\u201d to follow a scan request end to end."
        )}
      </div>
    </div>
  );
}
