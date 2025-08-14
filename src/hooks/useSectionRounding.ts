import { useEffect, useRef } from "react";

// ----- Math helpers -----
const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));
const computeProgress = (current: number, start: number, end: number): number =>
  clamp01((start - current) / (start - end));

// ----- Section Corner Rounding Hook -----
export const useSectionRounding = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const viewportHeight = window.innerHeight;
      const sectionRect = sectionRef.current.getBoundingClientRect();

      const roundStart = viewportHeight * 0.5; // 50% of viewport
      const roundEnd = viewportHeight * 0.05; // 5% of viewport
      const cornerRoundProgress = computeProgress(
        sectionRect.top,
        roundStart,
        roundEnd
      );

      const radiusPx = Math.round(100 * (1 - cornerRoundProgress));
      sectionRef.current.style.borderTopLeftRadius = `${radiusPx}px`;
      sectionRef.current.style.borderTopRightRadius = `${radiusPx}px`;
    };

    let ticking = false;
    const smoothScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", smoothScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", smoothScroll);
  }, []);

  return { sectionRef };
};
