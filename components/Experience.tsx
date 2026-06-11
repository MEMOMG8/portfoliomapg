"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience, type ExperienceItem } from "@/lib/data";

function TimelineItem({ exp, index }: { exp: ExperienceItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10 md:pl-14"
    >
      <div className="absolute left-0 top-6 w-3.5 h-3.5 rounded-full border-2 border-indigo-500 bg-bg" />
      <div className="absolute left-[5px] top-[27px] w-1 h-1 rounded-full bg-indigo-400" />

      <div className="p-5 rounded-2xl border border-[#1E1E2E] bg-[#0F0F17]">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-white font-semibold leading-snug">{exp.role}</h3>
            <p className="text-slate-500 text-sm mt-0.5">{exp.org}</p>
          </div>
          <span className="self-start font-mono text-[11px] text-indigo-400 bg-indigo-950/50 border border-indigo-800/30 px-3 py-1 rounded-full shrink-0 whitespace-nowrap">
            {exp.period}
          </span>
        </div>
        <ul className="space-y-2">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
              <span className="text-indigo-500/70 mt-0.5 shrink-0">—</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <span className="section-label">Background</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Experience</h2>
        </motion.div>

        <div className="relative max-w-3xl">
          <div className="absolute left-[6px] top-6 bottom-6 w-px bg-gradient-to-b from-indigo-500/40 via-indigo-500/15 to-transparent" />
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <TimelineItem key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
