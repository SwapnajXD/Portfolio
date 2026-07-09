"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="mx-auto mb-6 inline-block rounded-lg border border-border bg-surface px-6 py-5">
        <div className="mb-2 font-mono text-xs text-accent">
          status: 500
        </div>
        <div className="font-mono text-sm text-text-muted">
          $ systemctl status portfolio
        </div>
        <div className="font-mono text-sm text-text-muted">
          unexpected error — process crashed
        </div>
      </div>
      <h1 className="mb-3 font-mono text-xl font-medium text-text-primary">
        Something broke on this page
      </h1>
      <p className="mb-6 text-sm text-text-muted">
        Not your fault — this one&apos;s on the deploy. You can try again, or
        head back to a page that&apos;s known to work.
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => reset()}
          className="rounded-lg border border-accent px-4 py-2 font-mono text-xs text-accent hover:bg-accent hover:text-surface transition-colors"
        >
          try again →
        </button>
        <a
          href="/"
          className="rounded-lg border border-border px-4 py-2 font-mono text-xs text-text-muted hover:border-accent hover:text-accent transition-colors"
        >
          return home
        </a>
      </div>
    </section>
  );
}
