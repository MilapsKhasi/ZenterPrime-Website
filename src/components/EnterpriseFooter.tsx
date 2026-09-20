import React from 'react';
import { AppView } from './Navbar';

interface EnterpriseFooterProps {
  onNavigate: (view: AppView) => void;
  onScrollTo: (sectionId: string) => void;
  onOpenModal: (modalName: 'about' | 'privacy' | 'terms' | 'contact') => void;
}

export const EnterpriseFooter: React.FC<EnterpriseFooterProps> = ({
  onNavigate,
  onScrollTo,
  onOpenModal
}) => {
  return (
    <footer id="footer" className="bg-white border-t border-[#E5E7EB] text-slate-600 text-xs">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Product */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => onScrollTo('features')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  Features &amp; Vouchers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('gst-billing')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  GST Billing Engine
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('pricing')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  Lifetime Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('download')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  Download Setup 7.3
                </button>
              </li>
              <li>
                <a 
                  href="https://github.com/MilapsKhasi/Makzon-Developers/releases/tag/zenterprime-beta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#6D28D9] transition-colors inline-block"
                >
                  Changelog &amp; Beta Notes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => onNavigate('reactivate')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  Activate License
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('renew')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  Renew Support Subscription
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('backup-restore')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  Backup &amp; Restore Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenModal('contact')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  Contact Desk &amp; Help
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('faq')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  Knowledge Base &amp; FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => onOpenModal('about')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  About ZenterPrime
                </button>
              </li>
              <li>
                <span className="text-slate-800 font-medium block">
                  ZenterPrime Solutions
                </span>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('advantages')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  Why Desktop Architecture
                </button>
              </li>
              <li>
                <span className="text-slate-500">
                  Retail Software Division
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  id="footer-btn-privacy"
                  onClick={() => onOpenModal('privacy')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  id="footer-btn-terms"
                  onClick={() => onOpenModal('terms')}
                  className="hover:text-[#6D28D9] transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Unregistered Company GST Notice */}
        <div className="pt-6 pb-2 border-t border-[#E5E7EB] text-slate-500 text-[11.5px] sm:text-xs">
          <p>
            <span className="font-semibold text-slate-700">Notice:</span> ZenterPrime Solutions is currently an unregistered company that does not have a GST-registered firm, so purchasing a license will not include any GST.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-[4px] bg-[#6D28D9] text-white flex items-center justify-center font-bold font-fredoka text-xs">
              Z
            </div>
            <span className="font-semibold text-slate-800">ZenterPrime 7.3 Desktop</span>
          </div>

          <p className="text-center sm:text-right text-slate-500 text-xs">
            © 2026 ZenterPrime Solutions. Built for Indian Retail Businesses.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default EnterpriseFooter;
