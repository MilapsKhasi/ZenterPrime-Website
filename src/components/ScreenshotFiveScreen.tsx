import React, { useState } from 'react';
import { 
  Menu, 
  Building2, 
  ChevronDown, 
  Search, 
  FileSpreadsheet, 
  Plus, 
  Moon, 
  LayoutDashboard, 
  FileText, 
  ArrowDownCircle, 
  Truck, 
  ShoppingCart, 
  ArrowUpCircle, 
  Package, 
  Users, 
  BookOpen, 
  Tag, 
  BarChart3, 
  Settings,
  Boxes,
  ArrowUpRight,
  Download
} from 'lucide-react';

export const ScreenshotFiveScreen: React.FC = () => {
  const [filterText] = useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const BASE_WIDTH = 1100;
  const BASE_HEIGHT = 618.75; // 16:9 ratio

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.getBoundingClientRect().width;
      if (width > 0) {
        setScale(width / BASE_WIDTH);
      }
    };

    updateScale();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setScale(entry.contentRect.width / BASE_WIDTH);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transactions = [
    { date: '06/10/26', type: 'Sale', doc: '2026-27-034', party: 'FLOTONIC MATELS', amount: '35,164.00', status: 'Paid' },
    { date: '31/08/26', type: 'Purchase', doc: '63/26-27', party: 'NARSON INCORPORATION', amount: '2,360.00', status: 'Paid' },
    { date: '29/08/26', type: 'Sale', doc: '2026-27-024', party: 'UNITED INDUSTRIES', amount: '944.00', status: 'Pending' },
  ];

  const filteredTransactions = transactions.filter(t => 
    t.party.toLowerCase().includes(filterText.toLowerCase()) ||
    t.doc.toLowerCase().includes(filterText.toLowerCase()) ||
    t.type.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div 
      ref={containerRef}
      id="screenshot-5-container"
      className="w-full relative aspect-[16/9] bg-[#F8FAFC] border-[0.5px] border-[#d9d9d9] text-slate-800 text-[11px] select-none font-sans shadow-md rounded-[6px] overflow-hidden"
    >
      <div 
        style={{
          width: `${BASE_WIDTH}px`,
          height: `${BASE_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        className="absolute top-0 left-0 flex flex-col bg-[#F8FAFC] antialiased overflow-hidden"
      >
        {/* Top Header Bar - Matches screenshot.png (Deep Purple #6D28D9) */}
        <div className="bg-[#6D28D9] px-3 py-2 flex items-center justify-between gap-2 shrink-0 h-11 text-white">
          {/* Left branding & enterprise dropdown */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-[4px] bg-white text-[#6D28D9] flex items-center justify-center font-bold text-xs">
                Z
              </div>
              <span className="font-semibold text-sm tracking-tight text-white">ZenterPrime</span>
            </div>

            {/* Global Search Bar in Header */}
            <div className="relative flex items-center ml-2">
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-purple-300" />
              <input 
                type="text" 
                placeholder="Search vouchers, ledgers, items, parties..." 
                readOnly
                className="bg-white/10 border border-white/20 rounded-md pl-8 pr-3 py-1 text-[11px] text-white placeholder-purple-200 w-80 focus:outline-none"
              />
            </div>
          </div>

          {/* Right Actions: Company Dropdown, Import, Export, Create, Moon, Settings */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-white bg-white/10 px-2.5 py-1 rounded-[4px] border border-white/20">
              <Building2 className="w-3.5 h-3.5 text-purple-200" />
              <span className="font-semibold">SK ENTERPRISE</span>
              <ChevronDown className="w-3 h-3 text-purple-200" />
            </div>

            <div className="flex items-center gap-1.5 bg-[#10B981] text-white px-2.5 py-1 rounded-[4px] text-[11px] font-medium">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Import</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white/10 text-white border border-white/20 px-2.5 py-1 rounded-[4px] text-[11px] font-medium">
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </div>

            <div className="flex items-center gap-1 bg-[#ffffff] px-3 py-1 rounded-[4px] text-[11px] shadow-xs">
              <Plus className="w-3.5 h-3.5 text-[#000000]" />
              <span className="text-[#000000] font-normal">Create</span>
            </div>

            <div className="text-white/80 p-1">
              <Moon className="w-4 h-4" />
            </div>

            <div className="text-white/80 p-1">
              <Settings className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Main App Workspace */}
        <div className="flex flex-1 w-full h-[574.75px] overflow-hidden">
          {/* Left Sidebar - No hover effects */}
          <aside className="w-48 bg-white border-r border-slate-200 p-2.5 shrink-0 flex flex-col justify-between overflow-hidden">
            <div className="space-y-2">
              <div>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                  Quick Start
                </span>
                <div className="mt-1">
                  <div className="w-full bg-[#6D28D9] text-white flex items-center gap-2 px-2.5 py-1.5 rounded-[4px] text-[11px] font-semibold shadow-xs">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </div>
                </div>
              </div>

              {/* Sales */}
              <div>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                  SALES
                </span>
                <div className="mt-0.5 space-y-0.5">
                  {[
                    { name: 'Sales Invoices', icon: FileText },
                    { name: 'Receive Payment', icon: ArrowDownCircle },
                    { name: 'Delivery Challan', icon: Truck },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="flex items-center justify-between text-slate-600 px-2 py-1 rounded-[4px] text-[10.5px]">
                        <div className="flex items-center gap-1.5 truncate">
                          <Icon className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{item.name}</span>
                        </div>
                        <Plus className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Purchases */}
              <div>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                  PURCHASES
                </span>
                <div className="mt-0.5 space-y-0.5">
                  {[
                    { name: 'Purchase Bills', icon: ShoppingCart },
                    { name: 'Pay Supplier', icon: ArrowUpCircle },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="flex items-center justify-between text-slate-600 px-2 py-1 rounded-[4px] text-[10.5px]">
                        <div className="flex items-center gap-1.5 truncate">
                          <Icon className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{item.name}</span>
                        </div>
                        <Plus className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stock */}
              <div>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                  STOCK
                </span>
                <div className="mt-0.5">
                  <div className="flex items-center justify-between text-slate-600 px-2 py-1 rounded-[4px] text-[10.5px]">
                    <div className="flex items-center gap-1.5 truncate">
                      <Package className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">Stock Items</span>
                    </div>
                    <Plus className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Parties */}
              <div>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                  PARTIES
                </span>
                <div className="mt-0.5">
                  <div className="flex items-center justify-between text-slate-600 px-2 py-1 rounded-[4px] text-[10.5px]">
                    <div className="flex items-center gap-1.5 truncate">
                      <Users className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">Parties</span>
                    </div>
                    <Plus className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Others */}
              <div>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                  OTHERS
                </span>
                <div className="mt-0.5 space-y-0.5 text-slate-600">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-[4px] text-[10.5px]">
                    <BookOpen className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>Cashbook</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-[4px] text-[10.5px]">
                    <Tag className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>Additional Charges</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-[4px] text-[10.5px]">
                    <BarChart3 className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>Reports</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Content Area - Completely non-scrollable, fits perfectly */}
          <div className="flex-1 min-w-0 p-3 bg-[#F8FAFC] overflow-hidden flex flex-col justify-between">
            {/* Executive Summary Header */}
            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200 shrink-0">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-[4px] bg-purple-100 text-[#6D28D9] flex items-center justify-center shrink-0 mt-0.5">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">
                    Executive Summary
                  </h2>
                  <p className="text-[10px] text-slate-500">
                    Real-time overview of sales, purchases, payables, receivables, and recent activity
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-[4px] text-[9.5px] text-slate-700">
                  <span>This Year</span>
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                </div>
                <div className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-[4px] text-[9.5px] text-slate-700">
                  <span>This Month</span>
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                </div>
                <div className="bg-[#6D28D9] text-white px-2.5 py-0.5 rounded-[4px] text-[9.5px] font-semibold flex items-center gap-1 shrink-0 shadow-xs">
                  <Plus className="w-2.5 h-2.5" />
                  <span>New Voucher</span>
                  <ChevronDown className="w-2 h-2 ml-0.5" />
                </div>
              </div>
            </div>

            {/* 4 KPI Summary Cards */}
            <div className="grid grid-cols-4 gap-2 mb-2 shrink-0">
              {/* Card 1: Sales */}
              <div className="bg-white border border-slate-200 rounded-[6px] p-2.5 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-0.5">
                  <span className="text-[10px] font-medium">Sales (Gross)</span>
                  <div className="w-4.5 h-4.5 rounded-full bg-purple-50 text-[#6D28D9] flex items-center justify-center text-[9px] font-bold">
                    ₹
                  </div>
                </div>
                <div className="text-[13.5px] font-bold text-slate-900 tracking-tight">
                  ₹6,67,822.39
                </div>
                <div className="text-[9.5px] text-slate-500">
                  Net Recv: ₹1,81,638.09
                </div>
              </div>

              {/* Card 2: Purchases */}
              <div className="bg-white border border-slate-200 rounded-[6px] p-2.5 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-0.5">
                  <span className="text-[10px] font-medium">Purchases</span>
                  <ShoppingCart className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[13.5px] font-bold text-slate-900 tracking-tight">
                  ₹3,79,339.59
                </div>
                <div className="text-[9.5px] text-slate-500">
                  Net Payable: ₹56,038.20
                </div>
              </div>

              {/* Card 3: Active Partners */}
              <div className="bg-white border border-slate-200 rounded-[6px] p-2.5 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-0.5">
                  <span className="text-[10px] font-medium">Active Partners</span>
                  <Users className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[13.5px] font-bold text-slate-900 tracking-tight">
                  27
                </div>
                <div className="text-[9.5px] text-slate-500">
                  12 Vendors / 15 Customers
                </div>
              </div>

              {/* Card 4: Inventory */}
              <div className="bg-white border border-slate-200 rounded-[6px] p-2.5 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-0.5">
                  <span className="text-[10px] font-medium">Inventory</span>
                  <Boxes className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[13.5px] font-bold text-slate-900 tracking-tight">
                  66
                </div>
                <div className="text-[9.5px] text-slate-500">
                  Registered SKU Items
                </div>
              </div>
            </div>

            {/* Revenue Overview Card */}
            <div className="bg-white border border-slate-200 rounded-[6px] p-2.5 mb-2 shadow-xs shrink-0">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[11px] text-slate-900">Revenue Overview</span>
                    <div className="bg-slate-100 p-0.5 rounded-[4px] flex items-center text-[9.5px]">
                      <span className="bg-[#6D28D9] text-white px-1.5 py-0.2 rounded-[3px] font-medium">Revenue</span>
                      <span className="text-slate-600 px-1.5 py-0.2">Purchases</span>
                      <span className="text-slate-600 px-1.5 py-0.2">Both</span>
                    </div>
                  </div>
                  <p className="text-[9.5px] text-slate-500">Business revenue growth and monthly performance</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-[4px] text-[9.5px] text-slate-600 font-medium">
                    <span className="px-1.5 py-0.2">1W</span>
                    <span className="px-1.5 py-0.2">1M</span>
                    <span className="px-1.5 py-0.2">3M</span>
                    <span className="px-1.5 py-0.2">1Y</span>
                    <span className="bg-white text-slate-900 shadow-xs px-1.5 py-0.2 rounded-[3px]">6M</span>
                    <span className="px-1.5 py-0.2">All</span>
                  </div>
                  <div className="border border-slate-200 px-2 py-0.5 rounded-[4px] text-[9.5px] font-medium text-slate-700 flex items-center gap-1 bg-white">
                    <Download className="w-2.5 h-2.5 text-slate-500" />
                    <span>Export</span>
                  </div>
                </div>
              </div>

              {/* Chart Placeholder / SVG simulation */}
              <div className="relative h-20 w-full my-1">
                {/* Y Axis Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between text-[8px] text-slate-400 pointer-events-none">
                  <div className="border-b border-slate-100 flex justify-between pr-2"><span>₹1.6L</span></div>
                  <div className="border-b border-slate-100 flex justify-between pr-2"><span>₹1.2L</span></div>
                  <div className="border-b border-slate-100 flex justify-between pr-2"><span>₹80.0K</span></div>
                  <div className="border-b border-slate-100 flex justify-between pr-2"><span>₹40.0K</span></div>
                </div>

                {/* SVG Curve */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 100">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M 0,55 C 150,10 350,90 500,50 C 650,10 750,80 800,80 L 800,100 L 0,100 Z" 
                    fill="url(#chartGradient)" 
                  />
                  <path 
                    d="M 0,55 C 150,10 350,90 500,50 C 650,10 750,80 800,80" 
                    fill="none" 
                    stroke="#6D28D9" 
                    strokeWidth="2" 
                  />
                </svg>

                {/* X Axis Labels */}
                <div className="absolute bottom-[-14px] left-0 right-0 flex justify-between text-[8px] text-slate-400 px-2">
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                </div>
              </div>

              {/* Bottom Summary Stats */}
              <div className="mt-4 pt-1.5 border-t border-slate-100 flex items-center justify-center gap-8 text-[10px]">
                <div>
                  <span className="text-slate-500 mr-2">Total</span>
                  <span className="font-bold text-slate-900">₹4.8L</span>
                </div>
                <div className="text-slate-300">|</div>
                <div>
                  <span className="text-slate-500 mr-2">Growth</span>
                  <span className="font-bold text-red-600">-38.1% ↓</span>
                </div>
                <div className="text-slate-300">|</div>
                <div>
                  <span className="text-slate-500 mr-2">Avg</span>
                  <span className="font-bold text-slate-900">₹80.1K</span>
                </div>
              </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white border border-slate-200 rounded-[6px] overflow-hidden shadow-xs shrink-0">
              <div className="px-3 py-1.5 border-b border-slate-200 flex items-center justify-between gap-2">
                <span className="font-bold text-[11px] text-slate-900">
                  Recent Transactions
                </span>
                <span className="text-[9.5px] text-slate-400">Showing recent activity</span>
              </div>

              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[8.5px]">
                    <th className="py-1 px-3">DATE</th>
                    <th className="py-1 px-2">TYPE</th>
                    <th className="py-1 px-2">DOCUMENT #</th>
                    <th className="py-1 px-2">PARTY NAME</th>
                    <th className="py-1 px-2 text-right">TOTAL AMOUNT</th>
                    <th className="py-1 px-3 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.map((tx, idx) => (
                    <tr key={idx}>
                      <td className="py-1 px-3 text-slate-500 whitespace-nowrap">{tx.date}</td>
                      <td className="py-1 px-2 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-0.5 px-1 py-0.2 rounded-[3px] font-medium text-[9px] ${
                          tx.type === 'Sale' 
                            ? 'bg-purple-50 text-[#6D28D9] border border-purple-200' 
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {tx.type === 'Sale' && <ArrowUpRight className="w-2 h-2" />}
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-1 px-2 font-mono text-slate-700 whitespace-nowrap">{tx.doc}</td>
                      <td className="py-1 px-2 font-semibold text-slate-900 truncate max-w-[180px]">{tx.party}</td>
                      <td className="py-1 px-2 text-right font-mono font-semibold text-slate-900 whitespace-nowrap">₹{tx.amount}</td>
                      <td className="py-1 px-3 text-center whitespace-nowrap">
                        <span className={`inline-block px-1.5 py-0.2 rounded-[3px] text-[9px] font-semibold ${
                          tx.status === 'Paid' 
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotFiveScreen;
