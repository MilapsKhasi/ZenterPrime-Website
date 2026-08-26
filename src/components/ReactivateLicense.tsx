import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Copy, Check, Zap, HelpCircle, Laptop } from 'lucide-react';
import { fetchLicensesByEmail, reactivateSupabaseLicense, LicenseRecord } from '../lib/supabase';
import { DOWNLOAD_EXE_URL } from './Modals';

interface ReactivateLicenseProps {
  onBackToHome: () => void;
  onNavigateToPricing: () => void;
  onContactSupport: () => void;
}

export const ReactivateLicense: React.FC<ReactivateLicenseProps> = ({
  onBackToHome,
  onNavigateToPricing,
  onContactSupport,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [licenses, setLicenses] = useState<LicenseRecord[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Reactivation action states
  const [reactivatingId, setReactivatingId] = useState<string | null>(null);
  const [reactivatedSuccess, setReactivatedSuccess] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid registered email address');
      return;
    }

    setErrorMessage('');
    setLoading(true);
    setReactivatedSuccess(null);

    const result = await fetchLicensesByEmail(email);
    setLoading(false);
    setSearched(true);

    if (result.success && result.data.length > 0) {
      setLicenses(result.data);
    } else {
      setLicenses([]);
      if (result.error && !result.data.length) {
        setErrorMessage(result.error);
      }
    }
  };

  const handleReactivate = async (license: LicenseRecord) => {
    setReactivatingId(license.license_id);
    setErrorMessage('');

    setTimeout(async () => {
      const res = await reactivateSupabaseLicense(license.license_id, license.registered_email || email);
      setReactivatingId(null);

      if (res.success) {
        setReactivatedSuccess(license.license_id);

        // Update local license state
        setLicenses(prev => prev.map(item => {
          if (item.license_id === license.license_id) {
            return {
              ...item,
              is_active: 'YES',
            };
          }
          return item;
        }));
      } else {
        setErrorMessage(res.error || 'Failed to submit activation request. Please try again.');
      }
    }, 1000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Back button */}
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#3b28cc] font-medium mb-8 cursor-pointer group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Home</span>
      </button>

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xs">
            <Zap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-950 tracking-tight">
            License Reactivation Portal
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal mt-2">
            Validate your registered email to submit an activation request and restore your ZenterPrime desktop access.
          </p>
        </div>

        {/* Email Search Form */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
          <label htmlFor="reactivate-email-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Registered Email Address
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                id="reactivate-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@business.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#3b28cc] focus:ring-1 focus:ring-[#3b28cc] shadow-2xs"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#3b28cc] hover:bg-[#3120b0] text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 disabled:opacity-75"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Verify Email</span>
                </>
              )}
            </button>
          </div>

          {errorMessage && (
            <div className="mt-3.5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        {/* Reactivation Success Banner */}
        {reactivatedSuccess && (
          <div className="max-w-xl mx-auto mb-8 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-base text-emerald-950 mb-1">License Successfully Reactivated!</h4>
                <p className="text-xs sm:text-sm text-emerald-800 mb-2">
                  Status in Supabase has been updated to <b>YES (Active)</b>. You can now activate your desktop application.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono font-bold bg-white/80 border border-emerald-300 px-3 py-1.5 rounded-lg w-fit">
                  <span>{reactivatedSuccess}</span>
                  <button
                    onClick={() => handleCopy(reactivatedSuccess)}
                    className="p-1 hover:text-[#3b28cc] cursor-pointer"
                    title="Copy License ID"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searched && (
          <div className="max-w-2xl mx-auto">
            {licenses.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Associated Licenses ({licenses.length})
                </h3>

                {licenses.map((lic, index) => {
                  const isActive = lic.is_active === 'YES' || lic.is_active === true;
                  const isProcessing = reactivatingId === lic.license_id;

                  return (
                    <div 
                      key={lic.license_id || index}
                      className="border border-slate-200 bg-slate-50/70 rounded-2xl p-5 sm:p-6 transition-all hover:border-[#3b28cc]/40 hover:bg-white shadow-2xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                        <div>
                          <div className="flex items-center gap-2.5 mb-1">
                            <span className="font-mono text-base font-bold text-slate-950">
                              {lic.license_id}
                            </span>
                            <span 
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                isActive 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {isActive ? 'ACTIVE (YES)' : 'DEACTIVATED (NO)'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            Registered Email: <span className="font-medium text-slate-700">{lic.registered_email}</span>
                          </p>
                        </div>

                        <div>
                          <span className="text-xs font-semibold text-[#3b28cc] bg-purple-50 px-2.5 py-1 rounded-md">
                            {lic.plan || 'Standard Edition'}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="text-xs text-slate-600">
                          <span>Expiry: <b>{lic.expiry || 'LIFETIME'}</b></span>
                        </div>

                        {/* Reactivate Action */}
                        {!isActive ? (
                          <button
                            onClick={() => handleReactivate(lic)}
                            disabled={isProcessing}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 disabled:opacity-75"
                          >
                            {isProcessing ? (
                              <>
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Submitting Request...</span>
                              </>
                            ) : (
                              <>
                                <Zap className="w-4 h-4" />
                                <span>Submit Activation Request</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>License is Active &amp; Ready</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <ShieldAlert className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-900 mb-1">No Licenses Found</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mb-6">
                  We could not find any license records for <b>{email}</b>.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={onNavigateToPricing}
                    className="w-full sm:w-auto bg-[#3b28cc] hover:bg-[#3120b0] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>View Pricing Plans</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onContactSupport}
                    className="w-full sm:w-auto bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium cursor-pointer"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Steps to activate on desktop and find Machine ID */}
        <div className="mt-12 space-y-4">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-[#3b28cc]" />
              <span>How Desktop License Activation Works:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
              <li>Ensure your license status displays <b>ACTIVE (YES)</b> above.</li>
              <li>Launch <b>ZenterPrime 7.3 Desktop</b> on your Windows PC.</li>
              <li>Go to <b>Settings &gt; Your PC &gt; Activate License</b>.</li>
              <li>Paste your License Key and click <b>Activate</b>. The app will verify with Supabase and unlock immediately.</li>
            </ol>
          </div>

          <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-2xl text-xs text-slate-700">
            <h4 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#3b28cc]" />
              <span>How to check your Device Machine ID:</span>
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
              On your computer, open <b>ZenterPrime Desktop</b> &gt; go to <b>Settings</b> &gt; open the <b>&apos;About&apos;</b> tab &gt; look for the <b>&apos;Machine ID&apos;</b> listed directly below the license tag.
            </p>
            <p className="text-[11px] text-slate-500 bg-white border border-purple-200/60 rounded-lg p-2">
              <span className="font-medium text-slate-700">Note:</span> Your Machine ID can be used for reactivating deactivated licenses, renewing existing subscriptions, or licensing additional copies on an existing machine.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
export default ReactivateLicense;
