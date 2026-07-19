import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-10 font-mono text-[11px] text-text-muted">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Built with Next.js + Tailwind, deployed on Vercel, shipped via
            GitHub Actions CI/CD.
          </p>
          <p>© {new Date().getFullYear()} Swapnaj. All rights reserved.</p>
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <Link
            href="/whoami"
            className="group inline-flex items-center gap-2 text-text-muted transition-colors hover:text-accent"
          >
            <span className="text-accent">$</span>
            <span>whoami</span>
            <span className="text-text-muted transition-colors group-hover:text-accent">
              → you tell me
            </span>
            <span className="retro-blink text-accent" aria-hidden="true">
              _
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
