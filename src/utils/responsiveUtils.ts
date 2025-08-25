/**
 * Viewport and Monitor Scaling Utilities
 * Helps maintain consistent appearance across different monitor sizes and pixel densities
 */

export interface ViewportInfo {
  width: number;
  height: number;
  pixelRatio: number;
  scaleFactor: number;
  category: 'mobile' | 'tablet' | 'desktop' | 'large-desktop' | 'ultra-wide';
}

/**
 * Get comprehensive viewport information
 */
export function getViewportInfo(): ViewportInfo {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const pixelRatio = window.devicePixelRatio || 1;

  // Calculate a scale factor based on viewport size and pixel density
  let scaleFactor = 1;

  // Adjust for high-DPI displays
  if (pixelRatio > 1.5) {
    scaleFactor *= 1.1;
  }
  if (pixelRatio > 2) {
    scaleFactor *= 1.15;
  }

  // Adjust for very large monitors
  if (width >= 2560) {
    scaleFactor *= 1.2;
  } else if (width >= 1920) {
    scaleFactor *= 1.1;
  }

  let category: ViewportInfo['category'] = 'desktop';
  if (width < 768) {
    category = 'mobile';
  } else if (width < 1024) {
    category = 'tablet';
  } else if (width >= 2560) {
    category = 'ultra-wide';
  } else if (width >= 1920) {
    category = 'large-desktop';
  }

  return {
    width,
    height,
    pixelRatio,
    scaleFactor,
    category
  };
}

/**
 * Apply responsive scaling to the document root
 */
export function applyResponsiveScaling(): void {
  const { scaleFactor, category } = getViewportInfo();

  const root = document.documentElement;

  // Apply scale factor as CSS custom property
  root.style.setProperty('--scale-factor', scaleFactor.toString());
  root.style.setProperty('--viewport-category', category);

  // Apply monitor-specific classes
  root.classList.remove('mobile', 'tablet', 'desktop', 'large-desktop', 'ultra-wide');
  root.classList.add(category);
}

/**
 * Calculate responsive value based on viewport
 */
export function responsiveValue(
  base: number,
  mobile?: number,
  tablet?: number,
  desktop?: number,
  largeDesktop?: number,
  ultraWide?: number
): number {
  const { category } = getViewportInfo();

  switch (category) {
    case 'mobile':
      return mobile ?? base * 0.8;
    case 'tablet':
      return tablet ?? base * 0.9;
    case 'desktop':
      return desktop ?? base;
    case 'large-desktop':
      return largeDesktop ?? base * 1.1;
    case 'ultra-wide':
      return ultraWide ?? base * 1.25;
    default:
      return base;
  }
}

/**
 * Get optimal font size for current viewport
 */
export function getOptimalFontSize(baseSize: number): number {
  const { width, pixelRatio } = getViewportInfo();

  let multiplier = 1;

  // Base scaling for different screen sizes
  if (width >= 2560) {
    multiplier = 1.2;
  } else if (width >= 1920) {
    multiplier = 1.1;
  } else if (width <= 768) {
    multiplier = 0.9;
  }

  // Adjust for pixel density
  if (pixelRatio > 2) {
    multiplier *= 1.1;
  } else if (pixelRatio > 1.5) {
    multiplier *= 1.05;
  }

  return baseSize * multiplier;
}

/**
 * Initialize responsive scaling on page load and resize
 */
export function initResponsiveScaling(): void {
  // Apply immediately
  applyResponsiveScaling();

  // Reapply on resize with debouncing
  let resizeTimeout: number;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(applyResponsiveScaling, 100);
  });

  // Also listen for orientation changes on mobile
  window.addEventListener('orientationchange', () => {
    window.setTimeout(applyResponsiveScaling, 200);
  });
}

/**
 * Monitor-specific CSS variable setter
 */
export function setMonitorOptimizedVariables(): void {
  const { width, pixelRatio } = getViewportInfo();
  const root = document.documentElement;

  // Set monitor-specific spacing multipliers
  if (width >= 2560) {
    root.style.setProperty('--spacing-multiplier', '1.25');
    root.style.setProperty('--font-multiplier', '1.15');
  } else if (width >= 1920) {
    root.style.setProperty('--spacing-multiplier', '1.1');
    root.style.setProperty('--font-multiplier', '1.05');
  } else {
    root.style.setProperty('--spacing-multiplier', '1');
    root.style.setProperty('--font-multiplier', '1');
  }

  // Adjust for pixel density
  if (pixelRatio > 2) {
    const currentMultiplier = parseFloat(
      getComputedStyle(root).getPropertyValue('--font-multiplier') || '1'
    );
    root.style.setProperty('--font-multiplier', (currentMultiplier * 1.1).toString());
  }
}
