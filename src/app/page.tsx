import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import ProjectGrid from "@/components/ProjectGrid";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <FadeIn mode="load">
        <Hero />
      </FadeIn>
      <FadeIn>
        <About />
      </FadeIn>
      <FadeIn>
        <Skills />
      </FadeIn>
      <FadeIn>
        <ProjectGrid />
      </FadeIn>
      <FadeIn>
        <Experience />
      </FadeIn>
      <FadeIn>
        <Contact />
      </FadeIn>
    </>
  );
}
