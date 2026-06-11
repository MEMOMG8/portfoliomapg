"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects, type Project } from "@/lib/data";

const GitHubIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.09.682-.218.682-.484 0-.236-.009-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .269.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

function ProjectPreview({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden bg-[#14141F] mb-3 shrink-0">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F17]/50 to-transparent" />
      </div>
    );
  }
  return (
    <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden mb-3 shrink-0 bg-gradient-to-br from-indigo-950/40 via-[#14141F] to-violet-950/30 border border-[#1E1E2E] flex items-center justify-center">
      <span className="font-mono text-xs text-slate-700 tracking-widest uppercase">
        {project.title}
      </span>
    </div>
  );
}

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1E1E2E] bg-[#0F0F17]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Preview image at top of modal */}
        {project.image && (
          <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl bg-[#14141F]">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover object-top"
              sizes="580px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F17] via-transparent to-transparent" />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <h3 id="modal-title" className="text-xl font-bold text-white mb-4 pr-8">
            {project.title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>

          <div className="mb-6">
            <p className="section-label mb-3">Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10.5px] px-2.5 py-1 rounded-md bg-indigo-950/50 text-indigo-300/90 border border-indigo-800/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="section-label mb-3">Highlights</p>
            <ul className="space-y-2">
              {project.metrics.map((m) => (
                <li key={m} className="flex items-start gap-2.5">
                  <span className="text-emerald-500 text-xs mt-0.5 shrink-0">▸</span>
                  <span className="font-mono text-[11px] text-emerald-400/90 leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 flex-1 py-3 rounded-xl border border-[#1E1E2E] bg-[#14141F] text-slate-300 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-950/20 transition-all duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <GitHubIcon />
              View on GitHub
            </a>
            {project.paper && (
              <a
                href={project.paper}
                download
                className="flex items-center justify-center gap-2.5 flex-1 py-3 rounded-xl border border-indigo-800/40 bg-indigo-950/30 text-indigo-300 hover:text-indigo-200 hover:bg-indigo-950/50 transition-all duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Paper
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ boxShadow: "0 0 32px -8px rgba(99,102,241,0.2)" }}
      onClick={onClick}
      className="group relative flex flex-col text-left p-5 rounded-2xl border border-[#1E1E2E] bg-[#0F0F17] hover:border-indigo-500/25 transition-colors duration-300 cursor-pointer w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <ProjectPreview project={project} />

      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-white font-semibold text-base">{project.title}</h3>
        <div className="text-slate-700 group-hover:text-indigo-400 transition-colors duration-200 shrink-0 mt-0.5" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10.5px] px-2.5 py-1 rounded-md bg-indigo-950/50 text-indigo-300/90 border border-indigo-800/30"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="h-screen snap-start snap-always overflow-hidden pt-20 pb-4 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <span className="section-label">Selected Work</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onClick={() => setSelected(p)} />
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="https://github.com/MEMOMG8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-[#1E1E2E] bg-[#0F0F17] text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all duration-200 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <GitHubIcon size={14} />
            Visit My GitHub
          </a>
        </div>
      </div>

      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
