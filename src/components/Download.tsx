import React, { useState } from 'react';
import { 
  Download, 
  Monitor, 
  Check, 
  ShieldCheck, 
  HardDrive, 
  ExternalLink,
  Cpu,
  FileCheck,
  Copy
} from 'lucide-react';
import { DOWNLOAD_EXE_URL } from './Modals';

export const DownloadSection: React.FC = () => {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [copiedChecksum, setCopiedChecksum] = useState(false);

  const checksumValue = 'e8b15fa316d2b49c0d381fc285c5b967a14e9f7823e592070dc823298c414fa9';

  const handleCopyChecksum = () => {
    navigator.clipboard.writeText(checksumValue);
    setCopiedChecksum(true);
    setTimeout(() => setCopiedChecksum(false), 2000);
  };

  const handleDownload = () => {
    setDownloadStarted(true);
    const link = document.createElement('a');
    link.href = DOWNLOAD_EXE_URL;
    link.download = 'ZenterPrime.Setup.7.3.0.exe';
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="download" className="py-20 md:py-22 bg-[#FCFCFD] border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
            Windows Desktop Distribution
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Download ZenterPrime 7.3 for Windows
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Standard standalone offline installer. No background service daemon, no telemetry bloat, and zero mandatory cloud sync.
          </p>
        </div>

        {/* Main Installer Box */}
        <div className="max-w-3xl mx-auto bg-white border border-[#E5E7EB] rounded-[8px] p-6 sm:p-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[6px] bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#6D28D9] shrink-0">
                <Monitor className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    ZenterPrime Desktop Installer
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    v7.3.0 Beta
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Filename: ZenterPrime.Setup.7.3.0.exe • Size: ~45.2 MB
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Supports Microsoft Windows 11 &amp; Windows 10 (64-bit)
                </p>
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-2">
              <button
                id="btn-download-installer-page"
                onClick={handleDownload}
                className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-5 py-2.5 rounded-[6px] text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download for Windows</span>
              </button>
              <a
                href="https://github.com/MilapsKhasi/Makzon-Developers/releases/tag/zenterprime-beta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-[#FCFCFD] border border-[#E5E7EB] py-1.5 px-3 rounded-[6px] text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Release Notes</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {downloadStarted && (
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-[6px] text-xs text-[#6D28D9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6D28D9]" />
                <span>Download initiated. Run <strong>ZenterPrime.Setup.7.3.0.exe</strong> after download completes.</span>
              </div>
              <span className="font-mono text-[10px]">Verified Package</span>
            </div>
          )}

          {/* System Requirements (3-Column Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs text-slate-600">
            <div className="p-3.5 bg-[#FCFCFD] border border-[#E5E7EB] rounded-[6px]">
              <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                <Monitor className="w-3.5 h-3.5 text-slate-500" />
                <span>Operating System</span>
              </div>
              <p className="text-xs text-slate-500">
                Windows 10 / 11 (64-bit)
              </p>
            </div>

            <div className="p-3.5 bg-[#FCFCFD] border border-[#E5E7EB] rounded-[6px]">
              <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                <Cpu className="w-3.5 h-3.5 text-slate-500" />
                <span>Memory</span>
              </div>
              <p className="text-xs text-slate-500">
                Minimum 4GB RAM
              </p>
            </div>

            <div className="p-3.5 bg-[#FCFCFD] border border-[#E5E7EB] rounded-[6px]">
              <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                <span>Storage</span>
              </div>
              <p className="text-xs text-slate-500">
                500MB Free Disk Space
              </p>
            </div>
          </div>

          {/* SHA256 Checksum Monospace Pill */}
          <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <FileCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>SHA256:</span>
              <span className="font-mono text-[11px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-[#E5E7EB] truncate max-w-[260px] sm:max-w-[340px]">
                {checksumValue}
              </span>
            </div>
            <button
              onClick={handleCopyChecksum}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#6D28D9] hover:text-[#5B21B6] cursor-pointer"
            >
              {copiedChecksum ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Checksum</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DownloadSection;
