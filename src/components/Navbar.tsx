import React, { useState } from 'react';
import { Menu, X, RefreshCw, Zap } from 'lucide-react';

export type AppView = 'landing' | 'renew' | 'reactivate';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onScrollTo: (sectionId: string) => void;
  onGetStarted: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  onScrollTo, 
  onGetStarted 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentView !== 'landing') {
      onNavigate('landing');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (sectionId: string) => {
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        onScrollTo(sectionId);
      }, 50);
    } else {
      onScrollTo(sectionId);
    }
  };

  return (
    <header 
      id="main-navbar" 
      className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-none transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Branding */}
          <div className="flex items-center">
            <a 
              id="brand-logo-link" 
              href="#" 
              onClick={handleLogoClick}
              className="flex items-center gap-3 text-decoration-none group select-none cursor-pointer"
            >
              {/* Rounded purple circle with white 'Z' in Fredoka font */}
              <div 
                id="brand-logo-icon" 
                className="w-10 h-10 rounded-full bg-[#3b28cc] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105"
              >
                <span 
                  id="brand-logo-letter" 
                  className="font-fredoka text-white text-2xl font-bold leading-none select-none"
                >
                  Z
                </span>
              </div>

              {/* Branding text 'ZenterPrime' */}
              <div className="flex flex-col">
                <span 
                  id="brand-name-text" 
                  className="text-slate-950 text-xl font-bold tracking-tight leading-tight"
                >
                  ZenterPrime
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">
                  v7.3 DESKTOP
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            <button 
              id="nav-link-features" 
              onClick={() => handleSectionClick('features')}
              className={`text-[14px] font-medium transition-colors cursor-pointer ${
                currentView === 'landing' ? 'text-slate-700 hover:text-[#3b28cc]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Features
            </button>
            <button 
              id="nav-link-pricing" 
              onClick={() => handleSectionClick('pricing')}
              className={`text-[14px] font-medium transition-colors cursor-pointer ${
                currentView === 'landing' ? 'text-slate-700 hover:text-[#3b28cc]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Pricing
            </button>
            <button 
              id="nav-link-renew" 
              onClick={() => onNavigate('renew')}
              className={`text-[14px] font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                currentView === 'renew' 
                  ? 'bg-purple-50 text-[#3b28cc] font-semibold' 
                  : 'text-slate-700 hover:text-[#3b28cc]'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${currentView === 'renew' ? 'text-[#3b28cc]' : 'text-slate-400'}`} />
              <span>Renew License</span>
            </button>
            <button 
              id="nav-link-reactivate" 
              onClick={() => onNavigate('reactivate')}
              className={`text-[14px] font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                currentView === 'reactivate' 
                  ? 'bg-amber-50 text-amber-700 font-semibold' 
                  : 'text-slate-700 hover:text-amber-600'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${currentView === 'reactivate' ? 'text-amber-600' : 'text-slate-400'}`} />
              <span>Reactivate</span>
            </button>
            <button 
              id="nav-link-about" 
              onClick={() => handleSectionClick('about')}
              className={`text-[14px] font-medium transition-colors cursor-pointer ${
                currentView === 'landing' ? 'text-slate-700 hover:text-[#3b28cc]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              About us
            </button>
            <button 
              id="nav-link-get-started" 
              onClick={onGetStarted}
              className="bg-[#3b28cc] hover:bg-[#3120b0] text-white px-5 py-2.5 text-[14px] font-semibold transition-all duration-300 rounded-[8px] shadow-sm inline-flex items-center justify-center cursor-pointer active:scale-95"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-900 p-2 hover:bg-slate-100 transition-colors rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-container" className="lg:hidden border-t border-slate-100 bg-white px-6 py-5 space-y-3 shadow-lg animate-in fade-in duration-200">
          <button 
            id="mobile-nav-link-features" 
            onClick={() => { setMobileMenuOpen(false); handleSectionClick('features'); }}
            className="w-full text-left text-slate-800 hover:text-[#3b28cc] text-base font-medium py-1.5"
          >
            Features
          </button>
          <button 
            id="mobile-nav-link-pricing" 
            onClick={() => { setMobileMenuOpen(false); handleSectionClick('pricing'); }}
            className="w-full text-left text-slate-800 hover:text-[#3b28cc] text-base font-medium py-1.5"
          >
            Pricing
          </button>
          <button 
            id="mobile-nav-link-renew" 
            onClick={() => { setMobileMenuOpen(false); onNavigate('renew'); }}
            className={`w-full text-left text-base font-medium py-2 px-3 rounded-lg flex items-center gap-2 ${
              currentView === 'renew' ? 'bg-purple-50 text-[#3b28cc] font-semibold' : 'text-slate-800 hover:text-[#3b28cc]'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-[#3b28cc]" />
            <span>Renew License (₹499/mo)</span>
          </button>
          <button 
            id="mobile-nav-link-reactivate" 
            onClick={() => { setMobileMenuOpen(false); onNavigate('reactivate'); }}
            className={`w-full text-left text-base font-medium py-2 px-3 rounded-lg flex items-center gap-2 ${
              currentView === 'reactivate' ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-slate-800 hover:text-amber-600'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Reactivate License</span>
          </button>
          <button 
            id="mobile-nav-link-about" 
            onClick={() => { setMobileMenuOpen(false); handleSectionClick('about'); }}
            className="w-full text-left text-slate-800 hover:text-[#3b28cc] text-base font-medium py-1.5"
          >
            About us
          </button>
          <div className="pt-2">
            <button 
              id="mobile-nav-link-get-started" 
              onClick={() => { setMobileMenuOpen(false); onGetStarted(); }}
              className="w-full text-center bg-[#3b28cc] hover:bg-[#3120b0] text-white px-5 py-3 text-base font-semibold rounded-[8px] shadow-sm block cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
