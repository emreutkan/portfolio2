import { useEffect, useRef } from "react";


const start_animation_at_viewport_height = 0.9;
const end_animation_at_viewport_height = 0.1;

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
      contentWrapperRef.current.style.opacity = "0";

      const contentWrapperRect = contentWrapperRef.current.getBoundingClientRect();
      const contentWrapperTop = contentWrapperRect.top;
      
      const FINAL_OPACITY = 1;
      // Begin animation when the element starts entering the viewport
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * start_animation_at_viewport_height; // top just at the bottom edge of the viewport
      const end = Math.max(0, viewportHeight * end_animation_at_viewport_height); // animate until it's well in view

      const contentWrapperProgress = computeProgress(
        contentWrapperTop,
        start,
        end
      );


      contentWrapperRef.current.style.opacity = FINAL_OPACITY.toString();
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
