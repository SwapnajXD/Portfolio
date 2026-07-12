"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeContext";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const { isDark, toggleTheme } = useTheme();
  // The rope toggle in ThemeToggle.jsx only renders on desktop with motion
  // allowed. Everywhere else (mobile, or reduced-motion desktop), this
  // simple button is the only way to change theme, so show it there.
  const [showFallbackToggle, setShowFallbackToggle] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setShowFallbackToggle(mobileQuery.matches || motionQuery.matches);
    };
    update();
    mobileQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      mobileQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/#top" className="font-mono text-sm text-text-primary">
          swapnaj<span className="text-accent">.dev</span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6 font-mono text-xs text-text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
            aria-label="Open command palette"
            className="hidden items-center gap-1 rounded border border-border px-2 py-1 font-mono text-[11px] text-text-muted transition-colors hover:border-accent hover:text-accent sm:flex"
          >
            <span aria-hidden="true">⌘K</span>
          </button>
          {showFallbackToggle && (
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="flex items-center justify-center rounded border border-border p-1.5 text-text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
