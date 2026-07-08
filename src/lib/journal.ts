import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const journalDir = path.join(process.cwd(), "src/content/journal");

export type JournalMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

export function getJournalMeta(): JournalMeta[] {
  if (!fs.existsSync(journalDir)) return [];
  return fs
    .readdirSync(journalDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(journalDir, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title as string,
        date: data.date as string,
        summary: data.summary as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getJournalPost(slug: string) {
  const filePath = path.join(journalDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  return {
    title: data.title as string,
    date: data.date as string,
    html: processed.toString(),
  };
}
