"use client";

import { useEffect } from "react";

export default function SectionTheme() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main > section"));
    const header = document.querySelector<HTMLElement>("main > header");
    const sidebar = document.querySelector<HTMLElement>("main > aside");
    let frame = 0;

    const update = () => {
      frame = 0;
      const bounds = sections.map(section => section.getBoundingClientRect());
      const surfaces = [
        { element: header, y: 32 },
        { element: sidebar, y: window.innerHeight / 2 },
      ];
      for (const { element, y } of surfaces) {
        if (!element) continue;
        const index = bounds.findIndex(rect => rect.top <= y && rect.bottom > y);
        element.dataset.darkSection = String(index >= 0 && index % 2 === 1);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      header?.removeAttribute("data-dark-section");
      sidebar?.removeAttribute("data-dark-section");
    };
  }, []);

  return null;
}
