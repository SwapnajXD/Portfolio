import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "@/lib/markdown";
import { projectFrontmatterSchema, parseFrontmatter, type ProjectFrontmatter } from "@/lib/schemas";

const projectsDir = path.join(process.cwd(), "src/content/projects");

export type ProjectMeta = ProjectFrontmatter & { slug: string };

export function getProjectsMeta(): ProjectMeta[] {
  if (!fs.existsSync(projectsDir)) return [];
  
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf8");
      const { data } = matter(raw);
      const fm = parseFrontmatter(projectFrontmatterSchema, data, `projects/${file}`);

      return {
        slug: file.replace(/\.md$/, ""),
        ...fm,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export async function getProjectBody(slug: string): Promise<string | null> {
  const filePath = path.join(projectsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  if (!content.trim()) return null;
  return renderMarkdown(content);
}