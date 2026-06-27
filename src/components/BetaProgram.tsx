import React, { useState } from 'react';
import { 
  MessageSquareText, 
  Send, 
  Star, 
  X, 
  CheckCircle2, 
  HeartHandshake,
  MessageCircleQuestion,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FeedbackData } from '../types';

interface BetaProgramProps {
  isFeedbackModalOpen: boolean;
  setIsFeedbackModalOpen: (open: boolean) => void;
}

export default function BetaProgram({ isFeedbackModalOpen, setIsFeedbackModalOpen }: BetaProgramProps) {
  const [feedback, setFeedback] = useState<FeedbackData>({
    name: '',
    email: '',
    businessType: 'Retail',
    rating: 5,
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.name || !feedback.email || !feedback.message) {
      alert('Please fill out all fields.');
      return;
    }
    
    // Simulate API storage
    setIsSubmitted(true);
    setTimeout(() => {
      // Clean up state
      setFeedback({
        name: '',
        email: '',
        businessType: 'Retail',
        rating: 5,
        message: ''
      });
    }, 4000);
  };

  return (
    <section className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Abstract Background Vectors */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-violet-600/10 rounded-full filter blur-3xl"></div>
      <div className="absolute left-10 top-10 w-80 h-80 bg-violet-500/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-1 bg-violet-500/20 text-violet-300 border border-violet-400/20 px-3.5 py-1.5 rounded-full text-xs font-bold font-mono uppercase">
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
            <span>OPEN BETA CAMPAIGN</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
            Help us build the absolute best <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-300 to-purple-400">
              accounting experience.
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            "ZenterPrime is currently in Beta. We're continuously improving it based on user feedback." Let us know what you want to see next—whether it's custom invoicing fields, specialized GSTR reports, or automatic ledger sharing!
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="cta-send-feedback"
              onClick={() => {
                setIsSubmitted(false);
                setIsFeedbackModalOpen(true);
              }}
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-violet-950/40 hover:shadow-violet-600/20 transition-all duration-200 flex items-center justify-center gap-2 text-sm w-full sm:w-auto cursor-pointer"
            >
              <MessageSquareText className="w-5 h-5" /> Send Feedback
            </button>
            
            <a 
              href="#faq"
              className="text-xs font-bold text-slate-300 hover:text-white transition-colors duration-150 py-3 flex items-center gap-1 shrink-0"
            >
              <MessageCircleQuestion className="w-4 h-4" /> Have questions? Read our FAQ
            </a>
          </div>
        </div>

      </div>

      {/* Interactive Dialog Modal */}
      <AnimatePresence>
        {isFeedbackModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFeedbackModalOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-white text-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-lg border border-slate-200 shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsFeedbackModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all"
                style={{ minWidth: '44px', minHeight: '44px' }}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center space-x-2.5 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold text-slate-900">Your Voice, Your Ledger</h4>
                      <p className="text-xs text-slate-400">Tell us what you need in your bookkeeping client</p>
                    </div>
                  </div>

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={feedback.name}
                      onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                      className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-hidden focus:border-violet-500 bg-slate-50/50 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email & Business Type Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="e.g. ramesh@store.in"
                        value={feedback.email}
                        onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                        className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-hidden focus:border-violet-500 bg-slate-50/50 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase">Business Category</label>
                      <select 
                        value={feedback.businessType}
                        onChange={(e) => setFeedback({ ...feedback, businessType: e.target.value })}
                        className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-hidden focus:border-violet-500 bg-white transition-all"
                      >
                        <option value="Retail">Retail & Kirana</option>
                        <option value="Wholesale">Wholesale & B2B</option>
                        <option value="Services">Consulting & IT</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Freelancer">Freelance Merchant</option>
                      </select>
                    </div>
                  </div>

                  {/* Interactive Stars Rating */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Rating for ZenterPrime</label>
                    <div className="flex items-center space-x-2.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedback({ ...feedback, rating: star })}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(null)}
                          className="p-1 text-yellow-400 hover:scale-110 transition-transform cursor-pointer"
                          style={{ minWidth: '40px', minHeight: '40px' }}
                        >
                          <Star 
                            className={`w-7 h-7 fill-current ${
                              (hoveredStar !== null ? star <= hoveredStar : star <= feedback.rating) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-slate-200 fill-transparent'
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-500 ml-1">
                        {feedback.rating === 5 ? 'Perfect!' : feedback.rating === 4 ? 'Great' : feedback.rating === 3 ? 'Good' : feedback.rating === 2 ? 'Needs work' : 'Poor'}
                      </span>
                    </div>
                  </div>

                  {/* Message feedback */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase">Your Message & Feature Request</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Share your thoughts. (e.g. Please integrate direct Excel backup sync!)"
                      value={feedback.message}
                      onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                      className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-hidden focus:border-violet-500 bg-slate-50/50 focus:bg-white transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsFeedbackModalOpen(false)}
                      className="flex-1 text-center py-3 border border-slate-200 text-sm font-bold text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-4 h-4" /> Submit Feedback
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xs border border-emerald-100">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-slate-900">Feedback Logged Successfully!</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-800">{feedback.name || 'Merchant'}</span>. Your suggestions for GSTR and general accounting upgrades have been dispatched to our product developers.
                  </p>
                  <div className="text-[10px] font-mono text-slate-400 bg-slate-50 inline-block px-3 py-1 rounded-full border border-slate-100 mt-2">
                    LOGGED_REF: ZP-BETA-{(Math.random() * 10000).toFixed(0)}
                  </div>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
