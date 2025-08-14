import { useEffect, useRef } from "react";

// ----- Math helpers -----
const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));
const computeProgress = (current: number, start: number, end: number): number =>
  clamp01((start - current) / (start - end));

// ----- Phone Transform Hook -----
export const usePhoneTransform = () => {
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!phoneRef.current) return;

      const viewportHeight = window.innerHeight;
      const phoneRect = phoneRef.current.getBoundingClientRect();

      const phoneStart = viewportHeight * 0.4; // 30% of viewport
      const phoneEnd = viewportHeight * 0.2; // 10% of viewport
      const titleStart = viewportHeight * 0.9; // 60% of viewport
      const titleEnd = viewportHeight * 0.4; // 30% of viewport

      const phoneProgress = computeProgress(
        phoneRect.top,
        phoneStart,
        phoneEnd
      );
      const titleProgress = computeProgress(
        phoneRect.top,
        titleStart,
        titleEnd
      );

      const phoneScale = 1 - titleProgress * (1 - 1.2); // scales from 1 -> 1.2
      const phoneMoveX = -phoneProgress * 400;
      const phoneMoveY = titleProgress * -130;

      const phoneTransform = `scale(${phoneScale}) translate(${phoneMoveX}px, ${phoneMoveY}px)`;
      phoneRef.current.style.transform = phoneTransform;
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

  return { phoneRef };
};
