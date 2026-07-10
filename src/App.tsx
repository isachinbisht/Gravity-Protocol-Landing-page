import React, { useState } from "react";
import Navbar from "./components/Navbar";
import InteractiveDashboard from "./components/InteractiveDashboard";
import FeatureGrid from "./components/FeatureGrid";
import BigPicture from "./components/BigPicture";
import WhyChooseArea from "./components/WhyChooseArea";
import Testimonial from "./components/Testimonial";
import MapSuccess from "./components/MapSuccess";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import { Sparkles, ArrowRight, Globe, Shield, FileCode2 } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-brand-light-green/40 selection:text-brand-charcoal">
      {/* Sticky Top Header Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Container */}
      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="pt-20 pb-24 md:pt-28 md:pb-36 max-w-7xl mx-auto px-6 text-center space-y-12 relative">
          


          {/* Hero Main Heading */}
          <div className="space-y-6 max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-serif text-brand-charcoal tracking-tight font-medium"
            >
              Invest smarter.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-brand-charcoal/65 leading-relaxed max-w-2xl mx-auto"
            >
              Deploy autonomous on-chain funds. Deposit assets, earn share tokens, and let smart contracts handle rebalancing — no fund manager required.
            </motion.p>
          </div>

          {/* Hero Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2"
          >
            <button
              onClick={handleOpenContact}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold bg-brand-green hover:bg-brand-green-hover text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              Launch App
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => {
                const featuresSection = document.querySelector("#specifications");
                if (featuresSection) featuresSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold border border-[#EAE8E2] bg-white text-brand-charcoal/70 hover:text-brand-charcoal transition-smooth flex items-center justify-center gap-1.5"
            >
              How It Works
            </button>
          </motion.div>

          {/* Core Protocol Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 max-w-lg mx-auto gap-4 pt-4 text-left border-t border-[#F4F2EB] hidden md:grid"
          >
            <div className="flex items-center gap-2 text-xs text-brand-charcoal/50">
              <Globe className="h-4 w-4 text-brand-green shrink-0" />
              <span>Stellar Network</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-charcoal/50 border-l border-r border-[#EAE8E2] px-4">
              <FileCode2 className="h-4 w-4 text-brand-green shrink-0" />
              <span>Soroban Smart Contracts</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-charcoal/50 pl-4">
              <Shield className="h-4 w-4 text-brand-green shrink-0" />
              <span>Fully Auditable</span>
            </div>
          </motion.div>

          {/* Hero Interactive Dashboard Visual Wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 150, delay: 0.3 }}
            className="pt-8"
          >
            <InteractiveDashboard />
          </motion.div>

        </section>

        {/* TRUSTED BY & CORE FEATURES SECTION */}
        <FeatureGrid />

        {/* HOW IT WORKS SECTION */}
        <BigPicture />

        {/* WHY CHOOSE GRAVITY SECTION */}
        <WhyChooseArea />

        {/* TESTIMONIAL QUOTES SECTION */}
        <Testimonial />

        {/* GET STARTED SECTION */}
        <MapSuccess />

      </main>

      {/* FOOTER SECTION & EMAIL NEWSLETTER PANEL */}
      <Footer onOpenContact={handleOpenContact} />

      {/* MODAL PROVISION POPUP */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </div>
  );
}
