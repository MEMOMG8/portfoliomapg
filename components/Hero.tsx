"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ROLES = ["Software Engineer", "Cloud Engineer", "AI Engineer"];

const SOCIAL = [
  {
    label: "GitHub",
    href: "https://github.com/MEMOMG8",
    external: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.09.682-.218.682-.484 0-.236-.009-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .269.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/manuelantoperezgil",
    external: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "mperezgi@ttu.edu",
    href: "mailto:mperezgi@ttu.edu",
    external: false,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

function useTypewriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];

    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
      return;
    }

    const t = setTimeout(
      () => setCharIdx((c) => c + (deleting ? -1 : 1)),
      deleting ? 45 : 80,
    );
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);

  return ROLES[roleIdx].substring(0, charIdx);
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const role = useTypewriter();

  return (
    <section
      className="relative h-screen snap-start snap-always flex flex-col justify-center pt-16 px-6 md:px-12 lg:px-24 overflow-hidden"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(99,102,241,0.14) 0%, transparent 65%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-4xl"
      >
        <motion.span
          variants={item}
          className="font-mono text-xs text-indigo-400 tracking-[0.22em] uppercase mb-5 block"
        >
          Hello, I&apos;m
        </motion.span>

        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.04] mb-5 tracking-tight"
        >
          <span className="text-white">Manuel </span>
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #818CF8 0%, #6366F1 45%, #A78BFA 100%)",
            }}
          >
            Perez Gil
          </span>
        </motion.h1>

        <motion.div
          variants={item}
          className="flex items-center mb-6 h-9"
          aria-label={`Role: ${role}`}
        >
          <span className="text-lg md:text-xl text-slate-300 font-light">{role}</span>
          <span className="typewriter-cursor" aria-hidden="true" />
        </motion.div>

        <motion.p
          variants={item}
          className="text-sm text-slate-500 mb-10 font-mono tracking-wide"
        >
          Texas Tech CS &apos;27&nbsp;&nbsp;·&nbsp;&nbsp;AWS Certified&nbsp;&nbsp;·&nbsp;&nbsp;CodePath AI 201
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-3">
          <a
            href="/Manuel_Perez_Gil_Resume_SWE.pdf"
            download="Manuel_Perez_Gil_Resume_SWE.pdf"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-indigo-500 bg-indigo-600 text-white hover:bg-indigo-500 transition-colors duration-200 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" />
            </svg>
            Download Résumé
          </a>
          {SOCIAL.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-[#1E1E2E] bg-[#0F0F17] text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-950/25 transition-all duration-200 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
                {s.icon}
              </span>
              {s.label}
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-10 left-6 md:left-12 lg:left-24 flex items-center gap-3"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-indigo-500 to-transparent"
        />
        <span className="font-mono text-[10px] text-slate-600 tracking-[0.2em] uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
