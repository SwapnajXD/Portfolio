import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "src/content/projects");

export type ProjectMeta = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  repo: string;
  category: "Infrastructure" | "Backend / DevOps" | "Full-stack";
  highlights: string[];
};

export function getProjectsMeta(): ProjectMeta[] {
  if (!fs.existsSync(projectsDir)) return [];
  
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf8");
      const { data } = matter(raw);
      
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title as string,
        tagline: data.tagline as string,
        description: data.description as string,
        tech: (data.tech || []) as string[],
        repo: data.repo as string,
        category: data.category as ("Infrastructure" | "Backend / DevOps" | "Full-stack"),
        highlights: (data.highlights || []) as string[],
      };
    });
}