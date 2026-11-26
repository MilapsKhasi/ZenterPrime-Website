import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useMotionProfile } from '../hooks/useMotionProfile';

interface HeroProps {
  isReleased?: boolean;
  onGetStarted?: () => void;
  onViewCountdown?: () => void;
}

const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HERO_LEAD_WORDS = ['Faster', 'accounting', 'for'];
const HERO_ACCENT_WORDS = ['Retail', 'Shopkeepers'];

export const Hero: React.FC<HeroProps> = ({
  isReleased = false,
  onGetStarted,
  onViewCountdown,
}) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion, allowParallax } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const screenshotY = useTransform(scrollYProgress, [0, 1], allowParallax ? [0, -32] : [0, 0]);
  const screenshotScale = useTransform(scrollYProgress, [0, 1], allowParallax ? [1, 0.985] : [1, 1]);
  const glowY = useTransform(scrollYProgress, [0, 1], allowParallax ? [0, 38] : [0, 0]);

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 bg-[#F9F9F9] overflow-hidden"
    >
      {/* Background ambient glow with restrained scroll depth */}
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[350px] bg-gradient-to-b from-purple-100/50 via-indigo-50/20 to-transparent blur-3xl pointer-events-none"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Text Content */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04, ease: EASE_CINEMATIC }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-xs sm:text-sm font-medium mb-6 shadow-sm"
          >
            <Zap className="w-4 h-4 text-purple-600" />
            <span>
              {isReleased
                ? 'ZenterPrime v7.4 Desktop — Released & Available Offline'
                : 'ZenterPrime 7.4 Desktop — Launching 31 Dec 2026 (IST)'}
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
            {HERO_LEAD_WORDS.map((word, idx) => (
              <span key={word} className="inline-block overflow-hidden align-bottom mr-[0.26em]">
                <motion.span
                  className="inline-block"
                  initial={prefersReducedMotion ? false : { y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.1 + idx * 0.07,
                    ease: EASE_CINEMATIC,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="text-[#4338ca] inline-block">
              {HERO_ACCENT_WORDS.map((word, idx) => (
                <span
                  key={word}
                  className={`inline-block overflow-hidden align-bottom ${
                    idx === 0 ? 'mr-[0.26em]' : ''
                  }`}
                >
                  <motion.span
                    className="inline-block"
                    initial={prefersReducedMotion ? false : { y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.68,
                      delay: 0.31 + idx * 0.075,
                      ease: EASE_CINEMATIC,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.42, ease: EASE_CINEMATIC }}
            className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Lightning-fast party ledgers, automated GSTR-1 returns, instant inventory tracking, and secure offline SQLite storage built for modern businesses.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5, ease: EASE_CINEMATIC }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={isReleased ? onGetStarted : onViewCountdown}
              className="primary-btn w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-white font-semibold text-sm sm:text-base transition-all duration-200 gap-2 cursor-pointer"
            >
              <span>{isReleased ? 'Download for Desktop' : 'View Launch Countdown'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-6 text-xs text-gray-500 font-medium pt-2 sm:pt-0">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Trial
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#4338ca]" /> 100% Secure & Private
              </span>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Landscape Screenshot Container with layered entrance & restrained parallax */}
        <motion.div
          style={{ y: screenshotY, scale: screenshotScale }}
          className="w-full max-w-[1240px] mx-auto"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.965 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.32, ease: EASE_CINEMATIC }}
            id="screenshot-5-container"
            className="w-full rounded-xl overflow-hidden bg-white"
            style={{
              borderWidth: '0.5px',
              borderStyle: 'solid',
              borderColor: '#d9d9d9',
            }}
          >
            <img
              src="/Screenshot (594).png"
              alt="ZenterPrime Desktop Executive Summary"
              className="w-full h-auto object-cover block"
              onError={(e) => {
                // Fallback visual display if local asset path isn't bundled directly in the preview server webroot
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `
                    <div class="p-12 text-center bg-gray-50 text-gray-500">
                      <p class="font-semibold text-gray-700 mb-1">ZenterPrime Desktop Executive Summary</p>
                      <p class="text-xs text-gray-400">Please place <code class="bg-gray-200 px-1 py-0.5 rounded">Screenshot (594).png</code> inside your public assets folder.</p>
                    </div>
                  `;
                }
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
