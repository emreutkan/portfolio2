import Lenis from "lenis";

// Global Lenis instance for scroll controls
let lenisInstance: Lenis | null = null;

export const setLenisInstance = (lenis: Lenis | null) => {
  lenisInstance = lenis;
};

export const scrollToSection = (target: string | HTMLElement, offset = 0) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }
};

export const scrollToTop = () => {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }
};

export const stopScroll = () => {
  if (lenisInstance) {
    lenisInstance.stop();
  }
};

export const startScroll = () => {
  if (lenisInstance) {
    lenisInstance.start();
  }
};
