import { notFound } from "next/navigation";
import Link from "next/link";
import { getJournalMeta, getJournalPost } from "@/lib/journal";

export function generateStaticParams() {
  return getJournalMeta().map((p) => ({ slug: p.slug }));
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
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
