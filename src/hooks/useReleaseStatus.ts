import { useState, useEffect, useRef } from 'react';
import {
  getAuthoritativeNowMs,
  getReleaseSnapshot,
  ReleaseSnapshot,
  setAuthoritativeServerTime,
} from '../config/releaseConfig';
import { fetchSupabaseServerTimeMs } from '../lib/supabase';

export interface ReleaseStatusState extends ReleaseSnapshot {
  justReleased: boolean;
}

const LOCAL_TICK_MS = 200;
const PERIODIC_SYNC_MS = 60_000;
const NEAR_LAUNCH_SYNC_MS = 10_000;
const RETRY_SYNC_MS = 5_000;

/**
 * Synchronizes release state with authoritative Supabase PostgreSQL server time
 * via `get_server_time` RPC, advancing smoothly between syncs using monotonic
 * `performance.now()` so manual system clock changes cannot affect release timing.
 */
export function useReleaseStatus(): ReleaseStatusState {
  const [snapshot, setSnapshot] = useState<ReleaseSnapshot>(() => getReleaseSnapshot());
  const [justReleased, setJustReleased] = useState(false);

  const hasInitialSyncRef = useRef(false);
  const prevReleasedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    let isFetching = false;
    let resyncTimeoutId: number | null = null;

    const applySnapshotUpdate = (isInitialServerSync: boolean) => {
      if (!isMounted) return;
      const next = getReleaseSnapshot();
      if (!next.isSynced) return;

      if (isInitialServerSync && !hasInitialSyncRef.current) {
        hasInitialSyncRef.current = true;
        prevReleasedRef.current = next.isReleased;
        setJustReleased(false);
      } else if (hasInitialSyncRef.current) {
        const wasReleased = prevReleasedRef.current;
        if (!wasReleased && next.isReleased) {
          prevReleasedRef.current = true;
          setJustReleased(true);
        } else if (wasReleased && !next.isReleased) {
          prevReleasedRef.current = false;
          setJustReleased(false);
        }
      }

      setSnapshot((prev) => {
        if (
          prev.isSynced === next.isSynced &&
          prev.isReleased === next.isReleased &&
          prev.seconds === next.seconds &&
          prev.minutes === next.minutes &&
          prev.hours === next.hours &&
          prev.days === next.days
        ) {
          return prev;
        }
        return next;
      });
    };

    const scheduleNextResync = (syncSucceeded: boolean) => {
      if (!isMounted) return;
      if (resyncTimeoutId !== null) {
        window.clearTimeout(resyncTimeoutId);
      }

      let delayMs = PERIODIC_SYNC_MS;
      if (!syncSucceeded) {
        delayMs = RETRY_SYNC_MS;
      } else {
        const current = getReleaseSnapshot();
        if (!current.isReleased && current.remainingMs <= PERIODIC_SYNC_MS) {
          delayMs = NEAR_LAUNCH_SYNC_MS;
        }
      }

      resyncTimeoutId = window.setTimeout(() => {
        void syncWithServer();
      }, delayMs);
    };

    const syncWithServer = async () => {
      if (!isMounted || isFetching) return;
      isFetching = true;

      const result = await fetchSupabaseServerTimeMs();
      isFetching = false;

      if (!isMounted) return;

      if (result.success && typeof result.serverTimeMs === 'number') {
        const wasFirstSync = !hasInitialSyncRef.current;
        setAuthoritativeServerTime(result.serverTimeMs);
        applySnapshotUpdate(wasFirstSync);
        scheduleNextResync(true);
      } else {
        scheduleNextResync(false);
      }
    };

    // Initial server sync on mount
    void syncWithServer();

    // Smooth local tick using monotonic elapsed time between server syncs
    const tickIntervalId = window.setInterval(() => {
      if (getAuthoritativeNowMs() !== null) {
        applySnapshotUpdate(false);
      }
    }, LOCAL_TICK_MS);

    // Resynchronize on tab visibility restoration, window focus, or reconnect
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        void syncWithServer();
      }
    };
    const handleFocusOrOnline = () => {
      void syncWithServer();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleFocusOrOnline);
    window.addEventListener('online', handleFocusOrOnline);

    return () => {
      isMounted = false;
      window.clearInterval(tickIntervalId);
      if (resyncTimeoutId !== null) {
        window.clearTimeout(resyncTimeoutId);
      }
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleFocusOrOnline);
      window.removeEventListener('online', handleFocusOrOnline);
    };
  }, []);

  return {
    ...snapshot,
    justReleased,
  };
}
