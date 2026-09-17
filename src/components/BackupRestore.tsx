import React, { useState } from 'react';
import { 
  Database, 
  Archive, 
  Usb, 
  RotateCcw, 
  ArrowRight, 
  Trash2, 
  Lock, 
  History, 
  ShieldCheck,
  CheckCircle2,
  Play,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BackupRestore: React.FC = () => {
  const [backupRunning, setBackupRunning] = useState(false);
  const [backupComplete, setBackupComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const startBackupSimulation = () => {
    if (backupRunning) return;
    setBackupRunning(true);
    setBackupComplete(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBackupRunning(false);
          setBackupComplete(true);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const workflow = [
    {
      step: '01',
      title: 'Local Database',
      desc: 'Encrypted SQLite on your PC drive',
      badge: 'Zero Cloud',
      icon: Database
    },
    {
      step: '02',
      title: '1-Click Backup',
      desc: 'Compresses to `.zpb` file snapshot',
      badge: 'Takes 1.2 sec',
      icon: Archive
    },
    {
      step: '03',
      title: 'USB Pen Drive',
      desc: 'Copy to external storage or pen drive',
      badge: 'Offline & Safe',
      icon: Usb
    },
    {
      step: '04',
      title: 'Instant Restore',
      desc: 'Seamless company & ledger recovery',
      badge: '100% Continuity',
      icon: RotateCcw
    }
  ];

  const features = [
    {
      title: 'Daily Auto-Prompts',
      highlight: 'End-of-day backup reminder on closing app',
      icon: Archive
    },
    {
      title: 'Historical Snapshots',
      highlight: 'Keep separate backups for each Financial Year',
      icon: History
    },
    {
      title: 'AES Data Encryption',
      highlight: 'Backups protected from external tampering',
      icon: Lock
    },
    {
      title: 'Voucher Recycle Bin',
      highlight: 'Undelete mistakenly removed invoices in 1 click',
      icon: Trash2
    }
  ];

  return (
    <section id="backup-restore" className="py-20 md:py-22 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
            Data Safety &amp; Business Continuity
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Data Security &amp; Company Backup
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Protect your shop records with instant local compression, USB drive export, and one-click data recovery.
          </p>
        </div>

        {/* Workflow Diagram Cards */}
        <div className="bg-[#FCFCFD] border border-[#E5E7EB] rounded-[8px] p-5 sm:p-6 mb-8">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#6D28D9]" />
              <span>Recommended Daily Backup Workflow</span>
            </div>
            <span className="text-[11px] font-normal text-slate-500 font-mono">
              Format: .zpb Archive
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {workflow.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.step}
                  className="bg-white border border-[#E5E7EB] rounded-[6px] p-4 flex flex-col justify-between relative"
                >
                  <div>
                    <div className="flex items-center justify-between w-full mb-3">
                      <div className="w-8 h-8 rounded-[4px] bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                        <IconComponent className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-slate-400">
                        {item.step}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E5E7EB] flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Benefit:</span>
                    <span className="font-semibold text-purple-700 font-mono bg-purple-50 px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  </div>

                  {idx < workflow.length - 1 && (
                    <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white border border-[#E5E7EB] items-center justify-center text-slate-400 shadow-2xs">
                      <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 1-Click Backup Test Widget */}
        <div className="bg-[#FCFCFD] border border-[#E5E7EB] rounded-[8px] p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[6px] bg-purple-100 text-[#6D28D9] flex items-center justify-center shrink-0">
              <Archive className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Test 1-Click Backup Speed
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Experience how fast ZenterPrime compresses your entire year's accounting records.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {backupRunning ? (
              <div className="w-48 bg-slate-200 rounded-full h-2.5 overflow-hidden border border-slate-300">
                <div 
                  className="bg-[#6D28D9] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            ) : backupComplete ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-[6px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Backup Saved (4.2 MB .zpb)</span>
              </span>
            ) : null}

            <button
              onClick={startBackupSimulation}
              disabled={backupRunning}
              className="bg-[#6D28D9] hover:bg-[#5B21B6] disabled:opacity-50 text-white px-4 py-2 text-xs font-semibold rounded-[6px] cursor-pointer inline-flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{backupRunning ? `Backing up (${progress}%)...` : backupComplete ? 'Run Again' : 'Run 1-Click Test'}</span>
            </button>
          </div>
        </div>

        {/* 4 Scannable Feature Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-[#E5E7EB] rounded-[6px] p-3.5 flex items-start gap-2.5"
              >
                <div className="w-6 h-6 rounded-[4px] bg-[#F3F4F6] text-[#6D28D9] flex items-center justify-center shrink-0 mt-0.5">
                  <IconComponent className="w-3.5 h-3.5 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                    {feat.highlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BackupRestore;
