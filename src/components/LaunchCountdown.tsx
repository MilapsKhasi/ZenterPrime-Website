import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, ExternalLink, Clock, Download } from 'lucide-react';
import { ReleaseStatusState } from '../hooks/useReleaseStatus';
import { useMotionProfile } from '../hooks/useMotionProfile';
import { TRIAL_WEB_URL } from './Modals';

interface LaunchCountdownProps {
  release: ReleaseStatusState;
  onExplorePricing: () => void;
  onScrollToDownload: () => void;
  onOpenDownloadModal?: () => void;
}

type RevealPhase =
  | 'counting'
  | 'freeze'
  | 'clearing'
  | 'dark-hold'
  | 'speed-zoom'
  | 'settling'
  | 'revealed';

const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_CLEAR: [number, number, number, number] = [0.36, 0, 0.66, -0.1];
const EASE_SPEED_ZOOM: [number, number, number, number] = [0.72, 0, 0.16, 1];

// Phase timings (ms)
const FREEZE_DURATION_MS = 450;
const CLEAR_DURATION_MS = 700; // All clearing elements finish by 620ms
const DARK_HOLD_DURATION_MS = 1000; // Exact 1-second dark hold after complete disappearance
const SPEED_ZOOM_DURATION_MS = 1000;
const SETTLE_DURATION_MS = 280;

const padUnit = (value: number): string => String(value).padStart(2, '0');

interface CountdownUnitCardProps {
  label: string;
  value: string;
  index: number;
  prefersReducedMotion: boolean;
  isClearing: boolean;
  isCleared: boolean;
}

/**
 * Memoized unit monolith so static units (Days/Hours/Minutes) do not re-render
 * every time Seconds updates. Countdown digits switch immediately without animation.
 */
const CountdownUnitCard = React.memo<CountdownUnitCardProps>(
  ({ label, value, index, prefersReducedMotion, isClearing, isCleared }) => {
    const animateTarget =
      isClearing || isCleared
        ? { opacity: 0, y: 22, scale: 0.9 }
        : { opacity: 1, y: 0, scale: 1 };

    const transitionConfig = isClearing
      ? {
          duration: 0.44,
          delay: 0.06 + index * 0.04,
          ease: EASE_CLEAR,
        }
      : {
          duration: 0.6,
          delay: 0.18 + index * 0.065,
          ease: EASE_CINEMATIC,
        };

    return (
      <motion.div
        initial={prefersReducedMotion || isCleared ? false : { opacity: 0, y: 24, scale: 0.96 }}
        whileInView={isClearing || isCleared ? undefined : { opacity: 1, y: 0, scale: 1 }}
        animate={isClearing || isCleared ? animateTarget : undefined}
        viewport={{ once: true, amount: 0.15 }}
        transition={isCleared ? { duration: 0 } : transitionConfig}
        className="relative rounded-[10px] bg-gradient-to-b from-[#141724] to-[#0B0D14] border border-white/12 px-3 sm:px-4 py-5 sm:py-7 lg:py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        <div className="countdown-display tabular-nums text-[clamp(2.5rem,7vw,4.75rem)] font-normal tracking-tight text-white leading-none select-none">
          <span>{value}</span>
        </div>
        <div className="mt-3 pt-2.5 border-t border-white/10 text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] text-slate-400 font-semibold">
          {label}
        </div>
      </motion.div>
    );
  }
);

CountdownUnitCard.displayName = 'CountdownUnitCard';

export const LaunchCountdown: React.FC<LaunchCountdownProps> = ({
  release,
  onExplorePricing,
  onScrollToDownload,
  onOpenDownloadModal,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion, allowParallax } = useMotionProfile();

  // If the product was already released before initial mount, settle directly in final reveal state.
  // If countdown reaches zero while open (release.justReleased === true), run the full sequence.
  const [phase, setPhase] = useState<RevealPhase>(() =>
    release.isReleased && !release.justReleased ? 'revealed' : 'counting'
  );
  const hasTriggeredSequenceRef = useRef<boolean>(release.isReleased && !release.justReleased);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!release.isReleased || hasTriggeredSequenceRef.current) {
      return;
    }

    hasTriggeredSequenceRef.current = true;
    let sequenceCompleted = false;

    if (!release.justReleased || prefersReducedMotion) {
      sequenceCompleted = true;
      setPhase('revealed');
      return;
    }

    // 1. Freeze final 00:00:00:00 countdown state momentarily
    setPhase('freeze');

    const scheduleStep = (delayMs: number, nextPhase: RevealPhase, markCompleted = false) => {
      const id = window.setTimeout(() => {
        if (markCompleted) {
          sequenceCompleted = true;
        }
        setPhase(nextPhase);
      }, delayMs);
      timeoutsRef.current.push(id);
    };

    const tClear = FREEZE_DURATION_MS;
    const tDarkHold = tClear + CLEAR_DURATION_MS;
    const tSpeedZoom = tDarkHold + DARK_HOLD_DURATION_MS;
    const tSettle = tSpeedZoom + SPEED_ZOOM_DURATION_MS;
    const tReveal = tSettle + SETTLE_DURATION_MS;

    // 2. Clear existing countdown section elements completely
    scheduleStep(tClear, 'clearing');
    // 3. Exact 1-second dark hold
    scheduleStep(tDarkHold, 'dark-hold');
    // 4. Unified environmental forward speed-zoom + progressive dark-to-light transformation
    scheduleStep(tSpeedZoom, 'speed-zoom');
    // 5. Light-theme stabilization before text reveal
    scheduleStep(tSettle, 'settling');
    // 6 & 7. Final launch text reveal & functional CTA buttons
    scheduleStep(tReveal, 'revealed', true);

    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
      if (!sequenceCompleted) {
        hasTriggeredSequenceRef.current = false;
      }
    };
  }, [release.isReleased, release.justReleased, prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const isCountdownActive = phase === 'counting' || phase === 'freeze' || phase === 'clearing';
  const isClearing = phase === 'clearing';
  const isCleared = !isCountdownActive;
  const isSpeedZoom = phase === 'speed-zoom';
  const isLightThemeSettled = phase === 'settling' || phase === 'revealed';

  const horizonY = useTransform(
    scrollYProgress,
    [0, 1],
    allowParallax && isCountdownActive ? [-28, 28] : [0, 0]
  );
  const horizonOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    allowParallax && isCountdownActive ? [0.7, 1, 0.85] : [1, 1, 1]
  );

  // Freeze strictly at 00 when countdown completes
  const displayDays = phase === 'counting' ? padUnit(release.days) : '00';
  const displayHours = phase === 'counting' ? padUnit(release.hours) : '00';
  const displayMinutes = phase === 'counting' ? padUnit(release.minutes) : '00';
  const displaySeconds = phase === 'counting' ? padUnit(release.seconds) : '00';

  const units = [
    { label: 'Days', value: displayDays },
    { label: 'Hours', value: displayHours },
    { label: 'Minutes', value: displayMinutes },
    { label: 'Seconds', value: displaySeconds },
  ];

  const handleDownloadClick = () => {
    if (onOpenDownloadModal) {
      onOpenDownloadModal();
      return;
    }
    onScrollToDownload();
  };

  return (
    <section
      ref={sectionRef}
      id="launch-countdown"
      aria-label={isLightThemeSettled ? 'ZenterPrime 7.4 Official Launch' : 'ZenterPrime 7.4 Launch Countdown'}
      className={`relative overflow-hidden w-full flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y ${
        isLightThemeSettled
          ? 'bg-white text-slate-900 border-[#E5E7EB]'
          : 'bg-[#08090E] text-white border-white/10'
      }`}
    >
      {/* Dark Environment Layers (rush forward & fade out cleanly during speed-zoom) */}
      {!isLightThemeSettled && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 origin-center"
            style={
              isSpeedZoom
                ? undefined
                : {
                    y: horizonY,
                    opacity: isClearing || phase === 'dark-hold' ? 0.35 : horizonOpacity,
                  }
            }
            initial={isSpeedZoom ? { scale: 1, opacity: 0.35 } : false}
            animate={isSpeedZoom ? { scale: 2.35, opacity: 0 } : undefined}
            transition={
              isSpeedZoom
                ? { duration: SPEED_ZOOM_DURATION_MS / 1000, ease: EASE_SPEED_ZOOM }
                : undefined
            }
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 75% 55% at 50% 0%, rgba(67, 56, 202, 0.28) 0%, rgba(217, 119, 6, 0.08) 45%, rgba(8, 9, 14, 0) 78%)',
              }}
            />
          </motion.div>

          <motion.div
            aria-hidden="true"
            animate={isSpeedZoom ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: SPEED_ZOOM_DURATION_MS / 1000, ease: EASE_SPEED_ZOOM }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent"
          />

          <motion.div
            aria-hidden="true"
            animate={isSpeedZoom ? { scale: 1.8, opacity: 0 } : undefined}
            transition={
              isSpeedZoom
                ? { duration: SPEED_ZOOM_DURATION_MS / 1000, ease: EASE_SPEED_ZOOM }
                : undefined
            }
            className="countdown-grain pointer-events-none absolute inset-0 origin-center"
          />
        </>
      )}

      {/* Environmental Speed-Zoom & Progressive Dark-to-Light Transformation (zero box scaling) */}
      {isSpeedZoom && (
        <>
          {/* 1. Full-bleed environment progressive luminance shift (never scaled as a box) */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.14, 0.82, 1] }}
            transition={{
              duration: SPEED_ZOOM_DURATION_MS / 1000,
              times: [0, 0.28, 0.72, 1],
              ease: EASE_SPEED_ZOOM,
            }}
            className="pointer-events-none absolute inset-0 bg-white"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 75% 55% at 50% 0%, rgba(67, 56, 202, 0.045) 0%, rgba(255, 255, 255, 0) 75%)',
            }}
          />

          {/* 2. Forward depth expansion: feathered radial light rush passing through the viewport */}
          <motion.div
            aria-hidden="true"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 2.8, opacity: [0, 0.75, 0.9, 0] }}
            transition={{
              duration: SPEED_ZOOM_DURATION_MS / 1000,
              times: [0, 0.3, 0.65, 1],
              ease: EASE_SPEED_ZOOM,
            }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center origin-center"
          >
            <div
              className="w-[120vmax] h-[120vmax] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.92) 0%, rgba(238, 242, 255, 0.52) 26%, rgba(99, 102, 241, 0.14) 48%, rgba(255, 255, 255, 0) 70%)',
              }}
            />
          </motion.div>

          {/* 3. Subtle circular optical depth rings sweeping past camera */}
          <motion.div
            aria-hidden="true"
            initial={{ scale: 0.45, opacity: 0 }}
            animate={{ scale: 2.4, opacity: [0, 0.38, 0] }}
            transition={{
              duration: SPEED_ZOOM_DURATION_MS / 1000,
              times: [0, 0.35, 1],
              ease: EASE_SPEED_ZOOM,
            }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center origin-center"
          >
            <div className="w-[70vmax] h-[70vmax] rounded-full border border-indigo-300/30" />
          </motion.div>
        </>
      )}

      {/* Settled Light Theme Subtle Radial Surface */}
      {isLightThemeSettled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 55% at 50% 0%, rgba(67, 56, 202, 0.045) 0%, rgba(255, 255, 255, 0) 75%)',
          }}
        />
      )}

      {/* Single-cell CSS grid locks the exact section height and width across countdown, dark hold, speed-zoom, and launched states */}
      <div className="w-full max-w-[1120px] mx-auto relative z-10 grid grid-cols-1 items-center justify-items-center">
        {/* LAYER 1: Countdown structure (interactive while active; invisible height/width footprint afterwards) */}
        <div
          aria-hidden={isCleared}
          className={`col-start-1 row-start-1 w-full flex flex-col items-center justify-center text-center ${
            isCleared ? 'invisible pointer-events-none select-none' : ''
          }`}
        >
          {/* Top Metadata Bar */}
          <motion.div
            initial={prefersReducedMotion || isCleared ? false : { opacity: 0, y: 14 }}
            whileInView={isClearing || isCleared ? undefined : { opacity: 1, y: 0 }}
            animate={isClearing || isCleared ? { opacity: 0, y: -16, scale: 0.97 } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              isCleared
                ? { duration: 0 }
                : isClearing
                ? { duration: 0.38, ease: EASE_CLEAR }
                : { duration: 0.5, ease: EASE_CINEMATIC }
            }
            className="w-full max-w-4xl flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pb-6 mb-8 sm:mb-10 border-b border-white/10 text-xs text-slate-400 text-center"
          >
            <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Launch: 31 December 2026, 00:00 IST</span>
            </span>
            <span aria-hidden="true" className="text-slate-600 hidden sm:inline">
              ·
            </span>
            <span className="tabular-nums text-slate-400">{release.istCurrentFormatted}</span>
          </motion.div>

          {/* Status Kicker */}
          <motion.div
            initial={prefersReducedMotion || isCleared ? false : { opacity: 0, y: 14 }}
            whileInView={isClearing || isCleared ? undefined : { opacity: 1, y: 0 }}
            animate={isClearing || isCleared ? { opacity: 0, y: -18, scale: 0.95 } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              isCleared
                ? { duration: 0 }
                : isClearing
                ? { duration: 0.4, delay: 0.02, ease: EASE_CLEAR }
                : { duration: 0.5, delay: 0.06, ease: EASE_CINEMATIC }
            }
            className="mb-4 flex items-center justify-center gap-3 text-xs sm:text-sm tracking-[0.22em] uppercase text-amber-400 font-semibold"
          >
            <span className="h-[1px] w-6 sm:w-8 bg-amber-400/50" aria-hidden="true" />
            <span id="launch-status-label">Coming Soon</span>
            <span className="h-[1px] w-6 sm:w-8 bg-amber-400/50" aria-hidden="true" />
          </motion.div>

          {/* Cinematic Headline */}
          <motion.div
            initial={prefersReducedMotion || isCleared ? false : { opacity: 0, y: 20, scale: 0.975 }}
            whileInView={isClearing || isCleared ? undefined : { opacity: 1, y: 0, scale: 1 }}
            animate={isClearing || isCleared ? { opacity: 0, y: -22, scale: 0.93 } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              isCleared
                ? { duration: 0 }
                : isClearing
                ? { duration: 0.42, delay: 0.04, ease: EASE_CLEAR }
                : { duration: 0.6, delay: 0.12, ease: EASE_CINEMATIC }
            }
            className="mb-8 sm:mb-12 text-center w-full"
          >
            <div className="countdown-lovelo text-[clamp(2rem,6vw,3.75rem)] uppercase tracking-[0.04em] text-white leading-none">
              ZENTERPRIME 7.4
            </div>
          </motion.div>

          {/* Centered 4-Unit Countdown Grid */}
          <div
            className="w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-9 sm:mb-12"
            role="timer"
            aria-live="off"
          >
            {units.map((unit, idx) => (
              <CountdownUnitCard
                key={unit.label}
                label={unit.label}
                value={unit.value}
                index={idx}
                prefersReducedMotion={prefersReducedMotion}
                isClearing={isClearing}
                isCleared={isCleared}
              />
            ))}
          </div>

          {/* Pre-Release CTAs */}
          <motion.div
            initial={prefersReducedMotion || isCleared ? false : { opacity: 0, y: 14 }}
            whileInView={isClearing || isCleared ? undefined : { opacity: 1, y: 0 }}
            animate={isClearing || isCleared ? { opacity: 0, y: 24, scale: 0.95 } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              isCleared
                ? { duration: 0 }
                : isClearing
                ? { duration: 0.42, delay: 0.12, ease: EASE_CLEAR }
                : { duration: 0.55, delay: 0.36, ease: EASE_CINEMATIC }
            }
            className="w-full max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
          >
            <button
              type="button"
              tabIndex={isCleared ? -1 : undefined}
              onClick={onExplorePricing}
              className="primary-btn w-full sm:w-auto min-h-[46px] px-7 py-3 rounded-[8px] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Reserve License Early</span>
              <ArrowDownRight className="w-4 h-4 shrink-0" />
            </button>
            <a
              href={TRIAL_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isCleared ? -1 : undefined}
              className="w-full sm:w-auto min-h-[46px] px-7 py-3 rounded-[8px] border border-white/15 bg-white/5 hover:bg-white/10 text-slate-200 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <span>Try 14-Day Web Preview</span>
              <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
            </a>
          </motion.div>
        </div>

        {/* LAYER 2: FINAL LIGHT-THEME LAUNCH REVEAL (centered in the exact same section footprint) */}
        {phase === 'revealed' && (
          <div className="col-start-1 row-start-1 z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center py-2 sm:py-6">
            {/* "Finally" — appears first with a subtle entrance animation */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.04, ease: EASE_CINEMATIC }}
              className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase text-[#4338ca] mb-3 sm:mb-4"
            >
              Finally
            </motion.p>

            {/* "WE'RE LIVE" — dominant visual element with polished reveal motion */}
            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22, scale: 0.965 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.68, delay: 0.18, ease: EASE_CINEMATIC }}
              className="launch-live-headline text-[clamp(2.65rem,8vw,5.25rem)] tracking-tight text-slate-950 leading-[1.02] mb-4 sm:mb-5 text-balance"
            >
              WE&apos;RE LIVE
            </motion.h2>

            {/* "Meet ZenterPrime 7.4" */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.56, delay: 0.34, ease: EASE_CINEMATIC }}
              className="text-lg sm:text-2xl font-medium text-slate-900 tracking-tight mb-3"
            >
              Meet ZenterPrime 7.4
            </motion.p>

            {/* Description */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.46, ease: EASE_CINEMATIC }}
              className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2"
            >
              Accounting, inventory and business management — built to make everyday business operations simpler.
            </motion.p>

            {/* Functional Primary & Secondary CTA Buttons */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.56, delay: 0.58, ease: EASE_CINEMATIC }}
              className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
            >
              <button
                id="btn-launch-live-download"
                type="button"
                onClick={handleDownloadClick}
                className="primary-btn w-full sm:w-auto min-h-[46px] px-7 py-3 rounded-[8px] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Download ZenterPrime</span>
              </button>

              <a
                id="btn-launch-live-trial"
                href={TRIAL_WEB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-btn w-full sm:w-auto min-h-[46px] px-7 py-3 rounded-[8px] text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Explore Trial Access</span>
                <ExternalLink className="w-4 h-4 text-slate-500 shrink-0" />
              </a>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LaunchCountdown;
