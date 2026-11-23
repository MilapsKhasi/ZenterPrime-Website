import React, { useState } from 'react';
import { Check, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export type PlanType = 'educational' | 'monthly' | 'yearly' | 'lifetime';

export interface PlanDetails {
  id: PlanType;
  name: string;
  price: number;
  period: string;
  formattedPrice: string;
  isYearly: boolean;
  isLifetime: boolean;
}

export const PLANS: Record<PlanType, PlanDetails> = {
  educational: {
    id: 'educational',
    name: 'Educational Free',
    price: 0,
    period: 'Practice & Learn',
    formattedPrice: '₹0',
    isYearly: false,
    isLifetime: false,
  },
  monthly: {
    id: 'monthly',
    name: 'Standard Monthly',
    price: 499,
    period: 'per month',
    formattedPrice: '₹499',
    isYearly: false,
    isLifetime: false,
  },
  yearly: {
    id: 'yearly',
    name: 'Standard Yearly',
    price: 4999,
    period: 'per year',
    formattedPrice: '₹4,999',
    isYearly: true,
    isLifetime: false,
  },
  lifetime: {
    id: 'lifetime',
    name: 'Lifetime Access',
    price: 24999,
    period: 'one-time payment',
    formattedPrice: '₹24,999',
    isYearly: false,
    isLifetime: true,
  },
};

interface PricingSectionProps {
  onSelectPlan: (plan: PlanDetails) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [activeTab, setActiveTab] = useState<'monthly' | 'yearly' | 'lifetime'>('yearly');

  const getCurrentPlan = (): PlanDetails => {
    if (activeTab === 'monthly') return PLANS['monthly'];
    if (activeTab === 'yearly') return PLANS['yearly'];
    return PLANS['lifetime'];
  };

  return (
    <motion.section 
      id="pricing" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 sm:py-20 bg-[#FCFCFD] border-b border-[#E5E7EB]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 tracking-tight">
            <span className="text-[#4338ca]">Transparent Pricing</span> for Indian Businesses
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Protect your shop records with instant local compression, USB drive export, and one-click data recovery.
          </p>

          {/* Pricing Tabs: Monthly / Yearly / Lifetime */}
          <div className="inline-flex items-center bg-[#F3F4F6] p-1 rounded-[8px] mt-8 border border-[#E5E7EB]">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-4 sm:px-5 py-2 rounded-[6px] text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'monthly'
                  ? 'bg-white text-[#4338ca] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly (₹499)
            </button>
            <button
              onClick={() => setActiveTab('yearly')}
              className={`px-4 sm:px-5 py-2 rounded-[6px] text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'yearly'
                  ? 'bg-white text-[#4338ca] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Yearly (₹4,999) <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded ml-1 font-bold">Best Value</span>
            </button>
            <button
              onClick={() => setActiveTab('lifetime')}
              className={`px-4 sm:px-5 py-2 rounded-[6px] text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'lifetime'
                  ? 'bg-white text-[#4338ca] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lifetime (₹24,999)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (Educational Free + Selected Commercial Plan) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-4xl mx-auto pt-2">
          
          {/* 1. Educational - Free */}
          <div 
            id="card-pricing-educational"
            className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 sm:p-8 flex flex-col justify-between shadow-2xs text-center"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium mb-3">
                Practice Mode
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Educational Free
              </h3>
              <div className="text-4xl font-extrabold text-slate-900 my-2">
                ₹0
              </div>
              <p className="text-xs text-slate-500 mb-6">
                For students &amp; learning shop accounting
              </p>

              <div className="space-y-3.5 mb-8 text-left">
                {[
                  'Learning mode & ledger practice',
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

            <a
              id="btn-pricing-educational"
              href="https://zenterprime.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-btn w-full text-xs sm:text-sm font-semibold py-3 px-4 rounded-[6px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Launch Educational Web</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* 2. Selected Commercial Plan (Monthly / Yearly / Lifetime) */}
          <div 
            id="card-pricing-commercial"
            className="bg-white border-2 border-[#4338ca] rounded-[10px] p-6 sm:p-8 flex flex-col justify-between shadow-md text-center relative"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#4338ca] text-white px-3.5 py-1 rounded-[4px] text-[10px] font-bold tracking-wider uppercase shadow-xs">
              {activeTab === 'lifetime' ? 'PERMANENT LICENSE' : activeTab === 'yearly' ? 'MOST POPULAR' : 'FLEXIBLE MONTHLY'}
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-[#4338ca] text-xs font-medium mb-3 mt-1">
                <Zap className="w-3.5 h-3.5 text-[#4338ca]" />
                <span>ZenterPrime 7.4 Professional</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {getCurrentPlan().name}
              </h3>
              <div className="text-4xl font-extrabold text-[#4338ca] my-2">
                {getCurrentPlan().formattedPrice}
              </div>
              <p className="text-xs text-slate-500 mb-6">
                {activeTab === 'lifetime' ? 'Pay once, own forever with 1 year updates' : activeTab === 'yearly' ? 'Billed annually, save 16%' : 'Billed monthly, cancel anytime'}
              </p>

              <div className="space-y-3.5 mb-8 text-left">
                {[
                  '1 Windows PC Access & Offline SQLite',
                  'Unlimited sales, purchase & GST invoices',
                  'Full GSTR-1, GSTR-3B & P&L reports',
                  'Inventory & SKU barcode scanning',
                  'Direct thermal receipt printer support',
                  '1-Click automated backup & restore'
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
              id="btn-pricing-select"
              onClick={() => onSelectPlan(getCurrentPlan())}
              className="primary-btn w-full text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-[6px] shadow-xs cursor-pointer"
            >
              Get {getCurrentPlan().name}
            </button>
          </div>

        </div>

      </div>
    </motion.section>
  );
};

export default PricingSection;
