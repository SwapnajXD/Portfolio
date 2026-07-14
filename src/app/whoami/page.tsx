import type { Metadata } from "next";
import WhoAmIReveal from "@/components/WhoAmIReveal";
import { getProjectsMeta } from "@/lib/projects";

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
  return <WhoAmIReveal projects={projects} />;
}
