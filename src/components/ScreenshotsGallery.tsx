import React, { useState } from 'react';
import { 
  Minus, 
  Maximize2, 
  X, 
  Printer, 
  Download, 
  Search, 
  Calendar,
  Filter,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ScreenKey = 
  | 'dashboard'
  | 'sales' 
  | 'purchase' 
  | 'ledger' 
  | 'stock' 
  | 'gst' 
  | 'cashbook';

interface ScreenTab {
  id: ScreenKey;
  label: string;
  windowTitle: string;
  badge: string;
}

export const ScreenshotsGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ScreenKey>('dashboard');

  const tabs: ScreenTab[] = [
    { id: 'dashboard', label: 'Dashboard', windowTitle: 'Executive Financial Dashboard — Shree Krishna Traders', badge: 'Overview' },
    { id: 'sales', label: 'Sales Invoice', windowTitle: 'Tax Invoice Generator (B2B & B2C POS)', badge: 'Billing Desk' },
    { id: 'purchase', label: 'Purchase Entry', windowTitle: 'Inward Purchase Bill & Vendor Inward Register', badge: 'Inventory In' },
    { id: 'ledger', label: 'Party Ledger', windowTitle: 'Customer & Vendor Account Statement (Khatabook)', badge: 'Receivables' },
    { id: 'stock', label: 'Stock Report', windowTitle: 'Inventory Stock Summary & SKU Valuations', badge: 'Stock Register' },
    { id: 'gst', label: 'GST Summary', windowTitle: 'GSTR-1 & GSTR-3B Tax Computation Sheet', badge: 'Tax Portal' },
    { id: 'cashbook', label: 'Cashbook', windowTitle: 'Daily Cash & Bank Book Statement (Day Book)', badge: 'Cash Flow' },
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <section id="gallery" className="py-20 md:py-22 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wider block mb-1">
            Desktop Interface
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Software Views &amp; Workspaces
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-[620px] mx-auto leading-relaxed">
            High-density data tables, instant keyboard shortcuts, and clear tabular ledger balances designed for retail productivity.
          </p>
        </div>

        {/* Windows Desktop Frame for Active Screenshot */}
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] overflow-hidden">
          
          {/* Window Titlebar */}
          <div className="bg-[#F3F4F6] border-b border-[#E5E7EB] px-3.5 py-2 flex items-center justify-between text-xs select-none">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-[2px] bg-[#6D28D9] text-white flex items-center justify-center font-bold text-[9px]">
                Z
              </div>
              <span className="font-semibold text-slate-800 text-xs truncate max-w-xs sm:max-w-md">
                {currentTab.windowTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 border border-[#E5E7EB] rounded text-slate-600 hidden sm:inline-block">
                {currentTab.badge}
              </span>
              <div className="flex items-center text-slate-400">
                <div className="p-1 hover:bg-slate-200 rounded-[2px]"><Minus className="w-2.5 h-2.5" /></div>
                <div className="p-1 hover:bg-slate-200 rounded-[2px]"><Maximize2 className="w-2.5 h-2.5" /></div>
                <div className="p-1 hover:bg-red-500 hover:text-white rounded-[2px]"><X className="w-2.5 h-2.5" /></div>
              </div>
            </div>
          </div>

          {/* Window Content Displaying Realistic Accounting Screens with AnimatePresence */}
          <div className="p-4 sm:p-5 bg-[#FCFDFE] min-h-[440px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
            
            {/* 1. Dashboard View */}
            {activeTab === 'dashboard' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E7EB]">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Current Business Overview</h3>
                    <p className="text-xs text-slate-500">Live summary of financial health and receivables</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 bg-white border border-[#E5E7EB] px-2 py-1 rounded font-mono">
                      Financial Year: 2024-2025
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-white border border-[#E5E7EB] rounded-[6px]">
                    <span className="text-[11px] text-slate-500 block">Total Sales Revenue</span>
                    <span className="text-lg font-bold text-slate-900 tabular-nums">₹28,49,120.00</span>
                    <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">↑ 18.2% vs last quarter</span>
                  </div>
                  <div className="p-3 bg-white border border-[#E5E7EB] rounded-[6px]">
                    <span className="text-[11px] text-slate-500 block">Total Purchases</span>
                    <span className="text-lg font-bold text-slate-900 tabular-nums">₹19,34,500.00</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">82 Vendor vouchers</span>
                  </div>
                  <div className="p-3 bg-white border border-[#E5E7EB] rounded-[6px]">
                    <span className="text-[11px] text-slate-500 block">Customer Dues (Udhaar)</span>
                    <span className="text-lg font-bold text-amber-700 tabular-nums">₹1,18,400.00</span>
                    <span className="text-[10px] text-amber-600 block mt-0.5">14 pending parties</span>
                  </div>
                  <div className="p-3 bg-white border border-[#E5E7EB] rounded-[6px]">
                    <span className="text-[11px] text-slate-500 block">Bank + Cash Balance</span>
                    <span className="text-lg font-bold text-emerald-700 tabular-nums">₹3,66,540.00</span>
                    <span className="text-[10px] text-emerald-600 block mt-0.5">2 Bank accounts</span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E5E7EB] rounded-[6px]">
                  <h4 className="text-xs font-bold text-slate-800 mb-2">Today's Operating Activity</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2 bg-[#F9F9F9] rounded border border-[#E5E7EB]">
                      <span className="text-slate-500 block">Today's Invoices:</span>
                      <strong className="text-slate-900 text-sm">18 Bills (₹42,390.00)</strong>
                    </div>
                    <div className="p-2 bg-[#F9F9F9] rounded border border-[#E5E7EB]">
                      <span className="text-slate-500 block">Today's Receipts:</span>
                      <strong className="text-slate-900 text-sm">6 Receipts (₹28,100.00)</strong>
                    </div>
                    <div className="p-2 bg-[#F9F9F9] rounded border border-[#E5E7EB]">
                      <span className="text-slate-500 block">Today's Cash Payments:</span>
                      <strong className="text-slate-900 text-sm">₹4,250.00 (Freight &amp; Tea)</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Sales Invoice View */}
            {activeTab === 'sales' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <div>
                    <span className="text-xs font-bold text-slate-900">VOUCHER: TAX INVOICE #INV-2024-0089</span>
                    <span className="text-xs text-slate-500 ml-2">Date: 17/09/2024</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-xs bg-white border border-[#E5E7EB] px-2.5 py-1 rounded text-slate-700">
                      <Printer className="w-3 h-3" />
                      <span>Print (Alt+P)</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs bg-[#6D28D9] text-white px-2.5 py-1 rounded font-medium">
                      <span>Save &amp; Print (Ctrl+A)</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-white p-2.5 border border-[#E5E7EB] rounded-[6px]">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Buyer / Debtor:</span>
                    <strong className="text-slate-800">Mehta Electronics &amp; Traders</strong>
                    <span className="text-slate-500 block text-[10px] font-mono">GSTIN: 24AABCM9182C1Z4</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Place of Supply:</span>
                    <strong className="text-slate-800">24 - Gujarat (Intra-State)</strong>
                    <span className="text-slate-500 block text-[10px]">Tax Scheme: Regular CGST+SGST</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Current Balance:</span>
                    <strong className="text-amber-700 tabular-nums">₹14,250.00 Dr</strong>
                    <span className="text-slate-500 block text-[10px]">Credit Limit: ₹1,00,000.00</span>
                  </div>
                </div>

                <div className="border border-[#E5E7EB] rounded-[6px] overflow-x-auto bg-white">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F3F4F6] text-slate-600 text-[10px] uppercase border-b border-[#E5E7EB]">
                      <tr>
                        <th className="py-1.5 px-3">#</th>
                        <th className="py-1.5 px-3">Item Description</th>
                        <th className="py-1.5 px-3">HSN</th>
                        <th className="py-1.5 px-3 text-right">Qty</th>
                        <th className="py-1.5 px-3 text-right">Rate</th>
                        <th className="py-1.5 px-3 text-right">Taxable</th>
                        <th className="py-1.5 px-3 text-right">GST %</th>
                        <th className="py-1.5 px-3 text-right">CGST</th>
                        <th className="py-1.5 px-3 text-right">SGST</th>
                        <th className="py-1.5 px-3 text-right">Total (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      <tr>
                        <td className="py-1.5 px-3">1</td>
                        <td className="py-1.5 px-3 font-medium">Havells 1.5 sq mm Wire (Red)</td>
                        <td className="py-1.5 px-3 font-mono text-[11px]">8544</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">15 Coil</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹1,450.00</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹21,750.00</td>
                        <td className="py-1.5 px-3 text-right">18%</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹1,957.50</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹1,957.50</td>
                        <td className="py-1.5 px-3 text-right font-bold tabular-nums">₹25,665.00</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3">2</td>
                        <td className="py-1.5 px-3 font-medium">Anchor Modular 6A Switch (White)</td>
                        <td className="py-1.5 px-3 font-mono text-[11px]">8536</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">100 Pcs</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹65.00</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹6,500.00</td>
                        <td className="py-1.5 px-3 text-right">18%</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹585.00</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹585.00</td>
                        <td className="py-1.5 px-3 text-right font-bold tabular-nums">₹7,670.00</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3">3</td>
                        <td className="py-1.5 px-3 font-medium">Finolex PVC Conduit Pipe 20mm</td>
                        <td className="py-1.5 px-3 font-mono text-[11px]">3917</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">50 Pcs</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹125.00</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹6,250.00</td>
                        <td className="py-1.5 px-3 text-right">18%</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹562.50</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹562.50</td>
                        <td className="py-1.5 px-3 text-right font-bold tabular-nums">₹7,375.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <div className="w-64 bg-white border border-[#E5E7EB] rounded-[6px] p-2.5 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Taxable Amount:</span>
                      <span className="font-semibold tabular-nums">₹34,500.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Add: CGST @ 9%:</span>
                      <span className="tabular-nums">₹3,105.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Add: SGST @ 9%:</span>
                      <span className="tabular-nums">₹3,105.00</span>
                    </div>
                    <div className="border-t border-[#E5E7EB] pt-1 flex justify-between font-bold text-slate-900 text-sm">
                      <span>Grand Total:</span>
                      <span className="text-[#6D28D9] tabular-nums">₹40,710.00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Purchase Entry View */}
            {activeTab === 'purchase' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <div>
                    <span className="text-xs font-bold text-slate-900">VOUCHER: PURCHASE ENTRY #PUR-2024-0034</span>
                    <span className="text-xs text-slate-500 ml-2">Supplier Bill Ref: AT/9182</span>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-200 rounded">
                    Eligible for ITC Input Tax Credit
                  </span>
                </div>

                <div className="border border-[#E5E7EB] rounded-[6px] overflow-hidden bg-white">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F3F4F6] text-slate-600 text-[10px] uppercase border-b border-[#E5E7EB]">
                      <tr>
                        <th className="py-2 px-3">Item</th>
                        <th className="py-2 px-3">HSN</th>
                        <th className="py-2 px-3 text-right">Inward Qty</th>
                        <th className="py-2 px-3 text-right">Cost Rate</th>
                        <th className="py-2 px-3 text-right">Taxable</th>
                        <th className="py-2 px-3 text-right">GST Rate</th>
                        <th className="py-2 px-3 text-right">ITC Amount</th>
                        <th className="py-2 px-3 text-right">Total Payable</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      <tr>
                        <td className="py-2 px-3 font-medium">Anchor Roma Switch 10A</td>
                        <td className="py-2 px-3 font-mono">8536</td>
                        <td className="py-2 px-3 text-right tabular-nums">200 Pcs</td>
                        <td className="py-2 px-3 text-right tabular-nums">₹42.00</td>
                        <td className="py-2 px-3 text-right tabular-nums">₹8,400.00</td>
                        <td className="py-2 px-3 text-right">18%</td>
                        <td className="py-2 px-3 text-right tabular-nums text-emerald-700">₹1,512.00</td>
                        <td className="py-2 px-3 text-right font-bold tabular-nums">₹9,912.00</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">Havells Submersible Cable 4.0 sq mm</td>
                        <td className="py-2 px-3 font-mono">8544</td>
                        <td className="py-2 px-3 text-right tabular-nums">10 Coils</td>
                        <td className="py-2 px-3 text-right tabular-nums">₹3,750.00</td>
                        <td className="py-2 px-3 text-right tabular-nums">₹37,500.00</td>
                        <td className="py-2 px-3 text-right">18%</td>
                        <td className="py-2 px-3 text-right tabular-nums text-emerald-700">₹6,750.00</td>
                        <td className="py-2 px-3 text-right font-bold tabular-nums">₹44,250.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-[#F9F9F9] border border-[#E5E7EB] rounded-[6px] text-xs text-slate-700">
                  <span className="font-semibold text-slate-900">Inventory Updated:</span> Stock register incremented automatically across 2 SKUs upon voucher saving.
                </div>
              </div>
            )}

            {/* 4. Party Ledger View */}
            {activeTab === 'ledger' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <div>
                    <span className="text-xs font-bold text-slate-900">PARTY STATEMENT: Mehta Electronics &amp; Traders</span>
                    <span className="text-xs text-slate-500 ml-2">Period: 01/04/2024 - 17/09/2024</span>
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200 rounded">
                    Closing Balance: ₹40,710.00 Dr
                  </span>
                </div>

                <div className="border border-[#E5E7EB] rounded-[6px] overflow-hidden bg-white">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F3F4F6] text-slate-600 text-[10px] uppercase border-b border-[#E5E7EB]">
                      <tr>
                        <th className="py-2 px-3">Date</th>
                        <th className="py-2 px-3">Particulars / Voucher Type</th>
                        <th className="py-2 px-3">Vch No.</th>
                        <th className="py-2 px-3 text-right">Debit (₹)</th>
                        <th className="py-2 px-3 text-right">Credit (₹)</th>
                        <th className="py-2 px-3 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      <tr>
                        <td className="py-1.5 px-3 text-slate-600">01/08/2024</td>
                        <td className="py-1.5 px-3">Opening Balance B/F</td>
                        <td className="py-1.5 px-3 font-mono">-</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹15,000.00</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">-</td>
                        <td className="py-1.5 px-3 text-right font-medium tabular-nums">₹15,000.00 Dr</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-slate-600">12/08/2024</td>
                        <td className="py-1.5 px-3">Payment Received (NEFT Ref 410)</td>
                        <td className="py-1.5 px-3 font-mono">REC-0031</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">-</td>
                        <td className="py-1.5 px-3 text-right tabular-nums text-emerald-700">₹15,000.00</td>
                        <td className="py-1.5 px-3 text-right font-medium tabular-nums">₹0.00</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-slate-600">17/09/2024</td>
                        <td className="py-1.5 px-3">Tax Invoice (Sales)</td>
                        <td className="py-1.5 px-3 font-mono">INV-0089</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹40,710.00</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">-</td>
                        <td className="py-1.5 px-3 text-right font-bold text-amber-700 tabular-nums">₹40,710.00 Dr</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. Stock Report View */}
            {activeTab === 'stock' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <div>
                    <span className="text-xs font-bold text-slate-900">CLOSING STOCK REGISTER &amp; VALUATION</span>
                    <span className="text-xs text-slate-500 ml-2">Valuation Method: FIFO / Cost Basis</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-800">
                    Total Inventory Value: <strong className="text-[#6D28D9]">₹8,92,440.00</strong>
                  </span>
                </div>

                <div className="border border-[#E5E7EB] rounded-[6px] overflow-hidden bg-white">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F3F4F6] text-slate-600 text-[10px] uppercase border-b border-[#E5E7EB]">
                      <tr>
                        <th className="py-2 px-3">Item SKU Code</th>
                        <th className="py-2 px-3">Item Name</th>
                        <th className="py-2 px-3">HSN</th>
                        <th className="py-2 px-3 text-right">Inward</th>
                        <th className="py-2 px-3 text-right">Outward</th>
                        <th className="py-2 px-3 text-right">Closing Stock</th>
                        <th className="py-2 px-3 text-right">Avg Rate</th>
                        <th className="py-2 px-3 text-right">Total Value (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      <tr>
                        <td className="py-1.5 px-3 font-mono">SKU-WIRE-15</td>
                        <td className="py-1.5 px-3 font-medium">Havells 1.5 sq mm Wire (Red)</td>
                        <td className="py-1.5 px-3 font-mono">8544</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">120 Coil</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">82 Coil</td>
                        <td className="py-1.5 px-3 text-right font-bold tabular-nums">38 Coil</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹1,250.00</td>
                        <td className="py-1.5 px-3 text-right font-bold tabular-nums">₹47,500.00</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 font-mono">SKU-SW-06A</td>
                        <td className="py-1.5 px-3 font-medium">Anchor Modular 6A Switch (White)</td>
                        <td className="py-1.5 px-3 font-mono">8536</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">600 Pcs</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">592 Pcs</td>
                        <td className="py-1.5 px-3 text-right font-bold text-red-600 tabular-nums">8 Pcs (Low)</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹52.00</td>
                        <td className="py-1.5 px-3 text-right font-bold tabular-nums">₹416.00</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 font-mono">SKU-PIPE-20</td>
                        <td className="py-1.5 px-3 font-medium">Finolex PVC Conduit Pipe 20mm</td>
                        <td className="py-1.5 px-3 font-mono">3917</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">250 Pcs</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">110 Pcs</td>
                        <td className="py-1.5 px-3 text-right font-bold tabular-nums">140 Pcs</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">₹98.00</td>
                        <td className="py-1.5 px-3 text-right font-bold tabular-nums">₹13,720.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. GST Summary View */}
            {activeTab === 'gst' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <div>
                    <span className="text-xs font-bold text-slate-900">GST TAX COMPUTATION SHEET (MONTHLY)</span>
                    <span className="text-xs text-slate-500 ml-2">Tax Period: August 2024</span>
                  </div>
                  <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 border border-purple-200 rounded">
                    Tax Status: Balanced (Payable)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-[#E5E7EB] rounded-[6px]">
                    <h5 className="text-xs font-bold text-slate-800 mb-2">Outward Supplies (Sales Tax Liability)</h5>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-600">Taxable Sales @ 18%:</span>
                        <span className="font-semibold tabular-nums">₹2,41,175.00</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-600">CGST (9%) Output:</span>
                        <span className="font-semibold tabular-nums">₹21,705.75</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-600">SGST (9%) Output:</span>
                        <span className="font-semibold tabular-nums">₹21,705.75</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-[#E5E7EB] rounded-[6px]">
                    <h5 className="text-xs font-bold text-slate-800 mb-2">Inward Supplies (Eligible Input Tax Credit)</h5>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-600">Eligible Purchase Taxable:</span>
                        <span className="font-semibold tabular-nums">₹82,060.00</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-600">CGST (9%) ITC:</span>
                        <span className="font-semibold text-emerald-700 tabular-nums">₹7,385.40</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-600">SGST (9%) ITC:</span>
                        <span className="font-semibold text-emerald-700 tabular-nums">₹7,385.40</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#F3F4F6] border border-[#E5E7EB] rounded-[6px] flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">Net Tax Payable in Cash (Electronic Cash Ledger):</span>
                  <span className="font-bold text-[#6D28D9] text-sm tabular-nums">₹28,640.70</span>
                </div>
              </div>
            )}

            {/* 7. Cashbook View */}
            {activeTab === 'cashbook' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <div>
                    <span className="text-xs font-bold text-slate-900">DAILY CASH &amp; BANK STATEMENT (DAY BOOK)</span>
                    <span className="text-xs text-slate-500 ml-2">Date: 17/09/2024</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-800">
                    Counter Cash in Hand: <strong className="text-emerald-700">₹24,650.00</strong>
                  </span>
                </div>

                <div className="border border-[#E5E7EB] rounded-[6px] overflow-hidden bg-white">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F3F4F6] text-slate-600 text-[10px] uppercase border-b border-[#E5E7EB]">
                      <tr>
                        <th className="py-2 px-3">Time</th>
                        <th className="py-2 px-3">Vch Type</th>
                        <th className="py-2 px-3">Account Head</th>
                        <th className="py-2 px-3">Narration / Details</th>
                        <th className="py-2 px-3 text-right">Cash In (Receipt)</th>
                        <th className="py-2 px-3 text-right">Cash Out (Payment)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      <tr>
                        <td className="py-1.5 px-3 text-slate-500">10:15 AM</td>
                        <td className="py-1.5 px-3 font-semibold">Sales POS</td>
                        <td className="py-1.5 px-3">Cash Counter Sales</td>
                        <td className="py-1.5 px-3 text-slate-600">Bill #INV-0088 counter cash</td>
                        <td className="py-1.5 px-3 text-right font-bold text-emerald-700 tabular-nums">₹9,676.00</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">-</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-slate-500">01:30 PM</td>
                        <td className="py-1.5 px-3 font-semibold">Payment</td>
                        <td className="py-1.5 px-3">Shop Office Expenses</td>
                        <td className="py-1.5 px-3 text-slate-600">Tea, snacks, cleaning staff wages</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">-</td>
                        <td className="py-1.5 px-3 text-right font-bold text-slate-800 tabular-nums">₹450.00</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-slate-500">03:45 PM</td>
                        <td className="py-1.5 px-3 font-semibold">Receipt</td>
                        <td className="py-1.5 px-3">Patel Provision Store</td>
                        <td className="py-1.5 px-3 text-slate-600">Cash received against old bill</td>
                        <td className="py-1.5 px-3 text-right font-bold text-emerald-700 tabular-nums">₹5,000.00</td>
                        <td className="py-1.5 px-3 text-right tabular-nums">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Bar of Window */}
          <div className="bg-[#F3F4F6] border-t border-[#E5E7EB] px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>All balances verified &amp; synced to local SQLite data directory</span>
            </div>
            <div className="text-slate-500 font-mono">
              Records: 1,420 • Tables: 14 • Integrity: OK
            </div>
          </div>

        </div>

        {/* Small Thumbnail / Screen Switcher Strip Below Window */}
        <div className="mt-4 flex items-center justify-center gap-2 overflow-x-auto py-2">
          {tabs.map((tab, idx) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-screenshot-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-purple-50 text-[#6D28D9] border-[#6D28D9] shadow-2xs font-bold'
                    : 'bg-white text-slate-600 border-[#E5E7EB] hover:bg-[#FCFCFD] hover:text-slate-900'
                }`}
              >
                <span className={`text-[10px] font-mono px-1 rounded ${isSelected ? 'bg-[#6D28D9] text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {idx + 1}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ScreenshotsGallery;
