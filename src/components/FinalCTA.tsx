import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { Phone, ArrowUpRight } from 'lucide-react';

interface FinalCTAProps {
  onOpenEnquiry: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="py-20 lg:py-28 bg-midnight text-white relative overflow-hidden text-center">
      {/* Background Subtle Lighting */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-champagne/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="h-[1px] w-8 bg-champagne" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne">
            Begin The Conversation
          </span>
          <span className="h-[1px] w-8 bg-champagne" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6 text-white"
        >
          Beautiful tables begin with thoughtful details.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-base sm:text-xl text-surface-400 font-normal max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Talk to Table Linens about your next hospitality, restaurant or event requirement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpenEnquiry()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-champagne hover:bg-champagne-light text-navy px-9 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-200 shadow-xl"
          >
            <span>Start an Enquiry</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={siteConfig.contact.phoneTel}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-navy-light hover:bg-surface-200 hover:text-navy text-white border border-navy-light px-8 py-4 rounded-full text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
          >
            <Phone className="w-4 h-4 text-champagne" />
            <span>Call {siteConfig.contact.phoneDisplay}</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};
