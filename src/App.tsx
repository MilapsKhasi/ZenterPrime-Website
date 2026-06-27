import { useState } from 'react';
import { 
  Download, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  FileText, 
  UserCheck, 
  X,
  Tv,
  ArrowRightLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Header from './components/Header';
import Features from './components/Features';
import WhyChoose from './components/WhyChoose';
import InteractiveDashboard from './components/InteractiveDashboard';
import Screenshots from './components/Screenshots';
import BetaProgram from './components/BetaProgram';
import DownloadSection from './components/Download';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const demoTourSteps = [
    {
      title: 'Step 1: Rapid GST Invoicing',
      description: 'Open the sales desk, select or create your client ledger, type product items, and let ZenterPrime auto-assign HSN codes and calculate exact CGST, SGST, and IGST rates.',
      accentIcon: <FileText className="w-12 h-12 text-violet-600" />,
      tag: 'Zero Latency billing'
    },
    {
      title: 'Step 2: Auto tax reconciliation',
      description: 'Our cloud compiler runs matching checks against GSTR-2B logs. It reconciles debit/credit logs, highlights discrepancies, and prevents potential tax audit errors.',
      accentIcon: <ArrowRightLeft className="w-12 h-12 text-violet-600" />,
      tag: 'Audit Shield'
    },
    {
      title: 'Step 3: Instant GSTR JSON Export',
      description: 'Compile reports at the end of the quarter. Your compliance file signs with secure symmetric cryptography, ready to submit directly to the government portal with one-click online filing.',
      accentIcon: <CheckCircle2 className="w-12 h-12 text-violet-600" />,
      tag: '100% Tax Compliant'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-sans overflow-x-hidden selection:bg-violet-100 selection:text-violet-900">
      
      {/* Premium Sticky Navigation Header */}
      <Header 
        onDownloadClick={() => setIsDownloadModalOpen(true)}
        onFeedbackClick={() => setIsFeedbackModalOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 -z-10"></div>
        
        {/* Large abstract ambient orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-100/40 rounded-full filter blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Copywriter Stack */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Version Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center space-x-1.5 bg-violet-50 text-violet-700 border border-violet-100 px-3 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-600 animate-pulse" />
              <span>ZENTERPRIME BETA v1.0.2 NOW AVAILABLE</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.1]"
            >
              Business Accounting. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-size-200">
                Simplified.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium font-sans"
            >
              Modern accounting software for Indian businesses. Manage Sales, Purchase, Inventory, GST and Reports with an easy-to-use interface.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm sm:max-w-md mx-auto"
            >
              <button
                id="hero-cta-download"
                onClick={() => setIsDownloadModalOpen(true)}
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-violet-200 hover:shadow-violet-600/10 transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <Download className="w-5 h-5" /> Download Beta
              </button>
              
              <button
                id="hero-cta-watch-demo"
                onClick={() => {
                  setDemoStep(0);
                  setIsDemoModalOpen(true);
                }}
                className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold px-8 py-4 rounded-2xl transition-all duration-150 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-800 stroke-none" /> Watch Demo
              </button>
            </motion.div>

            {/* Micro value anchors */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400"
            >
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Offline-First Secure
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:inline"></span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-violet-500" /> Starts under 1s
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:inline"></span>
              <span className="flex items-center gap-1">
                <UserCheck className="w-4 h-4 text-indigo-500" /> No Accounting training needed
              </span>
            </motion.div>

          </div>

          {/* Large Dashboard Mockup Wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 md:mt-20 max-w-5xl mx-auto"
          >
            <InteractiveDashboard />
          </motion.div>

        </div>
      </section>

      {/* Features Grid Section */}
      <Features />

      {/* Why Choose ZenterPrime (Core Benefits) Section */}
      <WhyChoose />

      {/* Screenshots Gallery Section */}
      <Screenshots />

      {/* Beta Program Section */}
      <BetaProgram 
        isFeedbackModalOpen={isFeedbackModalOpen}
        setIsFeedbackModalOpen={setIsFeedbackModalOpen}
      />

      {/* Download Section */}
      <DownloadSection 
        isDownloadModalOpen={isDownloadModalOpen}
        setIsDownloadModalOpen={setIsDownloadModalOpen}
      />

      {/* FAQ Accordion Section */}
      <FAQ />

      {/* Premium Footer */}
      <Footer 
        onFeedbackClick={() => setIsFeedbackModalOpen(true)}
        onDownloadClick={() => setIsDownloadModalOpen(true)}
      />

      {/* Watch Demo Step-by-Step Interactive Tour Modal */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white text-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-xl border border-slate-200 shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Close */}
              <button 
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all"
                style={{ minWidth: '44px', minHeight: '44px' }}
                aria-label="Close demo modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
                    <Tv className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 font-display">Interactive Product Tour</h4>
                    <p className="text-xs text-slate-400">See how ZenterPrime operates in 3 simple slides</p>
                  </div>
                </div>

                {/* Tour Slide Frame */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={demoStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md border border-slate-100">
                      {demoTourSteps[demoStep].accentIcon}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {demoTourSteps[demoStep].tag}
                      </span>
                      <h5 className="text-base font-extrabold text-slate-900 mt-2">
                        {demoTourSteps[demoStep].title}
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed mt-2 max-w-sm">
                        {demoTourSteps[demoStep].description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Dots and Next */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                  <div className="flex items-center space-x-1.5">
                    {demoTourSteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setDemoStep(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${demoStep === index ? 'bg-violet-600' : 'bg-slate-200 hover:bg-slate-300'}`}
                        style={{ minWidth: '15px', minHeight: '15px' }}
                        aria-label={`Go to slide ${index + 1}`}
                      ></button>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsDemoModalOpen(false)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2"
                    >
                      Skip Tour
                    </button>
                    <button
                      onClick={() => {
                        if (demoStep < demoTourSteps.length - 1) {
                          setDemoStep(demoStep + 1);
                        } else {
                          setIsDemoModalOpen(false);
                          setIsDownloadModalOpen(true); // Direct call to action!
                        }
                      }}
                      className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {demoStep === demoTourSteps.length - 1 ? 'Download Beta Now' : 'Next Step'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
