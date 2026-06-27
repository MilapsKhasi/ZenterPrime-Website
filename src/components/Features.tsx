import { 
  Percent, 
  ShoppingCart, 
  PackageCheck, 
  Users2, 
  BarChart4, 
  Zap, 
  ChevronRight,
  ShieldCheck,
  Check,
  FileCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { FeatureItem } from '../types';

export default function Features() {
  const features: FeatureItem[] = [
    {
      id: 'gst',
      title: 'GST Management',
      description: 'Generate 100% government-compliant tax invoices, calculate CGST, SGST, IGST automatically, and export returns format directly.',
      iconName: 'Percent',
      badge: 'GSTR-1 & 3B Ready',
      benefits: [
        'Automatic CGST/SGST/IGST splits',
        'Built-in HSN & SAC directory search',
        'One-click JSON file exports'
      ]
    },
    {
      id: 'sales',
      title: 'Sales & Purchase Tracking',
      description: 'Easily book sales invoices and purchase bills. Log corporate debit notes, credit notes, and keep records of physical and digital receipts.',
      iconName: 'ShoppingCart',
      badge: 'Full Accounts Ledger',
      benefits: [
        'Custom professional invoice templates',
        'Direct email/WhatsApp sharing options',
        'Record advance payments & partial bills'
      ]
    },
    {
      id: 'inventory',
      title: 'Smart Inventory Management',
      description: 'Track items with live count triggers. Automatically adjust stock valuations on physical sales, with automated low stock notifications.',
      iconName: 'PackageCheck',
      badge: 'FIFO Valuation',
      benefits: [
        'Low-stock threshold triggers',
        'Dynamic physical stock reconciliation',
        'Automated product pricing calculators'
      ]
    },
    {
      id: 'customers',
      title: 'Customer & Supplier Ledgers',
      description: 'Manage credit profiles, track dues, and auto-generate clean PDF ledgers (Khatabook-style) to instantly share with business partners.',
      iconName: 'Users2',
      badge: 'Receivables & Payables',
      benefits: [
        'Individual balance credit limits',
        'Automated outstanding payment reminders',
        'Comprehensive transaction timelines'
      ]
    },
    {
      id: 'reports',
      title: 'Reports & Business Analytics',
      description: 'Generate instant Profit & Loss sheets, Balance Sheets, Trial Balances, and accurate GSTR summaries whenever you need to audit.',
      iconName: 'BarChart4',
      badge: 'Audit Ready',
      benefits: [
        'Real-time Gross & Net Margin insights',
        'Monthly and Quarterly tax summaries',
        'Export reports to Excel or PDF files'
      ]
    },
    {
      id: 'speed',
      title: 'Ultra-Fast Cloud Sync',
      description: 'Engineered as a lightweight, lightning-fast native desktop client. Starts in under 1 second and syncs with state-of-the-art secure cloud databases.',
      iconName: 'Zap',
      badge: 'Cloud-Enabled Engine',
      benefits: [
        'Zero-latency secure cloud synchronization',
        'Instant backup and active real-time updates',
        'Optimized database cloud memory usage'
      ]
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Percent': return <Percent className="w-5 h-5 text-violet-600" />;
      case 'ShoppingCart': return <ShoppingCart className="w-5 h-5 text-violet-600" />;
      case 'PackageCheck': return <PackageCheck className="w-5 h-5 text-violet-600" />;
      case 'Users2': return <Users2 className="w-5 h-5 text-violet-600" />;
      case 'BarChart4': return <BarChart4 className="w-5 h-5 text-violet-600" />;
      case 'Zap': return <Zap className="w-5 h-5 text-violet-600" />;
      default: return <FileCheck className="w-5 h-5 text-violet-600" />;
    }
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-violet-200/40 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-200/30 rounded-full filter blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold tracking-widest text-violet-600 uppercase font-mono bg-violet-50 px-3 py-1.5 rounded-full border border-violet-100">
            FEATURES AT A GLANCE
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mt-4">
            Everything your Indian business needs. <span className="text-violet-600 font-extrabold">Minus the complexity.</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 mt-4 leading-relaxed font-sans">
            Forget slow enterprise software that takes months to master. ZenterPrime is fast, intuitive, and works out of the box, saving you countless ledger hours.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-100/80 hover:border-violet-200 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    {getIcon(feature.iconName)}
                  </div>
                  {feature.badge && (
                    <span className="text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
                      {feature.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-violet-600 transition-colors duration-150">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bullet Benefits list */}
              <div className="border-t border-slate-100 mt-6 pt-4 space-y-2">
                {feature.benefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start text-xs font-semibold text-slate-600">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mr-2 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Feature Note */}
        <div className="mt-16 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-xs max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Your Business Security is Certified</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                ZenterPrime protects your billing logs and supplier contacts with industry-grade cloud security. All database vaults are encrypted and synced under secure symmetric keys.
              </p>
            </div>
          </div>
          <a 
            href="#interactive-dashboard-mockup" 
            className="text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors flex items-center shrink-0 gap-1"
          >
            Try GST Invoicer Demo Below <ChevronRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
