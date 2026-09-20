import React, { useState, useEffect } from 'react';
import { Navbar, AppView } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { WhyBusinessesChoose } from './components/WhyBusinessesChoose';
import { GstFeatures } from './components/GstFeatures';
import { DesktopAdvantages } from './components/DesktopAdvantages';
import { BackupRestore } from './components/BackupRestore';
import { PricingSection, PlanDetails, PLANS } from './components/PricingSection';
import { DownloadSection } from './components/Download';
import { FAQSection } from './components/FAQSection';
import { EnterpriseFooter } from './components/EnterpriseFooter';
import { RenewLicense } from './components/RenewLicense';
import { ReactivateLicense } from './components/ReactivateLicense';
import { Modals, ModalType, DOWNLOAD_EXE_URL } from './components/Modals';
import { createSupabaseLicense } from './lib/supabase';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails>(PLANS.standard);
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

  // Smooth scroll handler for anchor links
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

  // Plan selection from Pricing section -> opens Plan Under Development Popup
  const handleSelectPlan = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setActiveModal('plan-development');
  };

  // Payment success handler -> inserts into Supabase 'licenses' table & downloads installer
  const handlePaymentSuccess = async (email: string, plan: PlanDetails) => {
    const isMonthly = false; // All current plans focus on lifetime
    
    // Insert into Supabase table 'licenses'
    const result = await createSupabaseLicense(email, plan.name, isMonthly);

    const licenseKey = result.data?.license_id || `ZP-730-KEY-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const expiry = result.data?.expiry || 'LIFETIME';

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
    <div id="page-wrapper" className="min-h-screen bg-[#F9F9F9] flex flex-col text-slate-900 font-sans selection:bg-[#6D28D9]/15 selection:text-[#6D28D9]">
      
      {/* 1. Sticky Enterprise Navbar */}
      <Navbar 
        currentView={currentView}
        onNavigate={navigateTo}
        onScrollTo={handleScrollTo}
        onGetStarted={() => setActiveModal('get-started')}
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
            {/* 1. Hero Section */}
            <Hero 
              onGetStarted={() => setActiveModal('get-started')}
            />

            {/* 2. Trust Section (4 Core Pillars) */}
            <TrustSection />

            {/* 3. Why Businesses Choose (Two-column: 8 Features + Screenshot) */}
            <WhyBusinessesChoose 
              onSelectPlan={() => handleScrollTo('pricing')}
            />

            {/* 4. GST Features (Timeline & Statutory Pillars) */}
            <GstFeatures />

            {/* 5. Desktop Advantages (Offline First, Fast Performance, Data Ownership) */}
            <DesktopAdvantages />

            {/* 6. Backup & Restore (Data Security & Recovery) */}
            <BackupRestore />

            {/* 7. Pricing Section (Lifetime Focus) */}
            <PricingSection 
              onSelectPlan={handleSelectPlan}
            />

            {/* 8. Download Section (Desktop Distribution Installer) */}
            <DownloadSection />

            {/* 11. FAQ Section (Bordered Accordions) */}
            <FAQSection />
          </>
        )}

      </main>

      {/* Enterprise Footer (4 Columns + Legal) */}
      <EnterpriseFooter 
        onNavigate={navigateTo}
        onScrollTo={handleScrollTo}
        onOpenModal={(modal) => setActiveModal(modal)}
      />

      {/* Modals & Popups */}
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
