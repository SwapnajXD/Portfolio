export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-12">
      <h2 className="mb-4 font-mono text-xs uppercase tracking-wide text-text-muted">
        // about
      </h2>
      <p className="max-w-2xl text-sm leading-relaxed text-text-primary">
        I&apos;m a computer engineering student focused on cloud
        infrastructure and DevOps — currently deep in AWS, Docker, and
        Terraform, with a homelab I use as a sandbox for the things I&apos;m
        learning. I like building projects that actually run somewhere, not
        just repos that compile.
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted">
        Outside of that, I&apos;m usually listening to music, drawing, or
        playing games — and yes, I have a half-formed idea for a Grafana
        dashboard that tracks my Spotify listening habits.
      </p>
    </section>
  );
}
