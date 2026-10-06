"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type Project = { name: string; url: string };
const randomPosition = () => Math.floor(Math.random() * 76) + 12;
const control = "min-h-11 min-w-14 cursor-pointer rounded-lg border border-line bg-surface px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 disabled:cursor-default disabled:opacity-50";

export default function FishingGame({ projects }: { projects: Project[] }) {
  const [started, setStarted] = useState(false);
  const [hook, setHook] = useState(48);
  const [fish, setFish] = useState(24);
  const [casting, setCasting] = useState(false);
  const [caught, setCaught] = useState<number[]>([]);
  const [lastCatch, setLastCatch] = useState<number | null>(null);
  const [message, setMessage] = useState("Line up the hook with the fish, then cast.");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const screen = useRef<HTMLDivElement>(null);
  const complete = caught.length === projects.length;

  useEffect(() => () => {
    if (timer.current !== null) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (started) screen.current?.focus();
  }, [started]);

  function move(amount: number) {
    if (casting || complete) return;
    setHook((value) => Math.min(96, Math.max(4, value + amount)));
  }

  function cast() {
    if (timer.current !== null || complete) return;
    setCasting(true);
    timer.current = setTimeout(() => {
      if (Math.abs(hook - fish) <= 8) {
        const remaining = projects.map((_, index) => index).filter((index) => !caught.includes(index));
        const next = remaining[Math.floor(Math.random() * remaining.length)];
        const updated = [...caught, next];
        setCaught(updated);
        setLastCatch(next);
        setMessage(updated.length === projects.length ? "Full net! You found every project." : `${projects[next].name} caught! Cast again to find another project.`);
      } else {
        setMessage("Just missed! Line up the hook and try again.");
      }
      let nextFish = randomPosition();
      while (Math.abs(nextFish - fish) < 14) nextFish = randomPosition();
      setFish(nextFish);
      setCasting(false);
      timer.current = null;
    }, 520);
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (["ArrowLeft", "a", "A", "ArrowRight", "d", "D", " ", "Enter"].includes(event.key)) {
      event.preventDefault();
      if (event.repeat) return;
      if (["ArrowLeft", "a", "A"].includes(event.key)) move(-6);
      else if (["ArrowRight", "d", "D"].includes(event.key)) move(6);
      else cast();
    }
  }

  function reset() {
    setCaught([]);
    setLastCatch(null);
    setHook(48);
    setFish(24);
    setMessage("Line up the hook with the fish, then cast.");
    screen.current?.focus();
  }

  if (!started) return <button type="button" onClick={() => setStarted(true)} className={control}>Play fishing game <span aria-hidden="true" className="ml-3">→</span></button>;

  return (
    <div className="max-w-3xl rounded-2xl border border-line bg-surface p-4 sm:p-6">
      <div className="mb-4 flex justify-between gap-3 font-mono text-xs text-accent">
        <span>Fish caught: {caught.length}/{projects.length}</span>
        <span>{complete ? "FULL NET" : casting ? "CASTING" : "READY"}</span>
      </div>
      <div ref={screen} tabIndex={0} role="application" aria-label="Fishing game" aria-describedby="fishing-instructions" onKeyDown={handleKey} className={`fishing-screen ${casting ? "casting" : ""}`}>
        <div className="water-line" aria-hidden="true" />
        <div className="fishing-boat" style={{ left: `${hook}%` }} aria-hidden="true">▰</div>
        <div className="fishing-line" style={{ left: `${hook}%` }} aria-hidden="true"><span>J</span></div>
        <div className="fishing-fish" style={{ left: `${fish}%` }} aria-hidden="true">&lt;º)))&gt;&lt;</div>
      </div>
      <p id="fishing-instructions" className="mt-4 text-xs leading-6 text-muted">Focus the water to play with ← / → or A / D, then Space / Enter to cast. You can also use the buttons below.</p>
      <p role="status" className="mt-3 text-sm leading-6 text-foreground">{message}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" aria-label="Move hook left" disabled={casting || complete} onClick={() => move(-6)} className={control}>←</button>
        <button type="button" disabled={casting || complete} onClick={cast} className={`${control} border-accent/30 text-accent`}>Cast line</button>
        <button type="button" aria-label="Move hook right" disabled={casting || complete} onClick={() => move(6)} className={control}>→</button>
        {complete && <button type="button" onClick={reset} className={control}>Play again</button>}
      </div>
      {lastCatch !== null && <a href={projects[lastCatch].url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded-md py-2 text-sm text-accent hover:text-foreground" aria-label={`Visit ${projects[lastCatch].name} (opens in a new tab)`}>Visit {projects[lastCatch].name} ↗</a>}
    </div>
  );
}
