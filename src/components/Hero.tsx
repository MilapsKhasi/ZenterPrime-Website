import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onGetStarted?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section id="hero-section" className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 bg-[#F9F9F9] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[350px] bg-gradient-to-b from-purple-100/50 via-indigo-50/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Text Content Restored */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-xs sm:text-sm font-medium mb-6 shadow-sm">
            <Zap className="w-4 h-4 text-purple-600 animate-pulse" />
            <span>ZenterPrime v7.4 Desktop — Now Available Offline</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
            Faster accounting for <span className="text-[#4338ca]">Retail Shopkeepers</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Lightning-fast party ledgers, automated GSTR-1 returns, instant inventory tracking, and secure offline SQLite storage built for modern businesses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="primary-btn w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-white font-semibold text-sm sm:text-base transition-all duration-200 gap-2 cursor-pointer"
            >
              <span>Download for Desktop</span>
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
          </div>
        </div>

        {/* Full-Width Landscape Screenshot Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="screenshot-5-container"
          className="w-full max-w-[1240px] mx-auto rounded-xl overflow-hidden bg-white"
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

      </div>
    </section>
  );
};

export default Hero;
