import React from 'react';

interface AboutSectionProps {
  onRequestDemo: () => void;
  onContactUs: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onRequestDemo, onContactUs }) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#f8f8fc] border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Container Card (Screenshot 424) */}
        <div className="max-w-3xl mx-auto text-center">
          
          <h2 
            id="about-headline"
            className="text-3xl sm:text-4xl font-normal text-[#3b28cc] tracking-tight mb-8"
          >
            About us
          </h2>

          <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
            <p id="about-paragraph-1">
              We&apos;re ZenterPrime Solutions, providing the simplest accounting interfaces and making them affordable for every retail and small sized businesses.
            </p>
            <p id="about-paragraph-2">
              Our goal is to offer the simple and smart accounting experience for never losing track of their books.
            </p>
            <p id="about-paragraph-gst-notice" className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-800">Please note:</span> ZenterPrime Solutions is currently an unregistered company that does not have a GST-registered firm, so purchasing a license will not include any GST.
            </p>
            <p id="about-paragraph-3" className="font-medium text-slate-900">
              Thank you!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              id="btn-about-request-demo"
              onClick={onRequestDemo}
              className="w-full sm:w-auto bg-[#3b28cc] hover:bg-[#3120b0] text-white text-sm font-medium py-3 px-8 rounded-lg transition-snappy shadow-xs cursor-pointer active:scale-95"
            >
              Request a demo
            </button>
            <button
              id="btn-about-contact-us"
              onClick={onContactUs}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#3b28cc] text-slate-800 text-sm font-medium py-3 px-8 rounded-lg transition-snappy cursor-pointer active:scale-95"
            >
              Contact us
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
export default AboutSection;
