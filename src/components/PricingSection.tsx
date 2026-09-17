import React from 'react';
import { Check, ShieldCheck, HelpCircle } from 'lucide-react';

export type PlanType = 'educational' | 'standard' | 'professional';

export interface PlanDetails {
  id: PlanType;
  name: string;
  price: number;
  period: string;
  formattedPrice: string;
}

export const PLANS: Record<PlanType, PlanDetails> = {
  educational: {
    id: 'educational',
    name: 'Educational Free',
    price: 0,
    period: 'Free for learning',
    formattedPrice: '₹0',
  },
  standard: {
    id: 'standard',
    name: 'Standard Lifetime',
    price: 14999,
    period: 'One-time payment',
    formattedPrice: '₹14,999',
  },
  professional: {
    id: 'professional',
    name: 'Professional Lifetime',
    price: 18999,
    period: 'One-time payment',
    formattedPrice: '₹18,999',
  },
};

interface PricingSectionProps {
  onSelectPlan: (plan: PlanDetails) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-20 md:py-22 bg-[#FCFCFD] border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
            Lifetime Ownership Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Transparent Pricing for Indian Businesses
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Own your accounting software forever. No mandatory recurring SaaS charges, no cloud lock-in, and full control over your business records.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* 1. Educational (Free) */}
          <div 
            id="card-pricing-educational"
            className="bg-white border border-[#E5E7EB] rounded-[8px] p-5 sm:p-6 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Learning &amp; Practice
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                  Free
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Educational
              </h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                Designed for students, commerce teachers, and learning accounting workflows.
              </p>

              <div className="mb-5 pb-5 border-b border-[#E5E7EB]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900 tabular-nums">₹0</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Free forever (Non-commercial training)
                </span>
              </div>

              <div className="space-y-2 mb-6 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>Learning mode with sample store data</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>Up to 50 practice vouchers</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>No commercial business use</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>Standard financial reports demo</span>
                </div>
              </div>
            </div>

            <button
              id="btn-pricing-educational"
              onClick={() => onSelectPlan(PLANS.educational)}
              className="w-full bg-white hover:bg-[#FCFCFD] text-slate-800 text-xs font-semibold py-2.5 px-4 rounded-[6px] border border-[#E5E7EB] transition-colors cursor-pointer"
            >
              Get Started Free
            </button>
          </div>

          {/* 2. Standard Lifetime (Recommended) */}
          <div 
            id="card-pricing-standard"
            className="bg-white border-2 border-[#6D28D9] rounded-[8px] p-5 sm:p-6 flex flex-col justify-between h-full relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6D28D9] text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Recommended for Retail Shops
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
                  Single Counter POS
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-[#6D28D9]">
                  Lifetime
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Standard Lifetime
              </h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                Complete GST billing, live stock, and party ledgers for a single shop PC.
              </p>

              <div className="mb-5 pb-5 border-b border-[#E5E7EB]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900 tabular-nums">₹14,999</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  One-time payment • Lifetime license
                </span>
              </div>

              <div className="space-y-2 mb-6 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-900">1 Windows PC Lifetime License</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>Unlimited sales &amp; purchase bills</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>Full GST Billing &amp; GSTR reports</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>Inventory &amp; SKU barcode scanning</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>Party Ledgers, Daybook, P&amp;L</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>1-Click backup &amp; voucher restore</span>
                </div>
              </div>
            </div>

            <button
              id="btn-pricing-standard"
              onClick={() => onSelectPlan(PLANS.standard)}
              className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-semibold py-2.5 px-4 rounded-[6px] transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* 3. Professional Lifetime */}
          <div 
            id="card-pricing-professional"
            className="bg-white border border-[#E5E7EB] rounded-[8px] p-5 sm:p-6 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Multi-Terminal Setup
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                  Enterprise
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Professional Lifetime
              </h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                For businesses with multiple checkout counters and back-office workstations.
              </p>

              <div className="mb-5 pb-5 border-b border-[#E5E7EB]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900 tabular-nums">₹18,999</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  One-time payment • Lifetime license
                </span>
              </div>

              <div className="space-y-2 mb-6 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-900">Multiple Windows PCs support</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>Device pairing &amp; LAN synchronization</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>Centralized license management</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>Priority phone &amp; remote support</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>Unlimited company ledgers</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span>Role-based cashier permissions</span>
                </div>
              </div>
            </div>

            <button
              id="btn-pricing-professional"
              onClick={() => onSelectPlan(PLANS.professional)}
              className="w-full bg-white hover:bg-[#FCFCFD] text-slate-900 text-xs font-semibold py-2.5 px-4 rounded-[6px] border border-[#E5E7EB] transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>

        </div>

        {/* Bottom Note */}
        <p className="text-center text-xs text-slate-500 mt-8">
          Need a multi-store retail deployment across different cities? Contact our business team for tailored assistance.
        </p>

      </div>
    </section>
  );
};

export default PricingSection;
