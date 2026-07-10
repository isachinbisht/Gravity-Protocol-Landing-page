import React from "react";
import { Quote, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Testimonial() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6 border-b border-[#EAE8E2] scroll-mt-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
        
        {/* Left Column: Balanced Stones Sphere Graphic */}
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden border border-[#EAE8E2] bg-brand-sand/15 relative h-[380px] md:h-[440px] shadow-sm group"
          >
            <img
              src="/src/assets/images/portfolio_balance.png"
              alt="Abstract 3D rendering representing financial balance and portfolio management"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000 ease-out"
            />
            {/* Soft decorative badge on the photo */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#F9F8F3]/90 backdrop-blur-xs p-4 rounded-2xl border border-[#EAE8E2] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-brand-green uppercase font-bold block">
                  PORTFOLIO BALANCE
                </span>
                <span className="text-xs text-brand-charcoal/70 font-semibold mt-0.5 block">
                  Target allocation maintained
                </span>
              </div>
              <div className="h-2 w-2 rounded-full bg-brand-green animate-pulse"></div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Statement Quotes Panel */}
        <div className="md:col-span-7 space-y-6 md:pl-4">
          <div className="h-10 w-10 rounded-full bg-[#F0F4EC] border border-brand-light-green/20 flex items-center justify-center text-brand-green mb-2">
            <Quote className="h-5 w-5 fill-brand-green/10" />
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-serif text-brand-charcoal font-medium tracking-tight leading-relaxed text-left"
          >
            "Gravity Protocol is exactly what DeFi on Stellar needed. I can create a diversified portfolio, set my target allocations, and the smart contracts handle everything — rebalancing, NAV tracking, share minting. It just works."
          </motion.blockquote>

          <div className="pt-4 border-t border-[#F4F2EB] flex justify-between items-center">
            <div>
              <span className="text-base font-serif font-bold text-brand-charcoal block">
                Gravity Team
              </span>
              <span className="text-xs font-mono text-brand-charcoal/45 mt-0.5 block">
                DeFi Strategist & Stellar Ecosystem Builder
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#F0F4EC] text-brand-green border border-brand-light-green/20">
              <Sparkles className="h-3.5 w-3.5" />
              Early Adopter
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
