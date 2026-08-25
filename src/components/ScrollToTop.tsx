import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  onScrollTop: () => void;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ onScrollTop }) => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setScrollProgress(progress);
          setVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          whileHover={{ scale: 1.1, backgroundColor: '#0F172A' }}
          whileTap={{ scale: 0.9 }}
          onClick={onScrollTop}
          className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-navy/90 backdrop-blur-md text-white shadow-xl border border-white/20 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-champagne cursor-pointer"
          aria-label="Scroll smoothly to top of page"
        >
          {/* Circular progress SVG */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="rgba(197, 155, 95, 0.25)"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="#C59B5F"
              strokeWidth="2"
              strokeDasharray={131.95}
              strokeDashoffset={131.95 - (131.95 * scrollProgress) / 100}
              strokeLinecap="round"
              className="transition-all duration-150 ease-out"
            />
          </svg>

          <ArrowUp className="w-4 h-4 text-champagne group-hover:text-white transition-colors duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
