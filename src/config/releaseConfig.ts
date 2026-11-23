export interface ReleaseSnapshot {
  isReleased: boolean;
  targetTimestampMs: number;
  remainingMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  istCurrentFormatted: string;
  istLaunchFormatted: string;
}

/**
 * Centralized release and download configuration.
 * Replace VITE_RELEASE_DOWNLOAD_URL (or defaultDownloadUrl) to point to a
 * pre-hosted release binary without touching countdown or release logic.
 */
const DEFAULT_RELEASE_DOWNLOAD_URL =
  'https://github.com/MilapsKhasi/ZenterPrime-7.4/releases/download/release-7.4/ZenterPrime.Setup.7.4.0.exe';

export const RELEASE_CONFIG = {
  productName: 'ZenterPrime',
  version: '7.4.0',
  editionLabel: '7.4 Desktop',
  launchDateIso: '2026-12-31T00:00:00+05:30',
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'IST (Asia/Kolkata)',
  downloadUrl:
    (import.meta.env.VITE_RELEASE_DOWNLOAD_URL as string | undefined)?.trim() ||
    DEFAULT_RELEASE_DOWNLOAD_URL,
  installerFileName: 'ZenterPrime.Setup.7.4.0.exe',
  fileSizeLabel: '46.1 MB',
  sha256: 'e8b15fa316d2b49c0d381fc285c5b967a14e9f7823e592070dc823298c414fa9',
} as const;

export const LAUNCH_TIMESTAMP_MS = Date.parse(RELEASE_CONFIG.launchDateIso);

const istDateTimeFormatter = new Intl.DateTimeFormat('en-IN', {
  timeZone: RELEASE_CONFIG.timezone,
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const istLaunchDateFormatter = new Intl.DateTimeFormat('en-IN', {
  timeZone: RELEASE_CONFIG.timezone,
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export function isProductReleased(nowMs: number = Date.now()): boolean {
  return nowMs >= LAUNCH_TIMESTAMP_MS;
}

export function getReleaseSnapshot(nowMs: number = Date.now()): ReleaseSnapshot {
  const diffMs = Math.max(0, LAUNCH_TIMESTAMP_MS - nowMs);
  const released = diffMs === 0;

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    isReleased: released,
    targetTimestampMs: LAUNCH_TIMESTAMP_MS,
    remainingMs: diffMs,
    days,
    hours,
    minutes,
    seconds,
    istCurrentFormatted: `${istDateTimeFormatter.format(new Date(nowMs))} IST`,
    istLaunchFormatted: `${istLaunchDateFormatter.format(new Date(LAUNCH_TIMESTAMP_MS))} IST`,
  };
}

export function triggerReleaseDownload(): void {
  if (!isProductReleased()) return;

  try {
    const link = document.createElement('a');
    link.href = RELEASE_CONFIG.downloadUrl;
    link.setAttribute('download', RELEASE_CONFIG.installerFileName);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch {
    window.open(RELEASE_CONFIG.downloadUrl, '_blank', 'noopener,noreferrer');
  }
}
