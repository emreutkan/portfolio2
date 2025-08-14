import { useEffect, useRef } from "react";

// ----- Math helpers -----
const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));
const computeProgress = (current: number, start: number, end: number): number =>
  clamp01((start - current) / (start - end));

// ----- Content Reveal Hook -----
export const useContentReveal = (
  titleElementRef?: React.RefObject<HTMLElement | null>
) => {
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentWrapperRef.current) return;

      const viewportHeight = window.innerHeight;
      let titleProgress = 0;

      // If a title element is provided, use it for progress calculation
      if (titleElementRef?.current) {
        const titleRect = titleElementRef.current.getBoundingClientRect();
        const titleStart = viewportHeight * 0.7; // 60% of viewport
        const titleEnd = viewportHeight * 0.4; // 30% of viewport
        titleProgress = computeProgress(titleRect.top, titleStart, titleEnd);
      }

      const revealStartProgress = 0.6; // when content reveal begins
      const contentSlidePx = 24; // content slides up this much

      const revealProgress = clamp01(
        (titleProgress - revealStartProgress) / (1 - revealStartProgress)
      );

      const contentOpacity = revealProgress; // 0 -> 1
      const contentTranslateY = (1 - revealProgress) * contentSlidePx;

      if (revealProgress > 0) {
        contentWrapperRef.current.style.display = "flex";
        contentWrapperRef.current.style.opacity = String(contentOpacity);
        contentWrapperRef.current.style.transform = `translateY(${contentTranslateY}px)`;
        contentWrapperRef.current.style.pointerEvents =
          revealProgress >= 0.8 ? "auto" : "none";
      } else {
        contentWrapperRef.current.style.display = "none";
        contentWrapperRef.current.style.opacity = "0";
        contentWrapperRef.current.style.transform = `translateY(${contentSlidePx}px)`;
        contentWrapperRef.current.style.pointerEvents = "none";
      }
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
  }, [titleElementRef]);

  return { contentWrapperRef };
};
