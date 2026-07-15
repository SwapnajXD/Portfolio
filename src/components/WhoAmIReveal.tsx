"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Win98Desktop from "@/components/win98/Win98Desktop";

type ProjectSummary = { slug: string; title: string; tagline: string };
type JournalSummary = { slug: string; title: string; summary: string };

const BOOT_LINES = [
  "Starting Windows 98...",
  "Loading SWAPNAJ.SYS...",
  "Loading DEVOPS.DRV...",
  "Checking coffee levels...",
  "Almost there...",
];

function BootScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      onDone();
      return;
    }
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 250);
          return 100;
        }
        return p + 4;
      });
    }, 60);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lineIndex = Math.min(
    BOOT_LINES.length - 1,
    Math.floor((progress / 100) * BOOT_LINES.length)
  );

  return (
    <div
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center"
      style={{ background: "#000000", fontFamily: "monospace" }}
    >
      <div style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "bold", marginBottom: 24 }}>
        Windows<span style={{ color: "#00AA00" }}>98</span>
      </div>
      <div style={{ width: 220, border: "1px solid #FFFFFF", padding: 2 }}>
        <div
          style={{
            width: `${progress}%`,
            height: 10,
            background: "linear-gradient(90deg, #0000AA, #1084D0)",
            transition: "width 60ms linear",
          }}
        />
      </div>
      <div style={{ color: "#AAAAAA", fontSize: 12, marginTop: 12 }}>
        {BOOT_LINES[lineIndex]}
      </div>
    </div>
  );
}

export default function WhoAmIReveal({
  projects,
  journal,
}: {
  projects: ProjectSummary[];
  journal: JournalSummary[];
}) {
  const [revealed, setRevealed] = useState(false);
  const [booting, setBooting] = useState(false);

  if (booting) {
    return <BootScreen onDone={() => { setBooting(false); setRevealed(true); }} />;
  }

  if (revealed) {
    return (
      <Win98Desktop
        projects={projects}
        journal={journal}
        onExit={() => setRevealed(false)}
      />
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-16 font-mono text-sm">
      <p className="text-text-muted">$ whoami</p>
      <p className="mt-2 text-text-primary">
        swapnaj — cloud & devops, currently pretending this terminal is real.
      </p>
      <p className="mt-6 text-text-muted">$ cat curiosity.log</p>
      <p className="mt-2 text-text-primary">
        you checked a route that isn&apos;t linked anywhere. respect.
      </p>
      <p className="mt-6 text-text-muted">
        $ echo &quot;nothing else to see here, promise&quot;
      </p>
      <p className="mt-2 text-accent">nothing else to see here, promise</p>
      <p className="mt-6 text-text-muted">$ ls -la ~</p>
      <p className="mt-2 text-text-primary">
        drwxr-xr-x  projects/
        <br />
        drwxr-xr-x  journal/
        <br />
        <span className="text-text-muted">drwx------  .win98/</span>
        <span className="text-text-muted"> # circa 1998, do not enter</span>
      </p>
      <button
        onClick={() => setBooting(true)}
        className="mt-6 w-full rounded-lg border-2 border-accent bg-surface px-4 py-3 text-left font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-surface"
      >
        $ cd .win98/ &amp;&amp; ./boot.exe
        <span className="retro-blink" aria-hidden="true">
          _
        </span>
      </button>
      <Link
        href="/"
        className="mt-10 inline-block w-fit font-mono text-xs text-accent hover:underline"
      >
        ← cd ~
      </Link>
    </div>
  );
}
