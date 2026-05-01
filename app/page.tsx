import { P5Container } from "@/components/P5Container";
import { BattleMenu } from "@/components/BattleMenu";

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
              {[
                "Developer",
                "Motion Design",
                "Creative Frontend",
              ].map((item) => (
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

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-10">
        {[
          { id: "skills", title: "SKILLS", body: "Motion-first frontend systems, interaction design, and expressive UI engineering." },
          { id: "projects", title: "PROJECTS", body: "A selection of stylized interfaces and high-energy portfolio concepts." },
          { id: "about", title: "ABOUT", body: "A compact bio block that can hold your positioning statement or personal summary." },
          { id: "contact", title: "CONTACT", body: "Use this section for your email, social links, or a direct call to action." },
        ].map((section) => (
          <article
            key={section.id}
            id={section.id}
            className="clip-jagged border border-p5-white/20 bg-p5-black/80 p-5 shadow-p5 scroll-mt-24 sm:p-6"
          >
            <p className="font-hand text-sm uppercase tracking-[0.35em] text-p5-white/70">0{section.id === "skills" ? 1 : section.id === "projects" ? 2 : section.id === "about" ? 3 : 4}</p>
            <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.04em] text-p5-red">{section.title}</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-p5-white/75">{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
