import React, { useState } from 'react';

export type PlanType = 'monthly' | 'silver' | 'blue';

export interface PlanDetails {
  id: PlanType;
  name: string;
  price: number;
  period: string;
  formattedPrice: string;
}

export const PLANS: Record<PlanType, PlanDetails> = {
  monthly: {
    id: 'monthly',
    name: 'Standard Monthly',
    price: 499,
    period: '/ month',
    formattedPrice: '₹499',
  },
  silver: {
    id: 'silver',
    name: 'Standard Silver',
    price: 14999,
    period: 'one-time',
    formattedPrice: '₹14,999',
  },
  blue: {
    id: 'blue',
    name: 'Professional Blue',
    price: 18999,
    period: 'one-time',
    formattedPrice: '₹18,999',
  },
};

interface PricingSectionProps {
  onSelectPlan: (plan: PlanDetails) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'lifetime'>('monthly');

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#f8f8fc] border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 
            id="pricing-headline-main"
            className="text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight leading-tight"
          >
            Simple, affordable, transparent <span className="text-[#3b28cc]">pricing</span>
          </h2>
          <p 
            id="pricing-subheadline"
            className="text-lg sm:text-xl text-slate-600 font-normal mt-4"
          >
            Never lose track of your books, hand it to ZenterPrime and relax
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white p-1 rounded-lg border border-slate-300 shadow-2xs">
            <button
              id="pricing-toggle-monthly-btn"
              onClick={() => setBillingCycle('monthly')}
              className={`px-7 py-2 rounded-md text-sm font-medium transition-snappy cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#3b28cc] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 bg-transparent'
              }`}
            >
              Monthly
            </button>
            <button
              id="pricing-toggle-lifetime-btn"
              onClick={() => setBillingCycle('lifetime')}
              className={`px-7 py-2 rounded-md text-sm font-medium transition-snappy cursor-pointer ${
                billingCycle === 'lifetime'
                  ? 'bg-[#3b28cc] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 bg-transparent'
              }`}
            >
              Lifetime
            </button>
          </div>
        </div>

        {/* Pricing Cards Container */}
        {billingCycle === 'monthly' ? (
          /* Monthly Single Card (Screenshot 422) */
          <div className="max-w-sm mx-auto animate-in fade-in zoom-in-95 duration-300">
            <div 
              id="card-pricing-monthly"
              className="bg-white border border-slate-300 rounded-2xl p-10 flex flex-col items-center text-center shadow-xs"
            >
              <div className="flex items-baseline justify-center gap-1.5 mb-5">
                <span className="text-4xl sm:text-5xl font-bold text-[#3b28cc] tracking-tight">499</span>
                <span className="text-base text-slate-700 font-normal">/ month</span>
              </div>

              <h3 className="text-base text-slate-800 font-medium mb-8">
                Standard Monthly
              </h3>

              <button
                id="btn-pricing-get-started-monthly"
                onClick={() => onSelectPlan(PLANS.monthly)}
                className="w-full max-w-[160px] bg-[#3b28cc] hover:bg-[#3120b0] text-white text-sm font-medium py-2.5 px-6 rounded-lg transition-snappy shadow-xs cursor-pointer active:scale-95"
              >
                Get Started
              </button>
            </div>
          </div>
        ) : (
          /* Lifetime Cards Grid (Screenshot 423) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            
            {/* Card 1: Standard Silver */}
            <div 
              id="card-pricing-silver"
              className="bg-white border border-slate-300 rounded-2xl p-10 flex flex-col items-center text-center shadow-xs"
            >
              <div className="mb-5">
                <span className="text-4xl sm:text-5xl font-bold text-[#3b28cc] tracking-tight">14,999</span>
              </div>

              <h3 className="text-base text-slate-800 font-medium mb-8">
                Standard Silver
              </h3>

              <button
                id="btn-pricing-get-started-silver"
                onClick={() => onSelectPlan(PLANS.silver)}
                className="w-full max-w-[160px] bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#3b28cc] text-slate-900 text-sm font-medium py-2.5 px-6 rounded-lg transition-snappy cursor-pointer active:scale-95"
              >
                Get Started
              </button>
            </div>

            {/* Card 2: Professional Blue (RECOMMENDED) */}
            <div 
              id="card-pricing-blue"
              className="relative bg-white border border-slate-300 rounded-2xl p-10 flex flex-col items-center text-center shadow-xs"
            >
              {/* RECOMMENDED Badge floating on top border */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white border border-slate-400 px-3.5 py-0.5 rounded-md shadow-2xs">
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-800 select-none">
                  RECOMMENDED
                </span>
              </div>

              <div className="mb-5">
                <span className="text-4xl sm:text-5xl font-bold text-[#3b28cc] tracking-tight">18,999</span>
              </div>

              <h3 className="text-base text-slate-800 font-medium mb-8">
                Professional Blue
              </h3>

              <button
                id="btn-pricing-get-started-blue"
                onClick={() => onSelectPlan(PLANS.blue)}
                className="w-full max-w-[160px] bg-[#3b28cc] hover:bg-[#3120b0] text-white text-sm font-medium py-2.5 px-6 rounded-lg transition-snappy shadow-xs cursor-pointer active:scale-95"
              >
                Get Started
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
export default PricingSection;
