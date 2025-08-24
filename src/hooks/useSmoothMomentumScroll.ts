import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { setLenisInstance } from "../utils/scrollControls";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Set the global instance for programmatic control
    setLenisInstance(lenis);

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update ScrollTrigger when Lenis scrolls
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Cleanup function
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      setLenisInstance(null);
    };
  }, []);
};

export default useLenis;
