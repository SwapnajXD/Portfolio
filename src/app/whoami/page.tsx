import type { Metadata } from "next";
import WhoAmIReveal from "@/components/WhoAmIReveal";
import { getProjectsMeta } from "@/lib/projects";
import { getJournalMeta } from "@/lib/journal";

export const metadata: Metadata = {
  title: "whoami",
  robots: { index: false, follow: false },
};

export default function WhoAmI() {
  const projects = getProjectsMeta().map((p) => ({
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
  }));
  const journal = getJournalMeta().map((j) => ({
    slug: j.slug,
    title: j.title,
    summary: j.summary,
  }));
  return <WhoAmIReveal projects={projects} journal={journal} />;
}
