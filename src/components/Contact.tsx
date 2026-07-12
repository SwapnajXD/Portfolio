const links = [
  { label: "Email", value: "swapnaj0806@gmail.com", href: "mailto:swapnaj0806@gmail.com" },
  { label: "GitHub", value: "github.com/SwapnajXD", href: "https://github.com/SwapnajXD" },
  { label: "LinkedIn", value: "linkedin.com/swapnajxd", href: "https://www.linkedin.com/in/swapnajxd" },
  { label: "Resume", value: "download PDF", href: "/resume.pdf" },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-wide text-text-muted">
        // contact
      </h2>
      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((link) => {
            // Check if it's the email link
            const isEmail = link.label === "Email";

            return (
              <a
                key={link.label}
                href={link.href}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                className="flex items-center justify-between rounded-lg bg-bg px-4 py-3 transition-colors hover:bg-border/40"
              >
                <span className="font-mono text-xs text-text-muted">{link.label}</span>
                <span className="font-mono text-xs text-accent">{link.value}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}