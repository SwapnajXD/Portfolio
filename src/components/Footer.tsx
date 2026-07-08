export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-8 font-mono text-[11px] text-text-muted">
        <p>
          Built with Next.js + Tailwind, deployed on Vercel, shipped via
          GitHub Actions CI/CD.
        </p>
        <p className="mt-1">© {new Date().getFullYear()} Swapnaj. All rights reserved.</p>
      </div>
    </footer>
  );
}
