"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="contact" ref={ref} className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent mb-20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-center gap-6 text-center max-w-lg mx-auto"
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Let&apos;s build something together
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Open to SWE internships, cloud and AI roles, and interesting research problems. If you
            have something in mind, reach out.
          </p>

          <a
            href="mailto:mperezgi@ttu.edu"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            mperezgi@ttu.edu
          </a>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/MEMOMG8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors duration-200 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
            >
              GitHub
            </a>
            <span className="w-1 h-1 rounded-full bg-[#1E1E2E]" aria-hidden="true" />
            <a
              href="https://linkedin.com/in/manuelantoperezgil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors duration-200 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
