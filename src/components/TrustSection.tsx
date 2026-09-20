import React from 'react';
import { FileText } from 'lucide-react';
import { motion } from 'motion/react';

export const TrustSection: React.FC = () => {
  return (
    <section id="trust-section" className="py-16 sm:py-20 bg-[#FCFCFD] border-b border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hub-and-Spoke Architecture Diagram from Screenshot (10).png */}
        <div className="relative max-w-4xl mx-auto min-h-[480px] sm:min-h-[440px] flex items-center justify-center">
          
          {/* SVG Connector Lines with Arrowheads (visible on sm and up) */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block" 
            viewBox="0 0 800 440" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker 
                id="arrow-head" 
                markerWidth="8" 
                markerHeight="8" 
                refX="6" 
                refY="4" 
                orient="auto"
              >
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#94A3B8" />
              </marker>
            </defs>

            {/* Diagonal Line to Top-Left */}
            <line 
              x1="360" y1="190" 
              x2="280" y2="135" 
              stroke="#CBD5E1" 
              strokeWidth="2" 
              markerEnd="url(#arrow-head)" 
            />

            {/* Diagonal Line to Top-Right */}
            <line 
              x1="440" y1="190" 
              x2="520" y2="135" 
              stroke="#CBD5E1" 
              strokeWidth="2" 
              markerEnd="url(#arrow-head)" 
            />

            {/* Diagonal Line to Bottom-Left */}
            <line 
              x1="360" y1="250" 
              x2="280" y2="305" 
              stroke="#CBD5E1" 
              strokeWidth="2" 
              markerEnd="url(#arrow-head)" 
            />

            {/* Diagonal Line to Bottom-Right */}
            <line 
              x1="440" y1="250" 
              x2="520" y2="305" 
              stroke="#CBD5E1" 
              strokeWidth="2" 
              markerEnd="url(#arrow-head)" 
            />
          </svg>

          {/* Central Purple "Z" Circle Node */}
          <div className="absolute z-20 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#6D28D9] text-white flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-md border-4 border-white ring-4 ring-purple-100"
            >
              Z
            </motion.div>
          </div>

          {/* 4 Cards Grid around Central Node */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-20 sm:gap-x-32 lg:gap-x-44 gap-y-10 sm:gap-y-14 z-10">
            
            {/* Top-Left: GST Billing Ready */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 sm:p-6 shadow-xs flex flex-col items-start text-left max-w-sm ml-auto w-full"
            >
              <div className="w-9 h-9 rounded-[6px] bg-purple-50 text-[#6D28D9] flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#6D28D9] mb-1.5 leading-snug">
                GST Billing Ready
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Automated CGST, SGST, and IGST splits with official HSN/SAC codes
              </p>
            </motion.div>

            {/* Top-Right: Party Ledgers */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 sm:p-6 shadow-xs flex flex-col items-start text-left max-w-sm mr-auto w-full"
            >
              <div className="w-9 h-9 rounded-[6px] bg-blue-50 text-[#2563EB] flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#2563EB] mb-1.5 leading-snug">
                Party Ledgers
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Customer credit tracking, supplier dues statements, and instant receipt
              </p>
            </motion.div>

            {/* Bottom-Left: Inventory & Stock */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 sm:p-6 shadow-xs flex flex-col items-start text-left max-w-sm ml-auto w-full mt-2"
            >
              <div className="w-9 h-9 rounded-[6px] bg-teal-50 text-[#0D9488] flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0D9488] mb-1.5 leading-snug">
                Inventory &amp; Stock
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Real-time low stock / out of stock alerts and stock summary tracking
              </p>
            </motion.div>

            {/* Bottom-Right: Cashbook Reports */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 sm:p-6 shadow-xs flex flex-col items-start text-left max-w-sm mr-auto w-full mt-2"
            >
              <div className="w-9 h-9 rounded-[6px] bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#16A34A] mb-1.5 leading-snug">
                Cashbook Reports
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Daily cashbook summaries, balances, reports in one click
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustSection;

