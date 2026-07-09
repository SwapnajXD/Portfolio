export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6 h-4 w-32 animate-pulse rounded bg-border" />
      <div className="mb-3 h-8 w-64 animate-pulse rounded bg-border" />
      <div className="mb-8 h-4 w-48 animate-pulse rounded bg-border" />
      <div className="h-32 w-full animate-pulse rounded-lg bg-border" />
    </div>
  );
}
