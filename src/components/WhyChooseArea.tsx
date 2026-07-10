import React, { useState } from "react";
import { Check, CheckCircle2, Star, ShieldAlert, Sparkles, MessageSquare, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function WhyChooseArea() {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const tiers = [
    {
      id: 1,
      name: "Explorer",
      price: "Free",
      period: "",
      description: "For individual DeFi users exploring on-chain fund investing.",
      features: [
        "Access to public funds on Gravity",
        "Real-time NAV and share price tracking",
        "Manual rebalance trigger (button)",
        "Up to 2 assets per fund",
        "Community Discord support",
        "Stellar testnet sandbox access",
      ],
      cta: "Start Exploring",
      badge: null,
    },
    {
      id: 2,
      name: "Builder",
      price: "Custom",
      period: "",
      description: "For fund creators building multi-asset portfolios on Stellar.",
      features: [
        "Create unlimited custom funds",
        "Multi-asset baskets (5+ assets)",
        "Automated rebalancing engine",
        "Custom performance fee structure",
        "Priority protocol support",
        "Mainnet deployment access",
      ],
      cta: "Start Building",
      badge: "Most Popular",
    },
    {
      id: 3,
      name: "Institutional",
      price: "Contact",
      period: "",
      description: "For organizations needing white-label fund infrastructure.",
      features: [
        "White-label fund deployment",
        "Custom oracle feed integration",
        "Full REST & SDK API access",
        "Dedicated protocol engineer support",
        "Custom compliance & audit reports",
        "SLA uptime guarantee",
      ],
      cta: "Contact Sales",
      badge: "Enterprise",
    },
  ];

  const faqs = [
    {
      q: "How does the NAV calculation work exactly?",
      a: "NAV = total fund value ÷ total shares outstanding. The contract queries the Reflector oracle for each asset's current price, multiplies by the vault balance, sums all asset values, then divides by total share tokens in circulation."
    },
    {
      q: "What happens if the rebalancing swap fails?",
      a: "The rebalancing function is atomic — if any swap in the sequence fails (e.g. insufficient DEX liquidity), the entire transaction reverts. The vault remains in its previous state with no partial execution or loss of funds."
    },
    {
      q: "Are there any fees beyond the performance fee?",
      a: "For v1, Gravity charges a single performance fee only on withdrawal when your position is in profit. There are no management fees, entry fees, or hidden charges. The fee percentage is set by the fund creator and visible on-chain."
    }
  ];

  const toggleFAQ = (question: string) => {
    if (expandedRow === question) {
      setExpandedRow(null);
    } else {
      setExpandedRow(question);
    }
  };

  return (
    <section id="why-choose" className="py-24 max-w-7xl mx-auto px-6 border-b border-[#EAE8E2] text-center scroll-mt-6">
      
      {/* Header text */}
      <div className="max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-mono tracking-widest text-brand-green font-bold uppercase">
          ACCESS TIERS
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal tracking-tight font-medium">
          Why Choose Gravity?
        </h2>
        <p className="text-sm md:text-base text-brand-charcoal/60 max-w-2xl mx-auto leading-relaxed">
          The only protocol that lets anyone create, manage, and invest in autonomous on-chain funds with transparent NAV and zero intermediaries.
        </p>
        <div className="pt-2">
          <button 
            onClick={() => {
              const contactSec = document.querySelector("#contact-section");
              if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-brand-green hover:bg-brand-green-hover text-white transition-colors cursor-pointer shadow-sm inline-flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Get Early Access
          </button>
        </div>
      </div>

      {/* Elegant Grid Table Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
        {tiers.map((tier, idx) => (
          <div
            key={tier.id}
            onMouseEnter={() => setHoveredTier(idx)}
            onMouseLeave={() => setHoveredTier(null)}
            className={`bg-white rounded-3xl p-8 border transition-smooth relative flex flex-col justify-between ${
              hoveredTier === idx
                ? "border-brand-green shadow-lg scale-[1.02]"
                : tier.badge === "Most Popular"
                ? "border-brand-light-green/60 shadow-xs"
                : "border-[#EAE8E2]"
            }`}
          >
            {/* Top Indicator Badge */}
            {tier.badge && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-mono font-bold bg-[#F0F4EC] text-brand-green border border-brand-light-green/30">
                {tier.badge}
              </span>
            )}

            <div>
              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono tracking-wider text-brand-charcoal/40 uppercase block font-semibold">
                  {tier.name}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-serif font-bold text-brand-charcoal">{tier.price}</span>
                  <span className="text-xs text-brand-charcoal/45 font-mono">{tier.period}</span>
                </div>
                <p className="text-xs text-brand-charcoal/60 leading-relaxed min-h-[32px]">
                  {tier.description}
                </p>
              </div>

              {/* List of features */}
              <div className="border-t border-[#F4F2EB] pt-6 space-y-4 mb-8">
                {tier.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex gap-2.5 items-start">
                    <div className="h-4 w-4 rounded-full bg-[#F0F4EC] border border-brand-light-green/20 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                      <Check className="h-2.5 w-2.5" />
                    </div>
                    <span className="text-xs text-brand-charcoal/70 leading-relaxed font-sans">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`w-full py-3 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                tier.badge === "Most Popular"
                  ? "bg-brand-green hover:bg-brand-green-hover text-white shadow-sm"
                  : "bg-[#F9F8F3] hover:bg-brand-sand/30 border border-[#EAE8E2] text-brand-charcoal"
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Accordion FAQ Area */}
      <div className="max-w-3xl mx-auto mt-24 text-left border-t border-[#EAE8E2] pt-16">
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono tracking-widest text-brand-green uppercase font-bold">
            COMMON QUESTIONS
          </span>
          <h3 className="text-2xl font-serif font-bold text-brand-charcoal mt-2">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.q} 
              className="bg-white rounded-2xl border border-[#EAE8E2] overflow-hidden transition-smooth"
            >
              <button
                onClick={() => toggleFAQ(faq.q)}
                className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#F9F8F3]/50"
              >
                <span className="font-serif text-sm md:text-base font-semibold text-brand-charcoal">
                  {faq.q}
                </span>
                <div className="h-6 w-6 rounded-full bg-[#F9F8F3] border border-[#EAE8E2] flex items-center justify-center text-brand-charcoal/60 shrink-0">
                  {expandedRow === faq.q ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {expandedRow === faq.q && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="p-5 pt-0 border-t border-[#F4F2EB] text-xs md:text-sm text-brand-charcoal/65 leading-relaxed bg-[#F9F8F3]/20 font-sans">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
