import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Download, ShieldCheck, Copy, Check, ArrowRight, Laptop, Info, HelpCircle, AlertCircle, Sparkles, ExternalLink, Phone, Building2, User, Mail } from 'lucide-react';
import { PlanDetails, PLANS, PlanType } from './PricingSection';

export type ModalType = 
  | 'checkout'
  | 'trial-booking'
  | 'demo' 
  | 'contact' 
  | 'feature-summary' 
  | 'feature-inventory' 
  | 'feature-restore' 
  | 'license-success' 
  | null;

export const DOWNLOAD_EXE_URL = "https://github.com/MilapsKhasi/ZenterPrime-Website/releases/download/prerelease/ZenterPrime.Setup.7.3.0.exe";
export const TRIAL_WEB_URL = "https://zenterprime.vercel.app";

interface ModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  selectedPlan: PlanDetails;
  onPlanChange: (plan: PlanDetails) => void;
  onPaymentSuccess: (email: string, plan: PlanDetails) => void;
  successData?: {
    email: string;
    plan: PlanDetails;
    licenseKey: string;
    expiry?: string;
  } | null;
}

export const Modals: React.FC<ModalsProps> = ({ 
  activeModal, 
  onClose, 
  selectedPlan,
  onPlanChange,
  onPaymentSuccess,
  successData 
}) => {
  // Trial booking form states (for plan unavailable popup)
  const [trialName, setTrialName] = useState('');
  const [trialEmail, setTrialEmail] = useState('');
  const [trialPhone, setTrialPhone] = useState('');
  const [trialBusiness, setTrialBusiness] = useState('');
  const [isSubmittingTrial, setIsSubmittingTrial] = useState(false);
  const [trialSubmitted, setTrialSubmitted] = useState(false);

  // Demo form states
  const [demoName, setDemoName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoPlan, setDemoPlan] = useState('Professional Blue');
  const [demoNote, setDemoNote] = useState('');
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  // Contact form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Copy states
  const [copiedKey, setCopiedKey] = useState(false);

  // Reset form states on modal change
  useEffect(() => {
    if (activeModal === 'checkout' || activeModal === 'trial-booking') {
      setIsSubmittingTrial(false);
      setTrialSubmitted(false);
    }
  }, [activeModal]);

  if (!activeModal) return null;

  const handleCopyLicense = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleTrialBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialEmail.trim() || !trialEmail.includes('@')) {
      return;
    }

    setIsSubmittingTrial(true);
    setTimeout(() => {
      setIsSubmittingTrial(false);
      setTrialSubmitted(true);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-300 shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. PLAN NOT AVAILABLE - TRIAL BOOKING POPUP MODAL */}
        {(activeModal === 'checkout' || activeModal === 'trial-booking') && (
          <div id="plan-unavailable-trial-modal">
            {trialSubmitted ? (
              /* Success State after booking trial */
              <div className="text-center py-2">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-slate-950 mb-1">
                  Trial Booking Confirmed!
                </h3>
                <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto">
                  We have reserved your free 14-day trial for the <b className="text-[#3b28cc]">{selectedPlan.name}</b> tier. Confirmation has been scheduled for <b>{trialEmail}</b>.
                </p>

                {/* Instant Launch Options */}
                <div className="space-y-3 mb-6 text-left">
                  <a
                    href={TRIAL_WEB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#3b28cc] hover:bg-[#3120b0] text-white py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Launch 14-Day Web Trial Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={DOWNLOAD_EXE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="ZenterPrime.Setup.7.3.0.exe"
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-slate-600" />
                    <span>Download Desktop Setup (v7.3.0 Windows)</span>
                  </a>
                </div>

                <button
                  onClick={() => { setTrialSubmitted(false); onClose(); }}
                  className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Booking Form with Notice */
              <div>
                {/* Plan Unavailable Alert Banner */}
                <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-left">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                      Plan Not Available For This Time
                    </h4>
                    <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                      Direct purchase for <b className="font-semibold">{selectedPlan.name}</b> ({selectedPlan.formattedPrice}) is temporarily closed. Please book a free 14-day full access trial below!
                    </p>
                  </div>
                </div>

                {/* Modal Title */}
                <div className="text-center mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200/80 rounded-full text-xs font-semibold text-[#3b28cc] mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Book 14-Day Free Trial</span>
                  </div>
                  <h3 
                    id="trial-booking-title"
                    className="text-2xl font-bold text-slate-950 tracking-tight"
                  >
                    Get Started With Free Trial
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Full access to invoices, ledger, inventory &amp; reporting with zero commitment
                  </p>
                </div>

                {/* Selected Edition Selector */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-600 uppercase">Selected Plan Interest</span>
                    <span className="text-xs font-bold text-[#3b28cc]">{selectedPlan.formattedPrice} {selectedPlan.period}</span>
                  </div>
                  <select
                    id="trial-plan-select"
                    value={selectedPlan.id}
                    onChange={(e) => onPlanChange(PLANS[e.target.value as PlanType])}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#3b28cc] cursor-pointer shadow-2xs"
                  >
                    <option value="monthly">Standard Monthly — ₹499 / month</option>
                    <option value="silver">Standard Silver — ₹14,999 (Lifetime)</option>
                    <option value="blue">Professional Blue — ₹18,999 (Lifetime) ★ RECOMMENDED</option>
                  </select>
                </div>

                {/* Trial Booking Form */}
                <form onSubmit={handleTrialBookingSubmit} className="space-y-3">
                  
                  {/* Name field */}
                  <div className="relative">
                    <fieldset className="border border-slate-300 focus-within:border-[#3b28cc] rounded-lg px-3 pt-0.5 pb-1.5 transition-colors">
                      <legend className="text-[11px] font-medium text-slate-600 px-1 select-none flex items-center gap-1">
                        <User className="w-3 h-3 text-[#3b28cc]" />
                        <span>Your Name *</span>
                      </legend>
                      <input
                        id="trial-booking-name"
                        type="text"
                        required
                        value={trialName}
                        onChange={(e) => setTrialName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-transparent border-none text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none px-1 py-0.5"
                      />
                    </fieldset>
                  </div>

                  {/* Email field */}
                  <div className="relative">
                    <fieldset className="border border-[#3b28cc] rounded-lg px-3 pt-0.5 pb-1.5 transition-colors">
                      <legend className="text-[11px] font-medium text-[#3b28cc] px-1 select-none flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#3b28cc]" />
                        <span>Email Address *</span>
                      </legend>
                      <input
                        id="trial-booking-email"
                        type="email"
                        required
                        value={trialEmail}
                        onChange={(e) => setTrialEmail(e.target.value)}
                        placeholder="rahul@business.com"
                        className="w-full bg-transparent border-none text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none px-1 py-0.5"
                      />
                    </fieldset>
                  </div>

                  {/* Phone & Company grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <fieldset className="border border-slate-300 focus-within:border-[#3b28cc] rounded-lg px-3 pt-0.5 pb-1.5 transition-colors">
                      <legend className="text-[11px] font-medium text-slate-600 px-1 select-none flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>Phone / WhatsApp</span>
                      </legend>
                      <input
                        id="trial-booking-phone"
                        type="tel"
                        value={trialPhone}
                        onChange={(e) => setTrialPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-transparent border-none text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none px-1 py-0.5"
                      />
                    </fieldset>

                    <fieldset className="border border-slate-300 focus-within:border-[#3b28cc] rounded-lg px-3 pt-0.5 pb-1.5 transition-colors">
                      <legend className="text-[11px] font-medium text-slate-600 px-1 select-none flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>Business Name</span>
                      </legend>
                      <input
                        id="trial-booking-business"
                        type="text"
                        value={trialBusiness}
                        onChange={(e) => setTrialBusiness(e.target.value)}
                        placeholder="Store or Company"
                        className="w-full bg-transparent border-none text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none px-1 py-0.5"
                      />
                    </fieldset>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      id="trial-booking-submit-btn"
                      type="submit"
                      disabled={isSubmittingTrial}
                      className="w-full bg-[#3b28cc] hover:bg-[#3120b0] text-white font-semibold py-3 px-6 rounded-lg transition-snappy shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
                    >
                      {isSubmittingTrial ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs">Reserving 14-Day Trial...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm">Book Free 14-Day Trial</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Instant Trial Direct Link */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Want to start immediately?</span>
                    <a
                      href={TRIAL_WEB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3b28cc] hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      <span>Launch Instant Web Trial</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </form>
              </div>
            )}
          </div>
        )}

        {/* 2. REQUEST A DEMO MODAL */}
        {activeModal === 'demo' && (
          <div>
            <h3 className="text-2xl font-bold text-[#3b28cc] text-center mb-6">
              Request a demo
            </h3>

            {demoSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-slate-900 mb-1">Demo Request Received!</h4>
                <p className="text-sm text-slate-600 mb-6">
                  Our product specialist will reach out to <b>{demoEmail}</b> within 24 hours with your interactive walkthrough session.
                </p>
                <button
                  onClick={() => { setDemoSubmitted(false); onClose(); }}
                  className="bg-[#3b28cc] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#3120b0] cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => { e.preventDefault(); setDemoSubmitted(true); }}
                className="space-y-4"
              >
                {/* Your name */}
                <fieldset className="border border-[#3b28cc] rounded-lg px-3 pt-0.5 pb-2">
                  <legend className="text-xs font-medium text-[#3b28cc] px-1.5">
                    Your name
                  </legend>
                  <input
                    type="text"
                    required
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none px-1 py-0.5"
                  />
                </fieldset>

                {/* Your email */}
                <fieldset className="border border-[#3b28cc] rounded-lg px-3 pt-0.5 pb-2">
                  <legend className="text-xs font-medium text-[#3b28cc] px-1.5">
                    Your email
                  </legend>
                  <input
                    type="email"
                    required
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none px-1 py-0.5"
                  />
                </fieldset>

                {/* Select plan */}
                <fieldset className="border border-[#3b28cc] rounded-lg px-3 pt-0.5 pb-2">
                  <legend className="text-xs font-medium text-[#3b28cc] px-1.5">
                    Select plan of interest
                  </legend>
                  <select
                    value={demoPlan}
                    onChange={(e) => setDemoPlan(e.target.value)}
                    className="w-full bg-transparent border-none text-sm text-slate-900 focus:outline-none px-1 py-0.5 cursor-pointer"
                  >
                    <option value="Professional Blue">Professional Blue (₹18,999 Lifetime)</option>
                    <option value="Standard Silver">Standard Silver (₹14,999 Lifetime)</option>
                    <option value="Standard Monthly">Standard Monthly (₹499 / mo)</option>
                  </select>
                </fieldset>

                {/* Preferred time / note */}
                <fieldset className="border border-[#3b28cc] rounded-lg px-3 pt-0.5 pb-2">
                  <legend className="text-xs font-medium text-[#3b28cc] px-1.5">
                    Preferred date & time / Note
                  </legend>
                  <textarea
                    rows={2}
                    value={demoNote}
                    onChange={(e) => setDemoNote(e.target.value)}
                    placeholder="e.g. Weekdays 2 PM IST"
                    className="w-full bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none px-1 py-0.5 resize-none"
                  />
                </fieldset>

                {/* Send request */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full bg-[#3b28cc] hover:bg-[#3120b0] text-white font-semibold py-3 px-6 rounded-lg transition-snappy shadow-xs cursor-pointer active:scale-98"
                  >
                    Send request
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 3. CONTACT US MODAL */}
        {activeModal === 'contact' && (
          <div>
            <h3 className="text-2xl font-bold text-[#3b28cc] text-center mb-6">
              Contact us
            </h3>

            {contactSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-slate-900 mb-1">Message Sent!</h4>
                <p className="text-sm text-slate-600 mb-6">
                  Thank you for getting in touch. The ZenterPrime support team will reply to <b>{contactEmail}</b> shortly.
                </p>
                <button
                  onClick={() => { setContactSubmitted(false); onClose(); }}
                  className="bg-[#3b28cc] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#3120b0] cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }}
                className="space-y-4"
              >
                {/* Your name */}
                <fieldset className="border border-[#3b28cc] rounded-lg px-3 pt-0.5 pb-2">
                  <legend className="text-xs font-medium text-[#3b28cc] px-1.5">
                    Your name
                  </legend>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none px-1 py-0.5"
                  />
                </fieldset>

                {/* Your email */}
                <fieldset className="border border-[#3b28cc] rounded-lg px-3 pt-0.5 pb-2">
                  <legend className="text-xs font-medium text-[#3b28cc] px-1.5">
                    Your email
                  </legend>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none px-1 py-0.5"
                  />
                </fieldset>

                {/* Message */}
                <fieldset className="border border-[#3b28cc] rounded-lg px-3 pt-0.5 pb-2">
                  <legend className="text-xs font-medium text-[#3b28cc] px-1.5">
                    Message
                  </legend>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="How can our team help your business?"
                    className="w-full bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none px-1 py-0.5 resize-none"
                  />
                </fieldset>

                {/* Send request */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full bg-[#3b28cc] hover:bg-[#3120b0] text-white font-semibold py-3 px-6 rounded-lg transition-snappy shadow-xs cursor-pointer active:scale-98"
                  >
                    Send request
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 4. FEATURE DETAILS: EXECUTIVE SUMMARY */}
        {activeModal === 'feature-summary' && (
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#3b28cc] flex items-center justify-center text-white mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 19h16v2H4v-2z" />
                <rect x="5" y="11" width="2.5" height="6" rx="0.5" />
                <rect x="9.5" y="7" width="2.5" height="10" rx="0.5" />
                <rect x="14" y="4" width="2.5" height="13" rx="0.5" />
                <rect x="18.5" y="9" width="2.5" height="8" rx="0.5" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-950 mb-2">
              Executive Summary & Business Intelligence
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Get an instant snapshot of your entire financial health without digging through complex ledgers.
            </p>
            <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b28cc] shrink-0 mt-0.5" />
                <span><b>Real-time Financials:</b> Track gross sales, purchases, net receivable & net payable in one glance.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b28cc] shrink-0 mt-0.5" />
                <span><b>Customer & Vendor Directory:</b> Quick summary of active parties with balance aging metrics.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b28cc] shrink-0 mt-0.5" />
                <span><b>Instant Excel Export:</b> 1-click export to CA-ready Excel format and GST filing templates.</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-[#3b28cc] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#3120b0] cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* 5. FEATURE DETAILS: INVENTORY TRACKING */}
        {activeModal === 'feature-inventory' && (
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#3b28cc] flex items-center justify-center text-white mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="21" r="1.5" fill="currentColor" />
                <circle cx="19" cy="21" r="1.5" fill="currentColor" />
                <path d="M2.5 2.5h3l2.68 12.39a1.5 1.5 0 0 0 1.47 1.11h9.7a1.5 1.5 0 0 0 1.47-1.15l1.68-7.35H6.2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-950 mb-2">
              Smart Inventory Tracking
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Whether purchased, sold, or returned, your warehouse and retail stock stay completely synchronized.
            </p>
            <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b28cc] shrink-0 mt-0.5" />
                <span><b>SKU & Barcode Support:</b> Scan barcodes during sales billing for ultra-fast checkout.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b28cc] shrink-0 mt-0.5" />
                <span><b>Low Stock Notifications:</b> Automated alerts before you run out of fast-selling items.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b28cc] shrink-0 mt-0.5" />
                <span><b>Batch & Expiry Dates:</b> Full batch-wise tracking for FMCG and pharmaceutical retailers.</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-[#3b28cc] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#3120b0] cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* 6. FEATURE DETAILS: RESTORE DELETIONS */}
        {activeModal === 'feature-restore' && (
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#3b28cc] flex items-center justify-center text-white mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-950 mb-2">
              Fail-Safe Restore Deletions
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Mistakes happen during busy shop hours. With ZenterPrime’s internal Recycle Bin, no invoice or party record is ever lost forever.
            </p>
            <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b28cc] shrink-0 mt-0.5" />
                <span><b>Zero Data Loss:</b> Inadvertently deleted vouchers remain safely in the Recycle Bin.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b28cc] shrink-0 mt-0.5" />
                <span><b>1-Click Restoration:</b> Head to Settings &gt; Recycle Bin &gt; click &quot;Restore&quot; to revive records with original ledger history.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b28cc] shrink-0 mt-0.5" />
                <span><b>Audit Trail:</b> Full record of who deleted and who restored each entry.</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-[#3b28cc] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#3120b0] cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* 7. LICENSE PURCHASE SUCCESS MODAL */}
        {activeModal === 'license-success' && successData && (
          <div className="text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-slate-950 mb-1">
              Payment Successful!
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Receipt &amp; license details sent to <b>{successData.email}</b>
            </p>

            {/* Automatic download notice */}
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2.5 rounded-lg mb-5 flex items-center justify-center gap-2">
              <Download className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span><b>ZenterPrime.Setup.7.3.0.exe</b> download started automatically!</span>
            </div>

            {/* License Key Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Your License Key ({successData.plan.name})</span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-100 px-2 py-0.5 rounded">Active (YES)</span>
              </div>
              <div className="flex items-center justify-between bg-white border border-slate-300 rounded-lg p-2.5">
                <span className="font-mono text-sm sm:text-base font-bold text-[#3b28cc] tracking-wide break-all">
                  {successData.licenseKey}
                </span>
                <button
                  onClick={() => handleCopyLicense(successData.licenseKey)}
                  className="ml-2 p-1.5 text-slate-500 hover:text-[#3b28cc] rounded hover:bg-purple-50 transition-colors shrink-0 cursor-pointer"
                  title="Copy License Key"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-200">
                <span>Database Sync: <b className="text-emerald-700 font-medium">Supabase (is_active: YES)</b></span>
                <span>Expiry: <b className="text-slate-800 font-semibold">{successData.expiry || 'LIFETIME'}</b></span>
              </div>
            </div>

            {/* How to activate instruction & Machine ID guide */}
            <div className="space-y-2.5 mb-6 text-left">
              <div className="bg-purple-50/80 border border-purple-100 rounded-xl p-3.5 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold text-[#3b28cc] mb-1.5">
                  <Laptop className="w-4 h-4" />
                  <span>How to activate on your PC:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px] leading-relaxed">
                  <li>Install and launch <b>ZenterPrime 7.3 Desktop</b> on your Windows PC.</li>
                  <li>Go to <b>Settings</b> &gt; <b>Your PC</b>.</li>
                  <li>Paste your License Key into the box &amp; click <b>Activate</b> to unlock instantly.</li>
                </ol>
              </div>

              {/* Machine ID lookup guide */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                  <HelpCircle className="w-3.5 h-3.5 text-[#3b28cc]" />
                  <span>How to check your Device &apos;Machine ID&apos;:</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Open <b>ZenterPrime Desktop</b> &gt; navigate to <b>Settings</b> &gt; open the <b>&apos;About&apos;</b> tab &gt; look for the <b>&apos;Machine ID&apos;</b> shown directly below the license tag.
                </p>
                <div className="mt-1.5 text-[10px] text-slate-500 bg-white border border-slate-200 rounded-md px-2.5 py-1.5">
                  <span className="font-medium text-slate-700">💡 Tip:</span> Save your Machine ID — it can be used for reactivating or renewing existing licenses, as well as purchasing/assigning new licenses to an existing machine.
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={DOWNLOAD_EXE_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="ZenterPrime.Setup.7.3.0.exe"
                className="flex-1 bg-[#3b28cc] hover:bg-[#3120b0] text-white py-3 px-4 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download ZenterPrime.Setup.7.3.0.exe</span>
              </a>
              <button
                onClick={onClose}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-3 px-6 rounded-lg text-sm font-medium cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default Modals;
