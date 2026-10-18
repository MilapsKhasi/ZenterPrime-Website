import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Download, 
  Copy, 
  Check, 
  ArrowRight, 
  Laptop, 
  HelpCircle, 
  AlertCircle, 
  ExternalLink, 
  User 
} from 'lucide-react';
import { PlanDetails } from './PricingSection';

export type ModalType = 
  | 'get-started'
  | 'plan-development'
  | 'checkout'
  | 'trial-booking'
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

export const DOWNLOAD_EXE_URL = "https://github.com/MilapsKhasi/ZenterPrime-7.4/releases/download/release-7.4/ZenterPrime.Setup.7.4.0.exe";
export const GITHUB_RELEASE_PAGE_URL = "https://github.com/MilapsKhasi/ZenterPrime-7.4/releases/tag/release-7.4";
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
  successData 
}) => {
  const [downloadTriggered, setDownloadTriggered] = useState(false);

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
  const [demoNote, setDemoNote] = useState('');
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  // Contact form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Copy state
  const [copiedKey, setCopiedKey] = useState(false);

  useEffect(() => {
    if (activeModal === 'checkout' || activeModal === 'trial-booking' || activeModal === 'plan-development' || activeModal === 'get-started') {
      setIsSubmittingTrial(false);
      setTrialSubmitted(false);
      setDownloadTriggered(false);
    }
  }, [activeModal]);

  if (!activeModal) return null;

  const handleCopyLicense = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleDownloadExe = () => {
    setDownloadTriggered(true);
    try {
      const link = document.createElement('a');
      link.href = DOWNLOAD_EXE_URL;
      link.setAttribute('download', 'ZenterPrime.Setup.7.4.0.exe');
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      window.open(DOWNLOAD_EXE_URL, '_blank');
    }
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
        className="fixed inset-0 bg-slate-900/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-[8px] border border-[#E5E7EB] p-6 z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-[4px] hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 1. GET STARTED POPUP (TRIGGERED ONLY BY GENERAL 'GET STARTED' BUTTONS) */}
        {activeModal === 'get-started' && (
          <div id="get-started-popup-modal">
            <div className="mb-5">
              <span className="text-xs font-semibold text-[#4338ca] uppercase tracking-wider block mb-1">
                Evaluation Options
              </span>
              <h3 
                id="get-started-popup-title"
                className="text-xl font-normal text-slate-900 tracking-tight"
              >
                Get Started with ZenterPrime 7.4
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Choose how you want to evaluate ZenterPrime for your business:
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-5">
              
              {/* Option 1: Download ZenterPrime 7.4 */}
              <div className="bg-[#FCFDFE] border border-[#E5E7EB] rounded-[6px] p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-[4px] bg-[#4338ca] text-white flex items-center justify-center shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-normal text-slate-900">
                        Download ZenterPrime 7.4
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        ZenterPrime.Setup.7.4.0.exe (46.1 MB)
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Windows Desktop
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Full offline desktop application for Windows. Includes GST billing, inventory, customer ledger, and direct thermal printing.
                </p>

                <button
                  id="btn-download-zenterprime-74"
                  onClick={handleDownloadExe}
                  className="w-full bg-[#4338ca] hover:bg-[#5B21B6] text-white font-semibold py-2.5 px-4 rounded-[6px] text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ZenterPrime 7.4</span>
                </button>
              </div>

              {/* Option 2: Start 14-days web trial */}
              <div className="bg-[#FCFDFE] border border-[#E5E7EB] rounded-[6px] p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-[4px] bg-[#F3F4F6] text-[#4338ca] flex items-center justify-center shrink-0">
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
                  className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold py-2.5 px-4 rounded-[6px] text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start 14-days web trial</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>

            </div>

            {/* Download Initiated Banner */}
            {downloadTriggered && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-[6px] text-xs text-emerald-900">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Download started for ZenterPrime.Setup.7.4.0.exe</span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-1">
                  If the download didn&apos;t start automatically,{' '}
                  <a 
                    href={DOWNLOAD_EXE_URL} 
                    download="ZenterPrime.Setup.7.4.0.exe" 
                    className="font-semibold underline"
                  >
                    click here to direct download
                  </a>.
                </p>
              </div>
            )}

            {/* Release Link */}
            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-slate-500">
              <span>Release Tag: <code className="font-mono text-slate-700">zenterprime-beta</code></span>
              <a
                href={GITHUB_RELEASE_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4338ca] hover:underline font-medium inline-flex items-center gap-1"
              >
                <span>GitHub Releases</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* 2. PLANS GET STARTED POPUP (PLAN UNDER DEVELOPMENT - USE OR BOOK FREE TRIAL ON WEB) */}
        {(activeModal === 'plan-development' || activeModal === 'checkout' || activeModal === 'trial-booking') && (
          <div id="plan-development-modal">
            {trialSubmitted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-normal text-slate-900 mb-1">
                  Free Trial Registration Received
                </h3>
                <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                  We have registered your trial request for the <b>{selectedPlan.name}</b> tier. Confirmation has been scheduled for <b>{trialEmail}</b>.
                </p>

                <div className="space-y-2 text-left">
                  <a
                    href={TRIAL_WEB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#4338ca] hover:bg-[#5B21B6] text-white py-2.5 px-4 rounded-[6px] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Launch 14-Day Web Trial Now</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => { setTrialSubmitted(false); onClose(); }}
                    className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-slate-800 py-2 px-4 rounded-[6px] text-xs font-semibold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 p-3.5 bg-amber-50 border border-amber-200 rounded-[6px] flex items-start gap-2.5 text-left">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-normal text-amber-950">
                      Plan is Currently Under Development
                    </h4>
                    <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                      The <b>{selectedPlan.name}</b> ({selectedPlan.formattedPrice}) license is being finalized for desktop release. In the meantime, use or book the free trial on the web.
                    </p>
                  </div>
                </div>

                {/* Option 1: Web Trial */}
                <div className="bg-[#FCFDFE] border border-[#E5E7EB] rounded-[6px] p-3.5 mb-3 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">
                      Use 14-Days Free Trial on Web
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Instant Access
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    Test full invoices, customer ledgers, and reporting in your browser with zero installation.
                  </p>
                  <a
                    id="btn-use-free-trial-on-web"
                    href={TRIAL_WEB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#4338ca] hover:bg-[#5B21B6] text-white font-semibold py-2 px-4 rounded-[6px] text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Use Free Trial on Web Now</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Option 2: Book Form */}
                <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-3.5 text-left">
                  <span className="text-xs font-bold text-slate-900 block mb-1">
                    Book Free Trial / Contact Callback
                  </span>
                  <p className="text-xs text-slate-500 mb-3">
                    Reserve an assisted onboarding slot for your store:
                  </p>

                  <form onSubmit={handleTrialBookingSubmit} className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        id="plan-trial-name"
                        type="text"
                        required
                        value={trialName}
                        onChange={(e) => setTrialName(e.target.value)}
                        placeholder="Your Name *"
                        className="w-full bg-[#FCFDFE] border border-[#E5E7EB] focus:border-[#4338ca] rounded-[4px] px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                      <input
                        id="plan-trial-email"
                        type="email"
                        required
                        value={trialEmail}
                        onChange={(e) => setTrialEmail(e.target.value)}
                        placeholder="Email Address *"
                        className="w-full bg-[#FCFDFE] border border-[#E5E7EB] focus:border-[#4338ca] rounded-[4px] px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        id="plan-trial-phone"
                        type="tel"
                        value={trialPhone}
                        onChange={(e) => setTrialPhone(e.target.value)}
                        placeholder="Phone / WhatsApp"
                        className="w-full bg-[#FCFDFE] border border-[#E5E7EB] focus:border-[#4338ca] rounded-[4px] px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                      <input
                        id="plan-trial-business"
                        type="text"
                        value={trialBusiness}
                        onChange={(e) => setTrialBusiness(e.target.value)}
                        placeholder="Business Name"
                        className="w-full bg-[#FCFDFE] border border-[#E5E7EB] focus:border-[#4338ca] rounded-[4px] px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>

                    <button
                      id="btn-submit-plan-trial"
                      type="submit"
                      disabled={isSubmittingTrial}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-[6px] text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
                    >
                      {isSubmittingTrial ? (
                        <span>Registering Request...</span>
                      ) : (
                        <>
                          <span>Book Free Trial Callback</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. CONTACT DESK MODAL */}
        {activeModal === 'contact' && (
          <div>
            <div className="mb-5">
              <span className="text-xs font-semibold text-[#4338ca] uppercase tracking-wider block mb-1">
                Help &amp; Inquiries
              </span>
              <h3 className="text-xl font-normal text-slate-900">
                Contact ZenterPrime Support
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Reach our technical and sales desk for retail software inquiries.
              </p>
            </div>

            {contactSubmitted ? (
              <div className="text-center py-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-sm font-normal text-slate-900">Message Submitted</h4>
                <p className="text-xs text-slate-600 mb-4 mt-1">
                  We have logged your query and our desk will respond to <b>{contactEmail}</b> shortly.
                </p>
                <button
                  onClick={() => { setContactSubmitted(false); onClose(); }}
                  className="bg-[#4338ca] text-white px-4 py-2 rounded-[6px] text-xs font-semibold"
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
                    placeholder="e.g. Ramesh Patel"
                    className="w-full bg-[#FCFDFE] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-slate-900 focus:outline-none focus:border-[#4338ca]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="ramesh@retailstore.com"
                    className="w-full bg-[#FCFDFE] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-slate-900 focus:outline-none focus:border-[#4338ca]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Inquiry / Note</label>
                  <textarea
                    rows={3}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="How can we assist your business?"
                    className="w-full bg-[#FCFDFE] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-slate-900 focus:outline-none focus:border-[#4338ca] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4338ca] hover:bg-[#5B21B6] text-white font-semibold py-2.5 px-4 rounded-[6px] transition-colors cursor-pointer"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        )}

        {/* 4. ABOUT MODAL */}
        {activeModal === 'about' && (
          <div>
            <div className="mb-4">
              <span className="text-xs font-semibold text-[#4338ca] uppercase tracking-wider block mb-1">
                Company Profile
              </span>
              <h3 className="text-xl font-normal text-slate-900">
                About ZenterPrime Solutions
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              ZenterPrime is a dedicated retail business accounting software engineered for Indian shop owners, wholesalers, and billing counters. Built with an offline-first philosophy, ZenterPrime ensures that grocery stores, hardware merchants, pharmacy counters, and textile shops maintain uninterrupted billing regardless of internet availability.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Our software strictly complies with CBIC GST mandates, offering automatic tax splitting, standard HSN/SAC management, and one-click data backups.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-[6px] p-2.5 mb-4 text-[11px] text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-800">Notice:</span> ZenterPrime Solutions is currently an unregistered company that does not have a GST-registered firm, so purchasing a license will not include any GST.
            </div>
            <button
              onClick={onClose}
              className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-slate-800 text-xs font-semibold py-2 rounded-[6px]"
            >
              Close
            </button>
          </div>
        )}

        {/* 5. PRIVACY MODAL */}
        {activeModal === 'privacy' && (
          <div>
            <div className="mb-4">
              <span className="text-xs font-semibold text-[#4338ca] uppercase tracking-wider block mb-1">
                Security &amp; Data
              </span>
              <h3 className="text-xl font-normal text-slate-900">
                Privacy Policy - ZenterPrime
              </h3>
            </div>
            
            <div className="max-h-[65vh] overflow-y-auto pr-3 text-xs text-slate-700 space-y-3 leading-relaxed mb-5">
              <p className="text-[11px] text-slate-500 font-mono">Last updated: 18 October 2026</p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">About this policy</h4>
              <p>
                This Privacy Policy explains how ZenterPrime collects, uses, stores and handles information when you use the ZenterPrime accounting software, including its web-based application and, where applicable, its desktop edition.
              </p>
              <p>
                ZenterPrime is designed to help businesses manage accounting and day-to-day business records. Those records may contain information about the business itself, its owners, employees, customers, suppliers and other individuals. This policy covers information processed through the application and the services it relies on.
              </p>
              <p>
                Using accounting software involves handling information that may be commercially confidential or personally identifiable. We aim to explain what that means in practical terms rather than hide it behind broad legal language.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">Information you provide</h4>
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

              <h4 className="font-bold text-slate-900 text-sm pt-2">Account and authentication information</h4>
              <p>
                ZenterPrime uses account authentication to control access to the application. Depending on the version and features you use, this may involve your email address, authentication credentials, account identifiers and security-related information.
              </p>
              <p>
                The application may also use a security PIN, browser verification information or device and licence identifiers for account protection, device verification or licence management. The exact information involved depends on the feature and version being used.
              </p>
              <p>
                You should keep your credentials and security PIN confidential. Anyone who gains access to an authorised session or device may be able to access information available through that session.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">Information stored on your device</h4>
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

              <h4 className="font-bold text-slate-900 text-sm pt-2">Information stored on servers</h4>
              <p>
                The web application uses Supabase services for account authentication and database operations. Information submitted through the web application may therefore be transmitted to and stored on the relevant Supabase infrastructure.
              </p>
              <p>
                Server-side storage may include account-related information, business records, application settings, security or verification records and other information required by the features you use.
              </p>
              <p>
                The information held by the server depends on the application's database structure and the way each feature is implemented. Local storage and server storage are not necessarily identical.
              </p>
              <p>
                Supabase may process information as a service provider under its own infrastructure, security, privacy and service terms. Its role and the applicable processing arrangements should be reviewed alongside this policy.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">How we use information</h4>
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

              <h4 className="font-bold text-slate-900 text-sm pt-2">Data sharing and service providers</h4>
              <p>
                ZenterPrime may rely on third-party infrastructure or service providers to operate parts of the application. For example, the web application uses Supabase for authentication and database services.
              </p>
              <p>
                Where a service provider processes information on behalf of ZenterPrime, the information made available to that provider depends on the service and its configuration.
              </p>
              <p>
                Where a payment request is proceed, the information and the payment details process via third party service used Razorpay integration, and information related to payment and card detailed are not saved by ZenterPrime to it's database. Payment failures or errors during payments may occur by the third-party payment provider and in that cases, ZenterPrime won't be responsible.
              </p>
              <p>
                We should not claim that information is never shared with third parties until the application's integrations and operational arrangements have been reviewed.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">Data security</h4>
              <p>
                Access to accounting information should be restricted to authorised users. ZenterPrime's security measures may include authentication, access controls, database permissions, device verification and other safeguards, depending on the edition and feature.
              </p>
              <p>
                No internet-connected service or local device can be guaranteed to be completely secure. The effectiveness of a safeguard depends on its implementation and configuration.
              </p>
              <p>
                ZenterPrime accounts are strictly being told to setup their account's PIN, if the PIN is not setup or the account used or may have use in future by attackers will not have the responsibility of ZenterPrime as per our security terms October 2026.
              </p>
              <p>
                Users should protect their account credentials and devices, restrict access to authorised people and maintain appropriate backups of important business records.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">Data retention and deletion</h4>
              <p>
                Information may remain on a device or server for as long as it is needed to operate the application, maintain accounting records, manage an account or licence, resolve disputes, meet legal obligations or maintain required backups.
              </p>
              <p>
                Deleting a record from the application may not automatically remove every related copy, synchronised record, log or backup. The effect of deletion depends on the relevant feature and storage system.
              </p>
              <p>
                Account deletion feature is not built yet for ZenterPrime's 7.4 Desktop and Web edition, once an account created can't be deleted in 7.4 Desktop or Web edition. Future updates may change the policy rules of account safety and deletion features.
              </p>
              <p>
                Users should not assume that uninstalling the application or signing out deletes their server-side account or business records.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">Your responsibilities and choices</h4>
              <p>
                You are responsible for the accuracy of the information you enter, the people to whom you grant access and the lawful handling of personal information contained in your business records.
              </p>
              <p>
                Where the application provides editing, export or deletion features, you can use those features to manage the relevant information. The availability and effect of each action may differ between locally stored and server-stored records.
              </p>
              <p>
                You may contact ZenterPrime to ask about personal information associated with your account, request access or correction where applicable, or raise a concern about how information is handled. Any request will be handled in accordance with applicable law and the application's verified capabilities.
              </p>
              <p>
                All the account and business data accuracy and mistakes strongly refers to account holder where ZenterPrime won't take responsibility of GSTR reports mismatches, or any government issues happened by the invoice issuer.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">Children's information</h4>
              <p>
                ZenterPrime is intended for business accounting and related commercial use, not as a service directed at children. If you believe that personal information has been submitted through the application inappropriately, you may contact us so the matter can be reviewed.
              </p>
              <p>
                The age restrictions or face verifications won't be used by ZenterPrime,
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">Changes to this policy</h4>
              <p>
                This policy may be updated when the application's features, data practices or legal obligations change. The revised version will state its updated date. Where required by applicable law, users will be notified of material changes or asked to provide consent.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">Contact</h4>
              <p>For privacy questions, data requests or concerns about the handling of information through ZenterPrime, contact:</p>
              <p>
                <b>Business or legal entity:</b> ZenterPrime Solutions, India<br />
                <b>Privacy contact email:</b> zenterprime.solutions@gmail.com
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-slate-800 text-xs font-semibold py-2 rounded-[6px] cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* 6. TERMS MODAL */}
        {activeModal === 'terms' && (
          <div>
            <div className="mb-4">
              <span className="text-xs font-semibold text-[#4338ca] uppercase tracking-wider block mb-1">
                License Terms
              </span>
              <h3 className="text-xl font-normal text-slate-900">
                Terms of Service &amp; License
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              ZenterPrime lifetime licenses grant perpetual usage rights on authorized Windows computers. Software updates for statutory GST changes are included as outlined per plan terms.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Users are encouraged to maintain daily backups on external USB drives to guard against hardware crashes.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-slate-800 text-xs font-semibold py-2 rounded-[6px]"
            >
              Close
            </button>
          </div>
        )}

        {/* 7. LICENSE PURCHASE SUCCESS MODAL */}
        {activeModal === 'license-success' && successData && (
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-normal text-slate-900 mb-1">
              Payment Successful
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Receipt &amp; commercial key assigned to <b>{successData.email}</b>
            </p>

            <div className="bg-[#FCFDFE] border border-[#E5E7EB] rounded-[6px] p-3.5 mb-4 text-left">
              <div className="flex items-center justify-between mb-1 text-[11px] font-semibold text-slate-500 uppercase">
                <span>License Key ({successData.plan.name})</span>
                <span className="text-emerald-700">Active</span>
              </div>
              <div className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-[4px] p-2">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#4338ca]">
                  {successData.licenseKey}
                </span>
                <button
                  onClick={() => handleCopyLicense(successData.licenseKey)}
                  className="p-1 text-slate-500 hover:text-[#4338ca] rounded"
                  title="Copy Key"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={DOWNLOAD_EXE_URL}
                download="ZenterPrime.Setup.7.4.0.exe"
                className="flex-1 bg-[#4338ca] hover:bg-[#5B21B6] text-white py-2.5 px-3 rounded-[6px] text-xs font-semibold inline-flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Setup.exe</span>
              </a>
              <button
                onClick={onClose}
                className="bg-white border border-slate-300 text-slate-700 py-2 px-4 rounded-[6px] text-xs font-medium cursor-pointer"
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
