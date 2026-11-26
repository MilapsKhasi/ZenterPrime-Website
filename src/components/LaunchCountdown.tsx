import React, { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Download, ArrowDownRight, ShieldCheck, ExternalLink, Clock } from 'lucide-react';
import { RELEASE_CONFIG, triggerReleaseDownload } from '../config/releaseConfig';
import { ReleaseStatusState } from '../hooks/useReleaseStatus';
import { useMotionProfile } from '../hooks/useMotionProfile';

interface LaunchCountdownProps {
  release: ReleaseStatusState;
  onExplorePricing: () => void;
  onScrollToDownload: () => void;
}

const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
const padUnit = (value: number): string => String(value).padStart(2, '0');

interface CountdownUnitCardProps {
  label: string;
  value: string;
  index: number;
  prefersReducedMotion: boolean;
}

/**
 * Memoized unit monolith so static units (Days/Hours/Minutes) do not re-render
 * every time Seconds updates.
 */
const CountdownUnitCard = React.memo<CountdownUnitCardProps>(
  ({ label, value, index, prefersReducedMotion }) => (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: 0.18 + index * 0.065,
        ease: EASE_CINEMATIC,
      }}
      className="relative rounded-[10px] bg-gradient-to-b from-[#141724] to-[#0B0D14] border border-white/12 px-4 py-6 sm:py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      <div className="countdown-display tabular-nums text-5xl sm:text-6xl lg:text-[4.75rem] font-normal tracking-tight text-white leading-none select-none">
        <span>{value}</span>
      </div>
      <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">
        {label}
      </div>
    </motion.div>
  )
);

CountdownUnitCard.displayName = 'CountdownUnitCard';

export const LaunchCountdown: React.FC<LaunchCountdownProps> = ({
  release,
  onExplorePricing,
  onScrollToDownload,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion, allowParallax } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const horizonY = useTransform(scrollYProgress, [0, 1], allowParallax ? [-28, 28] : [0, 0]);
  const horizonOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    allowParallax ? [0.7, 1, 0.85] : [1, 1, 1]
  );

  const units = [
    { label: 'Days', value: padUnit(release.days) },
    { label: 'Hours', value: padUnit(release.hours) },
    { label: 'Minutes', value: padUnit(release.minutes) },
    { label: 'Seconds', value: padUnit(release.seconds) },
  ];

  return (
    <section
      ref={sectionRef}
      id="launch-countdown"
      aria-label="ZenterPrime 7.4 Launch Countdown"
      className="relative overflow-hidden bg-[#08090E] text-white border-y border-white/10 py-16 sm:py-24"
    >
      {/* Subtle cinematic twilight horizon glow with restrained GPU scroll depth */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          y: horizonY,
          opacity: horizonOpacity,
          background:
            'radial-gradient(ellipse 75% 55% at 50% 0%, rgba(67, 56, 202, 0.28) 0%, rgba(217, 119, 6, 0.08) 45%, rgba(8, 9, 14, 0) 78%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent"
      />
      <div aria-hidden="true" className="countdown-grain pointer-events-none absolute inset-0" />

      {/* Subtle cinema letterbox hairline framing */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Metadata Bar */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pb-6 mb-10 border-b border-white/10 text-xs text-slate-400 text-center"
        >
          <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Launch: 31 December 2026, 00:00 IST</span>
          </span>
          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
          <span className="tabular-nums text-slate-400">{release.istCurrentFormatted}</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {!release.isReleased ? (
            <motion.div
              key="countdown-active"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
              className="max-w-5xl mx-auto text-center"
            >
              {/* Status Kicker */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.06, ease: EASE_CINEMATIC }}
                className="mb-4 flex items-center justify-center gap-3 text-xs sm:text-sm tracking-[0.22em] uppercase text-amber-400 font-semibold"
              >
                <span className="h-[1px] w-8 bg-amber-400/50" aria-hidden="true" />
                <span id="launch-status-label">Coming Soon</span>
                <span className="h-[1px] w-8 bg-amber-400/50" aria-hidden="true" />
              </motion.div>

              {/* Cinematic Headline */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.975 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.12, ease: EASE_CINEMATIC }}
                className="mb-10 sm:mb-12 text-center"
              >
                <div className="countdown-lovelo text-4xl sm:text-5xl lg:text-6xl uppercase tracking-[0.04em] text-white leading-none">
                  ZENTERPRIME 7.4
                </div>
              </motion.div>

              {/* Monumental 4-Unit Countdown Grid */}
              <div
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-4xl mx-auto mb-10 sm:mb-12"
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
                  />
                ))}
              </div>

              {/* Pre-Release CTAs (No download button exposed) */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.36, ease: EASE_CINEMATIC }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <button
                  type="button"
                  onClick={onExplorePricing}
                  className="primary-btn w-full sm:w-auto px-7 py-3.5 rounded-[8px] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Reserve License Early</span>
                  <ArrowDownRight className="w-4 h-4" />
                </button>
                <a
                  href="https://zenterprime.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-[8px] border border-white/15 bg-white/5 hover:bg-white/10 text-slate-200 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Try 14-Day Web Preview</span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="countdown-released"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
              className="max-w-4xl mx-auto text-center py-4"
            >
              {/* Released Status Kicker */}
              <div className="mb-4 flex items-center justify-center gap-3 text-xs sm:text-sm tracking-[0.22em] uppercase text-emerald-400 font-semibold">
                <span className="h-[1px] w-8 bg-emerald-400/50" aria-hidden="true" />
                <span id="launch-status-label">Released</span>
                <span className="h-[1px] w-8 bg-emerald-400/50" aria-hidden="true" />
              </div>

              <div className="mb-5 text-center">
                <div className="countdown-lovelo text-4xl sm:text-5xl lg:text-6xl uppercase tracking-[0.04em] text-white leading-none mb-2.5 sm:mb-3">
                  ZENTERPRIME 7.4
                </div>
                <div className="text-lg sm:text-2xl lg:text-[1.75rem] font-normal tracking-normal text-slate-100 leading-snug">
                  Official Release — Now Live
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
                The wait is over. ZenterPrime {RELEASE_CONFIG.version} Desktop for Windows is officially released and ready for offline installation.
              </p>

              {/* Primary Released Download CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  id="btn-launch-released-download"
                  type="button"
                  onClick={triggerReleaseDownload}
                  className="primary-btn w-full sm:w-auto px-8 py-3.5 rounded-[8px] text-white text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download ZenterPrime 7.4</span>
                </button>
                <button
                  type="button"
                  onClick={onScrollToDownload}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-[8px] border border-white/15 bg-white/5 hover:bg-white/10 text-slate-200 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Installer Specs &amp; SHA-256</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LaunchCountdown;
