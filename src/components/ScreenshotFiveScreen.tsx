import React, { useState } from 'react';
import { 
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
  Download
} from 'lucide-react';

export const ScreenshotFiveScreen: React.FC = () => {
  const [filterText] = useState('');

  return (
    <div 
      id="screenshot-5-container"
      className="w-full bg-[#F8FAFC] border border-slate-200/80 text-slate-800 text-[13px] select-none font-sans shadow-xl rounded-[10px] overflow-x-auto antialiased"
    >
      {/* Top Header Bar - Matches screenshot.png (Deep Purple #6D28D9) */}
      <div className="min-w-[1120px] bg-[#6D28D9] px-5 py-3 flex items-center justify-between gap-4 text-white">
        {/* Left branding & enterprise dropdown */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[6px] bg-[#6D28D9] border border-white/40 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
              Z
            </div>
            <span className="font-bold text-lg tracking-tight text-white whitespace-nowrap">ZenterPrime</span>
          </div>

          {/* Global Search Bar in Header */}
          <div className="relative flex items-center ml-2">
            <Search className="w-4 h-4 absolute left-3.5 text-purple-200" />
            <input 
              type="text" 
              placeholder="Search vouchers, ledgers, items, parties..." 
              readOnly
              className="bg-white/10 border border-white/25 rounded-lg pl-10 pr-4 py-2 text-[13px] text-white placeholder-purple-200 w-80 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Actions: Company Dropdown, Import, Export, Create, Moon, Settings */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-2 text-[13px] font-medium text-white bg-white/10 px-3.5 py-2 rounded-lg border border-white/25 shrink-0 whitespace-nowrap shadow-sm">
            <Building2 className="w-4 h-4 text-purple-200" />
            <span className="font-semibold">SK ENTERPRISE</span>
            <ChevronDown className="w-3.5 h-3.5 text-purple-200" />
          </div>

          <div className="flex items-center gap-2 bg-[#10B981] text-white px-3.5 py-2 rounded-lg text-[13px] font-semibold shadow-sm shrink-0 whitespace-nowrap">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Import</span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 text-white border border-white/25 px-3.5 py-2 rounded-lg text-[13px] font-semibold shrink-0 whitespace-nowrap">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </div>

          <div className="flex items-center gap-2 bg-[#ffffff] px-4 py-2 rounded-lg text-[13px] shadow-sm shrink-0 whitespace-nowrap">
            <Plus className="w-4 h-4 text-[#000000]" />
            <span className="text-[#000000] font-semibold">Create</span>
          </div>

          <div className="text-white/90 p-1.5 hover:text-white cursor-pointer shrink-0">
            <Moon className="w-5 h-5" />
          </div>

          <div className="text-white/90 p-1.5 hover:text-white cursor-pointer shrink-0">
            <Settings className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main App Workspace */}
      <div className="flex w-full min-w-[1120px] bg-[#F8FAFC]">
        {/* Left Sidebar - Natural uncompressed width */}
        <aside className="w-64 bg-white border-r border-slate-200 p-4 shrink-0 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                Quick Start
              </span>
              <div className="mt-2">
                <div className="w-full bg-[#6D28D9] text-white flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-semibold shadow-sm whitespace-nowrap">
                  <LayoutDashboard className="w-4.5 h-4.5 shrink-0" />
                  <span>Dashboard</span>
                </div>
              </div>
            </div>

            {/* Sales */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                SALES
              </span>
              <div className="mt-1.5 space-y-1">
                {[
                  { name: 'Sales Invoices', icon: FileText },
                  { name: 'Receive Payment', icon: ArrowDownCircle },
                  { name: 'Delivery Challan', icon: Truck },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="flex items-center justify-between text-slate-700 px-3 py-2 rounded-lg text-[12.5px] hover:bg-slate-50 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <Plus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Purchases */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                PURCHASES
              </span>
              <div className="mt-1.5 space-y-1">
                {[
                  { name: 'Purchase Bills', icon: ShoppingCart },
                  { name: 'Pay Supplier', icon: ArrowUpCircle },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="flex items-center justify-between text-slate-700 px-3 py-2 rounded-lg text-[12.5px] hover:bg-slate-50 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <Plus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stock */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                STOCK
              </span>
              <div className="mt-1.5">
                <div className="flex items-center justify-between text-slate-700 px-3 py-2 rounded-lg text-[12.5px] hover:bg-slate-50 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <Package className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-medium">Stock Items</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>
              </div>
            </div>

            {/* Parties */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                PARTIES
              </span>
              <div className="mt-1.5">
                <div className="flex items-center justify-between text-slate-700 px-3 py-2 rounded-lg text-[12.5px] hover:bg-slate-50 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-medium">Parties</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>
              </div>
            </div>

            {/* Others */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                OTHERS
              </span>
              <div className="mt-1.5 space-y-1 text-slate-700">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] hover:bg-slate-50 whitespace-nowrap">
                  <BookOpen className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="font-medium">Cashbook</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] hover:bg-slate-50 whitespace-nowrap">
                  <Tag className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="font-medium">Additional Charges</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] hover:bg-slate-50 whitespace-nowrap">
                  <BarChart3 className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="font-medium">Reports</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area - Full uncompressed width & natural spacing */}
        <div className="flex-1 min-w-[760px] p-5 bg-[#F8FAFC] flex flex-col gap-5">
          {/* Executive Summary Header */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-[#6D28D9] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-tight">
                  Executive Summary
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Real-time overview of sales, purchases, payables, receivables, and recent activity
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm shrink-0 whitespace-nowrap">
                <span>This Year</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm shrink-0 whitespace-nowrap">
                <span>This Month</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="bg-[#6D28D9] text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shrink-0 shadow-sm whitespace-nowrap">
                <Plus className="w-3.5 h-3.5" />
                <span>New Voucher</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </div>
            </div>
          </div>

          {/* 4 KPI Summary Cards - Spacious grid */}
          <div className="grid grid-cols-4 gap-4">
            {/* Card 1: Sales */}
            <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Sales (Gross)</span>
                <div className="w-6 h-6 rounded-full bg-purple-50 text-[#6D28D9] flex items-center justify-center text-xs font-bold shrink-0">
                  ₹
                </div>
              </div>
              <div className="text-xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                ₹6,67,822.39
              </div>
              <div className="text-xs text-slate-500 mt-1 font-medium whitespace-nowrap">
                Net Recv: ₹1,81,638.09
              </div>
            </div>

            {/* Card 2: Purchases */}
            <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Purchases</span>
                <ShoppingCart className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
              <div className="text-xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                ₹3,79,339.59
              </div>
              <div className="text-xs text-slate-500 mt-1 font-medium whitespace-nowrap">
                Net Payable: ₹56,038.20
              </div>
            </div>

            {/* Card 3: Active Partners */}
            <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Active Partners</span>
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
              <div className="text-xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                27
              </div>
              <div className="text-xs text-slate-500 mt-1 font-medium whitespace-nowrap">
                12 Vendors / 15 Customers
              </div>
            </div>

            {/* Card 4: Inventory */}
            <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Inventory</span>
                <Boxes className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
              <div className="text-xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                66
              </div>
              <div className="text-xs text-slate-500 mt-1 font-medium whitespace-nowrap">
                Registered SKU Items
              </div>
            </div>
          </div>

          {/* Revenue Overview Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-slate-900 whitespace-nowrap">Revenue Overview</span>
                  <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs shrink-0 whitespace-nowrap">
                    <span className="bg-[#6D28D9] text-white px-2.5 py-1 rounded-md font-semibold shadow-sm">Revenue</span>
                    <span className="text-slate-600 px-2.5 py-1 font-medium">Purchases</span>
                    <span className="text-slate-600 px-2.5 py-1 font-medium">Both</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Business revenue growth and monthly performance</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs text-slate-600 font-medium shrink-0 whitespace-nowrap">
                  <span className="px-2.5 py-1">1W</span>
                  <span className="px-2.5 py-1">1M</span>
                  <span className="px-2.5 py-1">3M</span>
                  <span className="px-2.5 py-1">1Y</span>
                  <span className="bg-white text-slate-900 shadow-sm px-2.5 py-1 rounded-md font-bold">6M</span>
                  <span className="px-2.5 py-1">All</span>
                </div>
                <div className="border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-2 bg-white shadow-sm shrink-0 whitespace-nowrap">
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export</span>
                </div>
              </div>
            </div>

            {/* Chart Placeholder / SVG simulation */}
            <div className="relative h-44 w-full my-3">
              {/* Y Axis Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-400 pointer-events-none">
                <div className="border-b border-slate-100 flex justify-between pr-2"><span></span></div>
                <div className="border-b border-slate-100 flex justify-between pr-2"><span></span></div>
                <div className="border-b border-slate-100 flex justify-between pr-2"><span></span></div>
                <div className="border-b border-slate-100 flex justify-between pr-2"><span></span></div>
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
                  strokeWidth="0.5" 
                />
              </svg>

              {/* X Axis Labels */}
              <div className="absolute bottom-[-18px] left-0 right-0 flex justify-between text-[11px] text-slate-500 px-2 font-semibold">
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
              </div>
            </div>

            {/* Bottom Summary Stats */}
            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-center gap-12 text-xs">
              <div>
                <span className="text-slate-500 mr-2 font-medium">Total</span>
                <span className="font-bold text-slate-900">₹4.8L</span>
              </div>
              <div className="text-slate-300">|</div>
              <div>
                <span className="text-slate-500 mr-2 font-medium">Growth</span>
                <span className="font-bold text-red-600">-38.1% ↓</span>
              </div>
              <div className="text-slate-300">|</div>
              <div>
                <span className="text-slate-500 mr-2 font-medium">Avg</span>
                <span className="font-bold text-slate-900">₹80.1K</span>
              </div>
            </div>
          </div>

          {/* Recent Transactions Table Header */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between gap-2">
              <span className="font-bold text-sm text-slate-900 whitespace-nowrap">
                Recent Transactions
              </span>
              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Showing recent activity</span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10.5px]">
                  <th className="py-2.5 px-5 whitespace-nowrap">DATE</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">TYPE</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">DOCUMENT #</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">PARTY NAME</th>
                  <th className="py-2.5 px-3 text-right whitespace-nowrap">TOTAL AMOUNT</th>
                  <th className="py-2.5 px-5 text-center whitespace-nowrap">STATUS</th>
                </tr>
              </thead>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ScreenshotFiveScreen;
