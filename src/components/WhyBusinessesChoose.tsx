import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface ModuleDetail {
  id: string;
  name: string;
  cardTitle: string;
  badge: string;
  subtitle: string;
  rows: Array<{ label: string; value: string }>;
  grandTotal: string;
}

interface WhyBusinessesChooseProps {
  onSelectPlan?: () => void;
}

export const WhyBusinessesChoose: React.FC<WhyBusinessesChooseProps> = () => {
  const [selectedModule, setSelectedModule] = useState('sales');

  const modules: ModuleDetail[] = [
    {
      id: 'sales',
      name: 'Sales Invoices',
      cardTitle: 'Sales Register',
      badge: 'Verified',
      subtitle: 'POS Billing & Barcode Scan',
      rows: [
        { label: 'Customer', value: 'Mehta Electronics PVT LTD' },
        { label: 'GST Type', value: 'B2B Regular' },
        { label: 'Taxable Amount', value: '₹34,500.00' },
        { label: 'GST Tax', value: '₹6,210.00' },
      ],
      grandTotal: '₹40,710.00'
    },
    {
      id: 'purchase',
      name: 'Purchase Bills',
      cardTitle: 'Purchase Register',
      badge: 'ITC Eligible',
      subtitle: 'Stock Inward & Supplier Invoices',
      rows: [
        { label: 'Vendor / Supplier', value: 'Anchor Electricals PVT LTD' },
        { label: 'Supplier GSTIN', value: '27AABCA1294C1Z9' },
        { label: 'Taxable Value', value: '₹54,200.00' },
        { label: 'Input Tax Credit (ITC)', value: '₹8,260.00' },
      ],
      grandTotal: '₹62,460.00'
    },
    {
      id: 'receipts',
      name: 'Payment Receipts',
      cardTitle: 'Receipt Voucher',
      badge: 'Adjusted',
      subtitle: 'Cash, UPI & Bank Settlements',
      rows: [
        { label: 'Party / Debtor', value: 'Shreeji Hardware Mart' },
        { label: 'Settlement Mode', value: 'Bank NEFT / IMPS' },
        { label: 'Against Invoice', value: 'INV-2024-0072' },
        { label: 'Dues Remaining', value: '₹0.00 (Cleared)' },
      ],
      grandTotal: '₹66,552.00'
    },
    {
      id: 'suppliers',
      name: 'Payment from Suppliers',
      cardTitle: 'Supplier Payment',
      badge: 'Approved',
      subtitle: 'Vendor Accounts & Outward Payments',
      rows: [
        { label: 'Supplier', value: 'National Cable Works' },
        { label: 'Payment Account', value: 'HDFC Current A/C' },
        { label: 'Cheque / Ref #', value: 'CHQ-890214' },
        { label: 'TDS Deduction', value: '₹0.00' },
      ],
      grandTotal: '₹38,900.00'
    },
    {
      id: 'inventory',
      name: 'Stock & Inventory',
      cardTitle: 'Item Master Register',
      badge: 'Live Stock',
      subtitle: 'Real-time SKU Barcode & Godown',
      rows: [
        { label: 'Product Name', value: 'Havells 1.5 Sqmm Copper Wire' },
        { label: 'HSN / SAC Code', value: '8544' },
        { label: 'Current Quantity', value: '142 Coils' },
        { label: 'Reorder Level', value: '25 Coils' },
      ],
      grandTotal: '₹1,24,960.00'
    }
  ];

  const currentData = modules.find(m => m.id === selectedModule) || modules[0];

  return (
    <section id="features" className="py-16 sm:py-22 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two Column Layout matching Screenshot (11).png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Subtitle & Modules List */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Why choose <br />
              <span className="text-[#6D28D9]">ZenterPrime ?</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
              Essential retail and wholesale accounting modules running entirely on your local PC with full keyboard shortcut control.
            </p>

            {/* Vertical Module Buttons List */}
            <div className="mt-8 space-y-2 max-w-xs">
              {modules.map((m) => {
                const isSelected = selectedModule === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModule(m.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-[6px] text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isSelected 
                        ? 'bg-[#6D28D9] text-white shadow-xs font-semibold' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span>{m.name}</span>
                    {isSelected && <ChevronRight className="w-4 h-4 text-white" />}
                  </button>
                );
              })}

              <div className="pt-2">
                <button 
                  onClick={() => setSelectedModule(modules[(modules.findIndex(m => m.id === selectedModule) + 1) % modules.length].id)}
                  className="text-sm font-semibold text-slate-900 hover:text-[#6D28D9] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View More</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: macOS-Style Register Card */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <motion.div 
              key={currentData.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg bg-white border border-[#E5E7EB] rounded-[12px] p-6 sm:p-8 shadow-sm"
            >
              {/* Top macOS 3 Colored Window Dots */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              </div>

              {/* Card Header with Verified Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {currentData.cardTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentData.subtitle}
                  </p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded text-xs font-semibold">
                  {currentData.badge}
                </span>
              </div>

              {/* Breakdown Rows */}
              <div className="py-5 space-y-3.5 text-sm">
                {currentData.rows.map((row, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="font-semibold text-slate-900">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Grand Total Footer */}
              <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">Grand Total</span>
                <span className="text-xl font-bold text-[#6D28D9]">{currentData.grandTotal}</span>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyBusinessesChoose;
