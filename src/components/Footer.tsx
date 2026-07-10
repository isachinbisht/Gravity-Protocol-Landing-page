import React, { useState } from "react";
import { Mail, Check, AlertCircle, ArrowUpRight, Github, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      setErrorMessage("Please fill in your email address.");
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setStatus("error");
      setErrorMessage("Please provide a valid email structure.");
      return;
    }

    setStatus("loading");
    
    // Simulate API registration logic
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-white border-t border-[#EAE8E2] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        
        {/* "Connect with us" Main Interactive Panel */}
        <div className="bg-[#F9F8F3] rounded-3xl border border-[#EAE8E2] p-8 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden shadow-xs">
          
          {/* Subtle design accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#EAE8E2] rounded-tl-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#EAE8E2] rounded-br-3xl pointer-events-none"></div>
          
          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            <span className="text-[10px] font-mono tracking-widest text-brand-green uppercase font-bold">
              NEWSLETTER ENLISTMENT
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-charcoal tracking-tight font-medium">
              Stay in the loop
            </h2>
            <p className="text-xs md:text-sm text-brand-charcoal/60 leading-relaxed">
              Enter your email to receive updates on protocol developments, new fund launches, and DeFi insights on the Stellar network.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 bg-white p-1.5 rounded-full border border-[#EAE8E2] shadow-xs focus-within:border-brand-green transition-colors">
                <div className="flex items-center pl-4 gap-2 flex-1 min-w-0">
                  <Mail className="h-4 w-4 text-brand-charcoal/40 shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className="w-full bg-transparent border-0 text-sm focus:outline-hidden text-brand-charcoal placeholder:text-brand-charcoal/30 font-sans"
                    disabled={status === "loading" || status === "success"}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-brand-green hover:bg-brand-green-hover text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe Now"}
                  <Send className="h-3 w-3" />
                </button>
              </div>

              {/* Status Alert Display */}
              <AnimatePresence mode="wait">
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-1.5 justify-center text-red-600 text-xs mt-2"
                  >
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 justify-center text-brand-green text-xs font-semibold mt-2"
                  >
                    <Check className="h-4 w-4 rounded-full bg-emerald-100 p-0.5 text-emerald-700" />
                    <span>Thank you! Your email is registered into our updates queue.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Footer Navigation and Brand Directory */}
        <div className="border-t border-[#F4F2EB] pt-12 grid grid-cols-1 md:grid-cols-12 gap-8 text-left items-start">
          
          {/* Logo & Manifesto */}
          <div className="md:col-span-4 space-y-4">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="flex items-center gap-1.5 group">
              <span className="font-serif text-2xl font-bold tracking-tight text-brand-charcoal group-hover:text-brand-green transition-colors">
                Gravity
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green"></span>
            </a>
            <p className="text-xs text-brand-charcoal/50 max-w-xs leading-relaxed font-sans">
              Permissionless on-chain funds on Stellar. Built with Soroban smart contracts. No middlemen, full transparency.
            </p>
          </div>

          {/* Nav Links columns */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-brand-charcoal/40 uppercase font-bold block">
              PROTOCOL
            </span>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  onClick={(e) => { e.preventDefault(); scrollToSection("#features"); }}
                  className="text-xs text-brand-charcoal/65 hover:text-brand-charcoal transition-colors font-sans"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#specifications"
                  onClick={(e) => { e.preventDefault(); scrollToSection("#specifications"); }}
                  className="text-xs text-brand-charcoal/65 hover:text-brand-charcoal transition-colors font-sans"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#why-choose"
                  onClick={(e) => { e.preventDefault(); scrollToSection("#why-choose"); }}
                  className="text-xs text-brand-charcoal/65 hover:text-brand-charcoal transition-colors font-sans"
                >
                  Access Tiers
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-brand-charcoal/40 uppercase font-bold block">
              RESOURCES
            </span>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  onClick={(e) => { e.preventDefault(); scrollToSection("#about"); }}
                  className="text-xs text-brand-charcoal/65 hover:text-brand-charcoal transition-colors font-sans"
                >
                  About Us
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="text-xs text-brand-charcoal/65 hover:text-brand-charcoal transition-colors font-sans cursor-pointer text-left"
                >
                  Get Started
                </button>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-charcoal/65 hover:text-brand-charcoal transition-colors flex items-center gap-1 font-sans"
                >
                  GitHub <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact Meta */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-brand-charcoal/40 uppercase font-bold block">
              PARTNERSHIPS
            </span>
            <p className="text-xs text-brand-charcoal/60 leading-relaxed font-sans">
              Interested in white-labeling Gravity Protocol for your institution or building custom integrations? Speak with our core team.
            </p>
            <button
              onClick={onOpenContact}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-white border border-[#EAE8E2] text-brand-charcoal hover:bg-brand-sand/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              Contact Team
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

        {/* Legal & Stamp Row */}
        <div className="border-t border-[#F4F2EB] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-charcoal/40 font-mono">
          <div className="flex items-center gap-1">
            <span>🃑</span>
            <span>Gravity Protocol. Open source. On-chain.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-charcoal transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-charcoal transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-charcoal transition-colors">Documentation</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
