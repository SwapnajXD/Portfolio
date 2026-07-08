const links = [
  { label: "Email", value: "you@example.com", href: "mailto:you@example.com" },
  { label: "GitHub", value: "github.com/SwapnajXD", href: "https://github.com/SwapnajXD" },
  { label: "LinkedIn", value: "linkedin.com/in/you", href: "https://linkedin.com" },
  { label: "Resume", value: "download PDF", href: "/resume.pdf" },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-wide text-text-muted">
        // contact
      </h2>
      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center justify-between rounded-lg bg-bg px-4 py-3 transition-colors hover:bg-border/40"
            >
              <span className="font-mono text-xs text-text-muted">{link.label}</span>
              <span className="font-mono text-xs text-accent">{link.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
