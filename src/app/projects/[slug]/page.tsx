import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProjectsMeta, getProjectBody } from "@/lib/projects";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import { architectures } from "@/lib/architectures";
import { SITE_URL, GITHUB_URL } from "@/lib/constants";

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
    <article className="mx-auto max-w-3xl px-6 py-16">
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

      {architectures[project.slug] && (
        <div className="mb-8">
          <ArchitectureDiagram {...architectures[project.slug]} />
        </div>
      )}

      {body && (
        <div
          className="prose-sm mb-8 max-w-none text-sm leading-relaxed text-text-primary [&_p]:mb-4"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}

      <div className="flex flex-wrap gap-4">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-accent hover:underline"
        >
          view repository on GitHub →
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-accent-secondary hover:underline"
          >
            view live demo →
          </a>
        )}
      </div>
    </article>
  );
}
