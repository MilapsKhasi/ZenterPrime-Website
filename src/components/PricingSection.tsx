import React from 'react';
import { Check } from 'lucide-react';

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
    period: 'Practice & Learn about ZenterPrime',
    formattedPrice: '₹0',
  },
  standard: {
    id: 'standard',
    name: 'Standard Lifetime',
    price: 14999,
    period: 'One time payment, lifetime access',
    formattedPrice: '₹14,999',
  },
  professional: {
    id: 'professional',
    name: 'Professional Lifetime',
    price: 18999,
    period: 'One time payment, lifetime access',
    formattedPrice: '₹18,999',
  },
};

interface PricingSectionProps {
  onSelectPlan: (plan: PlanDetails) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-16 sm:py-20 bg-[#FCFCFD] border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header from Screenshot (15).png */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 tracking-tight">
            <span className="text-[#6D28D9]">Transparent Pricing</span> for Indian Businesses
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Protect your shop records with instant local compression, USB drive export, and one-click data recovery.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto pt-2">
          
          {/* 1. Educational */}
          <div 
            id="card-pricing-educational"
            className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 sm:p-7 flex flex-col justify-between shadow-2xs text-center"
          >
            <div>
              <h3 className="text-base font-normal text-slate-900">
                Educational
              </h3>
              <div className="text-3xl font-bold text-[#6D28D9] my-1">
                ₹0
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Practice &amp; Learn about ZenterPrime
              </p>

              <div className="space-y-3.5 mb-8 text-left">
                {[
                  'Learning mode, practice the accounting',
                  'Up to 10 practice vouchers',
                  'No commercial business use',
                  'Standard financial reports demo'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-[3px] bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              id="btn-pricing-educational"
              onClick={() => onSelectPlan(PLANS.educational)}
              className="w-full bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-[6px] border border-[#E5E7EB] transition-colors cursor-pointer"
            >
              Get Started Free
            </button>
          </div>

          {/* 2. Standard Lifetime (RECOMMENDED) */}
          <div 
            id="card-pricing-standard"
            className="bg-white border-2 border-[#6D28D9] rounded-[10px] p-6 sm:p-7 flex flex-col justify-between shadow-md text-center relative mt-4 md:mt-0"
          >
            {/* Top Floating Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#6D28D9] text-white px-3 py-1 rounded-[4px] text-[10px] font-bold tracking-wider uppercase shadow-xs">
              RECOMMENDED
            </div>

            <div>
              <h3 className="text-base font-normal text-slate-900 mt-1">
                Standard Lifetime
              </h3>
              <div className="text-3xl font-bold text-[#6D28D9] my-1">
                ₹14,999
              </div>
              <p className="text-xs text-slate-500 mb-6">
                One time payment, lifetime access
              </p>

              <div className="space-y-3.5 mb-8 text-left">
                {[
                  '1 Windows PC Lifetime Access',
                  'Unlimited sales & purchase bills',
                  'Full GST Billing & GSTR reports',
                  'Inventory & SKU barcode scanning',
                  'Party Ledgers, Daybook, P&L',
                  '1-Click backup & voucher restore'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-[3px] bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              id="btn-pricing-standard"
              onClick={() => onSelectPlan(PLANS.standard)}
              className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-[6px] shadow-xs transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* 3. Professional Lifetime */}
          <div 
            id="card-pricing-professional"
            className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 sm:p-7 flex flex-col justify-between shadow-2xs text-center"
          >
            <div>
              <h3 className="text-base font-normal text-slate-900">
                Professional Lifetime
              </h3>
              <div className="text-3xl font-bold text-[#6D28D9] my-1">
                ₹18,999
              </div>
              <p className="text-xs text-slate-500 mb-6">
                One time payment, lifetime access
              </p>

              <div className="space-y-3.5 mb-8 text-left">
                {[
                  'Multiple PC Lifetime Access',
                  'Device pairing & LAN synchronization',
                  'Centralized license management',
                  'Priority phone & remote support',
                  'Unlimited company ledgers',
                  'Role-based cashier permissions'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-[3px] bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              id="btn-pricing-professional"
              onClick={() => onSelectPlan(PLANS.professional)}
              className="w-full bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-[6px] border border-[#E5E7EB] transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PricingSection;
