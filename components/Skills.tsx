"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills, type SkillGroup } from "@/lib/data";

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="p-5 rounded-2xl border border-[#1E1E2E] bg-[#0F0F17]"
    >
      <h3 className="section-label mb-3">{group.category}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{group.description}</p>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#14141F] text-slate-300 border border-[#1E1E2E] hover:border-indigo-700/40 hover:text-indigo-200 transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="h-screen snap-start snap-always flex flex-col justify-center overflow-hidden pt-20 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-8"
        >
          <span className="section-label">Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((g, i) => (
            <SkillCard key={g.category} group={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
