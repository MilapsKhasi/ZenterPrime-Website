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

export const DOWNLOAD_EXE_URL = "https://github.com/MilapsKhasi/Makzon-Developers/releases/download/zenterprime-beta/ZenterPrime.Setup.7.3.0.exe";
export const GITHUB_RELEASE_PAGE_URL = "https://github.com/MilapsKhasi/Makzon-Developers/releases/tag/zenterprime-beta";
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
      link.setAttribute('download', 'ZenterPrime.Setup.7.3.0.exe');
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
              <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
                Evaluation Options
              </span>
              <h3 
                id="get-started-popup-title"
                className="text-xl font-normal text-slate-900 tracking-tight"
              >
                Get Started with ZenterPrime 7.3
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Choose how you want to evaluate ZenterPrime for your business:
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-5">
              
              {/* Option 1: Download ZenterPrime 7.3 */}
              <div className="bg-[#FCFDFE] border border-[#E5E7EB] rounded-[6px] p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-[4px] bg-[#6D28D9] text-white flex items-center justify-center shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-normal text-slate-900">
                        Download ZenterPrime 7.3
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        ZenterPrime.Setup.7.3.0.exe (45.2 MB)
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
                  id="btn-download-zenterprime-73"
                  onClick={handleDownloadExe}
                  className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-semibold py-2.5 px-4 rounded-[6px] text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ZenterPrime 7.3</span>
                </button>
              </div>

              {/* Option 2: Start 14-days web trial */}
              <div className="bg-[#FCFDFE] border border-[#E5E7EB] rounded-[6px] p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-[4px] bg-[#F3F4F6] text-[#6D28D9] flex items-center justify-center shrink-0">
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
                  <span>Download started for ZenterPrime.Setup.7.3.0.exe</span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-1">
                  If the download didn&apos;t start automatically,{' '}
                  <a 
                    href={DOWNLOAD_EXE_URL} 
                    download="ZenterPrime.Setup.7.3.0.exe" 
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
                className="text-[#6D28D9] hover:underline font-medium inline-flex items-center gap-1"
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
                    className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white py-2.5 px-4 rounded-[6px] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
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
                    className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-semibold py-2 px-4 rounded-[6px] text-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
                        className="w-full bg-[#FCFDFE] border border-[#E5E7EB] focus:border-[#6D28D9] rounded-[4px] px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                      <input
                        id="plan-trial-email"
                        type="email"
                        required
                        value={trialEmail}
                        onChange={(e) => setTrialEmail(e.target.value)}
                        placeholder="Email Address *"
                        className="w-full bg-[#FCFDFE] border border-[#E5E7EB] focus:border-[#6D28D9] rounded-[4px] px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        id="plan-trial-phone"
                        type="tel"
                        value={trialPhone}
                        onChange={(e) => setTrialPhone(e.target.value)}
                        placeholder="Phone / WhatsApp"
                        className="w-full bg-[#FCFDFE] border border-[#E5E7EB] focus:border-[#6D28D9] rounded-[4px] px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                      <input
                        id="plan-trial-business"
                        type="text"
                        value={trialBusiness}
                        onChange={(e) => setTrialBusiness(e.target.value)}
                        placeholder="Business Name"
                        className="w-full bg-[#FCFDFE] border border-[#E5E7EB] focus:border-[#6D28D9] rounded-[4px] px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
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
              <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
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
                  className="bg-[#6D28D9] text-white px-4 py-2 rounded-[6px] text-xs font-semibold"
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
                    className="w-full bg-[#FCFDFE] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-slate-900 focus:outline-none focus:border-[#6D28D9]"
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
                    className="w-full bg-[#FCFDFE] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-slate-900 focus:outline-none focus:border-[#6D28D9]"
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
                    className="w-full bg-[#FCFDFE] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-slate-900 focus:outline-none focus:border-[#6D28D9] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-semibold py-2.5 px-4 rounded-[6px] transition-colors cursor-pointer"
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
              <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
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
              <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
                Security &amp; Data
              </span>
              <h3 className="text-xl font-normal text-slate-900">
                Privacy &amp; Data Ownership
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Because ZenterPrime is a native Windows desktop application, your financial books, customer lists, profit margins, and sales vouchers reside strictly on your local PC storage. We do not upload your business ledgers to third-party ad networks or external analytics servers.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              License keys are validated securely during activation. Backup files created by the software are encrypted and stay under your exclusive physical control.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-slate-800 text-xs font-semibold py-2 rounded-[6px]"
            >
              Close
            </button>
          </div>
        )}

        {/* 6. TERMS MODAL */}
        {activeModal === 'terms' && (
          <div>
            <div className="mb-4">
              <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
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
                <span className="font-mono text-xs sm:text-sm font-bold text-[#6D28D9]">
                  {successData.licenseKey}
                </span>
                <button
                  onClick={() => handleCopyLicense(successData.licenseKey)}
                  className="p-1 text-slate-500 hover:text-[#6D28D9] rounded"
                  title="Copy Key"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={DOWNLOAD_EXE_URL}
                download="ZenterPrime.Setup.7.3.0.exe"
                className="flex-1 bg-[#6D28D9] hover:bg-[#5B21B6] text-white py-2.5 px-3 rounded-[6px] text-xs font-semibold inline-flex items-center justify-center gap-1.5"
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
