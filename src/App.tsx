import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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
import { Modals, ModalType } from './components/Modals';
import { LaunchCountdown } from './components/LaunchCountdown';
import { SeoHead } from './components/SeoHead';
import { useReleaseStatus } from './hooks/useReleaseStatus';
import { isProductReleased, triggerReleaseDownload } from './config/releaseConfig';
import { getPageSeoByPath } from './config/seoConfig';
import { createSupabaseLicense } from './lib/supabase';

const SECTION_TO_ROUTE: Record<string, string> = {
  features: '/features',
  'gst-billing': '/gst-billing',
  advantages: '/advantages',
  'backup-restore': '/backup-restore',
  pricing: '/pricing',
  'launch-countdown': '/launch-countdown',
  download: '/download',
  faq: '/faq',
  support: '/support',
};

interface LandingPageProps {
  release: ReturnType<typeof useReleaseStatus>;
  onGetStarted: () => void;
  onScrollTo: (sectionId: string) => void;
  onSelectPlan: (plan: PlanDetails) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  release,
  onGetStarted,
  onScrollTo,
  onSelectPlan,
}) => {
  const location = useLocation();
  const seo = getPageSeoByPath(location.pathname, release.isReleased);

  useEffect(() => {
    if (seo.sectionId) {
      const timer = window.setTimeout(() => {
        const el = document.getElementById(seo.sectionId!);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
      return () => window.clearTimeout(timer);
    }
  }, [location.pathname, seo.sectionId]);

  return (
    <>
      <SeoHead
        pageName={seo.pageName}
        description={seo.description}
        structuredData={seo.structuredData}
      />

      {/* 1. Hero Section */}
      <Hero
        isReleased={release.isReleased}
        onGetStarted={onGetStarted}
        onViewCountdown={() => onScrollTo('launch-countdown')}
      />

      {/* 1b. Cinematic Launch Countdown & Automatic Release Switch */}
      <LaunchCountdown
        release={release}
        onExplorePricing={() => onScrollTo('pricing')}
        onScrollToDownload={() => onScrollTo('download')}
      />

      {/* 2. Trust Section (4 Core Pillars) */}
      <TrustSection />

      {/* 3. Why Businesses Choose (Two-column: 8 Features + Screenshot) */}
      <WhyBusinessesChoose
        onSelectPlan={() => onScrollTo('pricing')}
      />

      {/* 4. GST Features (Timeline & Statutory Pillars) */}
      <GstFeatures />

      {/* 5. Desktop Advantages (Offline First, Fast Performance, Data Ownership) */}
      <DesktopAdvantages />

      {/* 6. Backup & Restore (Data Security & Recovery) */}
      <BackupRestore />

      {/* 7. Pricing Section (Monthly / Yearly / Lifetime / Educational) */}
      <PricingSection
        onSelectPlan={onSelectPlan}
      />

      {/* 8. Download Section (Hidden before 31 Dec 2026 00:00 IST; revealed automatically on release) */}
      {release.isReleased && (
        <DownloadSection animateReveal={release.justReleased} />
      )}

      {/* 11. FAQ Section (Bordered Accordions) */}
      <FAQSection />
    </>
  );
};

export function App() {
  const release = useReleaseStatus();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails>(PLANS['monthly']);
  const [successData, setSuccessData] = useState<{
    email: string;
    plan: PlanDetails;
    licenseKey: string;
    expiry?: string;
  } | null>(null);

  const normalizedPath = location.pathname.toLowerCase();
  const currentView: AppView =
    normalizedPath === '/renew'
      ? 'renew'
      : normalizedPath === '/reactivate'
      ? 'reactivate'
      : 'landing';

  // Backward-compatible redirect for legacy #renew / #reactivate hash URLs
  useEffect(() => {
    const hash = location.hash.toLowerCase();
    if (hash === '#renew' || hash === '#/renew') {
      navigate('/renew', { replace: true });
    } else if (hash === '#reactivate' || hash === '#/reactivate') {
      navigate('/reactivate', { replace: true });
    }
  }, [location.hash, navigate]);

  const navigateTo = (view: AppView) => {
    if (view === 'renew') {
      navigate('/renew');
    } else if (view === 'reactivate') {
      navigate('/reactivate');
    } else {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route-aware smooth scroll handler for section links
  const handleScrollTo = (sectionId: string) => {
    const targetRoute = SECTION_TO_ROUTE[sectionId] || '/';
    if (location.pathname.toLowerCase() !== targetRoute) {
      navigate(targetRoute);
    }
    window.setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  // Plan selection from Pricing section -> opens Checkout / Account Creation Flow
  const handleSelectPlan = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setActiveModal('checkout');
  };

  // Payment success handler -> inserts into Supabase 'licenses' table & downloads installer when released
  const handlePaymentSuccess = async (email: string, plan: PlanDetails) => {
    const isMonthly = plan.id === 'monthly';

    const result = await createSupabaseLicense(email, plan.name, isMonthly);

    const licenseKey =
      result.data?.license_id ||
      `ZP-740-KEY-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const expiry = result.data?.expiry || (plan.isLifetime ? 'LIFETIME' : plan.period);

    setSuccessData({
      email,
      plan,
      licenseKey,
      expiry,
    });

    setActiveModal('license-success');

    if (isProductReleased()) {
      triggerReleaseDownload();
    }
  };

  const landingElement = (
    <LandingPage
      release={release}
      onGetStarted={() => setActiveModal('get-started')}
      onScrollTo={handleScrollTo}
      onSelectPlan={handleSelectPlan}
    />
  );

  return (
    <div id="page-wrapper" className="min-h-screen bg-[#F9F9F9] flex flex-col text-slate-900 font-sans">
      {/* 1. Sticky Enterprise Navbar */}
      <Navbar
        currentView={currentView}
        isReleased={release.isReleased}
        onNavigate={navigateTo}
        onScrollTo={handleScrollTo}
        onGetStarted={() => setActiveModal('get-started')}
      />

      {/* Main React Router Views */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={landingElement} />
          <Route path="/features" element={landingElement} />
          <Route path="/gst-billing" element={landingElement} />
          <Route path="/advantages" element={landingElement} />
          <Route path="/backup-restore" element={landingElement} />
          <Route path="/pricing" element={landingElement} />
          <Route path="/launch-countdown" element={landingElement} />
          <Route path="/download" element={landingElement} />
          <Route path="/faq" element={landingElement} />
          <Route path="/support" element={landingElement} />
          <Route
            path="/renew"
            element={
              <RenewLicense
                isReleased={release.isReleased}
                onBackToHome={() => navigateTo('landing')}
                onNavigateToPricing={() => handleScrollTo('pricing')}
              />
            }
          />
          <Route
            path="/reactivate"
            element={
              <ReactivateLicense
                onBackToHome={() => navigateTo('landing')}
                onNavigateToPricing={() => handleScrollTo('pricing')}
                onContactSupport={() => setActiveModal('contact')}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Enterprise Footer (4 Columns + Legal) */}
      <EnterpriseFooter
        isReleased={release.isReleased}
        onNavigate={navigateTo}
        onScrollTo={handleScrollTo}
        onOpenModal={(modal) => setActiveModal(modal)}
      />

      {/* Modals & Popups */}
      <Modals
        activeModal={activeModal}
        isReleased={release.isReleased}
        onClose={() => setActiveModal(null)}
        onViewCountdown={() => handleScrollTo('launch-countdown')}
        selectedPlan={selectedPlan}
        onPlanChange={setSelectedPlan}
        onPaymentSuccess={handlePaymentSuccess}
        successData={successData}
      />
    </div>
  );
}

export default App;
