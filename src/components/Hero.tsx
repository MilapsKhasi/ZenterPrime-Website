import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import AppMockup from './AppMockup';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const trialUrl = "https://zenterprime.vercel.app";

  return (
    <section id="hero-section" className="pt-12 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <h1 
            id="hero-headline-main"
            className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-slate-950 tracking-tight leading-[1.18]"
          >
            Just get free, give all accounting to
          </h1>
          <div 
            id="hero-headline-brand"
            className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#3b28cc] tracking-tight leading-[1.18] mt-1 sm:mt-2"
          >
            ZenterPrime 7.3
          </div>
          
          <p className="text-base sm:text-xl text-slate-600 font-normal mt-4 max-w-2xl mx-auto">
            Accounting automation just a click away. Never lose track of your books, hand it to ZenterPrime and relax.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-12 sm:mb-16">
          <button
            id="hero-get-started-btn"
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-[#3b28cc] hover:bg-[#3120b0] text-white px-7 py-3.5 text-base font-semibold rounded-[8px] transition-all duration-300 shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            id="hero-start-trial-btn"
            href={trialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 px-7 py-3.5 text-base font-semibold rounded-[8px] transition-all duration-300 shadow-xs text-center cursor-pointer active:scale-95 inline-flex items-center justify-center gap-2"
          >
            <span>Start 14 days trial</span>
            <ExternalLink className="w-4 h-4 text-slate-500" />
          </a>
        </div>

        {/* App Preview Mockup Window */}
        <div className="w-full max-w-5xl mx-auto">
          <AppMockup />
        </div>

      </div>
    </section>
  );
};
export default Hero;
