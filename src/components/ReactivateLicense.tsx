import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { fetchLicensesByEmail, LicenseRecord } from '../lib/supabase';

interface ReactivateLicenseProps {
  onBackToHome?: () => void;
  onNavigateToPricing?: () => void;
  onContactSupport?: () => void;
}

interface DisplayLicense {
  plan: string;
  license_id: string;
}

export const ReactivateLicense: React.FC<ReactivateLicenseProps> = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [licenses, setLicenses] = useState<DisplayLicense[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      
      // Query Supabase for real existing licenses registered with this email
      const result = await fetchLicensesByEmail(cleanEmail);
      setLoading(false);

      if (result.success && result.data && result.data.length > 0) {
        setLicenses(
          result.data.map((lic: LicenseRecord) => ({
            plan: lic.plan || 'Standard License',
            license_id: lic.license_id
          }))
        );
        setVerified(true);
      } else if (result.success && (!result.data || result.data.length === 0)) {
        setVerified(false);
        setLicenses([]);
        setErrorMessage('No registered license found for this email address.');
      } else {
        setVerified(false);
        setLicenses([]);
        setErrorMessage(result.error || 'Unable to fetch licenses. Please try again later.');
      }
    } catch (err: any) {
      setLoading(false);
      setVerified(false);
      setLicenses([]);
      setErrorMessage(err?.message || 'Unable to connect to license service. Please try again.');
    }
  };

  const handleCopy = (licenseId: string) => {
    navigator.clipboard.writeText(licenseId);
    setCopiedId(licenseId);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="flex-1 bg-white min-h-[calc(100vh-70px)] flex flex-col items-center pt-16 sm:pt-24 pb-28 px-4">
      {/* Centered Heading */}
      <h1 className="text-2xl sm:text-[32px] font-normal text-[#111827] tracking-tight text-center mb-8">
        Reactivate your existing License
      </h1>

      {/* Main Container - 400px width */}
      <div className="w-full max-w-[400px] mx-auto">
        <form onSubmit={handleVerify} className="w-full">
          {/* Input field with Verified badge */}
          <div className="relative flex items-center">
            <input
              id="reactivate-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (verified) setVerified(false);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Enter registered email"
              className={`w-full h-11 px-4 text-sm text-slate-900 rounded-[6px] bg-white transition-colors outline-none ${
                verified 
                  ? 'border border-[#10b981] pr-28 ring-0' 
                  : 'border border-[#D1D5DB] focus:border-[#6D28D9]'
              }`}
            />

            {/* Verified badge inside input */}
            {verified && (
              <div 
                id="email-verified-badge"
                className="absolute right-2.5 flex items-center gap-1 bg-[#10b981] text-white text-xs font-medium px-2.5 py-1 rounded-[4px] select-none pointer-events-none"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Verified</span>
              </div>
            )}
          </div>

          {errorMessage && (
            <p className="text-xs text-red-500 mt-1.5 pl-1">
              {errorMessage}
            </p>
          )}

          {/* Verify Email button */}
          <button
            id="verify-email-button"
            type="submit"
            disabled={loading}
            className="w-full h-11 mt-3.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-medium rounded-[6px] transition-colors flex items-center justify-center cursor-pointer active:scale-[0.99] disabled:opacity-80"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              <span>Verify Email</span>
            )}
          </button>
        </form>

        {/* Available Licenses Section (Screenshot 22) */}
        {verified && licenses.length > 0 && (
          <div className="mt-9 sm:mt-10 animate-in fade-in duration-200">
            <h2 className="text-sm font-normal text-[#6B7280] mb-3">
              Available License(s)
            </h2>

            <div className="space-y-3.5">
              {licenses.map((lic, index) => (
                <div
                  key={lic.license_id || index}
                  onClick={() => handleCopy(lic.license_id)}
                  className="bg-white border border-[#E5E7EB] rounded-[8px] p-4 sm:p-5 transition-all hover:border-[#6D28D9]/40 cursor-pointer relative group"
                  title="Click to copy License Key"
                >
                  <p className="text-xs sm:text-sm text-slate-700 font-normal">
                    {lic.plan}
                  </p>
                  <p className="text-base sm:text-[17px] font-bold text-[#6D28D9] tracking-wide mt-2">
                    {lic.license_id}
                  </p>
                  
                  {/* Subtle copy notification */}
                  {copiedId === lic.license_id && (
                    <span className="absolute top-4 right-4 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Copied!
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactivateLicense;
