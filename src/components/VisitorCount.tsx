"use client";
import { useEffect, useState } from "react";

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/swapnaj-dev-portfolio/visits")
      .then((r) => r.json())
      .then((d) => setCount(d.value))
      .catch(() => setCount(null));
  }, []);

  return (
    <div className="rounded-lg bg-bg px-4 py-3">
      <div className="font-mono text-[11px] text-text-muted">visits</div>
      <div className="font-mono text-lg font-medium text-accent">
        {count !== null ? count.toLocaleString() : "···"}
      </div>
    </div>
  );
}
