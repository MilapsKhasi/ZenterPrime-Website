import React from 'react';
import { WifiOff, Zap, HardDrive, Check, X } from 'lucide-react';
import { motion } from 'motion/react';

export const DesktopAdvantages: React.FC = () => {
  const advantages = [
    {
      id: 'offline-first',
      title: '100% Offline First',
      headline: 'Zero Internet Dependency',
      desktopStat: 'Uninterrupted billing during ISP cuts',
      cloudComparison: 'Cloud apps: Halted & spinning',
      bullets: [
        'Billing counter continues during fiber cuts',
        'Direct thermal receipt printing via USB/COM port',
        'No monthly data plan needed to run billing'
      ],
      icon: WifiOff
    },
    {
      id: 'fast-performance',
      title: 'Native Performance',
      headline: 'Instant Keyboard & Numpad Flow',
      desktopStat: '< 20ms local processing latency',
      cloudComparison: 'Cloud apps: 800ms+ network delay',
      bullets: [
        'Instant SKU barcode scans with zero lag',
        'Full keyboard shortcut coverage (F1 to F12)',
        'Lightweight on standard Dual-Core / 4GB RAM PCs'
      ],
      icon: Zap
    },
    {
      id: 'data-ownership',
      title: 'Full Data Ownership',
      headline: 'Stored Locally on Your Hard Drive',
      desktopStat: 'Encrypted SQLite on your hard disk',
      cloudComparison: 'Cloud apps: Data held on remote servers',
      bullets: [
        'Financial margins and customer data stay private',
        'No vendor lock-in or subscription account freezes',
        '1-Click backup to USB drive or local disk'
      ],
      icon: HardDrive
    }
  ];

  return (
    <section id="advantages" className="py-20 md:py-22 bg-[#FCFCFD] border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
            Reliability &amp; Control
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Desktop Software Advantages
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Why retail counters, wholesalers, and accountants rely on standalone Windows desktop applications over browser tabs.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {advantages.map((adv, idx) => {
            const IconComponent = adv.icon;
            return (
              <motion.div 
                key={adv.id}
                id={`card-adv-${adv.id}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="bg-white border border-[#E5E7EB] rounded-[8px] p-5 sm:p-6 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-8 h-8 rounded-[6px] bg-purple-50 text-[#6D28D9] border border-[#E5E7EB] flex items-center justify-center">
                      <IconComponent className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                      {adv.title}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">
                    {adv.headline}
                  </h3>

                  {/* Comparison Box */}
                  <div className="space-y-1.5 mb-4 p-3 bg-[#FCFCFD] border border-[#E5E7EB] rounded-[6px] text-xs">
                    <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                      <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span>{adv.desktopStat}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] line-through">
                      <X className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                      <span>{adv.cloudComparison}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] space-y-2">
                  {adv.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                      <span className="leading-normal">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default DesktopAdvantages;
