import React, { useState } from 'react';
import { 
  FileText, 
  ArrowDownLeft, 
  Receipt, 
  CreditCard, 
  Boxes, 
  Percent, 
  BarChart2, 
  Building2,
  CheckCircle2,
  Printer,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FeatureItem {
  id: string;
  title: string;
  shortBenefit: string;
  shortcut: string;
  icon: React.ComponentType<{ className?: string }>;
  detailHeading: string;
  metricBadge: string;
  metricBadgeColor: string;
  detailRows: Array<{ label: string; value: string }>;
  visualSummary?: {
    label: string;
    value: string;
    subtext: string;
    percent?: number;
  };
}

export const WhyBusinessesChoose: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>('sales');

  const features: FeatureItem[] = [
    {
      id: 'sales',
      title: 'Sales Invoices',
      shortBenefit: 'POS Billing & Barcode Scan',
      shortcut: 'F8',
      icon: FileText,
      detailHeading: 'Tax Invoice Voucher (#INV-2024-0089)',
      metricBadge: 'Verified GST Format',
      metricBadgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      detailRows: [
        { label: 'Customer', value: 'Mehta Electronics & Hardware' },
        { label: 'GST Type', value: 'B2B Regular (CGST 9% + SGST 9%)' },
        { label: 'Taxable Amount', value: '₹34,500.00' },
        { label: 'GST Tax (18%)', value: '₹6,210.00' },
        { label: 'Grand Total', value: '₹40,710.00' }
      ],
      visualSummary: {
        label: 'Total Bill Amount',
        value: '₹40,710.00',
        subtext: 'Thermal 3" & A4 print ready • Numpad Enter to Save',
        percent: 100
      }
    },
    {
      id: 'purchase',
      title: 'Purchase Bills',
      shortBenefit: 'Stock Inward & ITC Claim',
      shortcut: 'F9',
      icon: ArrowDownLeft,
      detailHeading: 'Inward Purchase (#PUR-2024-0034)',
      metricBadge: 'Eligible for ITC',
      metricBadgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      detailRows: [
        { label: 'Vendor / Supplier', value: 'Anchor Electricals Pvt Ltd' },
        { label: 'Supplier GSTIN', value: '27AABCA1294C1Z9' },
        { label: 'Stock Auto-Updated', value: '+25 Coils Wiring Cable' },
        { label: 'Input Tax Credit', value: '₹8,260.00 (Eligible ITC)' },
        { label: 'Bill Amount', value: '₹54,200.00' }
      ],
      visualSummary: {
        label: 'Input Tax Credit Claimed',
        value: '₹8,260.00',
        subtext: 'Auto-credited to GSTR-3B tax offset ledger',
        percent: 85
      }
    },
    {
      id: 'receive',
      title: 'Receive Payment',
      shortBenefit: 'Cash, UPI & Bank Receipts',
      shortcut: 'F6',
      icon: Receipt,
      detailHeading: 'Payment Receipt (#REC-2024-0042)',
      metricBadge: 'Ledger Adjusted',
      metricBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      detailRows: [
        { label: 'Party / Debtor', value: 'Shreeji Hardware Mart' },
        { label: 'Against Invoice', value: 'INV-2024-0072' },
        { label: 'Payment Mode', value: 'Bank NEFT Ref #792194819' },
        { label: 'Amount Received', value: '₹66,552.00' },
        { label: 'Pending Dues', value: '₹0.00 (Cleared)' }
      ],
      visualSummary: {
        label: 'Account Cleared',
        value: '₹66,552.00',
        subtext: 'Customer SMS / WhatsApp acknowledgement ready',
        percent: 100
      }
    },
    {
      id: 'pay',
      title: 'Pay Supplier',
      shortBenefit: 'Vendor Vouchers & Cheques',
      shortcut: 'F5',
      icon: CreditCard,
      detailHeading: 'Payment Voucher (#PAY-2024-0019)',
      metricBadge: 'Dues Cleared',
      metricBadgeColor: 'bg-purple-50 text-[#6D28D9] border-purple-200',
      detailRows: [
        { label: 'Supplier Name', value: 'Kalyan Industrial Agencies' },
        { label: 'Bank Account', value: 'HDFC Bank - Cheque #49102' },
        { label: 'Amount Paid', value: '₹22,100.00' },
        { label: 'Pending Balance', value: '₹0.00' }
      ],
      visualSummary: {
        label: 'Disbursement Logged',
        value: '₹22,100.00',
        subtext: 'Bank reconciliation statement matched',
        percent: 100
      }
    },
    {
      id: 'stock',
      title: 'Stock & Inventory',
      shortBenefit: 'HSN, Units & Reorder Alerts',
      shortcut: 'F4',
      icon: Boxes,
      detailHeading: 'Item Master Register (Catalog)',
      metricBadge: '38 Coils in Stock',
      metricBadgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      detailRows: [
        { label: 'Item Name', value: 'Havells 1.5 sq mm Wire (Red)' },
        { label: 'HSN Code', value: '8544 (Insulated Wires)' },
        { label: 'GST Tax Slab', value: '18% (9% CGST + 9% SGST)' },
        { label: 'Current Stock', value: '38 Coils in Shop' },
        { label: 'Reorder Warning', value: 'Alert when < 15 Coils' }
      ],
      visualSummary: {
        label: 'Stock Health: OK',
        value: '38 Coils (₹47,500)',
        subtext: 'Barcode scan ready • Fast numpad billing',
        percent: 72
      }
    },
    {
      id: 'gst',
      title: 'GST Summary',
      shortBenefit: 'GSTR-1 & 3B Monthly Tax',
      shortcut: 'F11',
      icon: Percent,
      detailHeading: 'Monthly GST Tax Computation',
      metricBadge: 'Ready for CA Filing',
      metricBadgeColor: 'bg-purple-50 text-[#6D28D9] border-purple-200',
      detailRows: [
        { label: 'Taxable Turnover', value: '₹4,82,350.00' },
        { label: 'Output Tax Liability', value: '₹43,411.50' },
        { label: 'Less: Input Tax Credit', value: '₹14,771.50' },
        { label: 'Net Cash Tax Payable', value: '₹28,640.00' }
      ],
      visualSummary: {
        label: 'Net Tax Payable',
        value: '₹28,640.00',
        subtext: 'HSN summary & B2B invoices auto-bifurcated',
        percent: 65
      }
    },
    {
      id: 'reports',
      title: 'Business Reports',
      shortBenefit: 'Day Book, P&L & Balance Sheet',
      shortcut: 'F12',
      icon: BarChart2,
      detailHeading: 'Audit Financial Statement',
      metricBadge: 'Reconciled',
      metricBadgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      detailRows: [
        { label: 'Gross Sales Revenue', value: '₹28,49,120.00' },
        { label: 'Purchase Cost of Goods', value: '₹19,34,500.00' },
        { label: 'Operating Expenses', value: '₹1,42,800.00' },
        { label: 'Net Operating Profit', value: '₹7,71,820.00' }
      ],
      visualSummary: {
        label: 'Net Operating Profit',
        value: '₹7,71,820.00',
        subtext: 'Export to Excel / PDF with 1 click',
        percent: 90
      }
    },
    {
      id: 'multi-company',
      title: 'Multi Company',
      shortBenefit: 'Manage Multiple Shops & FY',
      shortcut: 'Alt+F1',
      icon: Building2,
      detailHeading: 'Company & Financial Year Switcher',
      metricBadge: '3 Companies Active',
      metricBadgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      detailRows: [
        { label: 'Active Company #1', value: 'Shree Krishna Traders (Wholesale)' },
        { label: 'Active Company #2', value: 'Krishna Retail Store (Counter POS)' },
        { label: 'Financial Years', value: '2024-25 (Current) / 2023-24' },
        { label: 'Database Storage', value: 'Separate Encrypted SQLite Files' }
      ],
      visualSummary: {
        label: 'Instant Company Switch',
        value: '0ms Delay',
        subtext: 'Separate accounts, inventories, and tax books',
        percent: 100
      }
    }
  ];

  const currentItem = features.find(f => f.id === selectedFeature) || features[0];

  return (
    <section id="features" className="py-20 md:py-22 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
            Core Desktop Modules
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Businesses Choose ZenterPrime
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] leading-relaxed">
            Essential retail and wholesale accounting modules running entirely on your local PC with full keyboard shortcut control.
          </p>
        </div>

        {/* Two-Column Grid: Left Clean Feature List, Right Software Screen Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left: Clean Feature List (8 Items) */}
          <div className="lg:col-span-5 space-y-2.5">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              const isSelected = selectedFeature === feature.id;

              return (
                <button
                  key={feature.id}
                  id={`btn-feature-${feature.id}`}
                  onClick={() => setSelectedFeature(feature.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-[8px] border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected 
                      ? 'bg-purple-50/70 border-[#6D28D9]' 
                      : 'bg-white border-[#E5E7EB] hover:bg-[#FCFCFD] hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-7 h-7 rounded-[4px] flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#6D28D9] text-white' : 'bg-[#F3F4F6] text-slate-700'
                    }`}>
                      <IconComponent className="w-3.5 h-3.5 stroke-[1.75]" />
                    </div>

                    <div className="min-w-0">
                      <h3 className={`text-xs font-bold truncate leading-tight ${isSelected ? 'text-[#6D28D9]' : 'text-slate-900'}`}>
                        {feature.title}
                      </h3>
                      <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                        {feature.shortBenefit}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                    isSelected 
                      ? 'bg-[#6D28D9] text-white border-[#6D28D9]' 
                      : 'bg-slate-50 text-slate-500 border-[#E5E7EB]'
                  }`}>
                    {feature.shortcut}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Clean Desktop Software Preview Panel */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="bg-white border border-[#E5E7EB] rounded-[8px] overflow-hidden">
              
              {/* Windows Window Titlebar */}
              <div className="bg-[#F3F4F6] border-b border-[#E5E7EB] px-4 py-2.5 flex items-center justify-between text-xs select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="font-semibold text-slate-800 text-xs">
                    ZenterPrime Desktop — {currentItem.detailHeading}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 border border-[#E5E7EB] rounded text-slate-600">
                  Shortcut: {currentItem.shortcut}
                </span>
              </div>

              {/* Window Content */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentItem.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="p-5 bg-white"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {currentItem.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {currentItem.shortBenefit}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border ${currentItem.metricBadgeColor}`}>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{currentItem.metricBadge}</span>
                    </span>
                  </div>

                  {/* Accounting Table Record Preview */}
                  <div className="border border-[#E5E7EB] rounded-[6px] overflow-hidden mb-4">
                    <table className="w-full text-xs text-left">
                      <tbody className="divide-y divide-[#E5E7EB]">
                        {currentItem.detailRows.map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FCFCFD]'}>
                            <td className="py-2.5 px-3.5 font-medium text-slate-600 w-2/5 border-r border-[#E5E7EB]">
                              {row.label}
                            </td>
                            <td className="py-2.5 px-3.5 font-semibold text-slate-900 tabular-nums">
                              {row.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Keyboard Shortcuts Footer Banner */}
                  <div className="p-2.5 bg-[#FCFCFD] border border-[#E5E7EB] rounded-[6px] flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <span className="font-semibold text-slate-700">Quick Action:</span>
                      <span>Press <kbd className="bg-white px-1.5 py-0.5 border border-slate-300 rounded font-mono text-[10px]">Enter</kbd> to record entry</span>
                    </div>
                    <span className="text-[10px] text-[#6D28D9] font-semibold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      Numpad POS Ready
                    </span>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyBusinessesChoose;
