import { z } from "zod";

// Accepts either a full URL (https://github.com/...) or a local absolute
// path (/certificates/foo.pdf) — content in this repo uses both.
const urlOrPath = z
  .string()
  .refine(
    (v) => v.startsWith("/") || /^https?:\/\//.test(v),
    "must be a full URL or an absolute path starting with /"
  );

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string()).default([]),
  repo: urlOrPath,
  demo: urlOrPath.optional(),
  category: z.enum(["Infrastructure", "Backend / DevOps", "Full-stack"]),
  highlights: z.array(z.string()).default([]),
  order: z.number(),
  featured: z.boolean().optional(),
});
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export const journalFrontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  summary: z.string().min(1),
});
export type JournalFrontmatter = z.infer<typeof journalFrontmatterSchema>;

export const certificationFrontmatterSchema = z.object({
  title: z.string().min(1),
  org: z.string().min(1),
  note: z.string().min(1),
  link: urlOrPath.optional(),
  badge: urlOrPath.optional(),
  status: z.literal("in progress").optional(),
  order: z.number(),
});
export type CertificationFrontmatter = z.infer<typeof certificationFrontmatterSchema>;

/**
 * Parses frontmatter against a schema, throwing a clear, file-specific
 * error on failure instead of letting bad data silently become `undefined`
 * somewhere deep in a component.
 */
export function parseFrontmatter<S extends z.ZodTypeAny>(
  schema: S,
  data: unknown,
  fileLabel: string
): z.infer<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in ${fileLabel}:\n${issues}`);
  }
  return result.data;
}
