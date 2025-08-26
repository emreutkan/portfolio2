import { useEffect, useRef, useState } from "react";

export const useAdaptiveSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(true);

  useEffect(() => {
    const checkIfScrollNeeded = () => {
      if (!containerRef.current || !trackRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;

      // If track width is less than or equal to container width, no scrolling needed
      setShouldScroll(trackWidth > containerWidth);
    };

    checkIfScrollNeeded();

    // Check on window resize
    window.addEventListener("resize", checkIfScrollNeeded);

    // Check after a short delay to ensure images are loaded
    const timeoutId = setTimeout(checkIfScrollNeeded, 1000);

    return () => {
      window.removeEventListener("resize", checkIfScrollNeeded);
      clearTimeout(timeoutId);
    };
  }, []);

  return { containerRef, trackRef, shouldScroll };
};


