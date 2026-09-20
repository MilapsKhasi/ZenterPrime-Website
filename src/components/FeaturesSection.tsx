import React from 'react';

interface FeaturesSectionProps {
  onSelectFeature: (featureKey: 'summary' | 'inventory' | 'restore') => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onSelectFeature }) => {
  return (
    <section id="features" className="py-20 sm:py-28 bg-[#f8f8fc] border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 
            id="features-headline-main"
            className="text-3xl sm:text-5xl font-semibold text-slate-950 tracking-tight leading-tight"
          >
            Accounting automation just a
          </h2>
          <div 
            id="features-headline-highlight"
            className="text-3xl sm:text-5xl font-semibold text-[#3b28cc] tracking-tight leading-tight mt-1"
          >
            click away
          </div>
          <p 
            id="features-subheadline"
            className="text-lg sm:text-2xl text-slate-600 font-normal mt-5"
          >
            Never lose track of your books, hand it to ZenterPrime and relax
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Executive Summary */}
          <div 
            id="card-feature-executive-summary"
            className="bg-white border border-slate-200 hover:border-[#3b28cc]/40 rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center transition-all duration-300 shadow-xs hover:shadow-md"
          >
            {/* Bar Chart Icon Box */}
            <div className="w-16 h-16 rounded-xl bg-[#3b28cc] flex items-center justify-center text-white mb-6 shadow-sm">
              <svg 
                className="w-8 h-8" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M4 19h16v2H4v-2z" />
                <rect x="5" y="11" width="2.5" height="6" rx="0.5" />
                <rect x="9.5" y="7" width="2.5" height="10" rx="0.5" />
                <rect x="14" y="4" width="2.5" height="13" rx="0.5" />
                <rect x="18.5" y="9" width="2.5" height="8" rx="0.5" />
              </svg>
            </div>

            <h3 className="text-[#3b28cc] font-bold text-lg mb-3">
              Executive Summary
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1 max-w-[240px]">
              Keep growing your business, see the sales, purchases, profits, losses, items, in one place
            </p>

            <button
              id="btn-feature-know-more-summary"
              onClick={() => onSelectFeature('summary')}
              className="w-full max-w-[180px] bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#3b28cc] text-slate-900 text-sm font-medium py-2.5 px-6 rounded-lg transition-colors cursor-pointer active:scale-95"
            >
              Know more
            </button>
          </div>

          {/* Card 2: Inventory Tracking */}
          <div 
            id="card-feature-inventory-tracking"
            className="bg-white border border-slate-200 hover:border-[#3b28cc]/40 rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center transition-all duration-300 shadow-xs hover:shadow-md"
          >
            {/* Shopping Cart Icon Box */}
            <div className="w-16 h-16 rounded-xl bg-[#3b28cc] flex items-center justify-center text-white mb-6 shadow-sm">
              <svg 
                className="w-8 h-8" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1.5" fill="currentColor" />
                <circle cx="19" cy="21" r="1.5" fill="currentColor" />
                <path d="M2.5 2.5h3l2.68 12.39a1.5 1.5 0 0 0 1.47 1.11h9.7a1.5 1.5 0 0 0 1.47-1.15l1.68-7.35H6.2" />
                <path d="M12 7v4" />
                <path d="M10 9h4" />
              </svg>
            </div>

            <h3 className="text-[#3b28cc] font-bold text-lg mb-3">
              Inventory Tracking
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1 max-w-[240px]">
              Sold or purchased, goods are stored with records in inventory.
            </p>

            <button
              id="btn-feature-know-more-inventory"
              onClick={() => onSelectFeature('inventory')}
              className="w-full max-w-[180px] bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#3b28cc] text-slate-900 text-sm font-medium py-2.5 px-6 rounded-lg transition-colors cursor-pointer active:scale-95"
            >
              Know more
            </button>
          </div>

          {/* Card 3: Restore Deletions */}
          <div 
            id="card-feature-restore-deletions"
            className="bg-white border border-slate-200 hover:border-[#3b28cc]/40 rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center transition-all duration-300 shadow-xs hover:shadow-md"
          >
            {/* Recycle / Trash Icon Box */}
            <div className="w-16 h-16 rounded-xl bg-[#3b28cc] flex items-center justify-center text-white mb-6 shadow-sm">
              <svg 
                className="w-8 h-8" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <path d="m10 11 2 2 2-2" />
                <path d="M12 17v-4" />
              </svg>
            </div>

            <h3 className="text-[#3b28cc] font-bold text-lg mb-3">
              Restore Deletions
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1 max-w-[240px]">
              Mistakenly deleted ? don't worry, in settings, recycle bin have all of them.
            </p>

            <button
              id="btn-feature-know-more-restore"
              onClick={() => onSelectFeature('restore')}
              className="w-full max-w-[180px] bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#3b28cc] text-slate-900 text-sm font-medium py-2.5 px-6 rounded-lg transition-colors cursor-pointer active:scale-95"
            >
              Know more
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
export default FeaturesSection;
