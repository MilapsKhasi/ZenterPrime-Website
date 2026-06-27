import { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem } from '../types';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Is ZenterPrime free?',
      answer: 'Yes! The Core Beta release is 100% free to download and use, with no hidden limits on invoice counts or client databases. Our core philosophy is to keep ledger bookkeeping, GST invoicing, and inventory tracking completely free and functional on your desktop computer forever.'
    },
    {
      question: 'Is ZenterPrime always synchronized?',
      answer: 'Absolutely. ZenterPrime is engineered with real-time online cloud synchronization. Your billing invoices, inventory items, and ledger statements are automatically saved and synced securely in the cloud, allowing seamless operations and immediate backup across all your active devices.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Your data safety is our absolute highest priority. ZenterPrime encrypts and stores all financial books securely in the cloud using industry-standard symmetric encryption. Unlike legacy systems with weak database security, we protect your sensitive client contacts, sales invoices, and profit margins, ensuring your business secrets remain yours alone.'
    },
    {
      question: 'Does it support GST?',
      answer: 'Yes, ZenterPrime is tailored specifically for the Indian business ecosystem. It fully automates CGST, SGST, and IGST tax splits, integrates localized state codes, supports custom HSN/SAC directory fields, handles reverse charge mechanics, and compiles government-compliant JSON return summaries.'
    },
    {
      question: 'How do updates work?',
      answer: 'Whenever the GST Council or CBIC publishes revised tax rates or structural report forms, ZenterPrime instantly pushes cloud compliance updates. Since the application is online-enabled, compliance engines and tax tables are automatically kept up-to-date in real-time without requiring any manual patches or affecting your existing entries.'
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-violet-600 uppercase font-mono bg-violet-50 px-3 py-1.5 rounded-full border border-violet-100">
            COMMON INQUIRIES
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mt-4">
            Frequently Asked <span className="text-violet-600 font-extrabold">Questions</span>
          </h2>
          <p className="text-sm text-slate-500 mt-4 leading-relaxed font-sans">
            Have a question about security, cloud capabilities, or Indian tax compatibility? Find quick answers below, or get in touch with our product support team.
          </p>
        </div>

        {/* Accordions Wrapper */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-violet-300 shadow-lg shadow-violet-100/50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Trigger Row */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left font-bold text-slate-900 focus:outline-hidden transition-colors cursor-pointer"
                  style={{ minHeight: '44px' }}
                >
                  <span className="flex items-center gap-2.5 text-slate-800 pr-4 text-sm md:text-base">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-violet-600' : 'text-slate-400'}`} />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-violet-600' : ''}`} />
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-100 bg-slate-50/20 font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Contact CTA */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 text-center max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-xs font-bold text-slate-900">Still have unanswered questions?</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">We are happy to answer and discuss compliance features.</p>
          </div>
          <a 
            href="mailto:mkdevelopers2201@gmail.com"
            className="text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors flex items-center shrink-0 gap-1"
          >
            Email Support <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
