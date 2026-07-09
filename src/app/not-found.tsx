import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="mx-auto mb-6 inline-block rounded-lg border border-border bg-surface px-6 py-5">
        <div className="mb-2 font-mono text-xs text-accent">
          status: 404
        </div>
        <div className="font-mono text-sm text-text-muted">
          $ curl swapnaj.dev{"{this-page}"}
        </div>
        <div className="font-mono text-sm text-text-muted">
          connection refused — route does not exist
        </div>
      </div>
      <h1 className="mb-3 font-mono text-xl font-medium text-text-primary">
        This route returned a 404
      </h1>
      <p className="mb-6 text-sm text-text-muted">
        Whatever you were looking for isn&apos;t deployed here. Let&apos;s get
        you back to a page that resolves.
      </p>
      <Link
        href="/"
        className="rounded-lg border border-accent px-4 py-2 font-mono text-xs text-accent hover:bg-accent hover:text-surface transition-colors"
      >
        return home →
      </Link>
    </section>
  );
}
