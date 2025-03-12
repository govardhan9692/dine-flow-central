
/**
 * Animation utility functions
 */

/**
 * Staggered animation delay calculator
 * @param index - The element index 
 * @param baseDelay - Base delay in ms
 * @param stagger - Stagger amount in ms
 * @returns The calculated delay value in seconds
 */
export const getStaggerDelay = (
  index: number, 
  baseDelay: number = 100, 
  stagger: number = 50
): string => {
  return `${(baseDelay + index * stagger) / 1000}s`;
};

/**
 * Intersection Observer helper for scroll animations
 * @param callback - Function to call when element is in view
 * @param options - IntersectionObserver options
 * @returns IntersectionObserver reference
 */
export const createScrollObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
): IntersectionObserver => {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, options);
};

/**
 * Animation variants for Framer Motion
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};
