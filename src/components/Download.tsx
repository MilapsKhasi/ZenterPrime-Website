import React, { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { DOWNLOAD_EXE_URL } from './Modals';

export const DownloadSection: React.FC = () => {
  const [copiedChecksum, setCopiedChecksum] = useState(false);

  const checksumValue = 'e8b15fa316d2b49c0d381fc285c5b967a14e9f7823e592070dc823298c414fa9';

  const handleCopyChecksum = () => {
    navigator.clipboard.writeText(checksumValue);
    setCopiedChecksum(true);
    setTimeout(() => setCopiedChecksum(false), 2000);
  };

  const handleDownload = () => {
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
    <section id="download" className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header from Screenshot (16).png */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 tracking-tight">
            Download <span className="text-[#6D28D9]">ZenterPrime 7.3</span> for Windows
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Standard standalone offline installer. No background service daemon, no telemetry bloat, and zero mandatory cloud sync.
          </p>
        </div>

        {/* Main Installer Box matching Screenshot (16).png */}
        <div className="max-w-3xl mx-auto bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden shadow-2xs">
          
          {/* Top Row: ZenterPrime Installer & Download Button */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[6px] bg-[#6D28D9] text-white flex items-center justify-center font-bold text-xl shrink-0">
                Z
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-normal text-slate-900 leading-tight">
                  ZenterPrime Installer
                </h3>
                <span className="text-xs text-slate-500">
                  Version 7.3.0 • Standalone Setup (.exe)
                </span>
              </div>
            </div>

            <button
              id="btn-download-installer-page"
              onClick={handleDownload}
              className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-6 py-2.5 rounded-[6px] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download for Windows</span>
            </button>
          </div>

          {/* Bottom Row: 3 Equal Specification Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB] bg-[#FCFCFD]">
            {/* Box 1: Operating System */}
            <div className="p-5 sm:p-6 text-center">
              <span className="block text-sm font-bold text-slate-900 mb-1">
                Operating System
              </span>
              <span className="block text-xs text-slate-500 font-medium">
                Windows 10, 11
              </span>
            </div>

            {/* Box 2: Memory */}
            <div className="p-5 sm:p-6 text-center">
              <span className="block text-sm font-bold text-slate-900 mb-1">
                Memory
              </span>
              <span className="block text-xs text-slate-500 font-medium">
                Minimum 4GB of RAM
              </span>
            </div>

            {/* Box 3: Storage */}
            <div className="p-5 sm:p-6 text-center">
              <span className="block text-sm font-bold text-slate-900 mb-1">
                Storage
              </span>
              <span className="block text-xs text-slate-500 font-medium">
                Minimum 500-1GB Storage
              </span>
            </div>
          </div>

        </div>

        {/* SHA-256 Checksum verification block */}
        <div className="max-w-3xl mx-auto mt-4 px-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2 truncate max-w-full">
            <span className="font-semibold text-slate-600 shrink-0">SHA-256:</span>
            <span className="font-mono text-[11px] truncate">{checksumValue}</span>
          </div>
          <button
            onClick={handleCopyChecksum}
            className="shrink-0 inline-flex items-center gap-1.5 text-xs text-[#6D28D9] hover:underline font-medium cursor-pointer"
          >
            {copiedChecksum ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Hash</span>
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
};

export default DownloadSection;
