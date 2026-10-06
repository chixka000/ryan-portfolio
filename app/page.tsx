import FishingGame from "./components/FishingGame";
import { experience, projects, skills } from "./data/portfolio";

const button = "inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors";

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">{label}</p>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only fixed top-4 left-4 z-50 rounded-lg bg-foreground px-4 py-3 text-background focus:not-sr-only">Skip to content</a>
      <header id="top" className="mx-auto max-w-6xl px-6 sm:px-8">
        <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-6">
          <a href="#top" aria-label="Ryan Canseco home" className="font-mono text-lg font-bold tracking-wide text-foreground">RC<span className="text-accent">_DEV</span></a>
          <div className="flex flex-wrap items-center gap-1 text-sm text-muted sm:gap-3">
            {[['About', '#about'], ['Projects', '#projects'], ['Skills', '#skills'], ['Resume', '/ryan-canseco-resume.pdf']].map(([label, href]) => (
              <a key={label} href={href} className="rounded-md px-2 py-2 transition-colors hover:text-foreground sm:px-3">{label}</a>
            ))}
          </div>
        </nav>
      </header>

      <main id="main-content" className="mx-auto max-w-6xl px-6 sm:px-8">
        <section aria-labelledby="hero-title" className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <p className="mb-5 font-mono text-xs leading-6 tracking-wide text-accent">FULL-STACK DEVELOPER · CEBU, PHILIPPINES</p>
            <h1 id="hero-title" className="max-w-xl text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.12] font-semibold tracking-[-0.045em] text-warm">Hi, I’m Ryan Canseco<span className="text-accent">.</span></h1>
            <p className="mt-5 text-lg leading-relaxed text-foreground sm:text-xl">Useful web apps. Thoughtful engineering.</p>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted">I build dashboards, ecommerce tools, and systems that make everyday work easier. From the interface to the API, I turn ideas into reliable products.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={button + " bg-warm text-background hover:bg-foreground"}>Explore projects <span className="ml-3" aria-hidden="true">↗</span></a>
              <a href="/ryan-canseco-resume.pdf" className={button + " border border-line text-foreground hover:border-accent/50 hover:bg-surface"}>Download resume</a>
            </div>
          </div>
          <aside aria-label="Development focus" className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="rounded-xl border border-accent/20 bg-accent/10 p-4 font-mono text-lg font-bold text-accent">RC</span>
              <p className="text-sm leading-6 text-foreground">From idea to<br />shipped product</p>
            </div>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {[['Frontend', 'React · Next.js · TypeScript'], ['Backend', 'Node.js · AdonisJS · Express'], ['Data', 'SQL · Firebase · Supabase']].map(([label, value]) => (
                <div key={label} className="py-4"><dt className="mb-1.5 text-xs text-muted">{label}</dt><dd className="text-sm leading-6 text-foreground">{value}</dd></div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-6 text-muted">Built for real people and everyday workflows.</p>
          </aside>
        </section>

        <section id="about" className="grid gap-2 border-t border-line py-14 sm:py-16 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <SectionHeading label="The person behind the code" title="About Ryan" />
          <div className="space-y-4 text-base leading-8 text-muted">
            <p>I’m a software developer with hands-on experience across frontend, backend, databases, integrations, and automation. My work spans web and mobile applications, backend APIs, and freelance product delivery.</p>
            <p>I like practical systems: clean dashboards, reliable APIs, clear data flows, and tools that make daily work easier for teams and customers.</p>
          </div>
        </section>

        <section id="projects" className="border-t border-line py-14 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeading label="Selected work" title="Projects" />
            <p className="mb-8 text-sm text-muted">Web apps built for everyday use.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article key={project.url} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/40">
                <div aria-hidden="true" className="flex h-28 items-center justify-between border-b border-line bg-accent/[0.04] px-6">
                  <span className="font-mono text-3xl font-semibold tracking-tight text-accent/75">{['WLC', 'ROAS', 'KUHL', 'BNC', 'TAM'][index]}</span>
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">{project.description}</p>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={'Visit ' + project.name + ' (opens in a new tab)'} className="mt-6 inline-flex min-h-11 items-center justify-between gap-3 rounded-md border-t border-line pt-4 text-sm font-medium text-accent hover:text-foreground">Visit project <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-12 border-t border-line py-14 sm:py-16 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <section id="skills">
            <SectionHeading label="Tools of the trade" title="Core skills" />
            <ul className="flex flex-wrap gap-2.5">
              {skills.map((skill) => <li key={skill} className="rounded-lg border border-line bg-surface px-3 py-2 text-sm text-foreground">{skill}</li>)}
            </ul>
          </section>
          <section id="experience">
            <SectionHeading label="The journey so far" title="Experience" />
            <div className="space-y-8 border-l border-line pl-6">
              {experience.map((item) => (
                <article key={item.company + '-' + item.period} className="relative">
                  <span aria-hidden="true" className="absolute top-1.5 -left-[29px] size-2 rounded-full bg-accent" />
                  <p className="font-mono text-xs leading-5 text-muted">{item.period}</p>
                  <h3 className="mt-2 text-base font-semibold leading-6 text-foreground">{item.role}</h3>
                  <p className="mt-1 text-sm text-accent">{item.company}</p>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section id="arcade" className="border-t border-line py-14 sm:py-16">
          <SectionHeading label="A little off-duty fun" title="Take a fishing break" />
          <p className="mb-6 max-w-xl text-sm leading-7 text-muted">There’s a playful side to building things, too. Catch a fish to discover a random project, or browse the cards above at your own pace.</p>
          <FishingGame projects={projects.map(({ name, url }) => ({ name, url }))} />
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-8 text-xs leading-6 text-muted sm:px-8">
        <p>Ryan Canseco · React / Next.js / Node.js Developer</p>
        <a href="#top" className="rounded-md py-2 text-accent hover:text-foreground">Back to top ↑</a>
      </footer>
    </>
  );
}
