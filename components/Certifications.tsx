"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { certs, type Cert } from "@/lib/data";

function CertCard({ cert, index }: { cert: Cert; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col gap-4 p-5 rounded-2xl border border-[#1E1E2E] bg-[#0F0F17]"
    >
      {cert.status === "in-progress" && (
        <span className="absolute top-4 right-4 font-mono text-[10px] text-amber-400/90 bg-amber-950/40 border border-amber-700/30 px-2 py-0.5 rounded-full">
          In Progress
        </span>
      )}

      <div className="w-9 h-9 rounded-lg bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center shrink-0">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="text-indigo-400"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <div className="flex-1 pr-14">
        <h3 className="text-white text-sm font-medium leading-snug">{cert.name}</h3>
        <p className="text-slate-500 text-xs mt-1">{cert.issuer}</p>
      </div>

      <span className="font-mono text-xs text-indigo-400/80">{cert.date}</span>
    </motion.div>
  );
}

export default function Certifications() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <span className="section-label">Credentials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Certifications</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((c, i) => (
            <CertCard key={c.name} cert={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
