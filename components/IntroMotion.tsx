'use client';

import { useEffect } from 'react';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };

export default function IntroMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>('main > section[aria-label="Introduction"]');
    const about = document.getElementById('about');
    const inner = about?.querySelector<HTMLElement>('.about-reveal-inner');
    const content = about?.querySelector<HTMLElement>('.about-reveal-content');
    if (!hero || !about || !inner || !content) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, viewport = window.innerHeight, stage = viewport, disposed = false;

    const update = () => {
      frame = 0;
      if (reduced.matches) return;
      const progress = Math.max(0, -about.getBoundingClientRect().top / viewport);
      const rise = smooth((progress - .16) / .78);
      const expand = smooth((progress - .91) / .56);
      const opacity = smooth((progress - .74) / .62);
      about.style.setProperty('--intro-top', `${viewport * (1 - rise) + viewport * .085 * rise * (1 - expand)}px`);
      about.style.setProperty('--intro-side', `${7.5 * (1 - expand)}%`);
      about.style.setProperty('--intro-bottom', `${(stage - viewport + viewport * .085 * rise) * (1 - expand)}px`);
      about.style.setProperty('--intro-radius', `${30 * (1 - expand)}px`);
      about.style.setProperty('--intro-opacity', String(opacity));
      about.style.setProperty('--intro-offset', `${30 * (1 - opacity)}px`);
      about.style.setProperty('--intro-scale', String(.85 + .15 * expand));
      hero.style.opacity = String(1 - .87 * smooth((progress - .26) / .7));
      hero.style.visibility = progress >= 1.47 ? 'hidden' : '';
      hero.inert = progress > .78;
      content.inert = opacity < .85;
      root.dataset.introPast = String(progress > 1.6);
      window.dispatchEvent(new Event('portfolio:intro-update'));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      viewport = window.innerHeight;
      const style = getComputedStyle(content);
      stage = Math.max(viewport, inner.scrollHeight + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
      root.style.setProperty('--intro-viewport', `${viewport}px`);
      root.style.setProperty('--intro-stage', `${stage}px`);
      root.style.setProperty('--intro-travel', `${viewport * 1.6}px`);
      update();
    };
    const configure = () => {
      root.dataset.introMotion = String(!reduced.matches);
      if (reduced.matches) {
        hero.style.removeProperty('opacity'); hero.style.removeProperty('visibility');
        hero.inert = false; content.inert = false; delete root.dataset.introPast;
        window.dispatchEvent(new Event('portfolio:intro-update'));
      } else measure();
    };
    const goToAbout = (behavior: ScrollBehavior) => {
      window.scrollTo({ top: window.scrollY + about.getBoundingClientRect().top + (reduced.matches ? 0 : viewport * 1.6), behavior });
    };
    const click = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href="#about"]');
      if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); history.pushState(null, '', '#about');
      goToAbout(reduced.matches ? 'instant' : 'smooth');
    };
    const hash = () => { if (location.hash === '#about') goToAbout('instant'); };
    configure();
    const observer = new ResizeObserver(measure); observer.observe(inner);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('pageshow', measure);
    window.addEventListener('hashchange', hash);
    document.addEventListener('click', click);
    reduced.addEventListener('change', configure);
    // Account for the taller intro before honoring an initial section deep link.
    document.fonts.ready.then(() => {
      if (disposed) return;
      measure();
      if (location.hash === '#about') hash();
      else if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
    });
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', measure);
      window.removeEventListener('pageshow', measure); window.removeEventListener('hashchange', hash);
      document.removeEventListener('click', click); reduced.removeEventListener('change', configure);
      delete root.dataset.introMotion; delete root.dataset.introPast;
      ['--intro-viewport','--intro-stage','--intro-travel'].forEach(key => root.style.removeProperty(key));
      hero.style.removeProperty('opacity'); hero.style.removeProperty('visibility'); hero.inert = false; content.inert = false;
    };
  }, []);
  return null;
}
