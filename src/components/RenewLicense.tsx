import React, { useState } from 'react';
import { Search, RefreshCw, CheckCircle2, AlertCircle, Calendar, ShieldCheck, ArrowRight, ArrowLeft, Copy, Check, Sparkles, HelpCircle } from 'lucide-react';
import { fetchLicensesByEmail, renewSupabaseLicense, LicenseRecord, getLastDayOfUpcomingMonth } from '../lib/supabase';
import { DOWNLOAD_EXE_URL } from './Modals';

interface RenewLicenseProps {
  onBackToHome: () => void;
  onNavigateToPricing: () => void;
}

export const RenewLicense: React.FC<RenewLicenseProps> = ({ onBackToHome, onNavigateToPricing }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [licenses, setLicenses] = useState<LicenseRecord[]>([]);
  const [searchError, setSearchError] = useState('');
  
  // Renewal processing state
  const [renewingId, setRenewingId] = useState<string | null>(null);
  const [renewalSuccess, setRenewalSuccess] = useState<{
    licenseId: string;
    newExpiry: string;
  } | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const upcomingMonthEnd = getLastDayOfUpcomingMonth();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setSearchError('Please enter a valid registered email address');
      return;
    }

    setSearchError('');
    setLoading(true);
    setRenewalSuccess(null);

    const result = await fetchLicensesByEmail(email);
    setLoading(false);
    setSearched(true);

    if (result.success && result.data.length > 0) {
      setLicenses(result.data);
    } else {
      setLicenses([]);
      if (result.error && !result.data.length) {
        // Provide friendly message if no records found or query finished
        setSearchError(result.error);
      }
    }
  };

  const handleRenewPayment = async (license: LicenseRecord) => {
    setRenewingId(license.license_id);
    setSearchError('');

    // Simulate payment processing then update Supabase
    setTimeout(async () => {
      const res = await renewSupabaseLicense(license.license_id, license.registered_email || email);
      setRenewingId(null);

      if (res.success) {
        setRenewalSuccess({
          licenseId: license.license_id,
          newExpiry: res.newExpiry || upcomingMonthEnd,
        });

        // Update local license state
        setLicenses(prev => prev.map(item => {
          if (item.license_id === license.license_id) {
            return {
              ...item,
              expiry: res.newExpiry || upcomingMonthEnd,
              is_active: 'YES',
            };
          }
          return item;
        }));
      } else {
        setSearchError(res.error || 'Failed to complete renewal. Please try again.');
      }
    }, 1200);
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
          <div className="w-14 h-14 bg-purple-50 text-[#3b28cc] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xs">
            <RefreshCw className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-950 tracking-tight">
            Renew ZenterPrime License
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal mt-2">
            Extend your monthly subscription (₹499/mo) and keep your desktop ledger active without interruption.
          </p>
        </div>

        {/* Search by registered email form */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
          <label htmlFor="renew-email-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Enter Registered Email Address
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                id="renew-email-input"
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
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Find License</span>
                </>
              )}
            </button>
          </div>

          {searchError && (
            <div className="mt-3.5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}
        </form>

        {/* Renewal Success Notification */}
        {renewalSuccess && (
          <div className="max-w-xl mx-auto mb-8 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-base text-emerald-950 mb-1">License Successfully Renewed!</h4>
                <p className="text-xs sm:text-sm text-emerald-800 mb-2">
                  Payment of ₹499 processed. Your monthly license validity has been extended to <b>{renewalSuccess.newExpiry}</b> (End of upcoming month).
                </p>
                <div className="flex items-center gap-2 text-xs font-mono font-bold bg-white/80 border border-emerald-300 px-3 py-1.5 rounded-lg w-fit">
                  <span>{renewalSuccess.licenseId}</span>
                  <button
                    onClick={() => handleCopy(renewalSuccess.licenseId)}
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
                  Found Licenses ({licenses.length})
                </h3>

                {licenses.map((lic, index) => {
                  const isMonthly = lic.plan?.toLowerCase().includes('monthly');
                  const isActive = lic.is_active === 'YES' || lic.is_active === true;
                  const isProcessing = renewingId === lic.license_id;

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
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {isActive ? 'ACTIVE' : 'EXPIRED / INACTIVE'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            Registered to: <span className="font-medium text-slate-700">{lic.registered_email}</span>
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-xs font-semibold text-[#3b28cc] bg-purple-50 px-2.5 py-1 rounded-md">
                            {lic.plan || 'Standard Monthly'}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>Current Expiry: <b>{lic.expiry || (isMonthly ? 'End of Month' : 'LIFETIME')}</b></span>
                        </div>

                        {/* Renewal Action */}
                        {isMonthly ? (
                          <button
                            onClick={() => handleRenewPayment(lic)}
                            disabled={isProcessing}
                            className="bg-[#3b28cc] hover:bg-[#3120b0] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 disabled:opacity-75"
                          >
                            {isProcessing ? (
                              <>
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Processing ₹499 Renewal...</span>
                              </>
                            ) : (
                              <>
                                <span>Pay ₹499 &amp; Renew till {upcomingMonthEnd}</span>
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Lifetime Plan — No renewal required</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-900 mb-1">No Licenses Found</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mb-6">
                  No active or expired license was found registered under <b>{email}</b>.
                </p>
                <button
                  onClick={onNavigateToPricing}
                  className="bg-[#3b28cc] hover:bg-[#3120b0] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Purchase New License</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Machine ID Info Section */}
        <div className="mt-10 p-4 bg-purple-50/70 border border-purple-100 rounded-2xl text-xs text-slate-700">
          <h4 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#3b28cc]" />
            <span>How to check your Device Machine ID:</span>
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
            Open <b>ZenterPrime Desktop</b> &gt; go to <b>Settings</b> &gt; open the <b>&apos;About&apos;</b> tab &gt; look for the <b>&apos;Machine ID&apos;</b> displayed directly below the license tag.
          </p>
          <p className="text-[11px] text-slate-500 bg-white border border-purple-200/60 rounded-lg p-2">
            <span className="font-medium text-slate-700">Tip:</span> Your Machine ID helps uniquely identify your PC when renewing or reactivating licenses.
          </p>
        </div>

        {/* Help footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Supabase PostgreSQL License Verification</span>
          </div>
          <a
            href={DOWNLOAD_EXE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3b28cc] hover:underline font-medium cursor-pointer"
          >
            Download ZenterPrime.Setup.7.3.0.exe
          </a>
        </div>

      </div>

    </div>
  );
};
export default RenewLicense;
