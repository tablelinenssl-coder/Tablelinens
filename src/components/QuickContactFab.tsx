import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { MessageCircle, Phone } from 'lucide-react';

export const QuickContactFab: React.FC = () => {
  return (
    <aside aria-label="Quick contact options" className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Floating Action Button */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        href={`https://wa.me/${siteConfig.contact.whatsappRaw}?text=${encodeURIComponent(
          'Hello Table Linens, I would like to enquire about your handcrafted table linens.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Inquiry"
        className="w-13 h-13 p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl flex items-center justify-center border-2 border-white focus:outline-none focus:ring-4 focus:ring-emerald-300"
        title="Chat on WhatsApp (+94723785565)"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      {/* Phone Floating Action Button (Visible on mobile/tablets) */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
        href={siteConfig.contact.phoneTel}
        aria-label="Call Table Linens"
        className="sm:hidden w-12 h-12 p-3 bg-navy hover:bg-champagne hover:text-navy text-white rounded-full shadow-2xl flex items-center justify-center border-2 border-white focus:outline-none"
        title="Call 072 378 5565"
      >
        <Phone className="w-5 h-5" />
      </motion.a>
    </aside>
  );
};
