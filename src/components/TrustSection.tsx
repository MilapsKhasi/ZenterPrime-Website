import React from 'react';
import { FileCheck, Boxes, Users, BookOpen, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const TrustSection: React.FC = () => {
  const trustCards = [
    {
      id: 'trust-gst',
      title: 'GST Billing Ready',
      desc: 'Automated CGST, SGST, and IGST splits with official HSN/SAC codes and thermal bill printing.',
      icon: FileCheck,
      color: 'text-[#6D28D9]',
      bg: 'bg-purple-50'
    },
    {
      id: 'trust-inventory',
      title: 'Inventory & Stock',
      desc: 'Real-time SKU barcode scanning, low-stock reorder alerts, and batch expiry tracking.',
      icon: Boxes,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50'
    },
    {
      id: 'trust-ledger',
      title: 'Party Ledgers & Khatabook',
      desc: 'Customer credit tracking, supplier dues statements, and instant receipt vouchers.',
      icon: Users,
      color: 'text-blue-700',
      bg: 'bg-blue-50'
    },
    {
      id: 'trust-reports',
      title: 'Cashbook & Final Reports',
      desc: 'Daily daybook summaries, balance sheets, profit and loss, and audit-ready GST exports.',
      icon: BookOpen,
      color: 'text-amber-700',
      bg: 'bg-amber-50'
    }
  ];

  return (
    <section id="trust-section" className="py-14 sm:py-16 bg-[#FCFCFD] border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {trustCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div 
                key={card.id}
                id={`card-${card.id}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="bg-white border border-[#E5E7EB] rounded-[8px] p-5 sm:p-6 flex flex-col justify-start h-full"
              >
                <div className={`w-9 h-9 rounded-[6px] ${card.bg} border border-[#E5E7EB] flex items-center justify-center ${card.color} mb-3.5 shrink-0`}>
                  <IconComponent className="w-4 h-4 stroke-[1.75]" />
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 leading-snug">
                  {card.title}
                </h3>
                
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

export default TrustSection;
