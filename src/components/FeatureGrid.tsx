import React, { useState } from "react";
import { Vault, Activity, RefreshCw, Coins, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import defiLandscape from "../assets/images/defi_landscape.png";

export default function FeatureGrid() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const mockBrands = [
    { name: "STELLAR", icon: "✦" },
    { name: "SOROBAN", icon: "⎔" },
    { name: "AQUARIUS", icon: "💧" },
    { name: "LOBSTR", icon: "⌗" },
    { name: "FREIGHTER", icon: "🚀" },
    { name: "REFLECTOR", icon: "⦿" },
  ];

  const features = [
    {
      id: 1,
      title: "Smart Vaults",
      description: "Deposit XLM, USDC, or any Stellar asset into a Soroban-powered vault. The contract securely holds and manages your assets according to predefined allocation rules.",
      details: {
        latency: "< 5s finality",
        throughput: "Multi-asset",
        efficiency: "100% on-chain custody",
        highlight: "Each vault is a standalone Soroban contract with transparent state. All assets are held on-chain with no intermediary — just code enforcing the rules."
      },
      icon: Vault,
    },
    {
      id: 2,
      title: "Live NAV Tracking",
      description: "Net Asset Value is calculated in real-time using oracle price feeds. Know exactly what your share token is worth at any moment — no guesswork, no delays.",
      details: {
        latency: "Real-time pricing",
        throughput: "Reflector oracle",
        efficiency: "Transparent valuation",
        highlight: "NAV = total fund value ÷ total shares outstanding. Price data from Reflector oracle feeds ensures accurate, tamper-proof valuations on every block."
      },
      icon: Activity,
    },
    {
      id: 3,
      title: "Auto Rebalancing",
      description: "Set target weights (e.g. 60% XLM / 40% USDC) and the contract automatically detects drift and executes swaps via the Stellar DEX to maintain balance.",
      details: {
        latency: "Drift detection",
        throughput: "DEX path routing",
        efficiency: "Target weight precision",
        highlight: "The rebalancing engine calculates current vs target allocation, identifies the drift percentage, and executes optimal path payments through Stellar's built-in orderbook."
      },
      icon: RefreshCw,
    },
    {
      id: 4,
      title: "Share Tokens",
      description: "When you deposit, the vault mints share tokens proportional to your contribution. When you withdraw, tokens are burned and you receive your fair share of the vault.",
      details: {
        latency: "Instant minting",
        throughput: "Standard SEP-41",
        efficiency: "Fully transferable",
        highlight: "Share tokens follow the Stellar SEP-41 token standard. They're composable, transferable, and represent verifiable fractional ownership of the underlying vault assets."
      },
      icon: Coins,
    },
  ];

  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-6 border-b border-[#EAE8E2]">
      {/* Trusted By Section */}
      <div className="mb-24 text-center">
        <p className="text-[11px] font-mono tracking-widest text-brand-charcoal/40 uppercase mb-8">
          built on the stellar ecosystem
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-center opacity-65">
          {mockBrands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center gap-1.5 grayscale hover:grayscale-0 transition-all group"
            >
              <span className="text-lg text-brand-charcoal/60 group-hover:text-brand-green font-mono">{brand.icon}</span>
              <span className="text-xs font-mono tracking-widest font-bold text-brand-charcoal/65 group-hover:text-brand-charcoal transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Feature Text Header */}
      <div className="max-w-2xl mb-16">
        <p className="text-xs font-mono tracking-widest text-brand-green font-bold uppercase mb-3">
          PROTOCOL FEATURES
        </p>
        <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal tracking-tight font-medium mb-4">
          Built for autonomous finance.
        </h2>
        <p className="text-base text-brand-charcoal/60 leading-relaxed">
          An elegant protocol that automates fund creation, NAV calculation, rebalancing, and share token minting — all on-chain, all verifiable, all permissionless.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedFeature(idx)}
              className="bg-white rounded-2xl p-6 border border-[#EAE8E2] cursor-pointer hover:border-brand-light-green hover:shadow-md transition-smooth relative flex flex-col justify-between group"
            >
              <div>
                <div className="h-10 w-10 rounded-full bg-[#F9F8F3] border border-[#EAE8E2] flex items-center justify-center mb-6 text-brand-green group-hover:bg-brand-green group-hover:text-white transition-smooth">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-charcoal mb-3 group-hover:text-brand-green transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-brand-charcoal/60 leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              <span className="text-xs font-semibold text-brand-green/80 group-hover:text-brand-green flex items-center gap-1 mt-auto">
                View specifications
                <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Panoramic Feature Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 rounded-3xl overflow-hidden shadow-lg border border-[#EAE8E2] h-[400px] relative group"
      >
        <img
          src={defiLandscape}
          alt="Abstract decentralized finance network landscape"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 flex items-end p-8 md:p-12">
          <div className="max-w-xl text-white">
            <span className="text-[10px] font-mono tracking-widest text-brand-light-green/90 uppercase block mb-2 font-bold drop-shadow-md">
              THE LANDSCAPE OF DECENTRALIZED FINANCE
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-medium tracking-tight mb-3 drop-shadow-md">
              Permissionless fund infrastructure. Designed to scale trustlessly.
            </h3>
            <p className="text-sm text-white/90 leading-relaxed hidden sm:block drop-shadow-md">
              Gravity Protocol removes the middleman from fund management. Smart contracts enforce allocation rules, oracles provide pricing, and the Stellar DEX handles all swaps — transparently and autonomously.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Feature Details Modal Dialog */}
      <AnimatePresence>
        {selectedFeature !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-lg w-full p-8 border border-[#EAE8E2] shadow-2xl relative overflow-hidden"
              >
                {/* Decorative blob */}
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-brand-light-green/10 blur-2xl"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#F9F8F3] border border-[#EAE8E2] flex items-center justify-center text-brand-green">
                      {React.createElement(features[selectedFeature].icon, { className: "h-5 w-5" })}
                    </div>
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-brand-green font-bold uppercase">
                        PROTOCOL SPECIFICATION
                      </span>
                      <h3 className="text-xl font-serif font-bold text-brand-charcoal">
                        {features[selectedFeature].title}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="p-1.5 text-brand-charcoal/40 hover:text-brand-charcoal hover:bg-brand-sand/20 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6 relative z-10">
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed">
                    {features[selectedFeature].description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 border-t border-b border-[#EAE8E2] py-4 bg-[#F9F8F3]/50 px-4 rounded-2xl">
                    <div className="text-center">
                      <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase block">Speed</span>
                      <span className="text-sm font-bold text-brand-green font-mono">{features[selectedFeature].details.latency}</span>
                    </div>
                    <div className="text-center border-l border-r border-[#EAE8E2]">
                      <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase block">Source</span>
                      <span className="text-sm font-bold text-brand-green font-mono">{features[selectedFeature].details.throughput}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase block">Property</span>
                      <span className="text-sm font-bold text-brand-green font-mono">{features[selectedFeature].details.efficiency}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-brand-charcoal uppercase block">Technical Detail:</span>
                    <p className="text-xs text-brand-charcoal/60 leading-relaxed font-sans">
                      {features[selectedFeature].details.highlight}
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setSelectedFeature(null)}
                      className="px-5 py-2 rounded-full text-xs font-medium bg-brand-green hover:bg-brand-green-hover text-white transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
