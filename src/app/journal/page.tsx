import Link from "next/link";
import { getJournalMeta } from "@/lib/journal";

export default function JournalIndex() {
  const posts = getJournalMeta();
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 font-mono text-2xl font-medium text-text-primary">Journal</h1>
          <p className="text-sm text-text-muted">
            Notes from my DevOps and cloud learning, pulled from my running journey log.
          </p>
        </div>
        <a
          href="/journal/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-border px-2.5 py-1 font-mono text-[11px] text-text-muted hover:border-accent hover:text-accent"
        >
          RSS
        </a>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className="block rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            <div className="mb-1 font-mono text-[11px] text-text-muted">{post.date}</div>
            <h2 className="mb-1 font-mono text-sm font-medium text-text-primary">
              {post.title}
            </h2>
            <p className="text-xs text-text-muted">{post.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
