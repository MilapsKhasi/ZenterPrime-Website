import React, { useState, useEffect } from 'react';
import { Navbar, AppView } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturesSection } from './components/FeaturesSection';
import { PricingSection, PlanDetails, PLANS } from './components/PricingSection';
import { AboutSection } from './components/AboutSection';
import { RenewLicense } from './components/RenewLicense';
import { ReactivateLicense } from './components/ReactivateLicense';
import { Modals, ModalType, DOWNLOAD_EXE_URL, TRIAL_WEB_URL } from './components/Modals';
import { createSupabaseLicense } from './lib/supabase';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails>(PLANS.blue);
  const [successData, setSuccessData] = useState<{
    email: string;
    plan: PlanDetails;
    licenseKey: string;
    expiry?: string;
  } | null>(null);

  // Sync with browser URL / hash for direct route access like /renew or #renew
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path === '/renew' || hash === '#renew' || hash === '#/renew') {
        setCurrentView('renew');
      } else if (path === '/reactivate' || hash === '#reactivate' || hash === '#/reactivate') {
        setCurrentView('reactivate');
      } else {
        setCurrentView('landing');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    if (view === 'renew') {
      window.history.pushState(null, '', '#renew');
    } else if (view === 'reactivate') {
      window.history.pushState(null, '', '#reactivate');
    } else {
      window.history.pushState(null, '', window.location.pathname.replace(/\/renew|\/reactivate/g, '') || '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll handler
  const handleScrollTo = (sectionId: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      window.history.pushState(null, '', '/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Plan selection from Pricing section -> opens Checkout Popup Modal
  const handleSelectPlan = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setActiveModal('checkout');
  };

  // Payment success handler -> inserts into Supabase 'licenses' table & downloads installer
  const handlePaymentSuccess = async (email: string, plan: PlanDetails) => {
    const isMonthly = plan.id === 'monthly';
    
    // Insert into Supabase table 'licenses'
    const result = await createSupabaseLicense(email, plan.name, isMonthly);

    const licenseKey = result.data?.license_id || `ZP-730-KEY-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const expiry = result.data?.expiry || (isMonthly ? 'End of Current Month' : 'LIFETIME');

    setSuccessData({
      email,
      plan,
      licenseKey,
      expiry,
    });
    
    setActiveModal('license-success');

    // Automatically trigger installer download on user's computer
    try {
      const link = document.createElement('a');
      link.href = DOWNLOAD_EXE_URL;
      link.setAttribute('download', 'ZenterPrime.Setup.7.3.0.exe');
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.log('Automated download trigger error:', e);
    }
  };

  return (
    <div id="page-wrapper" className="min-h-screen bg-[#f8f8fc] flex flex-col text-slate-900 selection:bg-[#3b28cc]/20 selection:text-[#3b28cc]">
      
      {/* 1. Sticky Navbar */}
      <Navbar 
        currentView={currentView}
        onNavigate={navigateTo}
        onScrollTo={handleScrollTo}
        onGetStarted={() => {
          if (currentView !== 'landing') {
            navigateTo('landing');
            setTimeout(() => handleScrollTo('pricing'), 100);
          } else {
            handleScrollTo('pricing');
          }
        }}
      />

      {/* Main Dynamic View System */}
      <main className="flex-1">
        
        {/* RENEW VIEW (/renew) */}
        {currentView === 'renew' && (
          <RenewLicense 
            onBackToHome={() => navigateTo('landing')}
            onNavigateToPricing={() => {
              navigateTo('landing');
              setTimeout(() => handleScrollTo('pricing'), 100);
            }}
          />
        )}

        {/* REACTIVATE VIEW (/reactivate) */}
        {currentView === 'reactivate' && (
          <ReactivateLicense 
            onBackToHome={() => navigateTo('landing')}
            onNavigateToPricing={() => {
              navigateTo('landing');
              setTimeout(() => handleScrollTo('pricing'), 100);
            }}
            onContactSupport={() => setActiveModal('contact')}
          />
        )}

        {/* LANDING PAGE VIEW */}
        {currentView === 'landing' && (
          <>
            {/* 2. Hero Section */}
            <Hero 
              onGetStarted={() => handleScrollTo('pricing')}
            />

            {/* 3. Features Section */}
            <FeaturesSection 
              onSelectFeature={(featureKey) => {
                if (featureKey === 'summary') setActiveModal('feature-summary');
                if (featureKey === 'inventory') setActiveModal('feature-inventory');
                if (featureKey === 'restore') setActiveModal('feature-restore');
              }}
            />

            {/* 4. Pricing Section (Clicking Get Started triggers the Checkout Modal) */}
            <PricingSection 
              onSelectPlan={handleSelectPlan}
            />

            {/* 5. About Section */}
            <AboutSection 
              onRequestDemo={() => setActiveModal('demo')}
              onContactUs={() => setActiveModal('contact')}
            />
          </>
        )}

      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3b28cc] flex items-center justify-center text-white font-fredoka font-bold text-sm">
                Z
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-sm">ZenterPrime 7.3 Desktop</span>
                <span className="text-xs text-slate-500">Fast, local-first accounting &amp; billing for Windows</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-600">
              <a 
                href={TRIAL_WEB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#3b28cc] transition-colors cursor-pointer"
              >
                14-Day Web Trial
              </a>
              <button 
                onClick={() => {
                  navigateTo('landing');
                  setTimeout(() => handleScrollTo('pricing'), 100);
                }} 
                className="hover:text-[#3b28cc] transition-colors cursor-pointer"
              >
                Pricing Plans
              </button>
              <button 
                onClick={() => navigateTo('renew')} 
                className="hover:text-[#3b28cc] transition-colors cursor-pointer"
              >
                Renew License (₹499/mo)
              </button>
              <button 
                onClick={() => navigateTo('reactivate')} 
                className="hover:text-[#3b28cc] transition-colors cursor-pointer"
              >
                Reactivate License
              </button>
              <button 
                onClick={() => setActiveModal('contact')} 
                className="hover:text-[#3b28cc] transition-colors cursor-pointer"
              >
                Contact Support
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>&copy; {new Date().getFullYear()} ZenterPrime Solutions. Connected to Supabase Cloud Database.</span>
            <span>All transactions 256-bit SSL secured.</span>
          </div>
        </div>
      </footer>

      {/* Modals & Popups (including Checkout Popup & Success Modal) */}
      <Modals 
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        selectedPlan={selectedPlan}
        onPlanChange={setSelectedPlan}
        onPaymentSuccess={handlePaymentSuccess}
        successData={successData}
      />

    </div>
  );
}

export default App;
