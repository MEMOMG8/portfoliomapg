"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const tags = [
  { label: "Texas Tech CS '27", accent: false },
  { label: "GPA 3.49", accent: false },
  { label: "AWS Certified", accent: true },
  { label: "CodePath AI 201", accent: true },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" ref={ref} className="h-screen snap-start snap-always flex flex-col justify-center overflow-hidden pt-20 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Who I Am</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-10">About</h2>

          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start max-w-3xl">
            {/* Profile photo */}
            <div className="shrink-0 mx-auto md:mx-0 md:order-2">
              <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border border-[#1E1E2E] ring-4 ring-[#0A0A0F]">
                <Image
                  src="/images/profilephoto.jpg"
                  alt="Manuel Perez Gil"
                  fill
                  className="object-cover object-top"
                  sizes="192px"
                  priority
                />
              </div>
            </div>

            {/* Bio */}
            <div className="md:order-1">
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  I&apos;m a Computer Science student at{" "}
                  <span className="text-slate-200">Texas Tech University</span> (GPA 3.49,
                  graduating May 2027) focused on the intersection of cloud infrastructure, AI
                  pipelines, and developer tooling.
                </p>
                <p>
                  Currently working as an{" "}
                  <span className="text-slate-200">IT Support Technician</span> at TTU&apos;s
                  Classroom Technology Services, keeping 35+ classrooms running while managing 20+
                  weekly tickets. Previously a{" "}
                  <span className="text-slate-200">Research Software Engineer</span> at TTU&apos;s
                  Interdisciplinary Data Visualization Lab, where I built an interactive
                  visualization submitted to IEEE SciVis Contest 2025.
                </p>
                <p>
                  AWS certified, currently in CodePath&apos;s AI Engineering program, and most at
                  home building things that solve real operational problems — a serverless monitoring
                  dashboard, a RAG pipeline that actually cites its sources, or a real-time chat
                  system secure enough to trust.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`font-mono text-xs px-3 py-1.5 rounded-full border ${
                      tag.accent
                        ? "border-indigo-800/40 bg-indigo-950/40 text-indigo-400"
                        : "border-[#1E1E2E] bg-[#0F0F17] text-slate-400"
                    }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
