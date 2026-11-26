import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export interface MotionProfile {
  prefersReducedMotion: boolean;
  isCompactViewport: boolean;
  allowParallax: boolean;
}

/**
 * Lightweight media-query driven motion profile.
 * Disables scroll parallax on reduced-motion preferences or mobile/compact viewports
 * without continuous resize or scroll DOM measurements.
 */
export function useMotionProfile(): MotionProfile {
  const reducedFromMotion = useReducedMotion();
  const [isCompactViewport, setIsCompactViewport] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const onChange = (event: MediaQueryListEvent) => {
      setIsCompactViewport(event.matches);
    };

    setIsCompactViewport(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  const prefersReducedMotion = Boolean(reducedFromMotion);

  return {
    prefersReducedMotion,
    isCompactViewport,
    allowParallax: !prefersReducedMotion && !isCompactViewport,
  };
}
