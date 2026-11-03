"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { certs, experience, projects, skills } from "@/lib/data";

const resume = "/Manuel_Perez_Gil_Resume_SWE.pdf";
const visuals = {
  portrait: { src: "/images/profilephoto.jpg", title: "Manuel Perez Gil", caption: "Software engineer. Texas Tech University.", portrait: true },
  "cloud-metrics": { src: "/images/cloudmetricsone.png", title: "Cloud Metrics Dashboard", caption: "Serverless monitoring with AWS Lambda and CloudWatch.", portrait: false },
  "rag-assistant": { src: "/images/rag-national-parks.jpg", title: "National Parks RAG Assistant", caption: "Retrieval, generation and source attribution in one interface.", portrait: false },
  scivis: { src: "/images/scivis.png", title: "IEEE SciVis 2025", caption: "Exploring 324,632 alloy compositions through linked views.", portrait: false },
};
type VisualKey = keyof typeof visuals;
const titles: Record<string, string> = { "cloud-metrics": "Cloud Metrics Dashboard", "rag-assistant": "National Parks RAG", scivis: "IEEE SciVis 2025", anylang: "AnyLang Chat" };
const summaries: Record<string, string> = {
  "cloud-metrics": "An AWS dashboard that brings infrastructure metrics into one view, with a 30-second refresh cycle.",
  "rag-assistant": "A question-answering pipeline grounded in 25 National Park Service pages, with source attribution.",
  scivis: "An interactive view of 324,632 aluminum alloy compositions, built for the IEEE SciVis Contest 2025.",
  anylang: "Real-time multilingual conversations with Socket.IO, JWT authentication and AES-256 encryption.",
};

export default function Portfolio() {
  const [activeVisual, setActiveVisual] = useState<VisualKey>("portrait");
  const [menuOpen, setMenuOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const visual = visuals[activeVisual];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveVisual(entry.target.getAttribute("data-preview") as VisualKey);
      });
    }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
    root.current?.querySelectorAll("[data-preview]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("arrived"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    root.current?.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <div ref={root}>
      <a className="skip-link" href="#main">Skip to content</a>
      <noscript><style>{`.menu-toggle { display: none !important; } .site-nav { display: flex !important; flex-wrap: wrap; gap: 12px 24px; }`}</style></noscript>
      <header className="site-header">
        <a href="#home" className="wordmark">Manuel Perez Gil</a>
        <button ref={menuButton} className="menu-toggle" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
        <nav id="site-nav" aria-label="Main navigation" className={menuOpen ? "site-nav is-open" : "site-nav"}>
          {[["Projects", "projects"], ["About", "about"], ["Experience", "experience"], ["Skills", "skills"], ["Contact", "contact"]].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
      </header>
      <main id="main">
        <div className="split-layout">
          <aside className="visual-stage" aria-label="Portrait and selected project previews">
            <figure>
              <div className={`stage-image ${visual.portrait ? "is-portrait" : "is-project"}`}>
                <Image key={visual.src} src={visual.src} alt={visual.portrait ? "Portrait of Manuel Perez Gil" : `${visual.title} project screenshot`} fill sizes="(min-width: 1000px) 43vw, 100vw" priority className="stage-photo" />
              </div>
              <figcaption><span>{visual.title}</span><span className="stage-caption">{visual.caption}</span></figcaption>
            </figure>
          </aside>
          <div className="reading-column">
            <section className="hero" id="home" aria-labelledby="hero-title" data-preview="portrait">
              <h1 id="hero-title" className="hero-name" data-reveal>Manuel<br />Perez Gil</h1>
              <p className="hero-description" data-reveal>Software engineer building cloud systems, AI tools and interactive data experiences.</p>
              <div className="hero-actions" data-reveal>
                <a href={resume} download="Manuel_Perez_Gil_Resume_SWE.pdf" className="button">Download Résumé <span aria-hidden="true">↓</span></a>
                <a href="#projects" className="text-link">Explore my projects</a>
              </div>
              <div className="hero-facts" data-reveal>
                <p>Computer Science at Texas Tech.<br />Graduating May 2027.</p>
                <p>Open to full-time software engineering,<br className="desktop-break" /> cloud and AI roles.</p>
              </div>
              <div className="mobile-portrait"><Image src="/images/profilephoto.jpg" alt="Portrait of Manuel Perez Gil" width={400} height={400} sizes="(max-width: 999px) 100vw, 1px" /></div>
            </section>
            <section id="projects" className="content-section work-section" aria-labelledby="projects-title">
              <h2 id="projects-title" data-reveal>Selected projects</h2>
              <p className="section-intro" data-reveal>From infrastructure signals to material properties, I build tools that make complex systems easier to understand.</p>
              <div className="project-list">
                {projects.map((project) => <article key={project.id} className="project" data-preview={project.id in visuals ? project.id : "portrait"} onMouseEnter={() => setActiveVisual(project.id in visuals ? project.id as VisualKey : "portrait")}>
                  {project.image && <div className={`project-image ${project.id === "scivis" ? "science-image" : ""}`} data-reveal><Image src={project.image} alt={`${project.title} screenshot`} fill sizes="(min-width: 1000px) 46vw, 90vw" /></div>}
                  <div className="project-copy" data-reveal><h3>{titles[project.id]}</h3><p>{summaries[project.id]}</p><p className="project-stack">{project.stack.join(", ")}</p></div>
                  <details className="project-details" data-reveal><summary>Project details <span className="disclosure-mark" aria-hidden="true">+</span></summary><div className="details-content"><p>{project.description}</p><ul>{project.metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul></div></details>
                  <div className="project-links" data-reveal><a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link">View on GitHub</a>{project.paper && <a href={project.paper} download className="text-link">Download research paper</a>}</div>
                </article>)}
              </div>
            </section>
            <section id="about" className="content-section about-section" aria-labelledby="about-title" data-preview="portrait">
              <h2 id="about-title" data-reveal>A little about me</h2>
              <p className="lead" data-reveal>I like building software that solves a problem I can point to.</p>
              <p data-reveal>I’m a Computer Science student at Texas Tech University, graduating in May 2027 with a 3.49 GPA. My work connects cloud infrastructure, AI pipelines and developer tooling.</p>
              <p data-reveal>At Classroom Technology Services, I help keep more than 35 classrooms running and handle over 20 support tickets a week. In the Interdisciplinary Data Visualization Lab, I built an interactive visualization submitted to the IEEE SciVis Contest 2025.</p>
              <p data-reveal>A serverless monitoring dashboard, a retrieval pipeline that cites its sources, a secure real-time chat: I enjoy turning a technical challenge into something people can use.</p>
              <a className="text-link" href="https://linkedin.com/in/manuelantoperezgil" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
            </section>
            <section id="experience" className="content-section experience-section" aria-labelledby="experience-title" data-preview="scivis">
              <h2 id="experience-title" data-reveal>Experience</h2>
              {experience.map((item) => <article className="experience-entry" key={item.role}><h3 data-reveal>{item.role}</h3><p className="experience-meta" data-reveal>{item.org}<br />{item.period}</p><ul data-reveal>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}
            </section>
            <section id="skills" className="content-section skills-section" aria-labelledby="skills-title" data-preview="cloud-metrics">
              <h2 id="skills-title" data-reveal>Tools I work with</h2>
              <p className="section-intro" data-reveal>Explore an area to see how I use it in practice.</p>
              {skills.map((group) => <details className="skill-entry" key={group.category} data-reveal><summary><span><span className="skill-name">{group.category}</span><span className="skill-technologies">{group.skills.join(", ")}</span></span><span className="disclosure-mark" aria-hidden="true">+</span></summary><div className="details-content"><p>{group.description}</p></div></details>)}
            </section>
            <section id="certifications" className="content-section credentials-section" aria-labelledby="credentials-title" data-preview="portrait">
              <h2 id="credentials-title" data-reveal>Credentials</h2>
              {certs.map((cert) => <article className="credential" key={cert.name} data-reveal><h3>{cert.name}</h3><p>{cert.issuer}</p><p className="credential-date">{cert.date}{cert.status === "in-progress" ? " · In progress" : ""}</p></article>)}
            </section>
          </div>
        </div>
        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <h2 id="contact-title" data-reveal>Let’s build<br />something useful.</h2>
          <div className="contact-copy"><p className="lead" data-reveal>Open to full-time SWE roles, cloud and AI roles, and interesting research problems.</p><p data-reveal>Have a role or a project in mind? I’d like to hear about it.</p><a href="mailto:mperezgi@ttu.edu" className="button" data-reveal>mperezgi@ttu.edu</a><div className="contact-links" data-reveal><a href="https://github.com/MEMOMG8" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://linkedin.com/in/manuelantoperezgil" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={resume} download>Résumé</a></div></div>
        </section>
      </main>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Manuel Perez Gil</span><a href="#home">Back to top ↑</a></footer>
    </div>
  );
}
