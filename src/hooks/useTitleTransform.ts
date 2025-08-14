import { useEffect, useRef } from "react";

// ----- Math helpers -----
const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));
const computeProgress = (current: number, start: number, end: number): number =>
  clamp01((start - current) / (start - end));

// ----- Title Transform Hook -----
export const useTitleTransform = () => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current) return;

      const viewportHeight = window.innerHeight;
      const titleRect = titleRef.current.getBoundingClientRect();
      
      const titleStart = viewportHeight * 0.6; // 60% of viewport
      const titleEnd = viewportHeight * 0.52; // 50% of viewport
      const titleOpacityStart = viewportHeight * 0.55; // 50% of viewport
      const titleOpacityEnd = viewportHeight * 0.52; // 40% of viewport

      const titleProgress = computeProgress(
        titleRect.top,
        titleStart,
        titleEnd
      );
      const titleOpacityProgress = computeProgress(
        titleRect.top,
        titleOpacityStart,
        titleOpacityEnd
      );

      const titleScale = 1 - titleProgress * 1; // scales from 1 -> 0
      // opacity goes down to 0 while shrinking 
      const titleOpacity = 1 - titleOpacityProgress * 1;
      const titleMoveY = -titleProgress * -100;
      titleRef.current.style.display = "flex";
      // Apply transforms separately to ensure translateY works properly
      titleRef.current.style.transform = `translateY(${titleMoveY}px) scale(${titleScale})`;
      titleRef.current.style.opacity = String(titleOpacity);

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

  return { titleRef };
};
