import React, { useState } from "react";
import { Check, ArrowRight, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BigPicture() {
  const [activeItem, setActiveItem] = useState(0);

  const listItems = [
    {
      index: "01",
      title: "Deposit & Mint",
      description: "Send USDC or XLM to the vault contract. The contract queries the oracle for current prices, calculates the fund's NAV, and mints share tokens proportional to your deposit.",
      interactiveContent: {
        header: "Share Token Minting",
        badge: "Soroban Contract",
        body: "New shares = deposit amount ÷ current NAV per share. The contract then swaps your deposit into the target allocation (e.g. 60% XLM / 40% USDC) via Stellar DEX path payments.",
        spec: "deposit() → calculate_nav() → mint()"
      }
    },
    {
      index: "02",
      title: "NAV Calculation",
      description: "The protocol continuously calculates Net Asset Value by querying oracle price feeds for each asset, multiplying by vault balances, and dividing by total shares outstanding.",
      interactiveContent: {
        header: "Real-Time Valuation",
        badge: "Reflector Oracle",
        body: "NAV = Σ(asset_balance × oracle_price) ÷ total_shares. Reflector oracle provides live Soroban-native price feeds for XLM, USDC, AQUA and other Stellar assets.",
        spec: "calculate_nav() → get_price() → Σ balances"
      }
    },
    {
      index: "03",
      title: "Rebalancing Engine",
      description: "The contract checks current portfolio weights against target allocations. When drift exceeds a threshold, it executes swaps via the Stellar DEX to bring the fund back to balance.",
      interactiveContent: {
        header: "Drift Detection & Correction",
        badge: "Stellar DEX",
        body: "get_drift() compares current_weight vs target_weight for each asset. If drift > threshold, rebalance() calculates the optimal swap amounts and routes them through Stellar's native orderbook.",
        spec: "get_drift() → rebalance() → path_payment()"
      }
    },
    {
      index: "04",
      title: "Withdraw & Burn",
      description: "Return your share tokens to the vault. The contract calculates your proportional claim, sells assets from the vault, deducts any performance fee on profit, and sends you the proceeds.",
      interactiveContent: {
        header: "Fair Redemption",
        badge: "Performance Fee",
        body: "Your share = (user_tokens ÷ total_tokens) × vault_value. If your position is in profit, a performance fee is deducted before redemption. Remaining value is sent as USDC or XLM.",
        spec: "withdraw() → burn() → collect_fee()"
      }
    },
  ];

  return (
    <section id="specifications" className="py-24 max-w-7xl mx-auto px-6 border-b border-[#EAE8E2] scroll-mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Text Content and Selector */}
        <div className="lg:col-span-7 space-y-10">
          <div className="max-w-xl">
            <span className="text-xs font-mono tracking-widest text-brand-green font-bold uppercase mb-3 block">
              HOW IT WORKS
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal tracking-tight font-medium mb-4">
              See How It Works
            </h2>
            <p className="text-sm md:text-base text-brand-charcoal/60 leading-relaxed">
              Explore each layer of the protocol below to understand how Gravity manages funds autonomously on the Stellar blockchain:
            </p>
          </div>

          {/* Vertical Selector List */}
          <div className="space-y-4">
            {listItems.map((item, index) => (
              <div
                key={item.index}
                onClick={() => setActiveItem(index)}
                className={`p-5 rounded-2xl border transition-smooth cursor-pointer text-left relative overflow-hidden ${
                  activeItem === index
                    ? "bg-white border-brand-green shadow-sm"
                    : "bg-transparent border-[#EAE8E2] hover:bg-white/40"
                }`}
              >
                {/* Active indicator bar */}
                {activeItem === index && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-green"
                  />
                )}
                
                <div className="flex gap-4 items-start">
                  <span className={`font-mono text-sm font-semibold ${activeItem === index ? "text-brand-green" : "text-brand-charcoal/30"}`}>
                    {item.index}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-brand-charcoal">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-charcoal/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => {
                const specSection = document.querySelector("#why-choose");
                if (specSection) specSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full text-sm font-medium bg-brand-green hover:bg-brand-green-hover text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              Explore Plans
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-medium border border-[#EAE8E2] hover:bg-white text-brand-charcoal/70 hover:text-brand-charcoal flex items-center justify-center gap-2 transition-smooth"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Details Panel + Asset */}
        <div className="lg:col-span-5 space-y-6">
          {/* Aesthetic Asset */}
          <div className="rounded-3xl overflow-hidden border border-[#EAE8E2] bg-brand-sand/10 relative h-[420px] shadow-sm">
            <img
              src="/src/assets/images/smart_contracts_abstract.png"
              alt="Minimalist abstract representation of glowing blockchain smart contracts"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Absolute positioning overlay */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold bg-white/90 text-brand-charcoal border border-[#EAE8E2] shadow-xs flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-brand-green" />
                Protocol Flow Diagram
              </span>
            </div>
          </div>

          {/* Interactive Specification Preview Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl p-6 border border-[#EAE8E2] shadow-sm space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[#F4F2EB]">
                <h4 className="font-serif text-base font-bold text-brand-green">
                  {listItems[activeItem].interactiveContent.header}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#F0F4EC] text-brand-green border border-brand-light-green/20">
                  {listItems[activeItem].interactiveContent.badge}
                </span>
              </div>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                {listItems[activeItem].interactiveContent.body}
              </p>
              <div className="bg-[#F9F8F3] p-3 rounded-xl border border-[#EAE8E2]/60 flex items-center justify-between">
                <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase">Contract Call:</span>
                <span className="text-xs font-mono font-medium text-brand-charcoal/80">
                  {listItems[activeItem].interactiveContent.spec}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
