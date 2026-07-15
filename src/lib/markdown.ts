import { remark } from "remark";
import remarkHtml from "remark-html";
import sanitizeHtml from "sanitize-html";

/**
 * Renders markdown body content to sanitized HTML. Shared by any content
 * type with a markdown body (journal posts, project case studies).
 *
 * Sanitization intentionally allows a few extra tags (img, h1, h2) beyond
 * sanitize-html's defaults, and forces safe rel/target on every link so
 * authored content can't accidentally (or maliciously) leak referrer info
 * or hijack the tab.
 */
export async function renderMarkdown(content: string): Promise<string> {
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
