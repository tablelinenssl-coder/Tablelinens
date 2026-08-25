import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: (productName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Zero-overhead active section tracking with IntersectionObserver
    const ids = ['about', 'collection', 'embroidery', 'contact'];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { rootMargin: '-20% 0px -60% 0px' }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const goto = (href: string) => {
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Champagne scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-champagne-dark via-champagne to-champagne-light z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 shadow-md border-b border-surface-200 py-3'
            : 'bg-pearl/90 border-b border-surface-200/40 py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <motion.a
            href="#hero"
            onClick={e => { e.preventDefault(); goto('#hero'); }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl tracking-tight text-navy font-semibold leading-none">
              {siteConfig.brand.name}
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.navLinks.map((link, i) => {
              const key = link.href.replace('#', '');
              const active = activeSection === key;
              return (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.2 }}
                  href={link.href}
                  onClick={e => { e.preventDefault(); goto(link.href); }}
                  className="relative text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors py-1"
                  style={{ color: active ? '#C59B5F' : '#1E293B' }}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-champagne rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#C59B5F', color: '#0F172A' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-1.5 bg-navy text-white text-[11px] uppercase tracking-[0.2em] font-bold px-6 py-2.5 rounded-full shadow-sm transition-colors duration-200"
            >
              Enquire
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-white border-b border-surface-200 shadow-xl"
            >
              <div className="px-6 py-6 space-y-4">
                {siteConfig.navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                    href={link.href}
                    onClick={e => { e.preventDefault(); goto(link.href); }}
                    className="block font-serif text-xl text-navy hover:text-champagne transition-colors font-medium"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  onClick={() => { setMobileMenuOpen(false); onOpenEnquiry(); }}
                  className="w-full mt-4 bg-navy text-white py-3 px-6 rounded-full text-xs uppercase tracking-[0.22em] font-bold hover:bg-champagne hover:text-navy transition-colors"
                >
                  Start an Enquiry
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
