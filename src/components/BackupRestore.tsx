import React from 'react';
import { Database, Archive, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

export const BackupRestore: React.FC = () => {
  const cards = [
    {
      title: 'Local Database',
      desc: 'Encrypted SQLite on your PC drive',
      icon: Database
    },
    {
      title: '1-Click Backup',
      desc: 'Download to .json file Format easily',
      icon: Archive
    },
    {
      title: 'Instant Restore',
      desc: 'Seamless company & ledger recovery',
      icon: RotateCcw
    }
  ];

  return (
    <section id="backup-restore" className="py-16 sm:py-20 bg-[#FCFCFD] border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header from Screenshot (14).png */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Data Security &amp; Company Backup
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Protect your shop records with instant local compression, USB drive export, and one-click data recovery.
          </p>
        </div>

        {/* 3 Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto pt-3">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div 
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 sm:p-7 pt-8 text-center relative shadow-2xs flex flex-col justify-between"
              >
                {/* Floating Green Circle Icon */}
                <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#10B981] text-white flex items-center justify-center border-2 border-white shadow-xs">
                  <IconComponent className="w-4 h-4 stroke-[2]" />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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

export default BackupRestore;
