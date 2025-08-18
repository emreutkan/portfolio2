import { useEffect, useRef } from 'react';

interface VantaConfig {
  el: HTMLElement;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  scale: number;
  scaleMobile: number;
  color: number;
  color2: number;
  size: number;
  spacing: number;
  backgroundColor: number;
}

interface VantaInstance {
  destroy: () => void;
}

declare global {
  interface Window {
    VANTA: {
      DOTS: (config: VantaConfig) => VantaInstance;
    };
  }
}

export const useVantaDots = () => {
  const vantaRef = useRef<VantaInstance | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Three.js and Vanta.js scripts
    const loadScripts = async () => {
      // Check if scripts are already loaded
      if (window.VANTA) {
        return;
      }

      // Load Three.js
      const threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      threeScript.async = true;

      // Load Vanta.js
      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js';
      vantaScript.async = true;

      // Wait for both scripts to load
      await new Promise<void>((resolve) => {
        threeScript.onload = () => {
          vantaScript.onload = () => {
            resolve();
          };
        };
        document.head.appendChild(threeScript);
        document.head.appendChild(vantaScript);
      });
    };

    const initVanta = async () => {
      await loadScripts();

      if (elementRef.current && window.VANTA) {
        vantaRef.current = window.VANTA.DOTS({
          el: elementRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x666666,
          color2: 0x333333,
          size: 2.00,
          spacing: 25.00,
          backgroundColor: 0x0
        });
      }
    };

    initVanta();

    // Cleanup function
    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
      }
    };
  }, []);

  return elementRef;
};
