import React, { useState, useEffect } from 'react';
import { Menu, X, Download, ShieldCheck } from 'lucide-react';

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      }, 60);
    } else {
      onScrollTo(sectionId);
    }
  };

  return (
    <header 
      id="main-navbar" 
      className={`sticky top-0 z-50 w-full bg-white border-b border-[#E5E7EB] transition-colors ${
        isScrolled ? 'border-[#D1D5DB]' : 'border-[#E5E7EB]'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Left: Logo + ZenterPrime + v7.3 Desktop badge */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              id="brand-logo-link" 
              href="#" 
              onClick={handleLogoClick}
              className="flex items-center gap-3 text-decoration-none select-none cursor-pointer"
            >
              <div 
                id="brand-logo-icon" 
                className="w-9 h-9 rounded-[8px] bg-[#6D28D9] flex items-center justify-center text-white shrink-0 font-fredoka text-xl font-bold"
              >
                Z
              </div>

              <div className="flex items-center gap-2.5">
                <span 
                  id="brand-name-text" 
                  className="text-slate-900 text-lg font-bold tracking-tight"
                >
                  ZenterPrime
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-[#F3F4F6] text-slate-700 border border-[#E5E7EB]">
                  v7.3 Desktop
                </span>
              </div>
            </a>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            <button 
              id="nav-link-features" 
              onClick={() => handleSectionClick('features')}
              className="text-[14px] font-medium text-slate-700 hover:text-[#6D28D9] transition-colors cursor-pointer"
            >
              Features
            </button>
            <button 
              id="nav-link-gst-billing" 
              onClick={() => handleSectionClick('gst-billing')}
              className="text-[14px] font-medium text-slate-700 hover:text-[#6D28D9] transition-colors cursor-pointer"
            >
              GST Billing
            </button>
            <button 
              id="nav-link-pricing" 
              onClick={() => handleSectionClick('pricing')}
              className="text-[14px] font-medium text-slate-700 hover:text-[#6D28D9] transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button 
              id="nav-link-license" 
              onClick={() => handleSectionClick('pricing')}
              className="text-[14px] font-medium text-slate-700 hover:text-[#6D28D9] transition-colors cursor-pointer"
            >
              License
            </button>
            <button 
              id="nav-link-support" 
              onClick={() => handleSectionClick('faq')}
              className="text-[14px] font-medium text-slate-700 hover:text-[#6D28D9] transition-colors cursor-pointer"
            >
              Support
            </button>
          </nav>

          {/* Right Side: Reactivate Existing License Link + Download Button */}
          <div className="hidden sm:flex items-center gap-5">
            <button
              id="nav-link-activate-license"
              onClick={() => onNavigate('reactivate')}
              className="text-[14px] font-medium text-slate-700 hover:text-[#6D28D9] transition-colors cursor-pointer"
            >
              Reactivate Existing License
            </button>

            <button 
              id="nav-btn-download-windows" 
              onClick={onGetStarted}
              className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-4 py-2 text-[14px] font-medium transition-colors rounded-[6px] border border-transparent inline-flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Download</span>
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-800 p-2 hover:bg-slate-100 transition-colors rounded-[6px] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-container" className="lg:hidden border-t border-[#E5E7EB] bg-white px-5 py-4 space-y-3">
          <button 
            id="mobile-nav-link-features" 
            onClick={() => { setMobileMenuOpen(false); handleSectionClick('features'); }}
            className="w-full text-left text-slate-800 hover:text-[#6D28D9] text-sm font-medium py-1.5"
          >
            Features
          </button>
          <button 
            id="mobile-nav-link-gst-billing" 
            onClick={() => { setMobileMenuOpen(false); handleSectionClick('gst-billing'); }}
            className="w-full text-left text-slate-800 hover:text-[#6D28D9] text-sm font-medium py-1.5"
          >
            GST Billing
          </button>
          <button 
            id="mobile-nav-link-pricing" 
            onClick={() => { setMobileMenuOpen(false); handleSectionClick('pricing'); }}
            className="w-full text-left text-slate-800 hover:text-[#6D28D9] text-sm font-medium py-1.5"
          >
            Pricing
          </button>
          <button 
            id="mobile-nav-link-download" 
            onClick={() => { setMobileMenuOpen(false); handleSectionClick('download'); }}
            className="w-full text-left text-slate-800 hover:text-[#6D28D9] text-sm font-medium py-1.5"
          >
            Download
          </button>
          <button 
            id="mobile-nav-link-support" 
            onClick={() => { setMobileMenuOpen(false); handleSectionClick('faq'); }}
            className="w-full text-left text-slate-800 hover:text-[#6D28D9] text-sm font-medium py-1.5"
          >
            Support
          </button>

          <div className="pt-2 border-t border-[#E5E7EB] space-y-2">
            <button 
              id="mobile-nav-link-activate" 
              onClick={() => { setMobileMenuOpen(false); onNavigate('reactivate'); }}
              className="w-full text-left text-sm font-medium text-slate-700 py-1.5"
            >
              Reactivate Existing License
            </button>
            <button 
              id="mobile-nav-btn-download" 
              onClick={() => { setMobileMenuOpen(false); onGetStarted(); }}
              className="w-full text-center bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-4 py-2.5 text-sm font-medium rounded-[6px] block cursor-pointer"
            >
              Download for Windows
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
