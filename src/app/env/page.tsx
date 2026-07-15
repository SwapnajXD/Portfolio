import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "env",
  robots: { index: false, follow: false },
};

const fakeEnv = [
  "AWS_ACCESS_KEY_ID=not_today_scanner_bot",
  "AWS_SECRET_ACCESS_KEY=cloud_sentinel_would_have_flagged_this",
  "JWT_SECRET=youre_supposed_to_rotate_this_btw",
  "DATABASE_URL=postgresql://nice_try:404@localhost/nothing",
  "GEMINI_API_KEY=ask_nicely_and_ill_write_you_a_summary",
  "COFFEE_LEVEL=critically_low",
];

export default function EnvPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-16 font-mono text-sm">
      <p className="text-text-muted"># .env</p>
      <p className="mt-1 text-text-muted">
        # if you&apos;re scanning for this on a real target, Cloud Sentinel
        would&apos;ve caught you.
      </p>
      <div className="mt-6 rounded-lg border border-border bg-surface p-4">
        {fakeEnv.map((line) => (
          <p key={line} className="text-accent-secondary">
            {line}
          </p>
        ))}
      </div>
      <Link
        href="/"
        className="mt-10 inline-block w-fit font-mono text-xs text-accent hover:underline"
      >
        ← cd ~
      </Link>
    </div>
  );
}
