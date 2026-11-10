"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollScrub, type ScrollScrubScene } from "./scroll-scrub";
import "./integration.css";

const CHAPTERS = [
  { id: "system-idea", label: "Idea", title: "From idea to system.", body: "A visual walkthrough of the backend, cloud infrastructure, and AI behind a working product.", proof: "Start with the problem." },
  { id: "system-architecture", label: "Architecture", title: "Build the foundation.", body: "APIs, compute, and storage designed to work together, with clear boundaries and repeatable deployments.", proof: "AWS · Lambda · DynamoDB" },
  { id: "system-connection", label: "Connection", title: "Keep everything connected.", body: "Real-time events turn isolated services into responsive experiences, from multiplayer rooms to multilingual conversations.", proof: "WebSockets · Node.js · TypeScript" },
  { id: "system-intelligence", label: "Intelligence", title: "Give answers a source.", body: "Retrieval pipelines connect questions to useful context, so an AI response can point back to the information behind it.", proof: "Python · RAG · ChromaDB" },
  { id: "system-result", label: "Result", title: "A system that works.", body: "From the first architecture decision to the final interface. Explore the projects and engineering details below.", proof: "Built end to end." },
] as const;

function StoryChapters() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let visibilityFrame = 0;
    const updateVisibility = () => {
      visibilityFrame = 0;
      const rect = el.getBoundingClientRect();
      setVisible(rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.35);
    };
    const scheduleVisibility = () => {
      if (!visibilityFrame) visibilityFrame = window.requestAnimationFrame(updateVisibility);
    };
    updateVisibility();
    window.addEventListener("scroll", scheduleVisibility, { passive: true });
    window.addEventListener("resize", scheduleVisibility);
    const chapters = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.chapter));
      }
    }, { rootMargin: "-45% 0px -45% 0px" });
    el.querySelectorAll("[data-chapter]").forEach(chapter => chapters.observe(chapter));
    return () => {
      window.removeEventListener("scroll", scheduleVisibility);
      window.removeEventListener("resize", scheduleVisibility);
      window.cancelAnimationFrame(visibilityFrame);
      chapters.disconnect();
    };
  }, []);

  return <div ref={root} className="higgs-chapters">
    <nav className="higgs-chapter-nav" aria-label="System story chapters" hidden={!visible}>
      {CHAPTERS.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`} aria-label={chapter.label} aria-current={active === index ? "step" : undefined}><span className="higgs-chapter-name">{chapter.label}</span><span className="higgs-chapter-short-name" aria-hidden="true">{["Idea", "Build", "Connect", "AI", "Result"][index]}</span></a>)}
    </nav>
    {CHAPTERS.map((chapter, index) => <section key={chapter.id} id={chapter.id} data-chapter={index} className="higgs-chapter" aria-labelledby={`${chapter.id}-title`}>
      <div className="higgs-chapter-position"><div className="higgs-chapter-copy">
        {index === 0 && <span className="section-label">How I build</span>}
        <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        <p className="higgs-chapter-body">{chapter.body}</p>
        <p className="higgs-chapter-proof">{chapter.proof}</p>
        <div className="higgs-story-links">
          {index === CHAPTERS.length - 1 ? <>
            <a href="#projects">View projects <span aria-hidden="true">↗</span></a>
            <a href="#engineering">Engineering details <span aria-hidden="true">↗</span></a>
          </> : <a href="#about">Skip story <span aria-hidden="true">↓</span></a>}
        </div>
      </div></div>
    </section>)}
  </div>;
}

const THEME = { background: "#0A0A0F", ink: "#ffffff", muted: "#94a3b8", accent: "#6366F1" };
const FILM_SCENES: ScrollScrubScene[] = [{
  id: "system-film-band", label: "System story", title: "From idea to system.", body: "",
  clip: "/media/system-story/system.mp4", mobileClip: "/media/system-story/system-mobile.mp4",
  poster: "/media/system-story/system-poster.png", mobilePoster: "/media/system-story/system-mobile-poster.png",
  scroll: 5, linger: 0, objectPosition: "50% 50%", mobileObjectPosition: "50% 50%",
  actions: <StoryChapters />,
}];
const STILL_SCENES: ScrollScrubScene[] = FILM_SCENES.map(scene => ({ ...scene, clip: "", mobileClip: undefined }));

export default function SystemStory() {
  const root = useRef<HTMLElement>(null);
  const [nearStory, setNearStory] = useState(false);
  const [staticMode, setStaticMode] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () => setStaticMode(media.matches || !!connection?.saveData);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRect.height > 16) {
          setNearStory(true);
          observer.disconnect();
        }
      }
    }, { threshold: 0.01 });
    if (root.current) observer.observe(root.current);
    return () => { media.removeEventListener("change", update); observer.disconnect(); };
  }, []);

  return <section ref={root} id="system-story" className="portfolio-system-story" aria-label="From an idea to a working system">
    <ScrollScrub scenes={nearStory && !staticMode ? FILM_SCENES : STILL_SCENES} theme={THEME} />
  </section>;
}
