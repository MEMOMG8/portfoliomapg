"use client";

import { useRef, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!header.current) return;
      const t = reduced.matches ? Number(window.scrollY > 20) : Math.min(window.scrollY / 180, 1);
      const progress = t * t * (3 - 2 * t);
      const viewport = document.documentElement.clientWidth;
      const width = viewport + (Math.min(660, viewport - 32) - viewport) * progress;
      header.current.style.width = `${width}px`;
      header.current.style.left = `${(viewport - width) / 2}px`;
      header.current.style.top = `${12 * progress}px`;
      header.current.style.borderRadius = `${22 * progress}px`;
      header.current.style.setProperty('--nav-compact', String(progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('pageshow', schedule);
    reduced.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('pageshow', schedule);
      reduced.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <header ref={header} className="portfolio-nav fixed top-0 left-0 z-50">
      <div className="portfolio-nav-inner max-w-6xl mx-auto h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-mono text-sm text-indigo-400 hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          aria-label="Back to top"
        >
          mpg
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Site navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:mperezgi@ttu.edu"
          className="md:hidden font-mono text-xs text-indigo-400 hover:text-indigo-300 transition-colors px-3 py-2 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
