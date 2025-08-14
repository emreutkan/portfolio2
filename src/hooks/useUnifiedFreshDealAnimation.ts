import { useEffect, useRef } from "react";

// ----- Math helpers -----
const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));
const computeProgress = (current: number, start: number, end: number): number =>
  clamp01((start - current) / (start - end));

// ----- Easing functions for smoother animations -----
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

const easeInQuart = (t: number): number => {
  return t * t * t * t;
};

// ----- Unified Animation Hook -----
export const useUnifiedFreshDealAnimation = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current || !phoneRef.current || !contentWrapperRef.current)
        return;

      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const titleRect = titleRef.current.getBoundingClientRect();

      // ----- Responsive breakpoints -----
      const isMobile = viewportWidth <= 768;

      // ----- Define unified scroll zones (adjusted for responsive) -----
      const zoneMultiplier = isMobile ? 0.8 : 1; // Slightly faster on mobile

      const zone1Start = viewportHeight * (0.8 * zoneMultiplier); // Title animation start
      const zone2Start = viewportHeight * (0.5 * zoneMultiplier); // Phone movement start
      const zone3Start = viewportHeight * (0.2 * zoneMultiplier); // Content reveal start

      // Calculate progress for each animation phase
      const titleProgress = computeProgress(
        titleRect.top,
        zone1Start,
        zone2Start
      );
      const phoneProgress = computeProgress(
        titleRect.top,
        zone2Start,
        zone3Start
      );
      const contentProgress = computeProgress(titleRect.top, zone3Start, 0);

      // ----- Title Animation (Zone 2) -----
      if (titleProgress > 0) {
        const easedTitleProgress = easeInOutCubic(titleProgress);

        // Responsive scaling and movement
        const scaleAmount = isMobile ? 0.4 : 0.3; // More dramatic on mobile
        const moveAmount = isMobile ? -30 : -50; // Less movement on mobile
        const fadeAmount = isMobile ? 0.8 : 0.7; // More visible on mobile

        const titleScale = 1 - easedTitleProgress * scaleAmount;
        const titleOpacity = 1 - easedTitleProgress * fadeAmount;
        const titleMoveY = easedTitleProgress * moveAmount;

        titleRef.current.style.transform = `translateY(${titleMoveY}px) scale(${titleScale})`;
        titleRef.current.style.opacity = String(titleOpacity);
      } else {
        // Reset to initial state
        titleRef.current.style.transform = "translateY(0px) scale(1)";
        titleRef.current.style.opacity = "1";
      }

      // ----- Phone Animation (Zone 3) -----
      if (phoneProgress > 0) {
        const easedPhoneProgress = easeOutQuart(phoneProgress);

        // Responsive phone positioning
        const scaleAmount = isMobile ? 0.1 : 0.2; // Less scaling on mobile
        const moveXAmount = isMobile ? -200 : -400; // Less horizontal movement on mobile
        const moveYAmount = isMobile ? -80 : -130; // Less vertical movement on mobile

        const phoneScale = 1 + easedPhoneProgress * scaleAmount;
        const phoneMoveX = easedPhoneProgress * moveXAmount;
        const phoneMoveY = easedPhoneProgress * moveYAmount;

        phoneRef.current.style.transform = `translate(${phoneMoveX}px, ${phoneMoveY}px) scale(${phoneScale})`;
      } else if (titleProgress > 0) {
        // During title animation, apply small preparatory movement
        const prepProgress = easeInQuart(titleProgress);
        const prepMoveY = prepProgress * (isMobile ? -10 : -20);

        phoneRef.current.style.transform = `translate(0px, ${prepMoveY}px) scale(1)`;
      } else {
        // Reset to initial state
        phoneRef.current.style.transform = "translate(0px, 0px) scale(1)";
      }

      // ----- Content Reveal Animation (Zone 4) -----
      if (contentProgress > 0) {
        const easedContentProgress = easeOutQuart(contentProgress);

        const contentOpacity = easedContentProgress;
        const slideAmount = isMobile ? 30 : 40; // Less slide on mobile
        const contentSlideY = (1 - easedContentProgress) * slideAmount;

        contentWrapperRef.current.style.display = "flex";
        contentWrapperRef.current.style.opacity = String(contentOpacity);
        contentWrapperRef.current.style.transform = `translateY(${contentSlideY}px)`;
        contentWrapperRef.current.style.pointerEvents =
          contentProgress >= 0.8 ? "auto" : "none";
      } else {
        // Hide content when not in view
        contentWrapperRef.current.style.display = "none";
        contentWrapperRef.current.style.opacity = "0";
        contentWrapperRef.current.style.transform = `translateY(${
          isMobile ? 30 : 40
        }px)`;
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
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", smoothScroll);
  }, []);

  return { titleRef, phoneRef, contentWrapperRef };
};
