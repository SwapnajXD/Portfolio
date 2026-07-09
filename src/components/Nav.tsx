"use client";
import Link from "next/link";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
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
            className="hidden items-center gap-1 rounded border border-border px-2 py-1 font-mono text-[11px] text-text-muted transition-colors hover:border-accent hover:text-accent sm:flex"
          >
            <span>⌘K</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
