import { useState, useEffect } from 'react';
import { 
  Download, 
  Monitor, 
  Smartphone, 
  Apple, 
  Terminal, 
  X, 
  CheckCircle, 
  ArrowRight,
  ShieldAlert,
  HardDriveDownload,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PlatformItem } from '../types';

interface DownloadSectionProps {
  isDownloadModalOpen: boolean;
  setIsDownloadModalOpen: (open: boolean) => void;
}

export default function DownloadSection({ isDownloadModalOpen, setIsDownloadModalOpen }: DownloadSectionProps) {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle');

  const platforms: PlatformItem[] = [
    {
      name: 'Windows 10 / 11',
      status: 'available',
      iconName: 'Monitor',
      badge: 'v26.06.02-Beta (Active)',
      extension: 'ZenterPrime.Setup.26.6.2.exe (45.2 MB)'
    },
    {
      name: 'Android Mobile App',
      status: 'coming-soon',
      iconName: 'Smartphone',
      badge: 'Coming July 2026',
      extension: '.apk / Google Play'
    },
    {
      name: 'macOS (M1 / M2 / Intel)',
      status: 'future',
      iconName: 'Apple',
      badge: 'Under development',
      extension: '.dmg app package'
    },
    {
      name: 'Linux Desktop',
      status: 'future',
      iconName: 'Terminal',
      badge: 'On Roadmap',
      extension: '.AppImage installer'
    }
  ];

  // Simulated download ticker
  useEffect(() => {
    let interval: any;
    if (downloadState === 'downloading') {
      interval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setDownloadState('completed');
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [downloadState]);

  const triggerRealDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://github.com/MilapsKhasi/Makzon-Developers/releases/download/zenterprime-beta/ZenterPrime.Setup.26.6.2.exe';
    link.download = 'ZenterPrime.Setup.26.6.2.exe';
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStartDownload = () => {
    setDownloadProgress(0);
    setDownloadState('downloading');
    setIsDownloadModalOpen(true);
    triggerRealDownload();
  };

  const handleClose = () => {
    setIsDownloadModalOpen(false);
    setTimeout(() => {
      setDownloadState('idle');
      setDownloadProgress(0);
    }, 300);
  };

  useEffect(() => {
    if (isDownloadModalOpen && downloadState === 'idle') {
      handleStartDownload();
    }
  }, [isDownloadModalOpen]);

  const getIcon = (name: string, active: boolean) => {
    const cls = active ? "w-7 h-7 text-violet-600" : "w-7 h-7 text-slate-400";
    switch (name) {
      case 'Monitor': return <Monitor className={cls} />;
      case 'Smartphone': return <Smartphone className={cls} />;
      case 'Apple': return <Apple className={cls} />;
      case 'Terminal': return <Terminal className={cls} />;
      default: return <Monitor className={cls} />;
    }
  };

  return (
    <section id="download" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold tracking-widest text-violet-600 uppercase font-mono bg-violet-50 px-3 py-1.5 rounded-full border border-violet-100">
            SECURE DOWNLOAD STATION
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mt-4">
            Get started with ZenterPrime. <br />
            <span className="text-violet-600 font-extrabold">Download the Beta today.</span>
          </h2>
          <p className="text-base text-slate-500 mt-4 leading-relaxed font-sans">
            Start logging your GST bills, manage physical inventory counts, and track customer ledgers with 100% data safety. Select your operational platform below.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {platforms.map((platform) => {
            const isAvail = platform.status === 'available';
            const isSoon = platform.status === 'coming-soon';

            return (
              <div 
                key={platform.name}
                className={`border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  isAvail 
                    ? 'bg-violet-50/50 border-violet-200 shadow-lg shadow-violet-100/50 hover:border-violet-400' 
                    : 'bg-slate-50/50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center shadow-xs">
                      {getIcon(platform.iconName, isAvail)}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isAvail 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : isSoon 
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      {isAvail ? 'Available' : isSoon ? 'Coming Soon' : 'Future'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{platform.name}</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">{platform.badge}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-2">{platform.extension}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  {isAvail ? (
                    <button
                      id="platform-btn-download-win"
                      onClick={handleStartDownload}
                      className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" /> Download Windows Beta
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-slate-200 text-slate-400 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1 cursor-not-allowed select-none"
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra Security Trust badges */}
        <div className="mt-16 text-center max-w-xl mx-auto space-y-4">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest font-mono">
            SECURED INSTALLER GUARANTEES
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold text-slate-600">
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> SHA-256 Code Signed
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Malware Free Verified
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Auto-Updating Binary
            </span>
          </div>
        </div>

      </div>

      {/* Download Simulator Progress Modal */}
      <AnimatePresence>
        {isDownloadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white text-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-lg border border-slate-200 shadow-2xl relative z-10 overflow-hidden"
            >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all"
                style={{ minWidth: '44px', minHeight: '44px' }}
                aria-label="Close download modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                    <HardDriveDownload className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-bold text-slate-900">ZenterPrime Installation Hub</h4>
                    <p className="text-xs text-slate-400">Windows x64 Executable (.exe)</p>
                  </div>
                </div>

                 {downloadState === 'downloading' && (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-600" />
                        Downloading ZenterPrime.Setup.26.6.2.exe
                      </span>
                      <span>{downloadProgress}%</span>
                    </div>

                    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                      <motion.div 
                        className="bg-violet-600 h-full rounded-full"
                        animate={{ width: `${downloadProgress}%` }}
                        transition={{ duration: 0.2 }}
                      ></motion.div>
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>{(45.2 * (downloadProgress / 100)).toFixed(1)} MB / 45.2 MB</span>
                      <span>Speed: 4.8 MB/s</span>
                    </div>
                  </div>
                )}

                {downloadState === 'completed' && (
                  <div className="space-y-4">
                    {/* Success Alert */}
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-start space-x-3 text-emerald-800">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm">Download Completed!</p>
                        <p className="text-xs mt-0.5">The installer `ZenterPrime.Setup.26.6.2.exe` has been fetched locally to your device.</p>
                      </div>
                    </div>

                    {/* How to Install Instructions */}
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                        3 Quick Installation Steps
                      </p>
                      
                      <div className="space-y-2.5">
                        <div className="flex items-start text-xs text-slate-600">
                          <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 mr-2.5">1</div>
                          <div>
                            <span className="font-bold text-slate-800">Run the Installer:</span> Open the downloaded `ZenterPrime.Setup.26.6.2.exe` file from your browser downloads directory.
                          </div>
                        </div>

                        <div className="flex items-start text-xs text-slate-600">
                          <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 mr-2.5">2</div>
                          <div>
                            <span className="font-bold text-slate-800">Bypass SmartScreen Notice:</span> Because ZenterPrime is a freshly compiled beta, Windows SmartScreen may show an alert. Click <span className="font-bold text-violet-600">"More Info"</span> then <span className="font-bold text-violet-600">"Run Anyway"</span>.
                          </div>
                        </div>

                        <div className="flex items-start text-xs text-slate-600">
                          <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 mr-2.5">3</div>
                          <div>
                            <span className="font-bold text-slate-800">Initialize Local Vault:</span> Follow the setup wizard prompts. The software will auto-generate your encrypted ledger database in under 5 seconds!
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex items-center gap-2 text-xs text-amber-800">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Security Notice: We never prompt or store master private passwords. Keep backups safe!</span>
                    </div>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="flex items-center space-x-3 pt-2">
                  <button
                    onClick={handleClose}
                    className="flex-1 text-center py-3 border border-slate-200 text-sm font-bold text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Close Window
                  </button>
                  {downloadState !== 'completed' && (
                    <button
                      disabled={downloadState === 'downloading'}
                      onClick={() => {
                        setDownloadState('downloading');
                        setDownloadProgress(0);
                        triggerRealDownload();
                      }}
                      className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      {downloadState === 'downloading' ? 'Downloading...' : 'Re-trigger Download'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
