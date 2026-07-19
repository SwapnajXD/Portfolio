import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-8 font-mono text-[11px] text-text-muted">
        <p>
          Built with Next.js + Tailwind, deployed on Vercel, shipped via
          GitHub Actions CI/CD.
        </p>
        <p className="mt-1">© {new Date().getFullYear()} Swapnaj. All rights reserved.</p>
        <p className="mt-1">
          $ whoami{" "}
          <Link href="/whoami" className="hover:text-accent hover:underline">
            → you tell me
          </Link>
        </p>
      </div>
    </footer>
  );
}
