import React, { useState } from "react";
import { X, Send, CheckCircle2, User, Building, Mail, ShieldCheck, ArrowRight, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    tier: "Investor",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("submitting");
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("idle");
        alert("Failed to join waitlist. Please try again.");
      }
    } catch (error) {
      setStatus("idle");
      alert("Network error. Please try again.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      tier: "Investor",
      message: "",
    });
    setStatus("idle");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-brand-charcoal/30 backdrop-blur-xs flex items-center justify-center p-4"
          >
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F9F8F3] border border-[#EAE8E2] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            >
              
              {/* Header decor */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-green"></div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 text-brand-charcoal/40 hover:text-brand-charcoal hover:bg-brand-sand/30 rounded-full transition-colors cursor-pointer z-10"
              >
                <X className="h-5 w-5" />
              </button>

              {status === "success" ? (
                // Success screen
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center space-y-6"
                >
                  <div className="h-16 w-16 bg-[#EAF5EA] border border-[#CDE5CD] rounded-full flex items-center justify-center text-brand-green mx-auto">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-brand-charcoal">
                      You're on the list
                    </h3>
                    <p className="text-sm text-brand-charcoal/65 max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="font-semibold">{formData.name}</span>. Your request as an <span className="text-brand-green font-semibold">{formData.tier}</span> has been securely logged. We'll be in touch soon.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#EAE8E2] p-4 text-left text-xs space-y-2 font-mono">
                    <div className="flex justify-between border-b border-[#F4F2EB] pb-1.5">
                      <span className="text-zinc-400">STATUS:</span>
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <Activity className="h-3 w-3 animate-pulse" /> QUEUED
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#F4F2EB] pb-1.5">
                      <span className="text-zinc-400">INTEREST PROFILE:</span>
                      <span className="text-brand-charcoal">{formData.tier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">WAITLIST POSITION:</span>
                      <span className="text-brand-charcoal">#{(Math.floor(Math.random() * 1000) + 500).toString()}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold bg-brand-green hover:bg-brand-green-hover text-white transition-colors cursor-pointer shadow-sm"
                    >
                      Return to Protocol
                    </button>
                  </div>
                </motion.div>
              ) : (
                // Form screen
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-brand-green uppercase font-bold">
                      EARLY ACCESS
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-brand-charcoal">
                      Join the Waitlist
                    </h3>
                    <p className="text-xs text-brand-charcoal/50">
                      Submit this request to let our team know you're interested in accessing the Gravity Protocol early alpha on Stellar.
                    </p>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-charcoal/80 block">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-[#EAE8E2] focus-within:border-brand-green transition-colors">
                        <User className="h-4 w-4 text-brand-charcoal/40" />
                        <input
                          type="text"
                          placeholder="Satoshi Nakamoto"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-transparent border-0 text-sm focus:outline-hidden text-brand-charcoal placeholder:text-zinc-400 font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-brand-charcoal/80 block">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-[#EAE8E2] focus-within:border-brand-green transition-colors">
                          <Mail className="h-4 w-4 text-brand-charcoal/40" />
                          <input
                            type="email"
                            placeholder="satoshi@bitcoin.org"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-transparent border-0 text-sm focus:outline-hidden text-brand-charcoal placeholder:text-zinc-400 font-sans"
                          />
                        </div>
                      </div>

                      {/* Company input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-brand-charcoal/80 block">
                          Organization (Optional)
                        </label>
                        <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-[#EAE8E2] focus-within:border-brand-green transition-colors">
                          <Building className="h-4 w-4 text-brand-charcoal/40" />
                          <input
                            type="text"
                            placeholder="DeFi Labs LLC"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full bg-transparent border-0 text-sm focus:outline-hidden text-brand-charcoal placeholder:text-zinc-400 font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tier selector dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-charcoal/80 block">
                        Primary Interest
                      </label>
                      <select
                        value={formData.tier}
                        onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                        className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-[#EAE8E2] text-sm text-brand-charcoal focus:outline-hidden focus:border-brand-green cursor-pointer font-sans"
                      >
                        <option value="Investor">Investor - Looking to invest in funds</option>
                        <option value="Fund Creator">Fund Creator - Looking to launch a fund</option>
                        <option value="Developer">Developer - Building on top of Gravity</option>
                        <option value="Institutional">Institutional - Seeking white-label solutions</option>
                      </select>
                    </div>

                    {/* Message textbox */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-charcoal/80 block">
                        Tell us more <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your DeFi use case, what assets you want to manage, and how we can help..."
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white px-4 py-3 rounded-xl border border-[#EAE8E2] text-sm text-brand-charcoal placeholder:text-zinc-400 focus:outline-hidden focus:border-brand-green font-sans"
                      />
                    </div>

                  </div>

                  {/* Submission Action */}
                  <div className="pt-2 border-t border-[#F4F2EB] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-[10px] text-brand-charcoal/40 flex items-center gap-1 font-mono">
                      <ShieldCheck className="h-4 w-4 text-brand-green" /> Information is secured
                    </span>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold bg-[#48543B] hover:bg-brand-green-hover text-white transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2 shrink-0"
                    >
                      {status === "submitting" ? "Joining..." : "Join Waitlist"}
                      <Send className="h-3 w-3" />
                    </button>
                  </div>
                </form>
              )}

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    );
}
