import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  FileSpreadsheet, 
  ChevronDown, 
  LayoutDashboard, 
  FileText, 
  ArrowDownLeft, 
  Receipt, 
  CreditCard, 
  Boxes, 
  Users, 
  BookOpen, 
  Percent, 
  BarChart2, 
  Settings,
  HelpCircle,
  Maximize2,
  Minus,
  X
} from 'lucide-react';

export const AppMockup: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  return (
    <div id="mockup-frame-outer" className="w-full mx-auto">
      {/* Outer Windows Desktop App Window */}
      <div 
        id="desktop-app-window"
        className="w-full bg-white rounded-[8px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden text-slate-800 text-xs"
      >
        {/* Top Window Titlebar (Windows Desktop Style) */}
        <div className="bg-[#F3F4F6] border-b border-[#E5E7EB] px-3.5 py-2 flex items-center justify-between gap-2 select-none">
          
          {/* Left: Window Title & Company Info */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-4 h-4 rounded-[3px] bg-[#6D28D9] flex items-center justify-center text-white font-fredoka text-[10px] font-bold">
              Z
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs text-slate-800">
                ZenterPrime 7.3 Desktop
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-xs text-slate-600 font-medium">
                Shree Krishna Traders — FY 2024-25
              </span>
              <span className="hidden md:inline-flex px-1.5 py-0.2 rounded-[3px] text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                GSTIN: 24AABCS1429B1Z2
              </span>
            </div>
          </div>

          {/* Right: Windows standard minimize, maximize, close buttons */}
          <div className="flex items-center text-slate-500">
            <button className="px-2 py-1 hover:bg-slate-200 rounded-[2px]" aria-label="Minimize">
              <Minus className="w-3 h-3" />
            </button>
            <button className="px-2 py-1 hover:bg-slate-200 rounded-[2px]" aria-label="Maximize">
              <Maximize2 className="w-3 h-3" />
            </button>
            <button className="px-2 py-1 hover:bg-red-600 hover:text-white rounded-[2px]" aria-label="Close">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Secondary Menu Toolbar (Tally / Windows Software Style) */}
        <div className="bg-white border-b border-[#E5E7EB] px-3 py-1.5 flex items-center justify-between text-xs text-slate-700 overflow-x-auto">
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button className="px-2 py-1 hover:bg-slate-100 rounded text-slate-800 font-medium">
              Firm (F1)
            </button>
            <button className="px-2 py-1 hover:bg-slate-100 rounded text-slate-800 font-medium">
              Vouchers (F2)
            </button>
            <button className="px-2 py-1 hover:bg-slate-100 rounded text-slate-800 font-medium">
              Ledger (F3)
            </button>
            <button className="px-2 py-1 hover:bg-slate-100 rounded text-slate-800 font-medium">
              Inventory (F4)
            </button>
            <button className="px-2 py-1 bg-purple-50 text-[#6D28D9] font-medium rounded border border-purple-100">
              GST Portal (F5)
            </button>
            <button className="px-2 py-1 hover:bg-slate-100 rounded text-slate-800 font-medium">
              Reports (F6)
            </button>
            <button className="px-2 py-1 hover:bg-slate-100 rounded text-slate-800 font-medium hidden md:inline-block">
              Backup (F7)
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search ledger / voucher (Ctrl+K)..." 
                readOnly
                className="bg-[#F9F9F9] border border-[#E5E7EB] rounded-[4px] pl-6 pr-2 py-0.5 text-xs text-slate-700 w-52 placeholder:text-slate-400"
              />
            </div>
            <button className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-2.5 py-1 rounded-[4px] font-medium text-xs flex items-center gap-1">
              <Plus className="w-3 h-3" />
              <span>Sales Bill (F8)</span>
            </button>
          </div>
        </div>

        {/* Workspace Body */}
        <div className="flex min-h-[420px] sm:min-h-[460px] bg-[#FCFDFE]">
          
          {/* Left Vertical Navigation Menu */}
          <aside className="w-44 sm:w-48 bg-white border-r border-[#E5E7EB] p-2 flex flex-col justify-between shrink-0">
            <div className="space-y-0.5">
              <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Vouchers &amp; Accounts
              </div>
              
              {[
                { id: 'Dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
                { id: 'Sales', label: 'Sales Invoices (GST)', icon: FileText },
                { id: 'Purchase', label: 'Purchase Bills', icon: ArrowDownLeft },
                { id: 'Receipt', label: 'Receive Payment', icon: Receipt },
                { id: 'Payment', label: 'Pay Supplier', icon: CreditCard },
                { id: 'Inventory', label: 'Stock Items (HSN)', icon: Boxes },
                { id: 'Parties', label: 'Party Ledgers', icon: Users },
                { id: 'Cashbook', label: 'Cash & Bank Book', icon: BookOpen },
                { id: 'GST', label: 'GST Summary (3B/1)', icon: Percent },
                { id: 'Reports', label: 'Audit & Final Reports', icon: BarChart2 }
              ].map((item) => {
                const IconComponent = item.icon;
                const isSelected = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[4px] text-xs font-medium text-left transition-colors ${
                      isSelected 
                        ? 'bg-[#6D28D9] text-white' 
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#E5E7EB] space-y-0.5">
              <button className="w-full flex items-center gap-2 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded">
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Company Settings</span>
              </button>
              <button className="w-full flex items-center gap-2 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Shortcut Help</span>
              </button>
            </div>
          </aside>

          {/* Center/Right Main Accounting Dashboard View */}
          <main className="flex-1 p-3.5 sm:p-4 overflow-x-auto bg-[#F9F9F9]">
            
            {/* Top 4 Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3.5">
              <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-2.5">
                <span className="text-[11px] text-slate-500 block">Total Sales (This Month)</span>
                <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">₹4,82,350.00</span>
                <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">142 Invoices Cleared</span>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-2.5">
                <span className="text-[11px] text-slate-500 block">Sundry Debtors (Receivable)</span>
                <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">₹1,18,400.00</span>
                <span className="text-[10px] text-amber-700 font-medium block mt-0.5">8 Parties Due &gt; 30 Days</span>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-2.5">
                <span className="text-[11px] text-slate-500 block">Sundry Creditors (Payable)</span>
                <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">₹64,220.00</span>
                <span className="text-[10px] text-slate-600 font-medium block mt-0.5">4 Suppliers To Pay</span>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-2.5">
                <span className="text-[11px] text-slate-500 block">Net GST Liability (CGST+SGST)</span>
                <span className="text-base sm:text-lg font-bold text-[#6D28D9] tabular-nums">₹28,640.00</span>
                <span className="text-[10px] text-purple-700 font-medium block mt-0.5">Input Tax Credit: ₹14,200</span>
              </div>
            </div>

            {/* Sales Invoices Register (Dense Tabular Accounting Grid) */}
            <div className="bg-white border border-[#E5E7EB] rounded-[6px] overflow-hidden mb-3.5">
              <div className="px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-slate-800">
                    Recent GST Sales Invoices (Voucher Register)
                  </span>
                  <span className="text-[10px] text-slate-500">Showing last 5 of 142 vouchers</span>
                </div>
                <button className="text-[11px] text-[#6D28D9] hover:underline font-medium">
                  View Full Sales Book (F8) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F3F4F6] text-slate-600 text-[11px] uppercase border-b border-[#E5E7EB]">
                    <tr>
                      <th className="py-1.5 px-3 font-semibold">Inv #</th>
                      <th className="py-1.5 px-3 font-semibold">Date</th>
                      <th className="py-1.5 px-3 font-semibold">Party / Customer</th>
                      <th className="py-1.5 px-3 font-semibold">GSTIN</th>
                      <th className="py-1.5 px-3 font-semibold text-right">Taxable</th>
                      <th className="py-1.5 px-3 font-semibold text-right">CGST</th>
                      <th className="py-1.5 px-3 font-semibold text-right">SGST</th>
                      <th className="py-1.5 px-3 font-semibold text-right">Total (₹)</th>
                      <th className="py-1.5 px-3 font-semibold text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {[
                      { inv: 'INV-2024-089', date: '17/09/2024', party: 'Mehta Electronics & Traders', gstin: '24AABCM9182C1Z4', taxable: '₹34,500.00', cgst: '₹3,105.00', sgst: '₹3,105.00', total: '₹40,710.00', status: 'Paid', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                      { inv: 'INV-2024-088', date: '16/09/2024', party: 'Patel General Provision Store', gstin: 'Unregistered', taxable: '₹8,200.00', cgst: '₹738.00', sgst: '₹738.00', total: '₹9,676.00', status: 'Paid', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                      { inv: 'INV-2024-087', date: '15/09/2024', party: 'Shreeji Hardware Mart', gstin: '24BBFPS8190D1Z9', taxable: '₹56,400.00', cgst: '₹5,076.00', sgst: '₹5,076.00', total: '₹66,552.00', status: 'Due (15d)', statusColor: 'bg-amber-50 text-amber-700 border-amber-200' },
                      { inv: 'INV-2024-086', date: '15/09/2024', party: 'Ambika Retail Agencies', gstin: '24AAGCA4192F1Z8', taxable: '₹14,900.00', cgst: '₹1,341.00', sgst: '₹1,341.00', total: '₹17,582.00', status: 'Paid', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                      { inv: 'INV-2024-085', date: '14/09/2024', party: 'Kalyan Traders & Suppliers', gstin: '24AABCK1092P1Z1', taxable: '₹22,100.00', cgst: '₹1,989.00', sgst: '₹1,989.00', total: '₹26,078.00', status: 'Paid', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-3 font-medium text-slate-900">{row.inv}</td>
                        <td className="py-2 px-3 text-slate-600">{row.date}</td>
                        <td className="py-2 px-3 font-medium text-slate-800">{row.party}</td>
                        <td className="py-2 px-3 text-[11px] text-slate-500 font-mono">{row.gstin}</td>
                        <td className="py-2 px-3 text-right text-slate-700 tabular-nums">{row.taxable}</td>
                        <td className="py-2 px-3 text-right text-slate-600 tabular-nums">{row.cgst}</td>
                        <td className="py-2 px-3 text-right text-slate-600 tabular-nums">{row.sgst}</td>
                        <td className="py-2 px-3 text-right font-bold text-slate-900 tabular-nums">{row.total}</td>
                        <td className="py-2 px-3 text-center">
                          <span className={`inline-block px-1.5 py-0.5 rounded-[3px] text-[10px] font-medium border ${row.statusColor}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Two Split Panels: Stock Warning & Party Ledger Balance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-xs text-slate-800">Low Stock Reorder Limit (Inventory)</span>
                  <span className="text-[10px] text-red-600 font-medium">3 SKUs Need Reorder</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between p-1.5 bg-[#F9F9F9] rounded border border-[#E5E7EB]">
                    <span className="text-slate-800 font-medium">Havells 1.5 sq mm Wire (Red)</span>
                    <span className="text-red-700 font-bold tabular-nums">4 Coils left (Min: 15)</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 bg-[#F9F9F9] rounded border border-[#E5E7EB]">
                    <span className="text-slate-800 font-medium">Anchor Modular 6A Switch (White)</span>
                    <span className="text-red-700 font-bold tabular-nums">8 Pcs left (Min: 50)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-xs text-slate-800">Cash &amp; Bank Balances (Day Book)</span>
                  <span className="text-[10px] text-emerald-700 font-medium">Reconciled Today</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between p-1.5 bg-[#F9F9F9] rounded border border-[#E5E7EB]">
                    <span className="text-slate-800 font-medium">HDFC Bank Current A/c (Ending 4091)</span>
                    <span className="text-slate-900 font-bold tabular-nums">₹3,41,890.00</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 bg-[#F9F9F9] rounded border border-[#E5E7EB]">
                    <span className="text-slate-800 font-medium">Cash in Hand (Counter Drawer)</span>
                    <span className="text-slate-900 font-bold tabular-nums">₹24,650.00</span>
                  </div>
                </div>
              </div>
            </div>

          </main>
        </div>

        {/* Windows Status Bar at Bottom */}
        <div className="bg-[#F3F4F6] border-t border-[#E5E7EB] px-3 py-1 flex items-center justify-between text-[11px] text-slate-600">
          <div className="flex items-center gap-3">
            <span>Server: <strong className="text-slate-800">Local PC (127.0.0.1)</strong></span>
            <span>Database: <strong className="text-slate-800">SQLite Encrypted</strong></span>
            <span className="hidden sm:inline">Network: <strong className="text-emerald-700">Offline Mode Active</strong></span>
          </div>
          <div>
            <span>Press <kbd className="bg-white px-1 py-0.5 border border-slate-300 rounded text-[10px] font-mono">F1</kbd> for Help</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AppMockup;
