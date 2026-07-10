import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "whoami",
  robots: { index: false, follow: false },
};

export default function WhoAmI() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6 py-16 font-mono text-sm">
      <p className="text-text-muted">$ whoami</p>
      <p className="mt-2 text-text-primary">
        swapnaj — cloud & devops, currently pretending this terminal is real.
      </p>
      <p className="mt-6 text-text-muted">$ cat curiosity.log</p>
      <p className="mt-2 text-text-primary">
        you checked a route that isn&apos;t linked anywhere. respect.
      </p>
      <p className="mt-6 text-text-muted">
        $ echo &quot;nothing else to see here, promise&quot;
      </p>
      <p className="mt-2 text-accent">nothing else to see here, promise</p>
      <Link
        href="/"
        className="mt-10 inline-block w-fit font-mono text-xs text-accent hover:underline"
      >
        ← cd ~
      </Link>
    </div>
  );
}
