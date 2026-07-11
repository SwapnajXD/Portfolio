import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  certificationFrontmatterSchema,
  parseFrontmatter,
  type CertificationFrontmatter,
} from "@/lib/schemas";

const certsDir = path.join(process.cwd(), "src/content/certifications");

export type Certification = CertificationFrontmatter & { slug: string };

export function getCertifications(): Certification[] {
  if (!fs.existsSync(certsDir)) return [];

  return fs
    .readdirSync(certsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(certsDir, file), "utf8");
      const { data } = matter(raw);
      const fm = parseFrontmatter(certificationFrontmatterSchema, data, `certifications/${file}`);

      return {
        slug: file.replace(/\.md$/, ""),
        ...fm,
      };
    })
    .sort((a, b) => a.order - b.order);
}