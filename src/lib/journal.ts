import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "@/lib/markdown";
import {
  journalFrontmatterSchema,
  parseFrontmatter,
  type JournalFrontmatter,
} from "@/lib/schemas";

const journalDir = path.join(process.cwd(), "src/content/journal");

export type JournalMeta = JournalFrontmatter & { slug: string };

export function getJournalMeta(): JournalMeta[] {
  if (!fs.existsSync(journalDir)) return [];
  return fs
    .readdirSync(journalDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(journalDir, file), "utf8");
      const { data } = matter(raw);
      const fm = parseFrontmatter(journalFrontmatterSchema, data, `journal/${file}`);
      return {
        slug: file.replace(/\.md$/, ""),
        ...fm,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getJournalPost(slug: string) {
  const filePath = path.join(journalDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = parseFrontmatter(journalFrontmatterSchema, data, `journal/${slug}.md`);
  const html = await renderMarkdown(content);
  return {
    title: fm.title,
    date: fm.date,
    html,
  };
}
