export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-2 h-8 w-40 animate-pulse rounded bg-border" />
      <div className="mb-8 h-4 w-64 animate-pulse rounded bg-border" />
      <div className="space-y-4">
        <div className="h-20 w-full animate-pulse rounded-lg bg-border" />
        <div className="h-20 w-full animate-pulse rounded-lg bg-border" />
        <div className="h-20 w-full animate-pulse rounded-lg bg-border" />
      </div>
    </div>
  );
}
