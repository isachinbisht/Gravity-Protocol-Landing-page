import React, { useState } from "react";
import { Menu, X, ChevronRight, MessageSquare, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#specifications" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact", action: onOpenContact },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, action?: () => void) => {
    e.preventDefault();
    if (action) {
      action();
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F9F8F3]/80 backdrop-blur-md border-b border-[#EAE8E2]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-charcoal group-hover:text-brand-green transition-colors">
              Gravity
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green"></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href, link.action)}
                className="text-sm font-medium text-brand-charcoal/70 hover:text-brand-charcoal transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-brand-green after:scale-x-0 hover:after:scale-x-100 after:origin-bottom-left after:transition-transform"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenContact}
              className="px-5 py-2 rounded-full text-sm font-medium bg-brand-green hover:bg-brand-green-hover text-white transition-colors shadow-sm cursor-pointer"
            >
              Launch App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-brand-charcoal/80 hover:text-brand-charcoal hover:bg-brand-sand/30 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-black/20 backdrop-blur-xs md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-30 w-full max-w-xs bg-[#F9F8F3] border-l border-[#EAE8E2] p-8 shadow-xl flex flex-col justify-between md:hidden"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-bold text-brand-charcoal">Gravity</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-brand-charcoal/80 hover:text-brand-charcoal hover:bg-brand-sand/30 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href, link.action)}
                      className="text-lg font-medium text-brand-charcoal/80 hover:text-brand-charcoal transition-colors py-1.5"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenContact();
                  }}
                  className="w-full py-3 rounded-full bg-brand-green hover:bg-brand-green-hover text-white font-medium transition-colors text-center block shadow-sm cursor-pointer"
                >
                  Launch App
                </button>
                <div className="text-center text-xs text-brand-charcoal/40">
                  © 2026 Gravity Protocol. All rights reserved.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
