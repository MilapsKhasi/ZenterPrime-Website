import { useState } from 'react';
import { 
  Youtube, 
  Instagram, 
  Github, 
  Mail, 
  Phone,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onFeedbackClick: () => void;
  onDownloadClick: () => void;
}

export default function Footer({ onFeedbackClick, onDownloadClick }: FooterProps) {
  const [comingSoonType, setComingSoonType] = useState<'github' | 'instagram' | null>(null);

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-violet-950 bg-white">
                <img src="/ZenterPrime New Logo.png" alt="ZenterPrime Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Zenter<span className="text-violet-400">Prime</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-sans">
              ZenterPrime is a modern accounting, billing, and inventory workstation built for Indian small businesses. Manage sales books and generate government-compliant GSTR-3B filings natively.
            </p>
            {/* Social Channels */}
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href="https://www.youtube.com/@zentrprime_official" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-red-500 transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-900 transition-all text-slate-400"
                title="ZenterPrime YouTube Channel"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <button 
                onClick={() => setComingSoonType('instagram')}
                className="hover:text-pink-500 transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-900 transition-all text-slate-400 cursor-pointer"
                title="ZenterPrime Instagram Account"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setComingSoonType('github')}
                className="hover:text-white transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-900 transition-all text-slate-400 cursor-pointer"
                title="Github Code Repository"
              >
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Links Quick */}
          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-200 tracking-widest uppercase font-mono">PRODUCT</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#features" className="hover:text-violet-400 transition-colors">Features</a>
                </li>
                <li>
                  <a href="#why-us" className="hover:text-violet-400 transition-colors">Why ZenterPrime</a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-violet-400 transition-colors">Gallery Screenshots</a>
                </li>
                <li>
                  <button onClick={onDownloadClick} className="hover:text-violet-400 transition-colors text-left cursor-pointer">Download Beta</button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-200 tracking-widest uppercase font-mono">LEGAL & DOCS</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Statement: ZenterPrime protects your records with industry-standard encryption. Your database is fully synchronized in the cloud securely.'); }} className="hover:text-violet-400 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: This beta release is for evaluation and active community feedback. Services are provided with cloud protection and secure encryption.'); }} className="hover:text-violet-400 transition-colors">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#docs" onClick={(e) => { e.preventDefault(); alert('Documentation is packaged natively. Access the guide anytime inside the application.'); }} className="hover:text-violet-400 transition-colors">Documentation</a>
                </li>
                <li>
                  <button onClick={onFeedbackClick} className="hover:text-violet-400 transition-colors text-left cursor-pointer">Send Beta Feedback</button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 tracking-widest uppercase font-mono">GET IN TOUCH</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-violet-500 shrink-0" />
                <a href="mailto:mkdevelopers2201@gmail.com" className="hover:text-white transition-colors font-medium">mkdevelopers2201@gmail.com</a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-violet-500 shrink-0" />
                <a href="tel:+919510544767" className="hover:text-white transition-colors font-medium">+91 95105 44767</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>© ZenterPrime. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            Compliance Database version: v1.08 GSTR
          </p>
        </div>

      </div>

      {/* Coming Soon Popups */}
      <AnimatePresence>
        {comingSoonType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setComingSoonType(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative z-10 overflow-hidden text-center text-white"
            >
              <button 
                onClick={() => setComingSoonType(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all cursor-pointer flex items-center justify-center"
                style={{ minWidth: '44px', minHeight: '44px' }}
                aria-label="Close popup"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mx-auto w-16 h-16 rounded-2xl bg-violet-600/15 flex items-center justify-center text-violet-400 mb-5">
                {comingSoonType === 'github' ? (
                  <Github className="w-8 h-8 animate-pulse" />
                ) : (
                  <Instagram className="w-8 h-8 animate-pulse" />
                )}
              </div>

              <h4 className="text-xl font-display font-bold mb-2">
                {comingSoonType === 'github' ? 'GitHub Hub Coming Soon' : 'Instagram Page Coming Soon'}
              </h4>
              
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {comingSoonType === 'github' 
                  ? 'Our community code repository is being prepared for the public developer ecosystem. Stay tuned for open source tools, scripts, and documentation!'
                  : 'Our design and marketing channel is currently being assembled. Follow us soon for tips, compliance updates, and community showcases!'}
              </p>

              <button
                onClick={() => setComingSoonType(null)}
                className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-violet-950/35 cursor-pointer"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
