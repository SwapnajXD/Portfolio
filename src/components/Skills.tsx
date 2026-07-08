import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-4xl px-6 py-12">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-wide text-text-muted">
        // skills
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.label}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <div className="mb-3 font-mono text-xs text-accent">{group.label}</div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded bg-bg px-2 py-1 text-xs text-text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
