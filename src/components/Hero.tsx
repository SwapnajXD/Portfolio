import { getCertifications } from "@/lib/certifications";
import { getProjectsMeta } from "@/lib/projects";

export default function Hero() {
  // Fetch dynamic content blocks from markdown files
  const projects = getProjectsMeta();
  const certifications = getCertifications();

  return (
    <section id="top" className="mx-auto max-w-4xl px-6 pt-16 pb-12">
      <div className="rounded-xl border border-border bg-surface p-8">
        <div className="mb-6 flex items-center justify-between font-mono text-xs">
          <span className="text-accent-secondary">status: online</span>
          <span className="text-text-muted">uptime 99.98%</span>
        </div>

        <h1 className="mb-2 font-mono text-2xl font-medium text-text-primary">
          Swapnaj — Cloud &amp; DevOps
        </h1>
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-text-muted">
          Computer engineering student building infrastructure, pipelines, and
          things that shouldn&apos;t go down. Learning cloud and DevOps by
          shipping real projects, not just tutorials.
        </p>

        <p className="mb-6 font-mono text-xs text-accent-secondary">
          $ currently building: a GitHub Actions pipeline for Cloud Sentinel
        </p>

        <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs">
          {["terraform", "docker", "aws", "prometheus"].map((tag) => (
            <span
              key={tag}
              className="rounded border border-accent px-2.5 py-1 text-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-bg px-4 py-3">
            <div className="font-mono text-[11px] text-text-muted">projects</div>
            <div className="font-mono text-lg font-medium text-text-primary">
              {String(projects.length).padStart(2, "0")}
            </div>
          </div>
          <div className="rounded-lg bg-bg px-4 py-3">
            <div className="font-mono text-[11px] text-text-muted">certs</div>
            <div className="font-mono text-lg font-medium text-text-primary">
              {String(certifications.length).padStart(2, "0")}
            </div>
          </div>
          <div className="rounded-lg bg-bg px-4 py-3">
            <div className="font-mono text-[11px] text-text-muted">focus</div>
            <div className="font-mono text-lg font-medium text-accent">
              cloud/ops
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}