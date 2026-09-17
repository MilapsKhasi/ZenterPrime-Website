import React from 'react';
import { 
  Settings2, 
  Package, 
  Calculator, 
  FileSpreadsheet, 
  ArrowRight,
  Layers,
  CircleDollarSign,
  FileCheck2,
  ReceiptText
} from 'lucide-react';
import { motion } from 'motion/react';

export const GstFeatures: React.FC = () => {
  const workflowSteps = [
    {
      step: '01',
      title: 'Enable GST',
      desc: 'Set 15-digit GSTIN and state code once in company settings.',
      icon: Settings2,
    },
    {
      step: '02',
      title: 'Create GST Items',
      desc: 'Assign HSN/SAC codes and tax slabs (0%, 5%, 12%, 18%, 28%).',
      icon: Package,
    },
    {
      step: '03',
      title: 'Auto CGST/SGST/IGST',
      desc: 'System detects customer state and computes intra/inter split.',
      icon: Calculator,
    },
    {
      step: '04',
      title: 'GST Reports',
      desc: 'Export audit-ready GSTR-1 and GSTR-3B summaries in one click.',
      icon: FileSpreadsheet,
    }
  ];

  const benefitCards = [
    {
      title: 'Item-Wise Tax Slabs',
      desc: 'Mix 0%, 5%, 12%, 18%, and 28% items seamlessly in a single sales voucher.',
      icon: Layers,
      color: 'text-[#6D28D9]',
      bg: 'bg-purple-50'
    },
    {
      title: 'Automatic Round-Off',
      desc: 'Eliminates paise calculation discrepancies to ensure perfectly balanced totals.',
      icon: CircleDollarSign,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50'
    },
    {
      title: 'HSN & SAC Masters',
      desc: 'Standardized rate directory for retail products and commercial service invoices.',
      icon: FileCheck2,
      color: 'text-blue-700',
      bg: 'bg-blue-50'
    },
    {
      title: 'ITC Reconciliation',
      desc: 'Track input tax credits accurately on all inward supplier bills for CA filing.',
      icon: ReceiptText,
      color: 'text-amber-700',
      bg: 'bg-amber-50'
    }
  ];

  return (
    <section id="gst-billing" className="py-20 md:py-22 bg-[#FCFCFD] border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
            Indian Tax Compliance
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            GST Made Practical &amp; Automated
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Configure your company once and let ZenterPrime handle tax rates, intra-state splits, and audit reports on your desktop.
          </p>
        </div>

        {/* Clean Horizontal Workflow (Enable GST -> Create GST Items -> Auto CGST/SGST/IGST -> GST Reports) */}
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-5 sm:p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {workflowSteps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={step.step}
                  className="bg-[#FCFCFD] border border-[#E5E7EB] rounded-[6px] p-4 flex flex-col justify-between relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-[4px] bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                        <IconComponent className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        STEP {step.step}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Desktop Step Flow Indicator */}
                  {idx < workflowSteps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-[#E5E7EB] items-center justify-center text-slate-400">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Four Concise Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {benefitCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="bg-white border border-[#E5E7EB] rounded-[8px] p-5 sm:p-6 flex flex-col justify-start h-full"
              >
                <div className={`w-8 h-8 rounded-[6px] ${card.bg} border border-[#E5E7EB] flex items-center justify-center ${card.color} mb-3 shrink-0`}>
                  <IconComponent className="w-4 h-4 stroke-[1.75]" />
                </div>

                <h4 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                  {card.title}
                </h4>
                
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default GstFeatures;
