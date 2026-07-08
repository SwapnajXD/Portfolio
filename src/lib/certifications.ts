import fs from "fs";
import path from "path";
import matter from "gray-matter";

const certsDir = path.join(process.cwd(), "src/content/certifications");

export type Certification = {
  slug: string;
  title: string;
  org: string;
  note: string;
  link?: string;
  badge?: string;
  status?: "in progress";
  order: number;
};

export function getCertifications(): Certification[] {
  if (!fs.existsSync(certsDir)) return [];

  return fs
    .readdirSync(certsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(certsDir, file), "utf8");
      const { data } = matter(raw);

      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title as string,
        org: data.org as string,
        note: data.note as string,
        link: data.link as string | undefined,
        badge: data.badge as string | undefined,
        status: data.status as "in progress" | undefined,
        order: data.order as number,
      };
    })
    .sort((a, b) => a.order - b.order);
}