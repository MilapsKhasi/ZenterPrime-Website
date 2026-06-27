import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Receipt, 
  Package, 
  BarChart3, 
  Plus, 
  Trash2, 
  FileText, 
  DollarSign, 
  IndianRupee, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  RefreshCw,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InvoiceItem } from '../types';

export default function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoice' | 'inventory' | 'reports'>('overview');
  
  // State for Invoice Generator
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Premium Consulting Services', qty: 1, rate: 45000, gstRate: 18 },
    { id: '2', description: 'Office Desktop Hardware', qty: 2, rate: 22000, gstRate: 12 },
    { id: '3', description: 'Corporate Office Supplies', qty: 10, rate: 850, gstRate: 5 }
  ]);
  const [customerName, setCustomerName] = useState('TechCorp Solutions India');
  const [invoiceType, setInvoiceType] = useState<'intra' | 'inter'>('intra'); // intra-state (CGST+SGST) vs inter-state (IGST)
  
  // Temp state for new invoice item
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemRate, setNewItemRate] = useState(1000);
  const [newItemGst, setNewItemGst] = useState(18);

  // State for Inventory Management
  const [inventory, setInventory] = useState([
    { id: 'inv-1', name: 'Zenter Ledger Device', sku: 'ZLD-902', stock: 145, minStock: 20, rate: 3499, category: 'Hardware' },
    { id: 'inv-2', name: 'Premium Accounting Token', sku: 'PAT-110', stock: 8, minStock: 15, rate: 1200, category: 'Accessory' },
    { id: 'inv-3', name: 'GST Filing Manual Book', sku: 'GMB-044', stock: 42, minStock: 10, rate: 650, category: 'Publications' },
    { id: 'inv-4', name: 'Zenter Thermal Printer', sku: 'ZTP-880', stock: 0, minStock: 5, rate: 5999, category: 'Hardware' },
    { id: 'inv-5', name: 'Receipt Paper Roll Box', sku: 'RPR-220', stock: 180, minStock: 30, rate: 450, category: 'Accessory' }
  ]);

  // Invoice calculations
  const invoiceCalculations = useMemo(() => {
    let subtotal = 0;
    let totalCgst = 0;
    let totalSgst = 0;
    let totalIgst = 0;
    let totalGstAmt = 0;

    invoiceItems.forEach(item => {
      const lineAmt = item.qty * item.rate;
      subtotal += lineAmt;
      
      const gstAmt = (lineAmt * item.gstRate) / 100;
      totalGstAmt += gstAmt;

      if (invoiceType === 'intra') {
        totalCgst += gstAmt / 2;
        totalSgst += gstAmt / 2;
      } else {
        totalIgst += gstAmt;
      }
    });

    const grandTotal = subtotal + totalGstAmt;

    return {
      subtotal,
      totalCgst,
      totalSgst,
      totalIgst,
      totalGstAmt,
      grandTotal
    };
  }, [invoiceItems, invoiceType]);

  // Add Item to Invoice
  const handleAddInvoiceItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemDesc.trim()) return;
    
    const item: InvoiceItem = {
      id: Date.now().toString(),
      description: newItemDesc,
      qty: Math.max(1, newItemQty),
      rate: Math.max(0, newItemRate),
      gstRate: newItemGst
    };

    setInvoiceItems([...invoiceItems, item]);
    setNewItemDesc('');
    setNewItemQty(1);
    setNewItemRate(1000);
  };

  // Remove Item from Invoice
  const handleRemoveInvoiceItem = (id: string) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
  };

  // Adjust inventory level
  const adjustInventoryStock = (id: string, amount: number) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock + amount);
        return { ...item, stock: newStock };
      }
      return item;
    }));
  };

  return (
    <div id="interactive-dashboard-mockup" className="w-full bg-slate-900/5 rounded-2xl p-2 md:p-4 border border-slate-200/80 shadow-2xl bg-white relative overflow-hidden">
      {/* Mac Window Header Toolbar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 px-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="text-xs font-medium text-slate-400 font-mono pl-3">zenterprime_dashboard_v1.0-beta</span>
        </div>
        
        {/* Environment Status Tag */}
        <div className="flex items-center space-x-1.5 bg-violet-50 px-2 py-0.5 rounded-full text-[10px] font-semibold text-violet-600 border border-violet-100">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
          <span>LIVE PROTOTYPE</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row min-h-[500px] bg-slate-50/50">
        
        {/* Mini App Sidebar */}
        <div className="w-full md:w-56 bg-slate-50 border-r border-slate-200/60 p-3 flex flex-row md:flex-col justify-start md:justify-between overflow-x-auto md:overflow-x-visible space-x-1 md:space-x-0 md:space-y-1">
          <div className="flex flex-row md:flex-col w-full space-x-1 md:space-x-0 md:space-y-1">
            <button
              id="sidebar-tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap w-full ${
                activeTab === 'overview' 
                  ? 'bg-violet-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>Overview</span>
            </button>
            <button
              id="sidebar-tab-invoice"
              onClick={() => setActiveTab('invoice')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap w-full ${
                activeTab === 'invoice' 
                  ? 'bg-violet-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Receipt className="w-4 h-4 shrink-0" />
              <span>GST Invoicer</span>
              <span className="ml-auto text-[10px] font-mono bg-violet-100 text-violet-700 px-1.5 py-0.2 rounded font-bold uppercase shrink-0">Live</span>
            </button>
            <button
              id="sidebar-tab-inventory"
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap w-full ${
                activeTab === 'inventory' 
                  ? 'bg-violet-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4 shrink-0" />
              <span>Inventory</span>
            </button>
            <button
              id="sidebar-tab-reports"
              onClick={() => setActiveTab('reports')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap w-full ${
                activeTab === 'reports' 
                  ? 'bg-violet-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Tax Reports</span>
            </button>
          </div>

          {/* Quick Business Selector */}
          <div className="hidden md:block border-t border-slate-200/80 pt-4 mt-4">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-xs">
              <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Active GSTIN</p>
              <p className="text-xs font-mono font-bold text-slate-800">27AAAAA1111A1Z1</p>
              <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-100">
                <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  GSTR-1 Filed
                </span>
                <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1 rounded uppercase">Q1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Dynamic Area */}
        <div className="flex-1 p-3 md:p-6 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Metrics Header Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Total Sales</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-md font-semibold flex items-center gap-0.5">
                        <ArrowUpRight className="w-3 h-3" /> +14.2%
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline space-x-1">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-400 self-center shrink-0" />
                      <span className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">8,45,200</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5 block">This fiscal quarter</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">GST Collected</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md font-semibold">
                        GSTR-3B
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline space-x-1">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-400 self-center shrink-0" />
                      <span className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">1,52,136</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5 block">CGST + SGST pooled</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Total Purchases</span>
                      <span className="text-[10px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-md font-semibold flex items-center gap-0.5">
                        <ArrowDownLeft className="w-3 h-3" /> +5.4%
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline space-x-1">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-400 self-center shrink-0" />
                      <span className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">3,12,400</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5 block">ITC Claimable: ₹56,232</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Net Receivables</span>
                      <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md font-semibold">
                        4 Pending
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline space-x-1">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-400 self-center shrink-0" />
                      <span className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">1,89,500</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5 block">Due within 30 days</span>
                  </div>
                </div>

                {/* Performance Chart & Recent Trans */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  
                  {/* Custom SVG Line Area Chart */}
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs lg:col-span-3">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Sales Trend & Tax Projection</h4>
                        <p className="text-[10px] text-slate-400">Monthly breakdown for active fiscal period</p>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] font-semibold text-slate-500">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-violet-600"></span> Gross Sales
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Net Profit
                        </span>
                      </div>
                    </div>
                    
                    {/* SVG Chart Frame */}
                    <div className="h-44 w-full relative">
                      <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="violetGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Chart Grid Lines */}
                        <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" />

                        {/* Area Fill - Gross Sales */}
                        <path 
                          d="M0,150 L0,120 L80,105 L160,115 L240,60 L320,40 L400,55 L480,20 L500,20 L500,150 Z" 
                          fill="url(#violetGrad)" 
                        />
                        {/* Area Fill - Net Profit */}
                        <path 
                          d="M0,150 L0,135 L80,125 L160,130 L240,95 L320,80 L400,90 L480,65 L500,65 Z" 
                          fill="url(#emeraldGrad)" 
                        />

                        {/* Line - Gross Sales */}
                        <path 
                          d="M0,120 L80,105 L160,115 L240,60 L320,40 L400,55 L480,20 L500,20" 
                          fill="none" 
                          stroke="#7C3AED" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                        />
                        {/* Line - Net Profit */}
                        <path 
                          d="M0,135 L80,125 L160,130 L240,95 L320,80 L400,90 L480,65 L500,65" 
                          fill="none" 
                          stroke="#10B981" 
                          strokeWidth="2" 
                          strokeDasharray="3 3"
                          strokeLinecap="round"
                        />

                        {/* Data Points */}
                        <circle cx="240" cy="60" r="4" fill="#7C3AED" stroke="#ffffff" strokeWidth="1.5" />
                        <circle cx="320" cy="40" r="4" fill="#7C3AED" stroke="#ffffff" strokeWidth="1.5" />
                        <circle cx="480" cy="20" r="4" fill="#7C3AED" stroke="#ffffff" strokeWidth="1.5" />
                      </svg>
                      
                      {/* Interactive labels */}
                      <div className="absolute top-[35px] left-[225px] bg-slate-900 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded shadow-sm opacity-90">
                        Aug: ₹4.8L
                      </div>

                      {/* X Axis Labels */}
                      <div className="flex justify-between text-[9px] font-semibold text-slate-400 mt-2 px-1">
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs lg:col-span-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-slate-800">Recent Transactions</h4>
                        <span className="text-[10px] text-violet-600 font-semibold hover:underline cursor-pointer flex items-center">
                          View All <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                      
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
                              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-700">Inv-2026-904</p>
                              <p className="text-[9px] text-slate-400">To Aditya Enterprises</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-800">₹1,24,000</p>
                            <p className="text-[9px] text-emerald-600 font-semibold">Paid • 18% GST</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center">
                              <ArrowDownLeft className="w-3.5 h-3.5 text-rose-600" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-700">Pur-2026-112</p>
                              <p className="text-[9px] text-slate-400">AWS India Cloud Server</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-800">₹18,450</p>
                            <p className="text-[9px] text-amber-600 font-semibold">ITC Logged • 18%</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
                              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-700">Inv-2026-903</p>
                              <p className="text-[9px] text-slate-400">To Bangalore Tech Ltd</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-800">₹88,200</p>
                            <p className="text-[9px] text-emerald-600 font-semibold">Paid • 12% GST</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">Auto-sync with Bank Feed</span>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 100% matched
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {activeTab === 'invoice' && (
              <motion.div
                key="invoice"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5"
              >
                {/* Left Side: Invoice Items / Customizer */}
                <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <h4 className="text-sm font-bold text-slate-800">Live GST Billing Calculator</h4>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setInvoiceType('intra')}
                          className={`px-2 py-1 rounded text-[10px] font-bold ${invoiceType === 'intra' ? 'bg-violet-100 text-violet-700 border border-violet-200' : 'bg-slate-100 text-slate-600'}`}
                        >
                          Intra-State (CGST+SGST)
                        </button>
                        <button 
                          onClick={() => setInvoiceType('inter')}
                          className={`px-2 py-1 rounded text-[10px] font-bold ${invoiceType === 'inter' ? 'bg-violet-100 text-violet-700 border border-violet-200' : 'bg-slate-100 text-slate-600'}`}
                        >
                          Inter-State (IGST)
                        </button>
                      </div>
                    </div>

                    {/* Customer Config */}
                    <div className="mb-4 grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Customer Business Name</label>
                        <input 
                          type="text" 
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full mt-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:border-violet-500 bg-slate-50/50"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Invoice Ref No.</label>
                        <input 
                          type="text" 
                          disabled
                          value="ZP/2026/8809-BETA" 
                          className="w-full mt-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold bg-slate-100 text-slate-400 select-none cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Invoice Items List */}
                    <div className="max-h-48 overflow-y-auto mb-4 space-y-1.5 pr-1">
                      {invoiceItems.map((item, index) => (
                        <div key={item.id} className="flex items-center justify-between bg-slate-50/80 p-2 rounded-lg border border-slate-100 text-xs">
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="font-bold text-slate-700 truncate">{item.description}</p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              {item.qty} Qty x ₹{item.rate.toLocaleString('en-IN')} ({item.gstRate}% GST)
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="font-bold text-slate-800 whitespace-nowrap">
                              ₹{(item.qty * item.rate).toLocaleString('en-IN')}
                            </span>
                            <button 
                              onClick={() => handleRemoveInvoiceItem(item.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {invoiceItems.length === 0 && (
                        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
                          <p className="text-xs text-slate-400">No items on the invoice yet. Add one below!</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add New Item Form */}
                  <form onSubmit={handleAddInvoiceItem} className="border-t border-slate-100 pt-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                      <Plus className="w-3 h-3 text-violet-500" /> Quick Add Item To Invoice
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                      <div className="md:col-span-5">
                        <input 
                          type="text" 
                          required
                          placeholder="Item Name (e.g., Laptop Stand)" 
                          value={newItemDesc}
                          onChange={(e) => setNewItemDesc(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:border-violet-500"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-1 md:col-span-5">
                        <input 
                          type="number" 
                          required
                          min="1"
                          placeholder="Qty" 
                          value={newItemQty}
                          onChange={(e) => setNewItemQty(Number(e.target.value))}
                          className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-center focus:outline-hidden focus:border-violet-500"
                        />
                        <input 
                          type="number" 
                          required
                          min="1"
                          placeholder="Rate" 
                          value={newItemRate}
                          onChange={(e) => setNewItemRate(Number(e.target.value))}
                          className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-center focus:outline-hidden focus:border-violet-500"
                        />
                        <select 
                          value={newItemGst}
                          onChange={(e) => setNewItemGst(Number(e.target.value))}
                          className="w-full px-1 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-center bg-white focus:outline-hidden focus:border-violet-500"
                        >
                          <option value="5">5% GST</option>
                          <option value="12">12%</option>
                          <option value="18">18%</option>
                          <option value="28">28%</option>
                        </select>
                      </div>
                      <button 
                        type="submit"
                        className="md:col-span-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-1.5 px-3 rounded-lg text-xs transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                      >
                        Add Item
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Side: Invoice Visual Receipt */}
                <div className="lg:col-span-5 bg-violet-950 text-slate-100 p-5 rounded-xl shadow-lg flex flex-col justify-between border border-violet-900/40 relative">
                  {/* Watermark */}
                  <div className="absolute right-3 top-3 select-none opacity-10">
                    <FileText className="w-24 h-24 stroke-1" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-1">
                          <span className="text-violet-400">Zenter</span>Prime
                        </h5>
                        <p className="text-[9px] text-violet-300">GST Invoice Standard format</p>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-violet-800 text-violet-200 px-2 py-0.5 rounded">
                        Draft Invoice
                      </span>
                    </div>

                    <div className="border-t border-violet-800/60 pt-3 text-[11px] space-y-1 text-violet-200">
                      <div className="flex justify-between">
                        <span className="font-medium text-violet-300">Billed To:</span>
                        <span className="font-bold text-white truncate max-w-[150px]">{customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-violet-300">Date:</span>
                        <span className="font-bold text-white">2026-06-27</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-violet-300">State:</span>
                        <span className="font-bold text-white">{invoiceType === 'intra' ? 'Maharashtra (Within State)' : 'Karnataka (Inter-State)'}</span>
                      </div>
                    </div>

                    {/* Tax Breakdown */}
                    <div className="border-t border-violet-800/60 pt-3 space-y-1.5 text-xs">
                      <div className="flex justify-between text-violet-200">
                        <span>Items Subtotal:</span>
                        <span className="font-bold">₹{invoiceCalculations.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>

                      {invoiceType === 'intra' ? (
                        <>
                          <div className="flex justify-between text-violet-300 text-[11px] pl-2 border-l border-violet-700">
                            <span>CGST (Central Tax):</span>
                            <span>₹{invoiceCalculations.totalCgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between text-violet-300 text-[11px] pl-2 border-l border-violet-700">
                            <span>SGST (State Tax):</span>
                            <span>₹{invoiceCalculations.totalSgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between text-violet-300 text-[11px] pl-2 border-l border-violet-700">
                          <span>IGST (Integrated Tax):</span>
                          <span>₹{invoiceCalculations.totalIgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-violet-200">
                        <span>Total GST Slabs pooled:</span>
                        <span className="font-semibold text-emerald-300">₹{invoiceCalculations.totalGstAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-violet-800/60 pt-3 mt-4">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="text-xs font-medium text-violet-200">Total Invoice Value (INR):</span>
                      <span className="text-xl font-bold font-display text-white tracking-tight">
                        ₹{invoiceCalculations.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <button 
                      type="button"
                      onClick={() => alert('Beta version preview: Real exports are generated securely in Windows Client with cloud-secure cryptography!')}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Export IRN & Sign E-Invoice
                    </button>
                    <p className="text-[9px] text-center text-violet-400 mt-2">
                      Generates government-approved JSON & signs with digital token signatures.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'inventory' && (
              <motion.div
                key="inventory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Inventory Table & Real Controls */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Direct Inventory & Valuation Monitor</h4>
                      <p className="text-[10px] text-slate-400">Click actions to test real-time stock alert thresholds</p>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                      Hsn-aligned categories
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                        <tr>
                          <th className="p-3">Item Details</th>
                          <th className="p-3">Category / SKU</th>
                          <th className="p-3 text-center">Stock Level</th>
                          <th className="p-3">Unit Valuation</th>
                          <th className="p-3 text-right">Adjustment Controls</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {inventory.map(item => {
                          const isLowStock = item.stock <= item.minStock;
                          const isOutOfStock = item.stock === 0;

                          return (
                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-3">
                                <p className="font-bold text-slate-700">{item.name}</p>
                                <p className="text-[9px] text-slate-400 font-mono">ID: {item.id}</p>
                              </td>
                              <td className="p-3">
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase mr-1">
                                  {item.category}
                                </span>
                                <span className="text-[9px] font-mono text-slate-400">{item.sku}</span>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex flex-col items-center">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                    isOutOfStock 
                                      ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                                      : isLowStock 
                                        ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                                        : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                  }`}>
                                    {item.stock} Units
                                  </span>
                                  {isOutOfStock && <span className="text-[8px] text-rose-500 font-semibold mt-0.5">OUT OF STOCK</span>}
                                  {!isOutOfStock && isLowStock && <span className="text-[8px] text-amber-600 font-semibold mt-0.5">REORDER SOON</span>}
                                </div>
                              </td>
                              <td className="p-3 font-mono font-bold text-slate-600">
                                ₹{item.rate.toLocaleString('en-IN')}
                              </td>
                              <td className="p-3 text-right">
                                <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 space-x-1">
                                  <button 
                                    onClick={() => adjustInventoryStock(item.id, -5)}
                                    className="px-2 py-1 bg-white hover:bg-slate-100 rounded text-slate-700 font-bold shadow-xs active:scale-95 transition-transform text-[11px] cursor-pointer"
                                    title="Deduct 5 Units"
                                  >
                                    -5
                                  </button>
                                  <button 
                                    onClick={() => adjustInventoryStock(item.id, -1)}
                                    className="px-2 py-1 bg-white hover:bg-slate-100 rounded text-slate-700 font-bold shadow-xs active:scale-95 transition-transform text-[11px] cursor-pointer"
                                    title="Deduct 1 Unit"
                                  >
                                    -1
                                  </button>
                                  <button 
                                    onClick={() => adjustInventoryStock(item.id, 1)}
                                    className="px-2 py-1 bg-white hover:bg-slate-100 rounded text-slate-700 font-bold shadow-xs active:scale-95 transition-transform text-[11px] cursor-pointer"
                                    title="Add 1 Unit"
                                  >
                                    +1
                                  </button>
                                  <button 
                                    onClick={() => adjustInventoryStock(item.id, 5)}
                                    className="px-2 py-1 bg-white hover:bg-slate-100 rounded text-slate-700 font-bold shadow-xs active:scale-95 transition-transform text-[11px] cursor-pointer"
                                    title="Add 5 Units"
                                  >
                                    +5
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-slate-50 p-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 text-slate-400 animate-spin-slow" /> Stock level alerts sync instantly to billing and GSTR invoice pipelines.
                    </span>
                    <span className="font-bold text-slate-700">
                      Total Valuation: ₹{inventory.reduce((sum, item) => sum + (item.stock * item.rate), 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reports' && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Reports Analytics Grid */}
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">GST Filing Reconciliation Statement (GSTR-2B vs 3B)</h4>
                      <p className="text-[10px] text-slate-400">Accurate tax ledger tracking prevents penalty compliance checks</p>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100">
                      Reconciled • July 2026
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-slate-100 rounded-lg p-3 bg-slate-50/50">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Output Tax Liability (GSTR-1)</p>
                      <p className="text-base font-bold text-slate-800 mt-1 font-mono">₹1,52,136.00</p>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-violet-600 h-full rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 block">Compiled from 148 B2B and B2C Invoices</span>
                    </div>

                    <div className="border border-slate-100 rounded-lg p-3 bg-slate-50/50">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Input Tax Credit claimed (GSTR-2B)</p>
                      <p className="text-base font-bold text-slate-800 mt-1 font-mono">₹1,18,440.00</p>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <span className="text-[9px] text-emerald-600 font-semibold mt-1 block">99.8% supplier matchmaking rating</span>
                    </div>

                    <div className="border border-slate-100 rounded-lg p-3 bg-slate-50/50">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Net Cash GST Payable (GSTR-3B)</p>
                      <p className="text-base font-bold text-violet-600 mt-1 font-mono">₹33,696.00</p>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '28%' }}></div>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 block">Eligible to settle via ITC pool balance</span>
                    </div>
                  </div>

                  {/* Profit Margin Chart projection in Reports */}
                  <div className="mt-4 border border-slate-100 rounded-lg p-4 bg-slate-50/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700">Audit-ready documentation status</span>
                      <span className="text-[10px] text-slate-400 font-mono">Last cloud sync: 2 minutes ago</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold p-1.5 bg-white rounded border border-slate-100 shadow-3xs">
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> JSON file format generated (Ready for Portal Filing)
                        </span>
                        <span className="text-slate-400 font-mono">100% Validated</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold p-1.5 bg-white rounded border border-slate-100 shadow-3xs">
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Digital Signatures embedded
                        </span>
                        <span className="text-slate-400 font-mono">PKI Enrolled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
