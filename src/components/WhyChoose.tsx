import { 
  Sparkles, 
  Hourglass, 
  Heart, 
  Eye, 
  RefreshCw, 
  Lock,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { BenefitItem } from '../types';

export default function WhyChoose() {
  const benefits: BenefitItem[] = [
    {
      title: 'Easy to learn in minutes',
      description: 'Zero accounting background required. If you can write a simple WhatsApp message, you can generate professional tax invoices with ZenterPrime.',
      iconName: 'Sparkles'
    },
    {
      title: 'Saves valuable business time',
      description: 'Auto-calculates complicated taxes, populates repetitive client fields instantly, and reconciles balances so you can focus on core growth.',
      iconName: 'Hourglass'
    },
    {
      title: 'Designed for Indian businesses',
      description: 'Handles Indian tax codes, standard GSTR formats, localized business configurations, and standard domestic invoice standards natively.',
      iconName: 'Heart'
    },
    {
      title: 'Clean and intuitive interface',
      description: 'A beautiful interface designed with Apple and Stripe principles. Clutter-free workspaces and pleasant visual contrast prevent eye fatigue.',
      iconName: 'Eye'
    },
    {
      title: 'Evergreen regular updates',
      description: 'We track every CBIC and GST Council notification. Your online app updates smoothly to adapt to new tax rates or reporting changes instantly.',
      iconName: 'RefreshCw'
    },
    {
      title: '100% cloud-secure database',
      description: 'Your business secrets are strictly yours. ZenterPrime saves records in an encrypted secure cloud vault, entirely safe from external leaks.',
      iconName: 'Lock'
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-violet-600" />;
      case 'Hourglass': return <Hourglass className="w-6 h-6 text-violet-600" />;
      case 'Heart': return <Heart className="w-6 h-6 text-violet-600" />;
      case 'Eye': return <Eye className="w-6 h-6 text-violet-600" />;
      case 'RefreshCw': return <RefreshCw className="w-6 h-6 text-violet-600" />;
      case 'Lock': return <Lock className="w-6 h-6 text-violet-600" />;
      default: return <Award className="w-6 h-6 text-violet-600" />;
    }
  };

  return (
    <section id="why-us" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copywriting & Stats */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-widest text-violet-600 uppercase font-mono bg-violet-50 px-3 py-1.5 rounded-full border border-violet-100 inline-block">
              THE ZENTERPRIME DIFFERENCE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              Crafted for merchants. <br />
              <span className="text-violet-600 font-extrabold">Loved by entrepreneurs.</span>
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-sans">
              Traditional accounting software is bloated, slow, and designed for enterprise audit firms rather than small business owners. ZenterPrime is engineered from the ground up to empower local merchants with quick, modern tools.
            </p>

            {/* Quick Metrics of Trust */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-2xl md:text-3xl font-extrabold font-display text-slate-900">10x</span>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Faster invoicing</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Generate compliance invoices in 15 seconds flat</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-2xl md:text-3xl font-extrabold font-display text-slate-900">100%</span>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Offline Private</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Secure cryptography database inside your drive</p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Benefits Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-violet-200 hover:shadow-lg hover:shadow-slate-100/50 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-xs mb-4">
                  {getIcon(benefit.iconName)}
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
