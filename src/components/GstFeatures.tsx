import React from 'react';
import { motion } from 'motion/react';

export const GstFeatures: React.FC = () => {
  const rowOne = [
    {
      num: 1,
      circleBg: 'bg-[#059669]',
      title: 'Enable GST',
      desc: 'Set 15-digit GSTIN and state code once in company settings.',
    },
    {
      num: 2,
      circleBg: 'bg-[#2563EB]',
      title: 'Create GST Items',
      desc: 'Assign HSN/SAC codes and tax slabs (0%, 5%, 12%, 18%, 28%).',
    },
    {
      num: 3,
      circleBg: 'bg-[#F59E0B]',
      title: 'Auto CGST/SGST/IGST',
      desc: 'System detects customer state and computes intra/inter split.',
    },
    {
      num: 4,
      circleBg: 'bg-[#EF4444]',
      title: 'GST Reports',
      desc: 'Export audit-ready GSTR-1 and GSTR-3B summaries in one click.',
    },
  ];

  const rowTwo = [
    {
      title: 'Item-wise Tax Slabs',
      desc: 'Mix 0%, 5%, 12%, 18%, and 28% items seamlessly in a single sales voucher',
    },
    {
      title: 'Automated Roundoff',
      desc: 'Eliminates paise calculation discrepancies to ensure perfectly',
    },
    {
      title: 'HSN/SAC Masters',
      desc: 'Standardized rate directory for retail products and commercial service .',
    },
    {
      title: 'ITC Reconciliation',
      desc: 'Track input tax credits accurately on all inward supplier bills for CA filing.',
    },
  ];

  return (
    <section id="gst-billing" className="py-16 sm:py-20 bg-[#FCFCFD] border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header from Screenshot (12).png */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            GST Made <span className="text-[#6D28D9]">Practical &amp; Automated</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Configure your company once and let ZenterPrime handle tax rates, intra-state splits, and audit reports on your desktop.
          </p>
        </div>

        {/* Row 1: 4 Cards with Floating Numbered Circles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 mb-8 pt-4">
          {rowOne.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 pt-7 text-center relative shadow-2xs flex flex-col justify-between"
            >
              {/* Floating Number Circle */}
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full ${item.circleBg} text-white font-bold text-sm flex items-center justify-center border-2 border-white shadow-xs`}>
                {item.num}
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Row 2: 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {rowTwo.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 + idx * 0.08 }}
              className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 text-center shadow-2xs flex flex-col justify-between"
            >
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GstFeatures;
