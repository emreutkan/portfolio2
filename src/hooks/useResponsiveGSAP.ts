import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ResponsiveGSAP, 
  getResponsiveAnimationConfig, 
  ANIMATION_PRESETS,
  type ScaleConfig,
  type ResponsiveAnimationConfig 
} from '../utils/gsapScaling';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for responsive GSAP animations
 */
export function useResponsiveGSAP() {
  const elementRef = useRef<HTMLElement>(null);

  const animateIn = (
    config: ScaleConfig = ANIMATION_PRESETS.fadeInUp,
    responsiveOverrides?: ResponsiveAnimationConfig
  ) => {
    if (!elementRef.current) return;

    const responsiveConfig = getResponsiveAnimationConfig(config, responsiveOverrides);
    
    gsap.fromTo(
      elementRef.current,
      ResponsiveGSAP.getFromVars(responsiveConfig),
      ResponsiveGSAP.getToVars(responsiveConfig)
    );
  };

  const animateOnScroll = (
    config: ScaleConfig = ANIMATION_PRESETS.fadeInUp,
    responsiveOverrides?: ResponsiveAnimationConfig,
    scrollTriggerOptions?: ScrollTrigger.Vars
  ) => {
    if (!elementRef.current) return;

    const responsiveConfig = getResponsiveAnimationConfig(config, responsiveOverrides);
    
    gsap.fromTo(
      elementRef.current,
      ResponsiveGSAP.getFromVars(responsiveConfig),
      {
        ...ResponsiveGSAP.getToVars(responsiveConfig),
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...scrollTriggerOptions
        }
      }
    );
  };

  const staggerChildren = (
    selector: string,
    config: ScaleConfig = ANIMATION_PRESETS.staggerFadeIn,
    staggerDelay: number = 0.1,
    responsiveOverrides?: ResponsiveAnimationConfig
  ) => {
    if (!elementRef.current) return;

    const children = elementRef.current.querySelectorAll(selector);
    const responsiveConfig = getResponsiveAnimationConfig(config, responsiveOverrides);
    
    gsap.fromTo(
      children,
      ResponsiveGSAP.getFromVars(responsiveConfig),
      {
        ...ResponsiveGSAP.getToVars(responsiveConfig),
        stagger: staggerDelay
      }
    );
  };

  const addHoverEffects = (options?: {
    hoverScale?: number;
    duration?: number;
  }) => {
    if (!elementRef.current) return;

    const hoverScale = options?.hoverScale ?? ResponsiveGSAP.getHoverScale();
    const duration = options?.duration ?? 0.2;

    const element = elementRef.current;
    
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: hoverScale,
        duration,
        ease: "power2.out"
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        duration,
        ease: "power2.out"
      });
    });

    element.addEventListener('mousedown', () => {
      gsap.to(element, {
        scale: ResponsiveGSAP.getActiveScale(),
        duration: 0.1,
        ease: "power2.out"
      });
    });

    element.addEventListener('mouseup', () => {
      gsap.to(element, {
        scale: hoverScale,
        duration: 0.1,
        ease: "power2.out"
      });
    });
  };

  return {
    elementRef,
    animateIn,
    animateOnScroll,
    staggerChildren,
    addHoverEffects
  };
}

/**
 * Hook for responsive scroll animations
 */
export function useScrollAnimation(
  config: ScaleConfig = ANIMATION_PRESETS.fadeInUp,
  responsiveOverrides?: ResponsiveAnimationConfig,
  scrollTriggerOptions?: ScrollTrigger.Vars
) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const responsiveConfig = getResponsiveAnimationConfig(config, responsiveOverrides);
    
    const animation = gsap.fromTo(
      elementRef.current,
      ResponsiveGSAP.getFromVars(responsiveConfig),
      {
        ...ResponsiveGSAP.getToVars(responsiveConfig),
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...scrollTriggerOptions
        }
      }
    );

    return () => {
      animation.kill();
    };
  }, [config, responsiveOverrides, scrollTriggerOptions]);

  return elementRef;
}

/**
 * Hook for responsive stagger animations
 */
export function useStaggerAnimation(
  selector: string,
  config: ScaleConfig = ANIMATION_PRESETS.staggerFadeIn,
  staggerDelay: number = 0.1,
  responsiveOverrides?: ResponsiveAnimationConfig
) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.querySelectorAll(selector);
    if (children.length === 0) return;

    const responsiveConfig = getResponsiveAnimationConfig(config, responsiveOverrides);
    
    const animation = gsap.fromTo(
      children,
      ResponsiveGSAP.getFromVars(responsiveConfig),
      {
        ...ResponsiveGSAP.getToVars(responsiveConfig),
        stagger: staggerDelay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      animation.kill();
    };
  }, [selector, config, staggerDelay, responsiveOverrides]);

  return containerRef;
}

/**
 * Hook for responsive hover animations
 */
export function useHoverAnimation(options?: {
  hoverScale?: number;
  duration?: number;
  ease?: string;
}) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const hoverScale = options?.hoverScale ?? ResponsiveGSAP.getHoverScale();
    const duration = options?.duration ?? 0.2;
    const ease = options?.ease ?? "power2.out";

    const element = elementRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(element, { scale: hoverScale, duration, ease });
    };

    const handleMouseLeave = () => {
      gsap.to(element, { scale: 1, duration, ease });
    };

    const handleMouseDown = () => {
      gsap.to(element, { 
        scale: ResponsiveGSAP.getActiveScale(), 
        duration: 0.1, 
        ease 
      });
    };

    const handleMouseUp = () => {
      gsap.to(element, { scale: hoverScale, duration: 0.1, ease });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
    };
  }, [options]);

  return elementRef;
}
