import { useEffect, useRef } from "react";

export const useScrollTransform = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const initialTitleRef = useRef<HTMLDivElement>(null);
  const initialPhoneRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if we're in the Freshdeal section - much more strict detection
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      
      // Only show when the section is actually visible and close to center
      const isInSection = sectionTop < viewportHeight * 0.8 && sectionBottom > viewportHeight * 0.2;

      if (!isInSection) {
        // Hide everything when not in section
        if (initialTitleRef.current) {
          initialTitleRef.current.style.opacity = "0";
          initialTitleRef.current.style.transform = "translateX(-50%) scale(1.5) translateY(50px)";
        }
        if (initialPhoneRef.current) {
          initialPhoneRef.current.style.opacity = "0";
          initialPhoneRef.current.style.transform = "translateX(-50%) scale(3) translateY(100px)";
        }
        if (contentWrapperRef.current) {
          contentWrapperRef.current.style.opacity = "0";
          contentWrapperRef.current.style.transform = "translateY(100px)";
        }
        return;
      }

      // Calculate scroll progress within the section - only when actually in section
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (-sectionTop + viewportHeight * 0.3) / (viewportHeight * 0.4)
        )
      );

      // Initial entrance animation when section comes into view - stricter entrance
      const entranceProgress = Math.max(0, Math.min(1, (-sectionTop + viewportHeight * 0.7) / (viewportHeight * 0.2)));

      if (scrollProgress < 0.1) {
        // Initial state - show title and top 1/3 of phone
        const titleOpacity = entranceProgress;
        const phoneOpacity = entranceProgress;
        
        if (initialTitleRef.current) {
          initialTitleRef.current.style.opacity = titleOpacity.toString();
          initialTitleRef.current.style.transform = `translateX(-50%) scale(1.5) translateY(${50 - entranceProgress * 50}px)`;
        }
        
        if (initialPhoneRef.current) {
          const clipHeight = 33; // Show only top 1/3
          initialPhoneRef.current.style.transform = `translateX(-50%) scale(3) translateY(${100 - entranceProgress * 100}px)`;
          initialPhoneRef.current.style.clipPath = `inset(0 0 ${100 - clipHeight}% 0)`;
          initialPhoneRef.current.style.opacity = phoneOpacity.toString();
        }
        
        if (contentWrapperRef.current) {
          contentWrapperRef.current.style.opacity = "0";
          contentWrapperRef.current.style.transform = "translateY(100px)";
        }
      } else {
        // Scroll animation - reveal phone and bring in content
        const phoneScale = Math.max(1, 3 - scrollProgress * 2);
        const phoneTranslateX = Math.min(0, -scrollProgress * 500);
        const clipHeight = Math.max(33, 33 + scrollProgress * 67); // Reveal from 33% to 100%
        const contentOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.3) / 0.4));
        const contentTranslateY = Math.max(0, 100 - scrollProgress * 100);
        const titleOpacity = Math.max(0, 1 - scrollProgress * 2);

        if (initialTitleRef.current) {
          initialTitleRef.current.style.opacity = titleOpacity.toString();
          initialTitleRef.current.style.transform = `translateX(-50%) scale(1.5) translateY(0px)`;
        }
        
        if (initialPhoneRef.current) {
          initialPhoneRef.current.style.transform = `translateX(-50%) scale(${phoneScale}) translateX(${phoneTranslateX}px)`;
          initialPhoneRef.current.style.clipPath = `inset(0 0 ${100 - clipHeight}% 0)`;
          initialPhoneRef.current.style.opacity = "1";
        }
        
        if (contentWrapperRef.current) {
          contentWrapperRef.current.style.opacity = contentOpacity.toString();
          contentWrapperRef.current.style.transform = `translateY(${contentTranslateY}px)`;
        }
      }
    };

    // Use requestAnimationFrame for smooth 60fps animations
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
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener("scroll", smoothScroll);
    };
  }, []);

  return { 
    sectionRef, 
    initialTitleRef, 
    initialPhoneRef, 
    contentWrapperRef 
  };
};
