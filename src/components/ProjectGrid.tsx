import Link from "next/link";
import { getProjectsMeta } from "@/lib/projects";

export default function ProjectGrid() {
  // Fetch your markdown-driven projects dynamically
  const projects = getProjectsMeta();

  return (
    <section id="projects" className="mx-auto max-w-4xl px-6 py-12">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-wide text-text-muted">
        // projects
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`group rounded-lg border p-5 transition-colors ${
              project.featured
                ? "border-accent bg-surface sm:col-span-2"
                : "border-border bg-surface hover:border-accent"
            }`}
          >
            <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-accent-secondary">
              <span>{project.category}</span>
              <span className="flex items-center gap-3">
                {project.featured && (
                  <span className="flex items-center gap-1 text-accent">★ featured</span>
                )}
                {project.demo && (
                  <span className="flex items-center gap-1 text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    live
                  </span>
                )}
              </span>
            </div>
            <h3 className="mb-1 font-mono text-sm font-medium text-text-primary group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mb-3 text-xs leading-relaxed text-text-muted">
              {project.tagline}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded bg-bg px-1.5 py-0.5 text-[10px] text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}