"use client";

import { useState } from "react";
import Link from "next/link";
import Win98Desktop from "@/components/win98/Win98Desktop";

type ProjectSummary = { slug: string; title: string; tagline: string };
type JournalSummary = { slug: string; title: string; summary: string };

export default function WhoAmIReveal({
  projects,
  journal,
}: {
  projects: ProjectSummary[];
  journal: JournalSummary[];
}) {
  const [revealed, setRevealed] = useState(false);

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
        onClick={() => setRevealed(true)}
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
