"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const skills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "AdonisJS",
  "Express",
  "MySQL",
  "PostgreSQL",
  "Firebase",
  "Supabase",
  "Tailwind CSS",
  "Material UI",
  "Docker",
  "Google Cloud",
  "Automation",
  "AI dev tools",
];

const experience = [
  {
    role: "Software Developer",
    company: "Freelance / Self-employed",
    period: "Aug 2023 — Present",
    detail:
      "Builds and maintains web apps, dashboards, microservices, enrollment systems, ecommerce tracking, printing workflows, and construction data pipelines.",
  },
  {
    role: "Mid Software Developer",
    company: "Simple Fulfillment",
    period: "Sep 2022 — Jul 2023",
    detail:
      "Developed fulfillment features across inventory, payments, dashboards, third-party API sync, PostgreSQL persistence, React / Next.js, and Express.",
  },
  {
    role: "Mid Software Developer",
    company: "Halcyon",
    period: "Oct 2021 — May 2023",
    detail:
      "Focused on backend APIs with Node.js and AdonisJS, database schema design, admin pages, maintenance, bug fixes, and React / Next.js frontend work.",
  },
  {
    role: "Web Developer",
    company: "Ajio",
    period: "Aug 2019 — Oct 2021",
    detail:
      "Built web and mobile applications, reviewed code, checked requirements, and shipped products using React / Next.js, TypeScript, Kotlin, Firebase, and CakePHP.",
  },
];

const projectSlots = [
  {
    name: "WLC Enrollment",
    description: "Online enrollment portal.",
    url: "https://enrollment.wlcormoc.edu.ph/login",
  },
  {
    name: "TrueROAS",
    description: "Ad attribution and tracking for ecommerce.",
    url: "https://www.trueroas.com/",
  },
  {
    name: "KUHL Core",
    description: "Automotive company offering car modifications and parts ordering.",
    url: "https://core.kuhl-system.net/login",
  },
  {
    name: "BNC Development",
    description: "BNC web application.",
    url: "https://bnc-development-bbfbe.web.app/",
  },
  {
    name: "TAM Development",
    description: "Customer relationship management (CRM) application.",
    url: "https://tam-development.web.app/login",
  },
];

const getRandomFishPosition = () => Math.floor(Math.random() * 76) + 12;

export default function Home() {
  const [hookPosition, setHookPosition] = useState(48);
  const [fishPosition, setFishPosition] = useState(24);
  const [isCasting, setIsCasting] = useState(false);
  const [unlockedProjects, setUnlockedProjects] = useState<number[]>([]);
  const [lastCatch, setLastCatch] = useState<number | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const allProjectsUnlocked = unlockedProjects.length === projectSlots.length;

  const message = useMemo(() => {
    if (allProjectsUnlocked) return "Full net! Every project is unlocked.";
    if (lastCatch !== null) return `${projectSlots[lastCatch].name} unlocked. Cast again for another project.`;
    return "Move the hook, line it up with the fish, then cast.";
  }, [allProjectsUnlocked, lastCatch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest("a, button, input, textarea, select, [contenteditable]")
      ) return;

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        setHookPosition((value) => Math.max(4, value - 6));
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        setHookPosition((value) => Math.min(96, value + 6));
      }

      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        castLine();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const revealRandomProject = () => {
    setUnlockedProjects((currentProjects) => {
      const lockedProjects = projectSlots
        .map((_, index) => index)
        .filter((index) => !currentProjects.includes(index));

      if (lockedProjects.length === 0) return currentProjects;

      const nextProject = lockedProjects[Math.floor(Math.random() * lockedProjects.length)];
      setLastCatch(nextProject);

      if (currentProjects.length === 0) {
        window.setTimeout(() => projectsRef.current?.scrollIntoView({ behavior: "smooth" }), 450);
      }

      return [...currentProjects, nextProject];
    });
  };

  const castLine = () => {
    if (isCasting || allProjectsUnlocked) return;

    setIsCasting(true);

    window.setTimeout(() => {
      const caughtFish = Math.abs(hookPosition - fishPosition) <= 8;

      if (caughtFish) {
        revealRandomProject();
        setFishPosition((position) => {
          let nextPosition = getRandomFishPosition();
          while (Math.abs(nextPosition - position) < 14) {
            nextPosition = getRandomFishPosition();
          }
          return nextPosition;
        });
      } else {
        setLastCatch(null);
        setFishPosition(getRandomFishPosition());
      }

      setIsCasting(false);
    }, 520);
  };

  const moveHook = (amount: number) => {
    setHookPosition((value) => Math.min(96, Math.max(4, value + amount)));
  };

  const isProjectUnlocked = (index: number) => unlockedProjects.includes(index);

  const projectStatus = useMemo(() => {
    if (allProjectsUnlocked) return "FULL NET";
    if (unlockedProjects.length > 0) return "REVEALING";
    return "LOCKED";
  }, [allProjectsUnlocked, unlockedProjects.length]);

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Main navigation">
          <a href="#top" className="brand">
            RC<span>_DEV</span>
          </a>
          <div>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="/ryan-canseco-resume.pdf">Resume</a>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Full-stack developer · Cebu, Philippines</p>
            <h1>Hi, I’m Ryan Canseco<span>.</span></h1>
            <p className="heroTagline">Useful web apps. Thoughtful engineering.</p>
            <p className="intro">
              I build dashboards, ecommerce tools, and systems that make everyday work easier.
              From the interface to the API, I turn ideas into reliable products.
            </p>
            <div className="ctaRow">
              <a className="button primary" href="#arcade">
                Explore projects ↗
              </a>
              <a className="button" href="/ryan-canseco-resume.pdf">
                Download resume
              </a>
            </div>
          </div>

          <aside className="heroProfile" aria-label="Development focus">
            <div className="profileHeader">
              <span className="profileMonogram" aria-hidden="true">RC</span>
              <span>From idea to shipped product</span>
            </div>
            <dl className="profileDetails">
              <div><dt>Frontend</dt><dd>React · Next.js · TypeScript</dd></div>
              <div><dt>Backend</dt><dd>Node.js · AdonisJS · Express</dd></div>
              <div><dt>Data</dt><dd>SQL · Firebase · Supabase</dd></div>
            </dl>
            <p className="profileNote">Built for real people and everyday workflows.</p>
          </aside>
        </div>
      </section>

      <section className="panel" id="about">
        <div className="sectionTitle">
          <p className="eyebrow">Player One</p>
          <h2>About Ryan</h2>
        </div>
        <div className="card aboutCard">
          <p>
            I’m a software developer with hands-on experience across frontend, backend, databases,
            integrations, and automation. My resume shows a path from web builder and designer into
            full-stack engineering, backend API ownership, and freelance product delivery.
          </p>
          <p>
            I like practical systems: clean dashboards, reliable APIs, clear data flows, and tools
            that make daily work easier for teams and customers.
          </p>
        </div>
      </section>

      <section className="panel split" id="skills">
        <div>
          <div className="sectionTitle">
            <p className="eyebrow">Inventory</p>
            <h2>Core Skills</h2>
          </div>
          <div className="skillGrid">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="timeline">
          <div className="sectionTitle">
            <p className="eyebrow">Campaign Log</p>
            <h2>Experience</h2>
          </div>
          {experience.map((item) => (
            <article className="timelineItem" key={`${item.company}-${item.period}`}>
              <p>{item.period}</p>
              <h3>
                {item.role} <span>@ {item.company}</span>
              </h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel arcadePanel" id="arcade">
        <div className="sectionTitle">
          <p className="eyebrow">Fishing Hole</p>
          <h2>Catch fish, reveal projects</h2>
        </div>
        <div className="gameShell">
          <div className="scoreBoard">
            <span>Fish caught: {unlockedProjects.length}/{projectSlots.length}</span>
            <span>{projectStatus}</span>
          </div>
          <div
            className={`gameScreen fishing ${isCasting ? "casting" : ""}`}
            role="application"
            aria-label="Move with arrow keys or A and D, then press Space, Enter, or Cast to catch fish"
          >
            <div className="waterLine" aria-hidden="true" />
            <div className="boat" style={{ left: `${hookPosition}%` }} aria-hidden="true">
              <span>▰</span>
            </div>
            <div className="fishingLine" style={{ left: `${hookPosition}%` }} aria-hidden="true">
              <span className="hook">J</span>
            </div>
            <div className="fish" style={{ left: `${fishPosition}%` }} aria-hidden="true">
              &lt;º)))&gt;&lt;
            </div>
          </div>
          <p className="gameMessage">{message}</p>
          <div className="controls" aria-label="Game controls">
            <button type="button" onClick={() => moveHook(-6)}>
              ◀
            </button>
            <button type="button" className="castButton" onClick={castLine}>
              Cast
            </button>
            <button type="button" onClick={() => moveHook(6)}>
              ▶
            </button>
          </div>
        </div>
      </section>

      <section className="panel projects" id="projects" ref={projectsRef}>
        <div className="sectionTitle">
          <p className="eyebrow">Portfolio Vault</p>
          <h2>Projects</h2>
        </div>
        <div className="projectGrid">
          {projectSlots.map((project, index) => {
            const unlocked = isProjectUnlocked(index);

            return (
              <article className={`projectSlot ${unlocked ? "unlocked" : ""}`} key={project.url}>
                <span>Project {String(index + 1).padStart(3, "0")}</span>
                <h3>{unlocked ? project.name : "Hidden catch"}</h3>
                <p>
                  {unlocked
                    ? project.description
                    : "Catch a fish to randomly reveal this project."}
                </p>
                {unlocked && (
                  <a
                    className="projectLink"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.name} (opens in a new tab)`}
                  >
                    Visit project ↗
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <footer>
        <p>Ryan Canseco — React / Next.js / Node.js Developer</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
