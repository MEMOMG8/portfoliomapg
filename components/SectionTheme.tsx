"use client";

import { useEffect } from "react";

export default function SectionTheme() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main > section"));
    const projectSections = Array.from(document.querySelectorAll<HTMLElement>("#projects [data-section-tone]"));
    const header = document.querySelector<HTMLElement>("main > header");
    const sidebar = document.querySelector<HTMLElement>("main > aside");
    const about = document.getElementById('about');
    const aboutPanel = about?.querySelector<HTMLElement>('.about-reveal-panel');
    let frame = 0;

    const update = () => {
      frame = 0;
      const bounds = sections.map(section => section.getBoundingClientRect());
      const projectBounds = projectSections.map(section => section.getBoundingClientRect());
      const surfaces = [
        { element: header, y: (header?.getBoundingClientRect().top || 0) + 32 },
        { element: sidebar, y: window.innerHeight / 2 },
      ];
      for (const { element, y } of surfaces) {
        if (!element) continue;
        // The hero remains behind About while its clipped blue panel opens.
        let index = -1;
        bounds.forEach((rect, i) => { if (rect.top <= y && rect.bottom > y) index = i; });
        const projectIndex = projectBounds.findIndex(rect => rect.top <= y && rect.bottom > y);
        let dark = projectIndex >= 0
          ? projectSections[projectIndex].dataset.sectionTone === "dark"
          : index >= 0 && index % 2 === 1;
        if (sections[index] === about && aboutPanel && document.documentElement.dataset.introMotion === 'true') {
          const panel = aboutPanel.getBoundingClientRect();
          const style = getComputedStyle(about);
          const side = parseFloat(style.getPropertyValue('--intro-side')) / 100 * panel.width;
          const top = parseFloat(style.getPropertyValue('--intro-top'));
          const bottom = parseFloat(style.getPropertyValue('--intro-bottom'));
          const rect = element.getBoundingClientRect(), x = rect.left + rect.width / 2;
          dark = y >= panel.top + top && y < panel.bottom - bottom && x >= panel.left + side && x <= panel.right - side;
        }
        element.dataset.darkSection = String(dark);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    window.addEventListener("portfolio:intro-update", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      window.removeEventListener("portfolio:intro-update", schedule);
      header?.removeAttribute("data-dark-section");
      sidebar?.removeAttribute("data-dark-section");
    };
  }, []);

  return null;
}
