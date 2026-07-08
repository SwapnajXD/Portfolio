import { certifications, journeyRepo } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-12">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-wide text-text-muted">
        // experience &amp; certifications
      </h2>
      <div className="space-y-3">
        {certifications.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-mono text-sm font-medium text-text-primary">
                {item.title}
              </h3>
              {item.status && (
                <span className="rounded bg-bg px-2 py-0.5 font-mono text-[10px] text-accent-secondary">
                  in progress
                </span>
              )}
            </div>
            <div className="mb-1 font-mono text-[11px] text-text-muted">
              {item.org}
            </div>
            <p className="text-xs leading-relaxed text-text-muted">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-dashed border-border p-4">
        <h3 className="mb-1 font-mono text-sm font-medium text-text-primary">
          {journeyRepo.title}
        </h3>
        <p className="mb-2 text-xs leading-relaxed text-text-muted">
          {journeyRepo.description}
        </p>
        <a
          href={journeyRepo.link}
          className="font-mono text-xs text-accent hover:underline"
        >
          view on GitHub →
        </a>
      </div>

      <div className="mt-4">
        <a href="/journal" className="font-mono text-xs text-text-muted hover:text-accent">
          read the journal →
        </a>
      </div>
    </section>
  );
}
