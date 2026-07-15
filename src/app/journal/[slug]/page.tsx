import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getJournalMeta, getJournalPost } from "@/lib/journal";
import { SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return getJournalMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getJournalMeta().find((p) => p.slug === slug);
  if (!meta) return {};

  const title = "Swapnaj";
  const ogTitle = `${meta.title} — Swapnaj's Journal`;
  const url = `${SITE_URL}/journal/${meta.slug}`;

  return {
    title,
    description: meta.summary,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: meta.summary,
      url,
      type: "article",
      publishedTime: meta.date,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: meta.summary,
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) notFound();
  const meta = getJournalMeta().find((p) => p.slug === slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: meta?.summary,
    url: `${SITE_URL}/journal/${slug}`,
    author: {
      "@type": "Person",
      name: "Swapnaj",
      url: SITE_URL,
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/journal" className="font-mono text-xs text-text-muted hover:text-accent">
        ← back to journal
      </Link>
      <div className="mt-6 mb-1 font-mono text-[11px] text-text-muted">{post.date}</div>
      <h1 className="mb-6 font-mono text-2xl font-medium text-text-primary">{post.title}</h1>
      <div
        className="prose-sm max-w-none text-sm leading-relaxed text-text-primary [&_p]:mb-4"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
