# Portfolio site

Personal portfolio built with Next.js (App Router), Tailwind CSS v4, and TypeScript.

## Stack
- Next.js 16 (App Router)
- Tailwind CSS v4
- Framer Motion (for subtle scroll/hover motion — not yet wired in, add as needed)
- gray-matter + remark for journal posts (Markdown with frontmatter)
- Deployed on Vercel, CI via GitHub Actions

## Structure
```
src/
  app/
    page.tsx                  → home page (assembles sections)
    layout.tsx                → fonts, Nav, Footer
    projects/[slug]/page.tsx  → project case studies
    journal/page.tsx          → journal index
    journal/[slug]/page.tsx   → individual journal post
  components/                 → Hero, About, Skills, ProjectGrid, Experience, Contact, Nav, Footer
  content/
    journal/*.md              → journal posts (frontmatter: title, date, summary)
  lib/
    data.ts                   → projects, skills, certifications (edit this to update content)
    journal.ts                → markdown reading utility
```

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Editing content

- **Projects, skills, certifications**: edit `src/lib/data.ts`
- **Journal posts**: add a new `.md` file to `src/content/journal/` with frontmatter:
  ```markdown
  ---
  title: "Your post title"
  date: "2026-07-09"
  summary: "One-line summary"
  ---

  Your content here.
  ```
- **Resume**: drop your PDF at `public/resume.pdf` (the Contact section already links to it)
- **Photos/videos**: put images in `public/images/`, reference with `next/image`; for demo clips, use a muted looping `<video>` tag pointing at a file in `public/videos/`

## Deploying

1. Push this repo to GitHub
2. Import it on [vercel.com](https://vercel.com) — it auto-detects Next.js
3. Every push to `main` will run the GitHub Actions CI (lint + build) and redeploy via Vercel
