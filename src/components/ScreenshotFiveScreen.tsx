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
  Monitor, 
  Settings,
  CircleDollarSign,
  Boxes,
  Filter
} from 'lucide-react';

export const ScreenshotFiveScreen: React.FC = () => {
  const [filterText, setFilterText] = useState('');

  const transactions = [
    { date: '31/08/26', type: 'Purchase', doc: '63/26-27', party: 'NARSON INCORPORATION', amount: '2,360.00', status: 'Paid' },
    { date: '29/08/26', type: 'Sale', doc: '2026-27-024', party: 'UNITED INDUSTRIES', amount: '944.00', status: 'Pending' },
    { date: '29/08/26', type: 'Sale', doc: '2026-27-025', party: 'PATEL BRASS TURNOMATICS', amount: '17,346.00', status: 'Pending' },
    { date: '29/08/26', type: 'Sale', doc: '2026-27-026', party: 'BALAJI MACHINE TOOLS', amount: '1,357.00', status: 'Paid' },
    { date: '27/08/26', type: 'Purchase', doc: '56/26/27', party: 'NARSON INCORPORATION', amount: '30,208.00', status: 'Paid' },
    { date: '27/08/26', type: 'Sale', doc: '2026-27-022', party: 'FLOTONIC MATELS', amount: '26,373.00', status: 'Pending' },
    { date: '27/08/26', type: 'Sale', doc: '2026-27-023', party: 'KRAFT AQUATECH', amount: '42,013.90', status: 'Pending' },
    { date: '25/08/26', type: 'Sale', doc: '2026-27-021', party: 'ORALIA BATHWARE LLP', amount: '3,658.00', status: 'Pending' },
    { date: '18/08/26', type: 'Purchase', doc: 'U2/3922/26-27', party: 'JAY AMBE ENTERPRISE', amount: '13,688.00', status: 'Paid' },
    { date: '03/08/26', type: 'Sale', doc: '2026-27-020', party: 'ORALIA BATHWARE LLP', amount: '4,414.00', status: 'Pending' },
  ];

  const filteredTransactions = transactions.filter(t => 
    t.party.toLowerCase().includes(filterText.toLowerCase()) ||
    t.doc.toLowerCase().includes(filterText.toLowerCase()) ||
    t.type.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div 
      id="screenshot-5-container"
      className="w-full bg-[#F8FAFC] border-[2px] sm:border-[2.5px] border-black text-slate-800 text-[11px] select-none font-sans shadow-md flex flex-col rounded-[6px] overflow-hidden"
    >
      {/* Top Header Bar */}
      <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between gap-2 shrink-0">
        {/* Left branding & enterprise dropdown */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-[4px] bg-[#6D28D9] text-white flex items-center justify-center font-bold text-xs">
              Z
            </div>
            <span className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight">ZenterPrime</span>
          </div>

          <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-purple-100 text-purple-700 border border-purple-200">
            DEVELOPER MODE
          </span>

          <button className="text-slate-500 hover:text-slate-800 p-0.5" aria-label="Toggle menu">
            <Menu className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-[4px] border border-slate-200 cursor-pointer">
            <Building2 className="w-3 h-3 text-slate-500" />
            <span className="font-semibold">SK ENTERPRISE</span>
            <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
          </div>
        </div>

        {/* Right Search, Actions & Dark Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="relative hidden md:flex items-center">
            <Search className="w-3 h-3 absolute left-2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Global Search..." 
              readOnly
              className="bg-slate-50 border border-slate-200 rounded pl-6 pr-10 py-1 text-[10px] text-slate-700 w-36 lg:w-44"
            />
            <span className="absolute right-1.5 text-[8px] bg-slate-200 text-slate-600 px-1 py-0.2 rounded font-mono">
              Ctrl K
            </span>
          </div>

          <button className="bg-[#10B981] hover:bg-[#059669] text-white px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-medium flex items-center gap-1 shrink-0">
            <FileSpreadsheet className="w-3 h-3" />
            <span className="hidden sm:inline">Import Excel</span>
            <span className="sm:hidden">Import</span>
          </button>

          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-medium flex items-center gap-1 shrink-0">
            <Plus className="w-3 h-3" />
            <span className="hidden sm:inline">Quick Create</span>
          </button>

          <button className="text-slate-500 hover:text-slate-800 p-1" aria-label="Toggle Theme">
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main App Workspace */}
      <div className="flex flex-1 w-full">
        {/* Left Sidebar - Full Content, No Scroll */}
        <aside className="w-36 sm:w-44 lg:w-48 bg-white border-r border-slate-200 p-2 sm:p-2.5 shrink-0 flex flex-col justify-between">
          <div className="space-y-2">
            <div>
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                Quick Start
              </span>
              <div className="mt-1">
                <button className="w-full bg-[#2563EB] text-white flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-semibold shadow-xs">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>
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
                    <div key={item.name} className="flex items-center justify-between text-slate-600 hover:bg-slate-100 px-2 py-1 rounded text-[10.5px]">
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
                    <div key={item.name} className="flex items-center justify-between text-slate-600 hover:bg-slate-100 px-2 py-1 rounded text-[10.5px]">
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
                <div className="flex items-center justify-between text-slate-600 hover:bg-slate-100 px-2 py-1 rounded text-[10.5px]">
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
                <div className="flex items-center justify-between text-slate-600 hover:bg-slate-100 px-2 py-1 rounded text-[10.5px]">
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
                <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[10.5px]">
                  <BookOpen className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>Cashbook</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[10.5px]">
                  <Tag className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>Additional Charges</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[10.5px]">
                  <BarChart3 className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>Reports</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[10.5px]">
                  <Monitor className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>User Activity</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[10.5px]">
                  <Settings className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>Settings</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area - Full Content, No Scroll */}
        <div className="flex-1 min-w-0 p-3 sm:p-4 bg-[#F8FAFC]">
          {/* Executive Summary Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-200">
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-[4px] bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                <LayoutDashboard className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Executive Summary
                </h2>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                  Real-time overview of sales, purchases, payables, receivables, and recent activity
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
              <div className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-1 rounded text-[10px] text-slate-700">
                <span>This Year</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
              </div>
              <div className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-1 rounded text-[10px] text-slate-700">
                <span>This Month</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
              </div>
              <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-2.5 py-1 rounded text-[10px] font-medium flex items-center gap-1 shrink-0">
                <Plus className="w-3 h-3" />
                <span>New Voucher</span>
                <ChevronDown className="w-2 h-2 ml-0.5" />
              </button>
            </div>
          </div>

          {/* 4 KPI Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 mb-2">
            {/* Card 1: Sales */}
            <div className="bg-white border border-slate-200 rounded p-2.5 sm:p-3">
              <div className="flex items-center justify-between text-slate-600 mb-1">
                <span className="text-[10px] sm:text-[11px] font-medium">Sales (Gross)</span>
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                  ₹
                </div>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                ₹5,80,294.45
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5">
                Net Recv: ₹2,06,667.55
              </div>
            </div>

            {/* Card 2: Purchases */}
            <div className="bg-white border border-slate-200 rounded p-2.5 sm:p-3">
              <div className="flex items-center justify-between text-slate-600 mb-1">
                <span className="text-[10px] sm:text-[11px] font-medium">Purchases</span>
                <ShoppingCart className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                ₹3,23,973.99
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5">
                Net Payable: ₹3,481.00
              </div>
            </div>

            {/* Card 3: Active Partners */}
            <div className="bg-white border border-slate-200 rounded p-2.5 sm:p-3">
              <div className="flex items-center justify-between text-slate-600 mb-1">
                <span className="text-[10px] sm:text-[11px] font-medium">Active Partners</span>
                <Users className="w-3.5 h-3.5 text-purple-500" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                21
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5">
                10 Vendors / 11 Customers
              </div>
            </div>

            {/* Card 4: Inventory */}
            <div className="bg-white border border-slate-200 rounded p-2.5 sm:p-3">
              <div className="flex items-center justify-between text-slate-600 mb-1">
                <span className="text-[10px] sm:text-[11px] font-medium">Inventory</span>
                <Boxes className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                55
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5">
                Registered SKU Items
              </div>
            </div>
          </div>

          {/* Recent Transactions Table */}
          <div className="bg-white border border-slate-200 rounded overflow-hidden">
            <div className="px-3 py-2 border-b border-slate-200 flex items-center justify-between gap-2">
              <span className="font-bold text-xs text-slate-800">
                Recent Transactions
              </span>
              <div className="relative">
                <input 
                  type="text" 
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Filter list..."
                  className="bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-[10px] text-slate-700 w-32 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[10px] sm:text-[10.5px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[9px]">
                    <th className="py-1.5 px-2.5">DATE</th>
                    <th className="py-1.5 px-2">TYPE</th>
                    <th className="py-1.5 px-2">DOCUMENT #</th>
                    <th className="py-1.5 px-2">PARTY NAME</th>
                    <th className="py-1.5 px-2 text-right">TOTAL AMOUNT</th>
                    <th className="py-1.5 px-2.5 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-1.5 px-2.5 text-slate-500 whitespace-nowrap">{tx.date}</td>
                      <td className="py-1.5 px-2 whitespace-nowrap">
                        <span className={`font-medium ${tx.type === 'Sale' ? 'text-blue-600' : 'text-purple-600'}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-1.5 px-2 font-mono text-slate-700 whitespace-nowrap">{tx.doc}</td>
                      <td className="py-1.5 px-2 font-medium text-slate-900 truncate max-w-[140px] sm:max-w-[180px]">{tx.party}</td>
                      <td className="py-1.5 px-2 text-right font-mono font-medium text-slate-900 whitespace-nowrap">₹{tx.amount}</td>
                      <td className="py-1.5 px-2.5 text-center whitespace-nowrap">
                        <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-semibold ${
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
