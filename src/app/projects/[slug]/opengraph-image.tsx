import { ImageResponse } from "next/og";
import { getProjectsMeta } from "@/lib/projects";
import { SITE_DOMAIN } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#15171A";
const SURFACE = "#1D2025";
const BORDER = "#2D3138";
const TEXT_PRIMARY = "#F2F2F0";
const TEXT_MUTED = "#9A9DA3";
const ACCENT = "#F6821F";
const ACCENT_SECONDARY = "#3B82F6";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectsMeta().find((p) => p.slug === slug);

  const title = project?.title ?? "Project";
  const tagline = project?.tagline ?? "";
  const category = project?.category ?? "";
  const tech = project?.tech?.slice(0, 5) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: BG,
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 1000,
            padding: 48,
            borderRadius: 16,
            border: `1px solid ${BORDER}`,
            background: SURFACE,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 20,
              color: ACCENT_SECONDARY,
              marginBottom: 24,
            }}
          >
            <span>status: online</span>
            <span style={{ color: TEXT_MUTED }}>{SITE_DOMAIN}</span>
          </div>

          <div style={{ display: "flex", fontSize: 18, color: ACCENT, marginBottom: 12 }}>
            {category}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              color: TEXT_PRIMARY,
              marginBottom: 20,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: TEXT_MUTED,
              marginBottom: 36,
              maxWidth: 850,
            }}
          >
            {tagline}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {tech.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: 18,
                  color: TEXT_MUTED,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 6,
                  padding: "6px 14px",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
