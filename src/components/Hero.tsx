import React from 'react';
import { Download, Check, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { ScreenshotFiveScreen } from './ScreenshotFiveScreen';
import { DOWNLOAD_EXE_URL } from './Modals';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const trialUrl = "https://zenterprime.vercel.app";

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = DOWNLOAD_EXE_URL;
    link.download = 'ZenterPrime.Setup.7.3.0.exe';
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const featureBadges = [
    { title: 'Faster Billing' },
    { title: '100% Offline' },
    { title: 'GST Ready' },
    { title: 'Thermal, A4' },
  ];

  return (
    <section id="hero-section" className="pt-10 sm:pt-14 pb-14 sm:pb-18 bg-white border-b border-[#E5E7EB] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Text & Badges Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          
          <motion.h1 
            id="hero-headline-main"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-slate-900 tracking-tight leading-[1.18]"
          >
            Faster Accounting <br className="hidden sm:inline" />
            <span className="text-[#6D28D9]">for Retail Shopkeepers</span>
          </motion.h1>
          
          <motion.p 
            id="hero-supporting-text"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm sm:text-base text-slate-600 font-normal mt-4 leading-relaxed max-w-xl"
          >
            Instant GST billing, live stock control, party ledgers, and cashbook on your shop PC.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 mb-7 w-full sm:w-auto"
          >
            <button
              id="hero-btn-download-beta"
              onClick={handleDownload}
              className="w-full max-w-[240px] sm:w-auto sm:max-w-none bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-[6px] shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Download for Windows</span>
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </button>

            <a
              id="hero-btn-web-trial"
              href={trialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[240px] sm:w-auto sm:max-w-none bg-white hover:bg-[#F9F9FB] border border-[#D1D5DB] text-slate-800 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-[6px] text-center cursor-pointer transition-colors inline-flex items-center justify-center"
            >
              <span>14-days Free Trial</span>
            </a>
          </motion.div>

          {/* 4 Feature Tags with Green Border & Green Checkbox Icon */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl"
          >
            {featureBadges.map((badge) => (
              <div 
                key={badge.title}
                className="bg-white border border-emerald-500 rounded-[8px] px-3.5 py-2.5 flex items-center justify-between shadow-2xs"
              >
                <span className="text-xs sm:text-sm font-medium text-slate-900">
                  {badge.title}
                </span>
                <div className="w-4 h-4 rounded-[3px] bg-emerald-500 text-white flex items-center justify-center shrink-0 ml-2">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Full-Width Landscape Screenshot Frame (No Internal Scroll) */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="w-full max-w-[1240px] mx-auto"
        >
          <ScreenshotFiveScreen />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;

