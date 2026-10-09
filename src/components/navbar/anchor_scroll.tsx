'use client';

import { useEffect } from 'react';

const DURATION = 500;

/** close to flora's --ease-in-out, the curve for symmetric moves */
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

/**
 * Animates in-page `#` links (explore, the header's projects link) over
 * 500ms. CSS `scroll-behavior: smooth` can't take a duration. Reduced motion
 * jumps straight there.
 */
export function AnchorScroll() {
  useEffect(() => {
    let frame = 0;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      const target = link?.hash && document.getElementById(link.hash.slice(1));
      if (!link || !target) return;

      e.preventDefault();
      history.pushState(null, '', link.hash);
      cancelAnimationFrame(frame);

      const start = window.scrollY;
      const end = target.getBoundingClientRect().top + start;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo(0, end);
        return;
      }

      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - t0) / DURATION, 1);
        window.scrollTo(0, start + (end - start) * easeInOut(t));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
