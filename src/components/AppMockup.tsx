import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  FileSpreadsheet, 
  ChevronDown, 
  LayoutDashboard, 
  FileText, 
  ArrowDownLeft, 
  Truck, 
  Receipt, 
  CreditCard, 
  Boxes, 
  Users, 
  BookOpen, 
  Percent, 
  BarChart2, 
  Activity, 
  Settings,
  HelpCircle,
  Maximize2,
  Minus,
  X
} from 'lucide-react';

export const AppMockup: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [filterQuery, setFilterQuery] = useState('');

  return (
    <div id="mockup-frame-outer" className="relative w-full mx-auto">
      {/* Outer App Window */}
      <div 
        id="desktop-app-window"
        className="w-full bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden text-slate-800 text-xs transition-snappy"
      >
        {/* Top Window Titlebar & App Header */}
        <div className="bg-[#f8fafc] border-b border-slate-200 px-3.5 sm:px-4 py-2.5 flex items-center justify-between gap-2 select-none">
          
          {/* Window Left: App Branding & Status */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-[#3b28cc] flex items-center justify-center text-white font-fredoka text-[11px] font-bold">
                Z
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[11px] text-slate-900 leading-tight">ZenterPrime</span>
                <span className="text-[9px] text-slate-400 leading-none">LocalDesk</span>
              </div>
            </div>

            <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-600">
              <span className="font-medium text-slate-700">ZenterPrime</span>
              <span className="text-slate-300">•</span>
              <span>Standard</span>
              <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-emerald-100 text-emerald-700 rounded">
                Active
              </span>
            </div>
          </div>

          {/* Window Center/Right: Actions & Tools */}
          <div className="flex items-center gap-2">
            {/* Global Search */}
            <div className="relative hidden md:block">
              <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Global Search..." 
                readOnly
                className="bg-white border border-slate-200 rounded-md pl-7 pr-12 py-1 text-[11px] text-slate-600 w-44 focus:outline-none placeholder:text-slate-400 cursor-default"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 bg-slate-100 px-1 py-0.5 rounded font-mono">
                Ctrl K
              </span>
            </div>

            {/* Import Excel */}
            <button className="hidden lg:flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-2 py-1 rounded text-[11px] font-medium shadow-2xs">
              <FileSpreadsheet className="w-3 h-3 text-emerald-600" />
              <span>Import Excel</span>
            </button>

            {/* Quick Create */}
            <button className="hidden sm:flex items-center gap-1 bg-[#3b28cc] text-white px-2 py-1 rounded text-[11px] font-medium shadow-2xs">
              <Plus className="w-3 h-3" />
              <span>Quick Create</span>
            </button>

            {/* Date Range Dropdowns */}
            <div className="hidden xl:flex items-center gap-1.5 bg-white border border-slate-200 rounded px-2 py-1 text-[11px] text-slate-600">
              <span>This Year</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            <div className="hidden xl:flex items-center gap-1.5 bg-white border border-slate-200 rounded px-2 py-1 text-[11px] text-slate-600">
              <span>This Month</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            {/* New Voucher */}
            <button className="bg-[#3b28cc] text-white px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 shadow-2xs">
              <span>New Voucher</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Window Controls */}
            <div className="flex items-center gap-1 text-slate-400 ml-1">
              <div className="p-1 hover:bg-slate-200 rounded"><Minus className="w-2.5 h-2.5" /></div>
              <div className="p-1 hover:bg-slate-200 rounded"><Maximize2 className="w-2.5 h-2.5" /></div>
              <div className="p-1 hover:bg-red-500 hover:text-white rounded"><X className="w-2.5 h-2.5" /></div>
            </div>
          </div>

        </div>

        {/* Workspace Body */}
        <div className="flex min-h-[440px] sm:min-h-[480px]">
          
          {/* Left Sidebar */}
          <aside className="w-40 sm:w-48 bg-[#fafafa] border-r border-slate-200 p-2.5 shrink-0 flex flex-col justify-between select-none">
            <div className="space-y-3">
              
              {/* Quick Start & Dashboard */}
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                  Quick Start
                </p>
                <button 
                  onClick={() => setActiveMenu('Dashboard')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-[11px] transition-colors ${
                    activeMenu === 'Dashboard' 
                      ? 'bg-[#3b28cc] text-white shadow-2xs' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>
              </div>

              {/* SALES */}
              <div>
                <div className="flex items-center justify-between px-2 mb-1">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">SALES</p>
                  <Plus className="w-2.5 h-2.5 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
                <div className="space-y-0.5">
                  <button 
                    onClick={() => setActiveMenu('Sales Invoices')}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded text-[11px] ${
                      activeMenu === 'Sales Invoices' ? 'bg-slate-200 text-slate-900 font-medium' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-slate-400" />
                      <span>Sales Invoices</span>
                    </div>
                    <span className="text-[9px] text-slate-400">+</span>
                  </button>
                  <button 
                    onClick={() => setActiveMenu('Receive Payment')}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded text-[11px] ${
                      activeMenu === 'Receive Payment' ? 'bg-slate-200 text-slate-900 font-medium' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <ArrowDownLeft className="w-3 h-3 text-slate-400" />
                      <span>Receive Payment</span>
                    </div>
                    <span className="text-[9px] text-slate-400">+</span>
                  </button>
                  <button 
                    onClick={() => setActiveMenu('Delivery Challan')}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded text-[11px] ${
                      activeMenu === 'Delivery Challan' ? 'bg-slate-200 text-slate-900 font-medium' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3 h-3 text-slate-400" />
                      <span>Delivery Challan</span>
                    </div>
                    <span className="text-[9px] text-slate-400">+</span>
                  </button>
                </div>
              </div>

              {/* PURCHASES */}
              <div>
                <div className="flex items-center justify-between px-2 mb-1">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">PURCHASES</p>
                  <Plus className="w-2.5 h-2.5 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
                <div className="space-y-0.5">
                  <button 
                    onClick={() => setActiveMenu('Purchase Bills')}
                    className="w-full flex items-center justify-between px-2 py-1 rounded text-[11px] text-slate-600 hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-1.5">
                      <Receipt className="w-3 h-3 text-slate-400" />
                      <span>Purchase Bills</span>
                    </div>
                    <span className="text-[9px] text-slate-400">+</span>
                  </button>
                  <button 
                    onClick={() => setActiveMenu('Pay Supplier')}
                    className="w-full flex items-center justify-between px-2 py-1 rounded text-[11px] text-slate-600 hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-3 h-3 text-slate-400" />
                      <span>Pay Supplier</span>
                    </div>
                    <span className="text-[9px] text-slate-400">+</span>
                  </button>
                </div>
              </div>

              {/* STOCK */}
              <div>
                <div className="flex items-center justify-between px-2 mb-1">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">STOCK</p>
                  <Plus className="w-2.5 h-2.5 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
                <button 
                  onClick={() => setActiveMenu('Stock Items')}
                  className="w-full flex items-center justify-between px-2 py-1 rounded text-[11px] text-slate-600 hover:bg-slate-100"
                >
                  <div className="flex items-center gap-1.5">
                    <Boxes className="w-3 h-3 text-slate-400" />
                    <span>Stock Items</span>
                  </div>
                  <span className="text-[9px] text-slate-400">+</span>
                </button>
              </div>

              {/* PARTIES */}
              <div>
                <div className="flex items-center justify-between px-2 mb-1">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">PARTIES</p>
                  <Plus className="w-2.5 h-2.5 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
                <button 
                  onClick={() => setActiveMenu('Parties')}
                  className="w-full flex items-center justify-between px-2 py-1 rounded text-[11px] text-slate-600 hover:bg-slate-100"
                >
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-slate-400" />
                    <span>Parties</span>
                  </div>
                  <span className="text-[9px] text-slate-400">+</span>
                </button>
              </div>

              {/* OTHERS */}
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">OTHERS</p>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer">
                    <BookOpen className="w-3 h-3 text-slate-400" />
                    <span>Cashbook</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer">
                    <Percent className="w-3 h-3 text-slate-400" />
                    <span>Additional Charges</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer">
                    <BarChart2 className="w-3 h-3 text-slate-400" />
                    <span>Reports</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer">
                    <Activity className="w-3 h-3 text-slate-400" />
                    <span>User Activity</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer">
                    <Settings className="w-3 h-3 text-slate-400" />
                    <span>Settings</span>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* Right Main Dashboard Workspace */}
          <main className="flex-1 bg-[#fcfcfd] p-3.5 sm:p-5 overflow-x-auto">
            
            {/* Header / Title */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[#3b28cc]/10 flex items-center justify-center text-[#3b28cc]">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="font-bold text-slate-900 text-sm sm:text-base">Executive Summary</h2>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Real-time overview of sales, purchases, payables, receivables, and recent activity
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
                <HelpCircle className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* 4 Summary Stat Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-5">
              
              {/* Sales Gross */}
              <div className="bg-white border border-slate-200 rounded-lg p-2.5 sm:p-3 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Sales (Gross)</span>
                  <HelpCircle className="w-3 h-3 text-slate-300" />
                </div>
                <p className="text-base sm:text-lg font-bold text-slate-900 mt-1">₹0.00</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Net Recv: ₹0.00</p>
              </div>

              {/* Purchases */}
              <div className="bg-white border border-slate-200 rounded-lg p-2.5 sm:p-3 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Purchases</span>
                  <HelpCircle className="w-3 h-3 text-slate-300" />
                </div>
                <p className="text-base sm:text-lg font-bold text-slate-900 mt-1">₹0.00</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Net Payable: ₹0.00</p>
              </div>

              {/* Active Partners */}
              <div className="bg-white border border-slate-200 rounded-lg p-2.5 sm:p-3 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Active Partners</span>
                  <Users className="w-3 h-3 text-slate-300" />
                </div>
                <p className="text-base sm:text-lg font-bold text-slate-900 mt-1">0</p>
                <p className="text-[10px] text-slate-400 mt-0.5">0 Vendors / 0 Customers</p>
              </div>

              {/* Inventory */}
              <div className="bg-white border border-slate-200 rounded-lg p-2.5 sm:p-3 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Inventory</span>
                  <Boxes className="w-3 h-3 text-slate-300" />
                </div>
                <p className="text-base sm:text-lg font-bold text-slate-900 mt-1">0</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Registered 0 SKU Items</p>
              </div>

            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
              
              {/* Table Top Controls */}
              <div className="p-2.5 sm:p-3 border-b border-slate-100 flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-800 text-[11px]">Recent Transactions</span>
                <div className="relative">
                  <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Filter list..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="bg-[#f8fafc] border border-slate-200 rounded pl-6 pr-2 py-0.5 text-[10px] text-slate-600 focus:outline-none w-28 sm:w-36 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Table Headings */}
              <div className="grid grid-cols-6 bg-[#fafafa] border-b border-slate-200 text-[10px] font-bold text-slate-500 px-3 py-2">
                <div>DATE</div>
                <div>TYPE</div>
                <div>DOCUMENT #</div>
                <div>PARTY NAME</div>
                <div className="text-right">TOTAL AMOUNT</div>
                <div className="text-center">STATUS</div>
              </div>

              {/* Table Body Empty State */}
              <div className="py-14 text-center text-slate-400 text-[11px] italic bg-white">
                No transactions found for the selected period.
              </div>

            </div>

          </main>

        </div>

      </div>
    </div>
  );
};
export default AppMockup;
