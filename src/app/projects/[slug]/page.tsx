import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/#projects" className="font-mono text-xs text-text-muted hover:text-accent">
        ← back to projects
      </Link>

      <div className="mt-6 mb-2 font-mono text-[11px] text-accent-secondary">
        {project.category}
      </div>
      <h1 className="mb-3 font-mono text-2xl font-medium text-text-primary">
        {project.title}
      </h1>
      <p className="mb-6 text-sm text-text-muted">{project.tagline}</p>

      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-text-primary">
        {project.description}
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded border border-border px-2.5 py-1 font-mono text-xs text-text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mb-8 rounded-lg border border-border bg-surface p-5">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-text-muted">
          highlights
        </h2>
        <ul className="space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm text-text-primary">
              <span className="text-accent">→</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={project.repo}
        className="font-mono text-sm text-accent hover:underline"
      >
        view repository on GitHub →
      </a>
    </article>
  );
}
