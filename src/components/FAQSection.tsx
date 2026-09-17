import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  id: string;
  category: 'offline' | 'gst' | 'backup' | 'licensing';
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const faqs: FAQItem[] = [
    {
      id: 'offline',
      category: 'offline',
      question: 'Does ZenterPrime work completely offline?',
      answer: 'Yes. ZenterPrime 7.3 is a native Windows desktop software. All daily billing counters, sales vouchers, inventory tracking, party ledgers, and cashbook records run 100% offline without requiring any active internet connection. Your store billing never halts during broadband outages.'
    },
    {
      id: 'gst',
      category: 'gst',
      question: 'Is GST compliance supported for Indian businesses?',
      answer: 'Yes. The software is built strictly for Indian retail and wholesale commerce. It automatically calculates intra-state (CGST + SGST) and inter-state (IGST) splits, supports official HSN/SAC codes, reverse charge mechanisms, composite dealers, and generates GSTR-1 and GSTR-3B ready summary reports for your CA.'
    },
    {
      id: 'backup',
      category: 'backup',
      question: 'How does data backup and company restore work?',
      answer: 'You can create a compressed, single-file (.zpb) backup of your company ledger with one click at the end of every business day. You can save backups onto USB pen drives or external hard disks. In case of hardware upgrades or PC failure, your company can be completely restored within seconds.'
    },
    {
      id: 'trial',
      category: 'licensing',
      question: 'Can I test ZenterPrime before purchasing a lifetime license?',
      answer: 'Yes. You can download the Free Beta / Educational version directly for your Windows PC with zero commitment, or test the full interface through our 14-day web trial. You can create invoices, manage stock items, and verify printer compatibility before purchasing.'
    },
    {
      id: 'license-transfer',
      category: 'licensing',
      question: 'Can I transfer my license to a new PC if I change my computer?',
      answer: 'Yes. Standard and Professional lifetime licenses can be migrated to a replacement computer. Simply take a backup of your data, deactivate the license on your old machine, install ZenterPrime on your new Windows PC, and reactivate using your product key.'
    },
    {
      id: 'windows-versions',
      category: 'offline',
      question: 'Which versions of Microsoft Windows are supported?',
      answer: 'ZenterPrime 7.3 supports Windows 11, Windows 10, Windows 8.1, and Windows 7 (SP1) in both 64-bit and 32-bit architectures. It requires a minimum of 2 GB RAM and 200 MB disk storage, making it exceptionally lightweight and fast even on older billing counter PCs.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 md:py-22 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
            Support &amp; Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            Straightforward answers regarding offline desktop operation, GST compliance, backups, and licensing.
          </p>
        </div>

        {/* Quick Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'offline', label: 'Offline & Windows' },
            { id: 'gst', label: 'GST & Statutory' },
            { id: 'backup', label: 'Backup & Security' },
            { id: 'licensing', label: 'Licenses & Activation' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setOpenIndex(0); }}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold border cursor-pointer transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#6D28D9] text-white border-[#6D28D9]'
                  : 'bg-white text-slate-600 border-[#E5E7EB] hover:bg-[#FCFCFD]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordions with clean border & 1px dividers */}
        <div className="border border-[#E5E7EB] rounded-[8px] divide-y divide-[#E5E7EB] bg-white overflow-hidden">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-900 text-xs sm:text-sm cursor-pointer hover:bg-[#FCFCFD] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3 pr-4">
                    <HelpCircle className="w-4 h-4 text-[#6D28D9] shrink-0 stroke-[1.75]" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#6D28D9]' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden bg-[#FCFCFD]"
                    >
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed pl-11">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
