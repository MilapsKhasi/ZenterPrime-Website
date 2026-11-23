import { useState, useEffect, useRef } from 'react';
import { getReleaseSnapshot, ReleaseSnapshot } from '../config/releaseConfig';

export interface ReleaseStatusState extends ReleaseSnapshot {
  justReleased: boolean;
}

/**
 * Calculates release state synchronously on mount from real wall-clock time
 * and updates periodically while the page stays open. Automatically stops
 * ticking once 31 Dec 2026 00:00 IST is reached.
 */
export function useReleaseStatus(): ReleaseStatusState {
  const [snapshot, setSnapshot] = useState<ReleaseSnapshot>(() => getReleaseSnapshot());
  const [justReleased, setJustReleased] = useState(false);
  const wasReleasedOnMount = useRef(snapshot.isReleased);

  useEffect(() => {
    if (snapshot.isReleased) {
      return;
    }

    const syncClock = () => {
      const next = getReleaseSnapshot();
      setSnapshot((prev) => {
        if (
          prev.isReleased === next.isReleased &&
          prev.seconds === next.seconds &&
          prev.minutes === next.minutes &&
          prev.hours === next.hours &&
          prev.days === next.days
        ) {
          return prev;
        }
        if (next.isReleased && !wasReleasedOnMount.current) {
          setJustReleased(true);
        }
        return next;
      });
    };

    syncClock();
    const intervalId = window.setInterval(syncClock, 500);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncClock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [snapshot.isReleased]);

  return {
    ...snapshot,
    justReleased,
  };
}
