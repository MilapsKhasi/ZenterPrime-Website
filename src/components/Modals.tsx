import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Download, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Laptop, 
  ExternalLink, 
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building2,
  Lock,
  User,
  Mail,
  Eye,
  EyeOff,
  Clock
} from 'lucide-react';
import { PlanDetails } from './PricingSection';
import { RELEASE_CONFIG, triggerReleaseDownload } from '../config/releaseConfig';
import confetti from 'canvas-confetti';

export type ModalType = 
  | 'get-started'
  | 'checkout'
  | 'demo' 
  | 'contact' 
  | 'feature-summary' 
  | 'feature-inventory' 
  | 'feature-restore' 
  | 'license-success' 
  | 'about'
  | 'privacy'
  | 'terms'
  | null;

export const TRIAL_WEB_URL = "https://zenterprime.vercel.app";

interface ModalsProps {
  activeModal: ModalType;
  isReleased: boolean;
  onClose: () => void;
  onViewCountdown?: () => void;
  selectedPlan: PlanDetails;
  onPlanChange: (plan: PlanDetails) => void;
  onPaymentSuccess: (email: string, plan: PlanDetails, licenseKey: string) => void;
  successData?: {
    email: string;
    plan: PlanDetails;
    licenseKey: string;
    expiry?: string;
  } | null;
}

export const Modals: React.FC<ModalsProps> = ({ 
  activeModal, 
  isReleased,
  onClose, 
  onViewCountdown,
  selectedPlan,
  successData 
}) => {
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  // Checkout multi-step states
  const [checkoutStep, setCheckoutStep] = useState<'account' | 'payment-method' | 'payment-details' | 'processing' | 'success'>('account');
  const [accountEmail, setAccountEmail] = useState('');
  const [accountBusiness, setAccountBusiness] = useState('');
  const [accountPin, setAccountPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [generatedLicenseKey, setGeneratedLicenseKey] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);

  // Contact form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    if (activeModal === 'checkout') {
      setCheckoutStep('account');
      setDownloadTriggered(false);
      setAccountEmail('');
      setAccountBusiness('');
      setAccountPin('');
      setShowPin(false);
      setUpiId('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvc('');
    }
  }, [activeModal]);

  if (!activeModal) return null;

  const handleCopyLicense = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleDownloadExe = () => {
    if (!isReleased) return;
    setDownloadTriggered(true);
    triggerReleaseDownload();
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountEmail || !accountPin) return;
    setCheckoutStep('payment-method');
  };

  const handlePaymentMethodSelect = (method: 'upi' | 'card' | 'netbanking') => {
    setPaymentMethod(method);
    setCheckoutStep('payment-details');
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('processing');

    const prefix = selectedPlan.id === 'lifetime' ? 'ZP74-LIFETIME' : selectedPlan.id === 'yearly' ? 'ZP74-YEARLY' : 'ZP74-MONTHLY';
    const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const planCode = selectedPlan.id === 'lifetime' ? 'LGT' : selectedPlan.id === 'yearly' ? 'YRT' : 'MTH';
    const lKey = `${prefix}-${suffix}-${planCode}`;
    setGeneratedLicenseKey(lKey);

    // Smooth transition from processing loader to green tick with fade messages and confetti celebration
    setTimeout(() => {
      setCheckoutStep('success');
      try {
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#4338ca', '#10b981', '#f59e0b', '#6366f1', '#34d399']
        });
      } catch (err) {
        console.log('Confetti error:', err);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/55 transition-opacity backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-[12px] border border-[#E2E8F0] z-10 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-slate-700 p-1.5 rounded-[6px] hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. GET STARTED POPUP */}
        {activeModal === 'get-started' && (
          <div className="p-8">
            <div className="mb-5">
              <span className="text-xs font-semibold text-[#4338ca] uppercase tracking-wider block mb-1">
                Evaluation Options
              </span>
              <h3 className="text-xl font-normal text-slate-900 tracking-tight">
                Get Started with ZenterPrime 7.4
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Choose how you want to evaluate ZenterPrime for your business:
              </p>
            </div>

            <div className="space-y-3 mb-5">
              <div className="bg-[#FCFDFE] border border-[#E5E7EB] rounded-[8px] p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-[6px] bg-[#4338ca] text-white flex items-center justify-center shrink-0">
                      {isReleased ? <Download className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-normal text-slate-900">
                        {isReleased ? 'Download ZenterPrime 7.4' : 'ZenterPrime 7.4 Desktop'}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {isReleased
                          ? `${RELEASE_CONFIG.installerFileName} (${RELEASE_CONFIG.fileSizeLabel})`
                          : 'Releasing 31 December 2026, 00:00 IST'}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                    isReleased
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-amber-700 bg-amber-50 border-amber-200'
                  }`}>
                    {isReleased ? 'Windows Desktop' : 'Coming Soon'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Full offline desktop application for Windows. Includes GST billing, inventory, customer ledger, and direct thermal printing.
                </p>

                {isReleased ? (
                  <button
                    id="btn-download-zenterprime-74"
                    onClick={handleDownloadExe}
                    className="primary-btn w-full text-white font-semibold py-2.5 px-4 rounded-[6px] text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download ZenterPrime 7.4</span>
                  </button>
                ) : (
                  <button
                    id="btn-view-launch-countdown"
                    type="button"
                    onClick={() => {
                      onClose();
                      onViewCountdown?.();
                    }}
                    className="primary-btn w-full text-white font-semibold py-2.5 px-4 rounded-[6px] text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>View Launch Countdown</span>
                  </button>
                )}
              </div>

              <div className="bg-[#FCFDFE] border border-[#E5E7EB] rounded-[8px] p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-[6px] bg-[#F3F4F6] text-[#4338ca] flex items-center justify-center shrink-0">
                      <Laptop className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-normal text-slate-900">
                        Start 14-days web trial
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Browser version • No installation required
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                    Web Preview
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Explore full invoicing, inventory tracking, and balance sheet analytics directly in your web browser.
                </p>

                <a
                  id="btn-start-14-days-web-trial"
                  href={TRIAL_WEB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-btn w-full font-semibold py-2.5 px-4 rounded-[6px] text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start 14-days web trial</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            {downloadTriggered && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-[6px] text-xs text-emerald-900">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Download started for ZenterPrime.Setup.7.4.0.exe</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. TWO-COLUMN LICENSE CHECKOUT & ACCOUNT CREATION FLOW */}
        {activeModal === 'checkout' && (
          <div id="checkout-modal" className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
            
            {/* Left Column: Brand & Plan Summary */}
            <div className="md:col-span-5 bg-[#F8FAFC] p-6 sm:p-8 border-r border-[#E2E8F0] flex flex-col justify-between">
              <div>
                {/* Brand Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-[8px] bg-[#4338ca] text-white flex items-center justify-center font-bold text-xl shadow-xs">
                    Z
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      ZenterPrime
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Complete Business Management
                    </p>
                  </div>
                </div>

                {/* Selected Plan Card */}
                <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-4 mb-6 shadow-xs">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                    Selected Plan
                  </span>
                  <div className="flex items-baseline justify-between">
                    <h5 className="text-sm font-bold text-slate-900">
                      {selectedPlan.name}
                    </h5>
                    <div className="text-right">
                      <span className="text-base font-bold text-[#4338ca]">
                        {selectedPlan.formattedPrice}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {selectedPlan.isYearly ? '/year' : '/month'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3">
                  {[
                    'Unlimited Invoicing & Reports',
                    'GST Ready Accounting',
                    'Secure & Reliable',
                    '24/7 Support'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 text-[#4338ca] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom decorative security note */}
              <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-center">
                <div className="w-full bg-indigo-50/50 border border-indigo-100 rounded-[8px] p-3 text-center">
                  <span className="text-[11px] font-medium text-[#4338ca] block">
                    🔒 256-Bit Encrypted Offline-First Security
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Form Steps */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white">
              
              <div>
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-normal text-slate-900 tracking-tight">
                    Activate License
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Complete your purchase and start using ZenterPrime instantly.
                  </p>
                </div>

                {/* Step 1: Account Details */}
                {checkoutStep === 'account' && (
                  <form onSubmit={handleAccountSubmit} className="space-y-4">
                    
                    {/* Email Field */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#4338ca]" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={accountEmail}
                        onChange={(e) => setAccountEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-white border border-[#E2E8F0] focus:border-[#4338ca] rounded-[8px] px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-2xs"
                      />
                    </div>

                    {/* Business Name Field */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#4338ca]" />
                        <span>Business / Store Name</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={accountBusiness}
                        onChange={(e) => setAccountBusiness(e.target.value)}
                        placeholder="e.g. Shree Ganesh Retail & General Store"
                        className="w-full bg-white border border-[#E2E8F0] focus:border-[#4338ca] rounded-[8px] px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-2xs"
                      />
                    </div>

                    {/* Security PIN Field */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#4338ca]" />
                        <span>Account Security PIN (4-6 digits) *</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPin ? 'text' : 'password'}
                          maxLength={6}
                          required
                          value={accountPin}
                          onChange={(e) => setAccountPin(e.target.value)}
                          placeholder="••••"
                          className="w-full bg-white border border-[#E2E8F0] focus:border-[#4338ca] rounded-[8px] px-3.5 py-2.5 pr-10 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-2xs tracking-widest font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPin(!showPin)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Helper Banner */}
                    <div className="flex items-center gap-2.5 p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-[8px] text-xs text-emerald-900">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Your PIN will be used to keep your account secure.</span>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 flex items-center justify-between border-t border-[#E2E8F0]">
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer inline-flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        className="primary-btn text-white font-semibold py-2.5 px-6 rounded-[8px] text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 2: Payment Option Selection */}
                {checkoutStep === 'payment-method' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 mb-2">
                      Select your preferred payment gateway for <b>{selectedPlan.formattedPrice}</b>:
                    </p>

                    <div className="space-y-3">
                      <button
                        onClick={() => handlePaymentMethodSelect('upi')}
                        className="w-full text-left bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-[#4338ca] p-4 rounded-[8px] flex items-center justify-between cursor-pointer transition-colors shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-[6px] bg-purple-50 text-[#4338ca] flex items-center justify-center">
                            <Smartphone className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-900 block">UPI / QR Code (GPay, PhonePe, Paytm)</span>
                            <span className="text-[11px] text-slate-500">Instant verification</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </button>

                      <button
                        onClick={() => handlePaymentMethodSelect('card')}
                        className="w-full text-left bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-[#4338ca] p-4 rounded-[8px] flex items-center justify-between cursor-pointer transition-colors shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-[6px] bg-blue-50 text-blue-600 flex items-center justify-center">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-900 block">Credit / Debit Card</span>
                            <span className="text-[11px] text-slate-500">Visa, MasterCard, RuPay</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </button>

                      <button
                        onClick={() => handlePaymentMethodSelect('netbanking')}
                        className="w-full text-left bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-[#4338ca] p-4 rounded-[8px] flex items-center justify-between cursor-pointer transition-colors shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-[6px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-900 block">Net Banking</span>
                            <span className="text-[11px] text-slate-500">SBI, HDFC, ICICI, Axis</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-[#E2E8F0] mt-6">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('account')}
                        className="text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer inline-flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Details */}
                {checkoutStep === 'payment-details' && (
                  <form onSubmit={handleProcessPayment} className="space-y-4">
                    {paymentMethod === 'upi' && (
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">UPI ID / VPA *</label>
                        <input
                          type="text"
                          required
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@okhdfcbank"
                          className="w-full bg-white border border-[#E2E8F0] focus:border-[#4338ca] rounded-[8px] px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                        />
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1.5">Card Number *</label>
                          <input
                            type="text"
                            required
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 •••• •••• 8912"
                            className="w-full bg-white border border-[#E2E8F0] focus:border-[#4338ca] rounded-[8px] px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1.5">Expiry *</label>
                            <input
                              type="text"
                              required
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="12/28"
                              className="w-full bg-white border border-[#E2E8F0] focus:border-[#4338ca] rounded-[8px] px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1.5">CVV *</label>
                            <input
                              type="password"
                              required
                              maxLength={4}
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              placeholder="•••"
                              className="w-full bg-white border border-[#E2E8F0] focus:border-[#4338ca] rounded-[8px] px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">Select Bank *</label>
                        <select className="w-full bg-white border border-[#E2E8F0] focus:border-[#4338ca] rounded-[8px] px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none">
                          <option>State Bank of India (SBI)</option>
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                        </select>
                      </div>
                    )}

                    <div className="pt-4 flex items-center justify-between border-t border-[#E2E8F0]">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('payment-method')}
                        className="text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer inline-flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        className="primary-btn text-white font-semibold py-2.5 px-6 rounded-[8px] text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <span>Pay {selectedPlan.formattedPrice}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 4: Processing State (Loader transitioning smoothly to slightly small green tick with fade messages) */}
                {checkoutStep === 'processing' && (
                  <div className="py-12 text-center space-y-4 animate-fadeIn">
                    <div className="w-10 h-10 border-3 border-[#4338ca] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <h4 className="text-sm font-semibold text-slate-900 animate-pulse">Processing Secure Payment...</h4>
                    <p className="text-xs text-slate-500">Verifying transaction securely.</p>
                  </div>
                )}

                {/* Step 5: Success State with Smooth Fade Tick & Messages */}
                {checkoutStep === 'success' && (
                  <div className="py-4 text-center space-y-4 animate-fadeIn">
                    {/* Slightly small green tick in smooth fade animation */}
                    <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm animate-fadeIn scale-90">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>

                    {/* Payment Successful & License Activated messages in fade */}
                    <div className="space-y-1 animate-fadeIn">
                      <h4 className="text-base font-bold text-slate-900 tracking-tight">
                        Payment Successful!
                      </h4>
                      <p className="text-xs text-emerald-700 font-semibold animate-fadeIn">
                        License Activated for {selectedPlan.name} ({accountEmail})
                      </p>
                    </div>

                    {/* License Key Box */}
                    <div className="bg-slate-50 border border-[#E2E8F0] rounded-[8px] p-3.5 text-left animate-fadeIn">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                        Software Activation Key
                      </span>
                      <div className="flex items-center justify-between bg-white border border-[#E2E8F0] rounded-[6px] p-2">
                        <span className="font-mono text-xs font-bold text-[#4338ca]">
                          {generatedLicenseKey}
                        </span>
                        <button
                          onClick={() => handleCopyLicense(generatedLicenseKey)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    {!isReleased && (
                      <p className="text-[11px] text-slate-600 bg-amber-50 border border-amber-200/70 rounded-[8px] px-3 py-2 text-left animate-fadeIn">
                        Your license key is active. The desktop installer unlocks automatically on 31 December 2026 at 00:00 IST.
                      </p>
                    )}

                    <div className="flex gap-2 pt-2 animate-fadeIn">
                      {isReleased ? (
                        <button
                          onClick={handleDownloadExe}
                          className="primary-btn flex-1 text-white py-2.5 px-4 rounded-[8px] text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Setup.exe</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onViewCountdown?.();
                          }}
                          className="primary-btn flex-1 text-white py-2.5 px-4 rounded-[8px] text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>View Launch Countdown</span>
                        </button>
                      )}
                      <button
                        onClick={onClose}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-[8px] text-xs font-semibold cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer Note */}
              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                <span>ZenterPrime 7.4 Licensing</span>
                <span>Encrypted 256-bit</span>
              </div>
            </div>

          </div>
        )}

        {/* 3. CONTACT MODAL */}
        {activeModal === 'contact' && (
          <div className="p-8">
            <div className="mb-5">
              <span className="text-xs font-semibold text-[#4338ca] uppercase tracking-wider block mb-1">
                Help &amp; Inquiries
              </span>
              <h3 className="text-xl font-normal text-slate-900">
                Contact ZenterPrime Support
              </h3>
            </div>
            {contactSubmitted ? (
              <div className="text-center py-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-sm font-normal text-slate-900">Message Submitted</h4>
                <button
                  onClick={() => { setContactSubmitted(false); onClose(); }}
                  className="mt-4 bg-[#4338ca] text-white px-4 py-2 rounded-[6px] text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#FCFDFE] border border-[#E5E7EB] rounded-[6px] px-3 py-2 text-slate-900 focus:outline-none focus:border-[#4338ca]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-[#FCFDFE] border border-[#E5E7EB] rounded-[6px] px-3 py-2 text-slate-900 focus:outline-none focus:border-[#4338ca]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Message</label>
                  <textarea
                    rows={3}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-[#FCFDFE] border border-[#E5E7EB] rounded-[6px] px-3 py-2 text-slate-900 focus:outline-none focus:border-[#4338ca]"
                  />
                </div>
                <button
                  type="submit"
                  className="primary-btn w-full text-white font-semibold py-2.5 px-4 rounded-[6px] cursor-pointer"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        )}

        {/* PRIVACY POLICY MODAL */}
        {activeModal === 'privacy' && (
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Privacy Policy
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              ZenterPrime · Last updated: 18 October 2026
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              <h4 className="font-bold text-slate-900 text-sm mt-4">About this policy</h4>
              <p>
                This Privacy Policy explains how ZenterPrime collects, uses, stores and handles information when you use the ZenterPrime accounting software, including its web-based application and, where applicable, its desktop edition.
              </p>
              <p>
                ZenterPrime is designed to help businesses manage accounting and day-to-day business records. Those records may contain information about the business itself, its owners, employees, customers, suppliers and other individuals. This policy covers information processed through the application and the services it relies on.
              </p>
              <p>
                Using accounting software involves handling information that may be commercially confidential or personally identifiable. We aim to explain what that means in practical terms rather than hide it behind broad legal language.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-4">Information you provide</h4>
              <p>
                When you create an account or use the application, you may provide information such as your email address, business details, company name, tax registration details and other information required to configure your account.
              </p>
              <p>You may also enter or import business records, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Customer and supplier names, contact details, addresses and tax identification numbers.</li>
                <li>Sales invoices, purchase bills, transaction dates, item descriptions, quantities, prices, discounts and totals.</li>
                <li>Stock records, product information, opening balances and inventory movements.</li>
                <li>Cashbook entries, payment and receipt records, outstanding balances and other accounting information.</li>
                <li>Tax records, duties, financial summaries and reports.</li>
                <li>Information contained in files imported into the application.</li>
              </ul>
              <p>
                The information stored in your account depends on which features you use and what you choose to enter or import. Business records may contain personal information about people other than the account holder.
              </p>
              <p>
                You are responsible for ensuring that you have the necessary authority to enter and process information belonging to your customers, suppliers, employees or other individuals.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-4">Account and authentication information</h4>
              <p>
                ZenterPrime uses account authentication to control access to the application. Depending on the version and features you use, this may involve your email address, authentication credentials, account identifiers and security-related information.
              </p>
              <p>
                The application may also use a security PIN, browser verification information or device and licence identifiers for account protection, device verification or licence management. The exact information involved depends on the feature and version being used.
              </p>
              <p>
                You should keep your credentials and security PIN confidential. Anyone who gains access to an authorised session or device may be able to access information available through that session.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-4">Information stored on your device</h4>
              <p>
                Some application information may be stored locally in your browser or on your computer so that the application can operate and retain the information needed for its features.
              </p>
              <p>
                The web application uses browser storage, including IndexedDB, for certain application and verification data. Depending on the implementation, locally stored information may include records, settings, identifiers or other data required by the application.
              </p>
              <p>
                The desktop edition is intended to support local-first operation and may use a local database and a synchronisation queue to manage changes before they are synchronised with a server.
              </p>
              <p>
                The exact information stored locally, how long it remains there and whether it is encrypted at rest must be confirmed for each edition.
              </p>
              <p>
                Clearing browser data, uninstalling the application or removing local files may affect locally stored information. These actions do not necessarily delete information already synchronised to a server or retained in a backup.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-4">Information stored on servers</h4>
              <p>
                The web application uses Supabase services for account authentication and database operations. Information submitted through the web application may therefore be transmitted to and stored on the relevant Supabase infrastructure.
              </p>
              <p>
                Server-side storage may include account-related information, business records, application settings, security or verification records and other information required by the features you use.
              </p>
              <p>
                The information held by the server depends on the application&apos;s database structure and the way each feature is implemented. Local storage and server storage are not necessarily identical.
              </p>
              <p>
                Supabase may process information as a service provider under its own infrastructure, security, privacy and service terms. Its role and the applicable processing arrangements should be reviewed alongside this policy.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-4">How we use information</h4>
              <p>Information processed through ZenterPrime may be used to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Create and maintain user accounts.</li>
                <li>Authenticate users and manage access to the application.</li>
                <li>Create, display, calculate, update and organise accounting and inventory records.</li>
                <li>Generate reports and support data import and export.</li>
                <li>Synchronise records between local storage and server storage where that functionality is implemented.</li>
                <li>Verify devices, manage licences and apply applicable access restrictions.</li>
                <li>Diagnose errors, maintain application functionality and protect against unauthorised access.</li>
                <li>Respond to support requests and address technical problems.</li>
                <li>Meet legal obligations where applicable.</li>
              </ul>
              <p>
                Information should not be treated as being used for every purpose listed above merely because a feature is planned. Actual use depends on the functionality implemented in the version you are using.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-4">Data sharing and service providers</h4>
              <p>
                ZenterPrime may rely on third-party infrastructure or service providers to operate parts of the application. For example, the web application uses Supabase for authentication and database services.
              </p>
              <p>
                Where a service provider processes information on behalf of ZenterPrime, the information made available to that provider depends on the service and its configuration.
              </p>
              <p>
                Where a payment request is proceed, the information and the payment details process via third party service used Razorpay integration, and information related to payment and card detailed are not saved by ZenterPrime to it&apos;s database. Payment failures or errors during payments may occur by the third-party payment provider and in that cases, ZenterPrime won&apos;t be responsible.
              </p>
              <p>
                We should not claim that information is never shared with third parties until the application&apos;s integrations and operational arrangements have been reviewed.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-4">Data security</h4>
              <p>
                Access to accounting information should be restricted to authorised users. ZenterPrime&apos;s security measures may include authentication, access controls, database permissions, device verification and other safeguards, depending on the edition and feature.
              </p>
              <p>
                No internet-connected service or local device can be guaranteed to be completely secure. The effectiveness of a safeguard depends on its implementation and configuration.
              </p>
              <p>
                ZenterPrime accounts are strictly being told to setup their account&apos;s PIN, if the PIN is not setup or the account used or may have use in future by attackers will not have the responsibility of ZenterPrime as per our security terms October 2026.
              </p>
              <p>
                Users should protect their account credentials and devices, restrict access to authorised people and maintain appropriate backups of important business records.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-4">Data retention and deletion</h4>
              <p>
                Information may remain on a device or server for as long as it is needed to operate the application, maintain accounting records, manage an account or licence, resolve disputes, meet legal obligations or maintain required backups.
              </p>
              <p>
                Deleting a record from the application may not automatically remove every related copy, synchronised record, log or backup. The effect of deletion depends on the relevant feature and storage system.
              </p>
              <p>
                Account deletion feature is not built yet for ZenterPrime&apos;s 7.4 Desktop and Web edition, once an account created can&apos;t be deleted in 7.4 Desktop or Web edition. Future updates may change the policy rules of account safety and deletion features.
              </p>
              <p>
                Users should not assume that uninstalling the application or signing out deletes their server-side account or business records.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-4">Your responsibilities and choices</h4>
              <p>
                You are responsible for the accuracy of the information you enter, the people to whom you grant access and the lawful handling of personal information contained in your business records.
              </p>
              <p>
                Where the application provides editing, export or deletion features, you can use those features to manage the relevant information. The availability and effect of each action may differ between locally stored and server-stored records.
              </p>
              <p>
                You may contact ZenterPrime to ask about personal information associated with your account, request access or correction where applicable, or raise a concern about how information is handled. Any request will be handled in accordance with applicable law and the application&apos;s verified capabilities.
              </p>
              <p>
                All the account and business data accuracy and mistakes strongly refers to account holder where ZenterPrime won&apos;t take responsibility of GSTR reports mismatches, or any government issues happened by the invoice issuer.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-4">Children&apos;s information</h4>
              <p>
                ZenterPrime is intended for business accounting and related commercial use, not as a service directed at children. If you believe that personal information has been submitted through the application inappropriately, you may contact us so the matter can be reviewed.
              </p>
              <p>
                The age restrictions or face verifications won&apos;t be used by ZenterPrime.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-4">Changes to this policy</h4>
              <p>
                This policy may be updated when the application&apos;s features, data practices or legal obligations change. The revised version will state its updated date. Where required by applicable law, users will be notified of material changes or asked to provide consent.
              </p>

              <h4 className="font-bold text-slate-900 text-sm mt-4">Contact</h4>
              <p>For privacy questions, data requests or concerns about the handling of information through ZenterPrime, contact:</p>
              <p>
                Business or legal entity: ZenterPrime Solutions, India<br />
                Privacy contact email: zenterprime.solutions@gmail.com
              </p>

              <hr className="my-4 border-slate-200" />
              <p className="text-[11px] text-slate-400 italic">
                Publication note : This is a working draft, not a verified description of every current data practice. Complete the marked verification items against the actual application, backend configuration, third-party services and data-retention arrangements. Confirm the responsible legal entity and contact details, and obtain an appropriate legal review before publishing.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <button
                onClick={onClose}
                className="w-full bg-[#4338ca] hover:bg-[#3730a3] text-white text-xs font-semibold py-2.5 rounded-[6px] cursor-pointer transition-colors"
              >
                Close Privacy Policy
              </button>
            </div>
          </div>
        )}

        {/* ABOUT & TERMS MODALS */}
        {(activeModal === 'about' || activeModal === 'terms') && (
          <div className="p-8">
            <h3 className="text-xl font-normal text-slate-900 mb-4 capitalize">
              {activeModal} - ZenterPrime
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              ZenterPrime Solutions provides offline-first Windows accounting software for Indian retailers.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-slate-800 text-xs font-semibold py-2.5 rounded-[6px]"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Modals;
