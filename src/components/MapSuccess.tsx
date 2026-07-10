import React, { useState } from "react";
import { Sparkles, ArrowRight, Wallet, Coins, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export default function MapSuccess() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const steps = [
    {
      index: "01",
      title: "Connect Wallet",
      subtitle: "Freighter integration",
      description: "Connect your Freighter wallet to Gravity Protocol. Browse available funds, review their target allocations, historical NAV, and performance metrics before investing.",
      icon: Wallet,
      metric: "Freighter & Lobstr supported"
    },
    {
      index: "02",
      title: "Deposit & Earn Shares",
      subtitle: "Instant minting",
      description: "Choose a fund that matches your strategy. Deposit XLM or USDC and receive share tokens that represent your proportional ownership of the fund's asset basket.",
      icon: Coins,
      metric: "< 5 second finality"
    },
    {
      index: "03",
      title: "Watch It Grow",
      subtitle: "Autonomous management",
      description: "Track your fund's NAV in real-time. The rebalancing engine automatically maintains target allocations so your portfolio stays balanced without manual intervention.",
      icon: TrendingUp,
      metric: "24/7 autonomous operation"
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 border-b border-[#EAE8E2]">
      
      {/* Top Header Row with Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div className="max-w-xl">
          <span className="text-xs font-mono tracking-widest text-brand-green font-bold uppercase mb-3 block">
            GET STARTED
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal tracking-tight font-medium">
            Start Investing in 3 Steps
          </h2>
        </div>
        
        <button 
          onClick={() => {
            const whyChoose = document.querySelector("#why-choose");
            if (whyChoose) whyChoose.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#48543B] hover:bg-brand-green-hover text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
        >
          View Access Tiers
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Three-Column Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.index}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group space-y-6 p-6 rounded-2xl border border-transparent hover:border-[#EAE8E2] hover:bg-white transition-smooth"
            >
              {/* Massive elegant number */}
              <div className="flex justify-between items-start">
                <span className="font-serif text-5xl font-light text-brand-green/20 group-hover:text-brand-green/45 transition-colors">
                  {step.index}
                </span>
                <div className="h-8 w-8 rounded-full bg-[#F9F8F3] border border-[#EAE8E2] flex items-center justify-center text-brand-charcoal/50 group-hover:bg-brand-green group-hover:text-white transition-smooth">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              {/* Title & subtitle */}
              <div className="space-y-1 text-left">
                <h3 className="font-serif text-lg font-bold text-brand-charcoal group-hover:text-brand-green transition-colors">
                  {step.title}
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-brand-charcoal/40 uppercase block">
                  {step.subtitle}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-brand-charcoal/60 leading-relaxed text-left">
                {step.description}
              </p>

              {/* Metric indicator bottom */}
              <div className="border-t border-[#F4F2EB] pt-4 flex items-center justify-between">
                <span className="text-[9px] font-mono text-brand-charcoal/40 uppercase">PROTOCOL SPEC</span>
                <span className="text-[10px] font-mono font-bold text-brand-green">
                  {step.metric}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Panoramic Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 rounded-3xl overflow-hidden shadow-lg border border-[#EAE8E2] h-[360px] relative group"
      >
        <img
          src="/src/assets/images/autonomous_investing_path.png"
          alt="Glowing network path representing autonomous investing"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 flex items-end p-8 md:p-12">
          <div className="max-w-xl text-white">
            <span className="text-[10px] font-mono tracking-widest text-brand-light-green/90 uppercase block mb-2 font-bold drop-shadow-md">
              THE PATH TO AUTONOMOUS INVESTING
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-medium tracking-tight mb-3 drop-shadow-md">
              Your portfolio. Your rules. Code-enforced.
            </h3>
            <p className="text-sm text-white/90 leading-relaxed hidden sm:block drop-shadow-md">
              Gravity Protocol puts you in control. Define your strategy, deposit your assets, and let Soroban smart contracts execute rebalancing, NAV tracking, and share management — trustlessly and transparently.
            </p>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
