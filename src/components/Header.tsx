import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Download, Laptop, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onDownloadClick: () => void;
  onFeedbackClick: () => void;
}

export default function Header({ onDownloadClick, onFeedbackClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Features', href: '#features' },
    { label: 'Why ZenterPrime', href: '#why-us' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Filing Live Tools', href: '#interactive-dashboard-mockup' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-xs py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-md shadow-violet-200 group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-display font-extrabold text-xl tracking-tight">Z</span>
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                Zenter<span className="text-violet-600">Prime</span>
              </span>
              <span className="block text-[8px] tracking-widest font-bold text-violet-500 uppercase font-mono leading-none">
                GST Accounting
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="text-sm font-semibold text-slate-600 hover:text-violet-600 transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onFeedbackClick}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 hover:bg-slate-50 rounded-xl transition-all"
            >
              Feedback Beta
            </button>
            <button 
              onClick={onDownloadClick}
              className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md hover:shadow-violet-100 transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Beta
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden transition-all"
              style={{ minWidth: '44px', minHeight: '44px' }}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-slate-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-semibold text-slate-700 hover:text-violet-600 hover:bg-violet-50/50 rounded-xl transition-all"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 px-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onFeedbackClick();
                  }}
                  className="w-full text-center py-2.5 border border-slate-200 text-sm font-bold text-slate-700 rounded-xl hover:bg-slate-50"
                >
                  Send Feedback
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onDownloadClick();
                  }}
                  className="w-full text-center py-2.5 bg-violet-600 text-sm font-bold text-white rounded-xl shadow-xs flex items-center justify-center gap-1 hover:bg-violet-700"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
