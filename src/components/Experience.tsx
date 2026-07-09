import { getCertifications } from "@/lib/certifications";
import { journeyRepo } from "@/lib/data";

export default function Experience() {
  // Fetch certifications dynamically from markdown files
  const certifications = getCertifications();

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-12">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-wide text-text-muted">
        // experience &amp; certifications
      </h2>
      <div className="space-y-3">
        {certifications.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4"
          >
            {item.badge && (
              <img
                src={item.badge}
                alt={`${item.title} badge`}
                className="h-12 w-12 shrink-0 rounded object-contain"
              />
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-mono text-sm font-medium text-text-primary">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent hover:underline"
                    >
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
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
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-mono text-[11px] text-accent hover:underline"
                >
                  view credential →
                </a>
              )}
            </div>
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
          target="_blank"
          rel="noopener noreferrer"
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