import { useState } from 'react';
import { 
  Laptop, 
  ChevronRight, 
  FileText, 
  Layers, 
  Send, 
  Briefcase, 
  CheckCircle, 
  MessageSquare,
  AlertCircle,
  Clock,
  Printer,
  Barcode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Screenshots() {
  const [selectedScreen, setSelectedScreen] = useState<'billing' | 'compliance' | 'khata' | 'inventory_desk'>('billing');

  const screens = [
    {
      id: 'billing',
      title: 'Invoice Billing Desk',
      description: 'The primary workspace for billing. Create custom invoices, apply customer discounts, and calculate tax splits in real-time.',
      badge: 'Highly Interactive'
    },
    {
      id: 'compliance',
      title: 'GSTR-1 Compliance Portal',
      description: 'Auto-reconciled tax filings. Check errors, match GSTR-2B data, and download portal-ready JSON files without a glitch.',
      badge: 'Government Compliant'
    },
    {
      id: 'khata',
      title: 'Supplier Credit (Khatabook)',
      description: 'Track outstanding credit balances (Udhaar) and schedule automatic payment alerts with professional, pre-written templates.',
      badge: 'Saves Cashflow'
    },
    {
      id: 'inventory_desk',
      title: 'Barcode & Inventory Valuations',
      description: 'Manage individual SKU product registers. Print barcode tags, trigger restock points, and review cost valuations on the fly.',
      badge: 'Supports FIFO'
    }
  ];

  return (
    <section id="gallery" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-100/30 rounded-full filter blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold tracking-widest text-violet-600 uppercase font-mono bg-violet-50 px-3 py-1.5 rounded-full border border-violet-100">
            PRODUCT WALKTHROUGH
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mt-4">
            Designed for desktop. <br />
            <span className="text-violet-600 font-extrabold">Engineered for absolute accuracy.</span>
          </h2>
          <p className="text-base text-slate-500 mt-4 leading-relaxed font-sans">
            Take a closer look at the actual application interface. ZenterPrime combines state-of-the-art secure database architecture with clean, modern visual controls.
          </p>
        </div>

        {/* Gallery Interactive Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Navigation selectors (Left) */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-3.5 order-2 lg:order-1">
            {screens.map((screen) => {
              const isSelected = selectedScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => setSelectedScreen(screen.id as any)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-white border-violet-300 shadow-lg shadow-violet-100/50 scale-[1.02] z-10' 
                      : 'bg-white/50 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Selected Marker Border */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-violet-600"></div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-extrabold text-violet-600 font-mono tracking-wider uppercase bg-violet-50 px-2 py-0.5 rounded">
                        {screen.badge}
                      </span>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse"></div>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {screen.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {screen.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Visual Display Interface (Right) */}
          <div className="lg:col-span-8 flex flex-col justify-center order-1 lg:order-2">
            <div className="bg-slate-900 rounded-2xl p-3 border border-slate-800 shadow-2xl relative overflow-hidden min-h-[460px] flex flex-col justify-between">
              
              {/* Window Controls top bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 px-2 shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <span className="text-[10px] font-mono text-slate-500 font-bold ml-2">ZenterPrime Windows Beta 1.0</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-slate-800 px-2 py-0.5 rounded text-[9px] font-mono font-semibold text-slate-400">
                  <span>SECURE SERVER: OFFLINE</span>
                </div>
              </div>

              {/* Dynamic Screen Visuals */}
              <div className="flex-1 py-4 px-2 overflow-hidden flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {selectedScreen === 'billing' && (
                    <motion.div
                      key="billing-screen"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white text-slate-800 rounded-xl p-4 border border-slate-100 shadow-md font-sans text-xs space-y-4 max-w-lg mx-auto w-full"
                    >
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Active Billing Registry</p>
                          <p className="font-bold text-slate-800 text-sm">New Tax Bill #ZP-9902</p>
                        </div>
                        <span className="text-[9px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded border border-emerald-100">
                          Active State: MH
                        </span>
                      </div>

                      {/* Items Row */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <div>
                            <p className="font-bold text-slate-700">Premium Consulting License</p>
                            <p className="text-[9px] text-slate-400">SAC: 998311 • Qty: 1</p>
                          </div>
                          <span className="font-bold">₹1,50,000.00</span>
                        </div>
                        <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <div>
                            <p className="font-bold text-slate-700">Cloud Storage Server Set</p>
                            <p className="text-[9px] text-slate-400">HSN: 8471 • Qty: 3</p>
                          </div>
                          <span className="font-bold">₹24,500.00</span>
                        </div>
                      </div>

                      {/* Summary Section */}
                      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-right font-medium">
                        <div className="flex justify-between text-slate-500">
                          <span>Subtotal Amount:</span>
                          <span>₹1,74,500.00</span>
                        </div>
                        <div className="flex justify-between text-slate-500 text-[11px] pl-4">
                          <span>CGST (9%):</span>
                          <span>₹15,705.00</span>
                        </div>
                        <div className="flex justify-between text-slate-500 text-[11px] pl-4">
                          <span>SGST (9%):</span>
                          <span>₹15,705.00</span>
                        </div>
                        <div className="flex justify-between text-slate-900 font-bold text-sm pt-1.5 border-t border-slate-100">
                          <span>Grand Total Payable:</span>
                          <span className="text-violet-600">₹2,05,910.00</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {selectedScreen === 'compliance' && (
                    <motion.div
                      key="compliance-screen"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white text-slate-800 rounded-xl p-4 border border-slate-100 shadow-md font-sans text-xs space-y-3 max-w-lg mx-auto w-full"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-500" /> GST Reconciliation Engine
                        </h4>
                        <span className="text-[10px] bg-violet-50 text-violet-700 font-bold px-2 py-0.5 rounded">
                          GSTR-1 Q1 Filings
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500">
                        ZenterPrime validates every invoice schema against government formats. All calculations match the official government GSTR tools before generation.
                      </p>

                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/50 border border-emerald-100">
                          <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="font-bold text-slate-700">B2B Invoice Match (GSTR-2B)</span>
                          </div>
                          <span className="text-emerald-700 font-bold">142/142 Matched</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/50 border border-emerald-100">
                          <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="font-bold text-slate-700">HSN Tax Slab Code Check</span>
                          </div>
                          <span className="text-emerald-700 font-bold">Passed</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 border border-amber-100">
                          <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <span className="font-bold text-slate-700">Duplicate GSTIN Registry Test</span>
                          </div>
                          <span className="text-amber-700 font-bold">2 Warn Resolved</span>
                        </div>
                      </div>

                      <button 
                        type="button"
                        onClick={() => alert('Offline utility schema is compiled into the applet directory.')}
                        className="w-full bg-slate-950 text-white font-bold py-2 px-3 rounded-lg text-xs mt-1 hover:bg-slate-800 transition-colors"
                      >
                        Generate Government JSON Returns File
                      </button>
                    </motion.div>
                  )}

                  {selectedScreen === 'khata' && (
                    <motion.div
                      key="khata-screen"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white text-slate-800 rounded-xl p-4 border border-slate-100 shadow-md font-sans text-xs space-y-3.5 max-w-lg mx-auto w-full"
                    >
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Customer Credit Book</p>
                          <p className="font-bold text-slate-800">Saraswati Traders Pvt Ltd</p>
                        </div>
                        <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded border border-rose-100">
                          Udhaar: ₹84,200
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-slate-600 font-medium">
                          <span>Total Credit Allotted:</span>
                          <span className="font-bold text-slate-800">₹1,50,000.00</span>
                        </div>
                        <div className="flex justify-between text-slate-600 font-medium">
                          <span>Outstanding Balance Due:</span>
                          <span className="font-bold text-rose-600">₹84,200.00</span>
                        </div>
                        <div className="flex justify-between text-slate-600 font-medium">
                          <span>Days Outstanding:</span>
                          <span className="font-bold text-amber-600">18 Days (Overdue)</span>
                        </div>
                      </div>

                      {/* Message Alert Template */}
                      <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                        <p className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
                          <MessageSquare className="w-3.5 h-3.5 text-violet-500" /> Automated WhatsApp Reminder
                        </p>
                        <p className="text-[11px] text-slate-600 leading-normal italic font-medium">
                          "Hello Saraswati Traders, this is a friendly ledger reminder that ₹84,200.00 is outstanding on Invoice ZP-902 since 12th Jun. Please settle with UPI or Bank transfer. Thank you!"
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button className="border border-slate-200 text-slate-700 py-1.5 rounded-lg font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Extend Term
                        </button>
                        <button 
                          onClick={() => alert('Simulating Whatsapp Dispatch: Client credit warnings successfully dispatched locally.')}
                          className="bg-violet-600 text-white py-1.5 rounded-lg font-bold hover:bg-violet-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" /> Dispatch Alert
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {selectedScreen === 'inventory_desk' && (
                    <motion.div
                      key="inventory-screen"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white text-slate-800 rounded-xl p-4 border border-slate-100 shadow-md font-sans text-xs space-y-4 max-w-lg mx-auto w-full"
                    >
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase font-mono">STOCK SKU REGISTRY</p>
                          <p className="font-bold text-slate-800 text-sm">Zenter Thermal Printer v3</p>
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">
                          SKU: ZTP-880
                        </span>
                      </div>

                      {/* Stock Info */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-rose-50/50 border border-rose-100 p-2.5 rounded-lg">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Current Stock count</p>
                          <p className="text-lg font-extrabold text-rose-600 font-mono">0 Units</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                          <p className="text-[9px] font-bold text-slate-400 uppercase font-mono">FIFO valuation unit</p>
                          <p className="text-lg font-extrabold text-slate-700 font-mono">₹5,999.00</p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                          <span className="flex items-center gap-1"><Barcode className="w-3.5 h-3.5 text-violet-500" /> Barcode label generated</span>
                          <button className="text-violet-600 font-bold hover:underline flex items-center gap-0.5"><Printer className="w-3 h-3" /> Print PDF</button>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                          <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Low stock alert sent to Admin</span>
                          <span className="text-amber-600 font-bold">Auto-Triggered</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom footer bar */}
              <div className="text-center text-[10px] font-mono text-slate-600 pt-3 border-t border-slate-800 px-2 shrink-0">
                Designed to run natively on 64-bit modern frameworks.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
