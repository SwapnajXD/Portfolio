"use client";

import { motion } from "framer-motion";
import { P5Container } from "@/components/P5Container";
import { BattleMenu } from "@/components/BattleMenu";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PhanSitePanel } from "@/components/ui/PhanSitePanel";
import { CallingCard } from "@/components/ui/CallingCard";

const projects = [
  {
    id: "001",
    title: "Velvet Signal",
    description: "A neon-forward analytics dashboard with layered motion, shard transitions, and battle-grade hierarchy.",
    imageUrl:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#0d0d0d"/><stop offset=".55" stop-color="#d92323"/><stop offset="1" stop-color="#ebe6e6"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><circle cx="900" cy="220" r="180" fill="#ebe6e6" fill-opacity=".12"/><path d="M-40 620L360 200l220 120 190-110 470 320v270H-40Z" fill="#0d0d0d" fill-opacity=".8"/><path d="M0 110h1200" stroke="#ebe6e6" stroke-width="18" stroke-dasharray="36 20" stroke-opacity=".35"/></svg>',
      ),
    techStack: ["Next.js", "Framer Motion", "Tailwind"],
    href: "#projects",
    rotation: -3,
    offset: "translate-y-0",
  },
  {
    id: "002",
    title: "Calling Card UI",
    description: "A Persona-inspired editorial landing page with jagged clip paths and punchy navigation states.",
    imageUrl:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#0d0d0d"/><path d="M120 120h960l-140 320 90 180H220L80 340Z" fill="#d92323"/><path d="M290 180h640" stroke="#ebe6e6" stroke-width="16" stroke-opacity=".55"/><path d="M220 610c160-110 310-120 480-20s280 70 420-10" stroke="#ebe6e6" stroke-width="24" stroke-linecap="round" stroke-opacity=".14" fill="none"/></svg>',
      ),
    techStack: ["App Router", "SVG", "Motion"],
    href: "#about",
    rotation: 2,
    offset: "translate-y-8",
  },
  {
    id: "003",
    title: "Metaverse Notes",
    description: "A component system for high-energy portfolio cards that cut across the layout on hover.",
    imageUrl:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#ebe6e6"/><path d="M0 560 460 250l240 70 160-130 340 190v340H0Z" fill="#0d0d0d"/><path d="M80 160h1040" stroke="#d92323" stroke-width="20" stroke-dasharray="18 18"/><path d="M960 40 1040 760" stroke="#d92323" stroke-width="70" stroke-opacity=".16"/></svg>',
      ),
    techStack: ["Design System", "TypeScript", "Clip Path"],
    href: "#contact",
    rotation: -1,
    offset: "translate-y-4",
  },
  {
    id: "004",
    title: "Phantom Archive",
    description: "A tactile case study presentation with noise, paper cuts, and staggered reveal timing.",
    imageUrl:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#0d0d0d"/><path d="M140 100h920l-110 210 120 180-160 250H180L70 410Z" fill="#ebe6e6" fill-opacity=".18"/><path d="M240 180h580l110 120-120 200H240Z" fill="#d92323"/><circle cx="910" cy="590" r="120" fill="#ebe6e6" fill-opacity=".08"/></svg>',
      ),
    techStack: ["Motion Design", "SVG Filters", "UX Writing"],
    href: "#skills",
    rotation: 3,
    offset: "translate-y-10",
  },
];

const socialStats = [
  { label: "Knowledge", value: 92 },
  { label: "Guts", value: 74 },
  { label: "Proficiency", value: 88 },
  { label: "Charm", value: 81 },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-p5-black text-p5-white">
      <section className="relative mx-auto flex min-h-screen max-w-7xl items-stretch px-4 py-6 sm:px-6 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(217,35,35,0.95)_0%,rgba(13,13,13,0.96)_42%,rgba(235,230,230,0.1)_42.5%,rgba(13,13,13,0.96)_43%,rgba(13,13,13,1)_100%)]" />
        <div className="absolute left-0 top-0 -z-10 h-48 w-48 -translate-x-1/4 -translate-y-1/4 rounded-full bg-p5-red/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 -z-10 h-64 w-64 translate-x-1/4 translate-y-1/4 rounded-full bg-p5-white/10 blur-3xl" />

        <P5Container className="flex w-full flex-col gap-8 border border-p5-white/20 bg-p5-black/90 p-5 shadow-p5 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
          <div className="flex max-w-3xl flex-col gap-6">
            <div className="flex flex-col gap-4">
              <p className="font-hand text-sm uppercase tracking-[0.35em] text-p5-white/80">Calling Card</p>
              <h1 className="max-w-2xl font-display text-6xl uppercase leading-none tracking-[0.03em] text-p5-red sm:text-7xl lg:text-8xl">
                Persona 5 inspired portfolio.
              </h1>
              <p className="max-w-xl text-sm leading-6 text-p5-white/80 sm:text-base">
                A high-energy portfolio shell with skewed geometry, torn edges, and burst-style motion built for an aggressively stylized presentation.
              </p>
            </div>

            <div className="grid gap-4 sm:max-w-2xl sm:grid-cols-2 lg:grid-cols-3">
              {["Developer", "Motion Design", "Creative Frontend"].map((item) => (
                <div
                  key={item}
                  className="clip-jagged bg-p5-red px-5 py-4 font-hand text-lg uppercase tracking-[0.12em] text-p5-black"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full justify-end lg:w-auto">
            <BattleMenu />
          </div>
        </P5Container>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:px-10">
        <div className="space-y-6">
          <div className="clip-jagged border border-p5-white/20 bg-p5-black/80 p-5 shadow-p5 sm:p-6">
            <p className="font-hand text-sm uppercase tracking-[0.35em] text-p5-white/70">Confidant Grid</p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.04em] text-p5-red">Selected Work</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-p5-white/75 sm:text-base">
              A scattered, Persona-style board of project shards. Each card keeps its own angle so the layout feels like a menu screen rather than a clean gallery.
            </p>
          </div>

          <div className="relative">
            <div className="grid gap-6 xl:grid-cols-2">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -48, y: 56, rotate: project.rotation - 4 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, rotate: project.rotation }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    mass: 0.8,
                    delay: index * 0.08,
                  }}
                  className={project.offset}
                  style={{ zIndex: 1 + index }}
                >
                  <ProjectCard
                    title={project.title}
                    description={`${project.description} Tech: ${project.techStack.join(" / ")}`}
                    href={project.href}
                    imageSrc={project.imageUrl}
                    imageAlt={project.title}
                    className="relative transition-[z-index] duration-200 hover:z-30"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <PhanSitePanel stats={socialStats} />
        </aside>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="clip-jagged border border-p5-white/20 bg-p5-black/80 p-5 shadow-p5 sm:p-6">
          <p className="font-hand text-sm uppercase tracking-[0.35em] text-p5-white/70">Projects</p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.04em] text-p5-red">In-Depth Work</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-p5-white/75">
            Scroll up to see the featured projects in the Confidant Grid above. Each card showcases motion design and high-energy UI.
          </p>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="clip-jagged border border-p5-white/20 bg-p5-black/80 p-5 shadow-p5 sm:p-6">
          <p className="font-hand text-sm uppercase tracking-[0.35em] text-p5-white/70">About</p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.04em] text-p5-red">Who's Behind This</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-p5-white/75">
            A frontend engineer obsessed with bold, expressive UX. Inspired by Persona 5's uncompromising aesthetic, I build interfaces that demand attention and deliver precision motion.
          </p>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="clip-jagged border border-p5-white/20 bg-p5-black/80 p-5 shadow-p5 sm:p-6">
          <p className="font-hand text-sm uppercase tracking-[0.35em] text-p5-white/70">Skills</p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.04em] text-p5-red">Core Competencies</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-p5-white/75">
            React, Next.js, TypeScript, Framer Motion, Tailwind CSS, App Router, Motion Design, Interactive Components, Accessibility, Performance Optimization.
          </p>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <CallingCard />
      </section>
    </main>
  );
}
