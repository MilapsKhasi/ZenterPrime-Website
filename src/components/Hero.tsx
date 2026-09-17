import React from 'react';
import { Download, ExternalLink, Check, Zap, Shield, FileSpreadsheet, Printer } from 'lucide-react';
import { motion } from 'motion/react';
import AppMockup from './AppMockup';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const trialUrl = "https://zenterprime.vercel.app";

  return (
    <section id="hero-section" className="pt-8 sm:pt-12 pb-14 sm:pb-16 bg-white border-b border-[#E5E7EB] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Text Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold mb-3.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#6D28D9] animate-pulse" />
            <span>ZenterPrime 7.3 Desktop • Offline-First GST Software</span>
          </motion.div>

          <motion.h1 
            id="hero-headline-main"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-tight"
          >
            Fast Retail Accounting <br className="hidden sm:inline" />
            <span className="text-[#6D28D9]">Built for Windows Desktop</span>
          </motion.h1>
          
          <motion.p 
            id="hero-supporting-text"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-sm sm:text-base text-slate-600 font-normal mt-3 max-w-[620px] mx-auto leading-relaxed"
          >
            Instant GST billing, live stock control, party ledgers, and cashbook on your shop PC — zero lag, zero cloud downtime.
          </motion.p>

          {/* Action Buttons Directly Below Description */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.22 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mt-5 mb-6"
          >
            <motion.button
              id="hero-btn-download-beta"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGetStarted}
              className="w-full sm:w-auto bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-[6px] shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer transition-colors text-center"
            >
              <Download className="w-4 h-4" />
              <span>Download for Windows</span>
            </motion.button>
            <motion.a
              id="hero-btn-web-trial"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={trialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white hover:bg-[#F9F9FB] border border-[#E5E7EB] text-slate-800 px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-[6px] text-center cursor-pointer transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>14-Day Web Trial</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </motion.a>
          </motion.div>

          {/* Compact Horizontal Row of 4 Desktop Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-3xl mx-auto"
          >
            <div className="bg-[#FCFCFD] border border-[#E5E7EB] rounded-[6px] p-2.5 flex items-center gap-2 text-left">
              <div className="w-7 h-7 rounded-[4px] bg-purple-50 text-[#6D28D9] flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 leading-tight">Sub-second Speed</span>
                <span className="block text-[11px] text-slate-500 truncate">0ms Cloud Latency</span>
              </div>
            </div>

            <div className="bg-[#FCFCFD] border border-[#E5E7EB] rounded-[6px] p-2.5 flex items-center gap-2 text-left">
              <div className="w-7 h-7 rounded-[4px] bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 leading-tight">100% Offline</span>
                <span className="block text-[11px] text-slate-500 truncate">Local Encrypted DB</span>
              </div>
            </div>

            <div className="bg-[#FCFCFD] border border-[#E5E7EB] rounded-[6px] p-2.5 flex items-center gap-2 text-left">
              <div className="w-7 h-7 rounded-[4px] bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 leading-tight">GST Ready</span>
                <span className="block text-[11px] text-slate-500 truncate">CGST + SGST / IGST</span>
              </div>
            </div>

            <div className="bg-[#FCFCFD] border border-[#E5E7EB] rounded-[6px] p-2.5 flex items-center gap-2 text-left">
              <div className="w-7 h-7 rounded-[4px] bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Printer className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 leading-tight">Thermal &amp; A4</span>
                <span className="block text-[11px] text-slate-500 truncate">Instant Bill Print</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Larger Desktop Screenshot Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="w-full max-w-[1240px] mx-auto mt-4"
        >
          <AppMockup />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
