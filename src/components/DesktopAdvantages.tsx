import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

export const DesktopAdvantages: React.FC = () => {
  const cards = [
    {
      title: 'Zero Internet Dependency',
      bullets: [
        'Billing counter continues during fiber cuts',
        'Direct thermal receipt printing via USB/COM port',
        'No monthly data plan needed to run billing'
      ]
    },
    {
      title: 'Instant Keyboard Flow',
      bullets: [
        'Instant SKU barcode scans with zero lag',
        'Full keyboard shortcut coverage (F1 to F12)',
        'Lightweight on standard Dual-Core / 4GB RAM PCs'
      ]
    }
  ];

  return (
    <section id="advantages" className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header from Screenshot (13).png */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Desktop Software <span className="text-[#6D28D9]">Advantages</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Why retail counters, wholesalers, and accountants rely on standalone Windows desktop applications over browser tabs.
          </p>
        </div>

        {/* 2 Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-4xl mx-auto pt-3">
          {cards.map((card, idx) => (
            <motion.div 
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 sm:p-8 pt-8 relative shadow-2xs flex flex-col justify-between"
            >
              {/* Floating Green Circle Checkmark Icon */}
              <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#10B981] text-white flex items-center justify-center border-2 border-white shadow-xs">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 text-center">
                {card.title}
              </h3>

              <div className="space-y-4">
                {card.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-[3px] bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DesktopAdvantages;
