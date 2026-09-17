import React, { useState } from 'react';
import { 
  Laptop, 
  Send, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight, 
  Key, 
  RefreshCw, 
  FileText,
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView } from './Navbar';

interface LicenseSectionProps {
  onNavigate: (view: AppView) => void;
}

export const LicenseSection: React.FC<LicenseSectionProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: '01',
      title: 'Owner PC Setup',
      desc: 'Master PC acts as central license administrator.',
      badge: 'Admin Terminal',
      icon: Laptop,
      detail: 'Holds commercial key & coordinates local ledger sync'
    },
    {
      step: '02',
      title: 'Counter Pair Request',
      desc: 'Cashier PC generates a 6-digit hardware pairing code.',
      badge: 'Local Request',
      icon: Send,
      detail: 'Hardware fingerprint verified on local LAN without internet'
    },
    {
      step: '03',
      title: 'Instant 1-Click Approve',
      desc: 'Owner terminal approves counter with one click.',
      badge: 'Security Check',
      icon: CheckCircle,
      detail: 'Prevents unauthorized laptops from joining shop books'
    },
    {
      step: '04',
      title: 'Authorized Counter',
      desc: 'Billing machine connects to local database immediately.',
      badge: 'Active & Verified',
      icon: ShieldCheck,
      detail: 'Zero setup delays, high-speed multi-counter billing'
    }
  ];

  return (
    <section id="licensing" className="py-20 md:py-22 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
            Software Architecture &amp; Security
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Device Pairing &amp; License Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Authorize multi-counter billing terminals safely across your shop network with zero complex network configuration.
          </p>
        </div>

        {/* Visual Workflow Documentation Container */}
        <div className="bg-[#FCFCFD] border border-[#E5E7EB] rounded-[8px] p-5 sm:p-6 mb-8">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB] text-xs">
            <div className="flex items-center gap-1.5">
              <Network className="w-4 h-4 text-[#6D28D9]" />
              <span className="font-bold text-slate-900 uppercase tracking-wider">
                LAN Pairing Protocol
              </span>
            </div>
            <span className="font-mono text-slate-500 text-[11px] hidden sm:inline-block">
              RSA 2048-bit Local Handshake
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {steps.map((item, index) => {
              const IconComponent = item.icon;
              const isSelected = activeStep === index;
              return (
                <div 
                  key={item.step}
                  onClick={() => setActiveStep(index)}
                  className={`border rounded-[6px] p-4 flex flex-col justify-between cursor-pointer transition-colors relative ${
                    isSelected 
                      ? 'bg-purple-50/50 border-[#6D28D9]' 
                      : 'bg-white border-[#E5E7EB] hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-[4px] flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#6D28D9] text-white' : 'bg-[#F3F4F6] text-[#6D28D9]'
                      }`}>
                        <IconComponent className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <span className="text-[10px] font-semibold text-purple-700 font-mono bg-purple-50 px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E5E7EB] flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Step {item.step}</span>
                    <span className="text-slate-600 font-sans">{item.detail}</span>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white border border-[#E5E7EB] items-center justify-center text-slate-400 shadow-2xs">
                      <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* License Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-[#FCFCFD] border border-[#E5E7EB] rounded-[8px] flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Key className="w-4 h-4 text-[#6D28D9] stroke-[1.75]" />
                <h4 className="text-sm font-bold text-slate-900">
                  Activate Existing License
                </h4>
              </div>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Purchased a license or re-installing Windows? Reactivate your commercial product key in seconds.
              </p>
              <button
                id="btn-license-reactivate"
                onClick={() => onNavigate('reactivate')}
                className="text-xs font-semibold text-[#6D28D9] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>License Activation Portal</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-5 bg-[#FCFCFD] border border-[#E5E7EB] rounded-[8px] flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <RefreshCw className="w-4 h-4 text-[#6D28D9] stroke-[1.75]" />
                <h4 className="text-sm font-bold text-slate-900">
                  Renew Annual Compliance Support
                </h4>
              </div>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Stay updated with new GST Council tax rules and continuous technical desk assistance.
              </p>
              <button
                id="btn-license-renew"
                onClick={() => onNavigate('renew')}
                className="text-xs font-semibold text-[#6D28D9] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Renew Support Subscription</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LicenseSection;
