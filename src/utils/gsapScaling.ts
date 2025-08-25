/**
 * GSAP Responsive Scaling Utilities
 * Provides consistent scaling and animation values across different monitor sizes
 */

export interface ScaleConfig {
  scaleFrom?: number;
  scaleTo?: number;
  translateX?: number;
  translateY?: number;
  rotate?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  ease?: string;
}

export interface ResponsiveAnimationConfig {
  mobile?: ScaleConfig;
  tablet?: ScaleConfig;
  desktop?: ScaleConfig;
  largeDesktop?: ScaleConfig;
  ultraWide?: ScaleConfig;
}

/**
 * Get responsive scale values based on viewport
 */
export function getResponsiveScale(): {
  scaleDown: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  scaleUp: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  translate: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
} {
  const width = window.innerWidth;
  const pixelRatio = window.devicePixelRatio || 1;

  // Base multiplier based on screen size
  let multiplier = 1;
  if (width >= 2560) {
    multiplier = 1.15; // Slightly larger animations for 1440p+
  } else if (width >= 1920) {
    multiplier = 1.05; // Slightly larger for large screens
  } else if (width <= 768) {
    multiplier = 0.9; // Smaller for mobile
  }

  // Adjust for pixel density
  if (pixelRatio > 2) {
    multiplier *= 1.05;
  }

  return {
    scaleDown: {
      sm: 0.95 * multiplier,
      md: 0.9 * multiplier,
      lg: 0.8 * multiplier,
      xl: 0.7 * multiplier,
    },
    scaleUp: {
      sm: 1.05 * multiplier,
      md: 1.1 * multiplier,
      lg: 1.2 * multiplier,
      xl: 1.3 * multiplier,
    },
    translate: {
      sm: 8 * multiplier,
      md: 16 * multiplier,
      lg: 32 * multiplier,
      xl: 64 * multiplier,
    }
  };
}

/**
 * Get responsive animation config based on current viewport
 */
export function getResponsiveAnimationConfig(
  baseConfig: ScaleConfig,
  responsiveOverrides?: ResponsiveAnimationConfig
): ScaleConfig {
  const width = window.innerWidth;
  const scales = getResponsiveScale();

  // Determine viewport category
  let viewportConfig: ScaleConfig = {};
  if (width < 768 && responsiveOverrides?.mobile) {
    viewportConfig = responsiveOverrides.mobile;
  } else if (width < 1024 && responsiveOverrides?.tablet) {
    viewportConfig = responsiveOverrides.tablet;
  } else if (width < 1920 && responsiveOverrides?.desktop) {
    viewportConfig = responsiveOverrides.desktop;
  } else if (width < 2560 && responsiveOverrides?.largeDesktop) {
    viewportConfig = responsiveOverrides.largeDesktop;
  } else if (responsiveOverrides?.ultraWide) {
    viewportConfig = responsiveOverrides.ultraWide;
  }

  // Merge configs with responsive scaling
  return {
    ...baseConfig,
    ...viewportConfig,
    scaleFrom: (viewportConfig.scaleFrom ?? baseConfig.scaleFrom ?? 0) * scales.scaleUp.sm,
    scaleTo: (viewportConfig.scaleTo ?? baseConfig.scaleTo ?? 1) * scales.scaleUp.sm,
    translateX: (viewportConfig.translateX ?? baseConfig.translateX ?? 0) * scales.translate.md,
    translateY: (viewportConfig.translateY ?? baseConfig.translateY ?? 0) * scales.translate.md,
  };
}

/**
 * GSAP Timeline utilities with responsive scaling
 */
export class ResponsiveGSAP {
  private static getScaleFactor(): number {
    const width = window.innerWidth;
    if (width >= 2560) return 1.15;
    if (width >= 1920) return 1.05;
    if (width <= 768) return 0.9;
    return 1;
  }

  static scaleValue(value: number): number {
    return value * this.getScaleFactor();
  }

  static getFromVars(config: ScaleConfig): Record<string, number> {
    const scales = getResponsiveScale();
    return {
      scale: config.scaleFrom ?? 0,
      x: config.translateX ? config.translateX * scales.translate.md : 0,
      y: config.translateY ? config.translateY * scales.translate.md : 0,
      rotation: config.rotate ?? 0,
      opacity: config.opacity ?? 0,
    };
  }

  static getToVars(config: ScaleConfig): Record<string, number | string> {
    const scales = getResponsiveScale();
    return {
      scale: config.scaleTo ?? scales.scaleUp.sm,
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      duration: config.duration ?? 0.8,
      delay: config.delay ?? 0,
      ease: config.ease ?? "power2.out",
    };
  }

  static getHoverScale(): number {
    const scales = getResponsiveScale();
    return scales.scaleUp.sm;
  }

  static getActiveScale(): number {
    const scales = getResponsiveScale();
    return scales.scaleDown.sm;
  }
}

/**
 * Border radius utilities that work with CSS variables
 */
export function getResponsiveBorderRadius(): {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
} {
  return {
    xs: 'var(--radius-xs)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    '3xl': 'var(--radius-3xl)',
    full: 'var(--radius-full)',
  };
}

/**
 * Update CSS variables for GSAP animations based on current viewport
 */
export function updateGSAPVariables(): void {
  const root = document.documentElement;
  const scales = getResponsiveScale();

  // Update scale variables
  root.style.setProperty('--gsap-scale-initial', '0');
  root.style.setProperty('--gsap-scale-final', scales.scaleUp.sm.toString());
  root.style.setProperty('--gsap-scale-hover', scales.scaleUp.md.toString());
  root.style.setProperty('--gsap-scale-active', scales.scaleDown.sm.toString());

  // Update translate variables
  root.style.setProperty('--gsap-translate-sm', `${scales.translate.sm}px`);
  root.style.setProperty('--gsap-translate-md', `${scales.translate.md}px`);
  root.style.setProperty('--gsap-translate-lg', `${scales.translate.lg}px`);
  root.style.setProperty('--gsap-translate-xl', `${scales.translate.xl}px`);
}

/**
 * Initialize responsive GSAP scaling
 */
export function initResponsiveGSAP(): void {
  updateGSAPVariables();

  // Update on resize
  let resizeTimeout: number;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(updateGSAPVariables, 100);
  });

  // Update on orientation change
  window.addEventListener('orientationchange', () => {
    window.setTimeout(updateGSAPVariables, 200);
  });
}

// Example usage configurations
export const ANIMATION_PRESETS = {
  fadeInUp: {
    scaleFrom: 1,
    scaleTo: 1,
    translateY: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  },
  scaleIn: {
    scaleFrom: 0,
    scaleTo: 1,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.7)"
  },
  slideInLeft: {
    scaleFrom: 1,
    scaleTo: 1,
    translateX: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  },
  slideInRight: {
    scaleFrom: 1,
    scaleTo: 1,
    translateX: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  },
  staggerFadeIn: {
    scaleFrom: 0.8,
    scaleTo: 1,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
  }
} as const;
