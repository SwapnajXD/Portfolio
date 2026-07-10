import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import sanitizeHtml from "sanitize-html";

const projectsDir = path.join(process.cwd(), "src/content/projects");

export type ProjectMeta = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  repo: string;
  demo?: string;
  category: "Infrastructure" | "Backend / DevOps" | "Full-stack";
  highlights: string[];
  order: number;
  featured?: boolean;
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
        demo: data.demo as string | undefined,
        category: data.category as ("Infrastructure" | "Backend / DevOps" | "Full-stack"),
        highlights: (data.highlights || []) as string[],
        order: data.order as number,
        featured: data.featured as boolean | undefined,
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
  const processed = await remark().use(remarkHtml).process(content);
  return sanitizeHtml(processed.toString(), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height"],
      a: ["href", "name", "target", "rel"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
    },
  });
}