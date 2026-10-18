import React from 'react';
import { Download, Check, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { DOWNLOAD_EXE_URL } from './Modals';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const trialUrl = "https://zenterprime.vercel.app";

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = DOWNLOAD_EXE_URL;
    link.download = 'ZenterPrime.Setup.7.4.0.exe';
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
    <section id="hero-section" className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 bg-[#0b0f19] text-white border-b border-violet-900/30 overflow-hidden">
      
      {/* Cinematic Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-violet-600/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none animate-cinematic-glow -z-10" />
      <div className="absolute top-40 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Text & Badges Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/80 border border-violet-500/30 text-violet-300 text-xs font-semibold tracking-wide uppercase mb-6 shadow-inner shadow-violet-500/20"
          >
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            ZenterPrime 7.4 • Enterprise Release
          </motion.div>

          <motion.h1 
            id="hero-headline-main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.12]"
          >
            Cinematic Speed & Precision <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 font-semibold">
              for Retail Shopkeepers
            </span>
          </motion.h1>
          
          <motion.p 
            id="hero-supporting-text"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-normal mt-6 leading-relaxed max-w-2xl"
          >
            Instant GST billing, live stock control, party ledgers, and cashbook operating with lightning speed on your shop PC.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-10 w-full sm:w-auto"
          >
            <button
              id="hero-btn-download-beta"
              onClick={handleDownload}
              className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-7 py-3.5 text-sm font-bold rounded-xl shadow-xl shadow-violet-900/50 border border-violet-400/30 inline-flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
            >
              <span>Download for Windows (7.4)</span>
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </button>

            <a
              id="hero-btn-web-trial"
              href={trialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 px-7 py-3.5 text-sm font-semibold rounded-xl text-center cursor-pointer transition-all inline-flex items-center justify-center hover:text-white"
            >
              <span>14-days Free Live Trial</span>
            </a>
          </motion.div>

          {/* 4 Feature Tags */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-3xl"
          >
            {featureBadges.map((badge) => (
              <div 
                key={badge.title}
                className="bg-slate-900/80 backdrop-blur-md border border-emerald-500/60 rounded-xl px-4 py-3 flex items-center justify-between shadow-lg shadow-emerald-950/20"
              >
                <span className="text-xs sm:text-sm font-medium text-slate-200">
                  {badge.title}
                </span>
                <div className="w-4 h-4 rounded-[4px] bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 ml-2 font-bold">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Full-Width Landscape Screenshot Frame with Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          id="screenshot-5-container"
          className="w-full max-w-[1240px] mx-auto rounded-xl overflow-hidden shadow-2xl shadow-black/80 bg-slate-900"
          style={{
            borderWidth: '0.5px',
            borderStyle: 'solid',
            borderColor: '#d9d9d9',
          }}
        >
          <img
            src="https://i.imgur.com/YOUR_IMAGE_LINK_HERE.png" 
            alt="ZenterPrime Desktop Executive Summary"
            className="w-full h-auto object-cover block"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              if (target.parentElement) {
                target.parentElement.innerHTML = `
                  <div class="p-16 text-center bg-slate-900 text-slate-400">
                    <p class="font-semibold text-slate-200 mb-2 text-lg">ZenterPrime Desktop Executive Summary</p>
                    <p class="text-xs text-slate-400">To show your image here instantly without recreation, paste a direct public image link (or Base64 data-URI) into the <code class="bg-slate-800 text-violet-300 px-1.5 py-0.5 rounded">src</code> attribute of Hero.tsx.</p>
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
