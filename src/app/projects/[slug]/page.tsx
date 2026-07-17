import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProjectsMeta, getProjectBody } from "@/lib/projects";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import { architectures } from "@/lib/architectures";
import { SITE_URL, GITHUB_URL } from "@/lib/constants";

function readingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function generateStaticParams() {
  return getProjectsMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectsMeta().find((p) => p.slug === slug);
  if (!project) return {};

  const title = "Swapnaj";
  const ogTitle = `${project.title} — Swapnaj`;
  const url = `${SITE_URL}/projects/${project.slug}`;

  return {
    title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: project.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectsMeta().find((p) => p.slug === slug);
  if (!project) notFound();
  const body = await getProjectBody(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    codeRepository: project.repo,
    programmingLanguage: project.tech,
    author: {
      "@type": "Person",
      name: "Swapnaj",
      url: SITE_URL,
      sameAs: [GITHUB_URL],
    },
    url: `${SITE_URL}/projects/${project.slug}`,
  };

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/#projects" className="font-mono text-xs text-text-muted hover:text-accent">
        ← back to projects
      </Link>

      <div className="mt-6 mb-2 flex items-center gap-3 font-mono text-[11px] text-accent-secondary">
        <span>{project.category}</span>
        {project.featured && <span className="text-accent">★ featured</span>}
      </div>
      <h1 className="mb-3 font-mono text-2xl font-medium text-text-primary">
        {project.title}
      </h1>
      <p className="mb-8 text-sm text-text-muted">{project.tagline}</p>

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-text-muted">
        // overview
      </h2>
      <p className="mb-8 max-w-2xl border-l-2 border-border pl-4 text-sm leading-relaxed text-text-primary">
        {project.description}
      </p>

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-text-muted">
        // stack
      </h2>
      <div className="mb-8 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-accent-secondary/30 bg-accent-secondary/10 px-3 py-1 font-mono text-xs text-text-primary"
          >
            {t}
          </span>
        ))}
      </div>

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-text-muted">
        // highlights
      </h2>
      <div className="mb-8 rounded-lg border border-border bg-surface p-5">
        <ul className="space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm text-text-primary">
              <span className="text-accent">→</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {architectures[project.slug] && (
        <div className="mb-8">
          <ArchitectureDiagram {...architectures[project.slug]} />
        </div>
      )}

      {body && (
        <>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-wide text-text-muted">
              // case study
            </h2>
            <span className="font-mono text-[11px] text-text-muted">
              {readingTime(body)} min read
            </span>
          </div>
          <div
            className="case-study mb-8 border-t border-border pt-6 text-sm text-text-primary"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </>
      )}

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-text-muted">
        // links
      </h2>
      <div className="flex flex-wrap gap-3">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-sm text-text-primary transition-colors hover:border-accent hover:text-accent"
        >
          view repository on GitHub →
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-sm text-text-primary transition-colors hover:border-accent-secondary hover:text-accent-secondary"
          >
            view live demo →
          </a>
        )}
      </div>
    </article>
  );
}
