import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { Check, MessageCircle, Compass } from 'lucide-react';

interface MaldivesFeatureProps {
  onEnquire: (productName: string) => void;
}

export const MaldivesFeature: React.FC<MaldivesFeatureProps> = ({ onEnquire }) => {
  return (
    <section className="py-20 lg:py-28 bg-white border-y border-surface-200 relative overflow-hidden">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-champagne-light/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Compass className="w-3.5 h-3.5 text-champagne" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne">
                {siteConfig.maldivesFeature.eyebrow}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-navy mb-4">
              {siteConfig.maldivesFeature.headline}
            </h2>

            <p className="text-base sm:text-lg text-slateText-muted font-normal leading-relaxed mb-6">
              {siteConfig.maldivesFeature.body}
            </p>

            {/* Special Highlight Box */}
            <div className="bg-pearl p-6 sm:p-7 rounded-2xl border border-surface-300 shadow-sm mb-8 w-full">
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-champagne mb-2">
                Featured Specialty
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-navy font-medium mb-2">
                {siteConfig.maldivesFeature.highlightTitle}
              </h3>
              <p className="text-sm text-slateText-muted font-normal leading-relaxed mb-4">
                {siteConfig.maldivesFeature.highlightDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-surface-300">
                {siteConfig.maldivesFeature.bulletPoints.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slateText-main font-medium">
                    <Check className="w-3.5 h-3.5 text-champagne shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onEnquire('Maldives Resort Linen Inquiry')}
                className="bg-navy hover:bg-champagne hover:text-navy text-white px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-200 shadow-md text-center"
              >
                Inquire For Resort Supply
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/${siteConfig.contact.whatsappRaw}?text=${encodeURIComponent(
                  'Hello Table Linens, I would like to enquire about table linens and cutlery folders for resort and hospitality supply.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.16em] font-semibold transition-colors text-center shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Coordinator</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Luxury Ocean Resort Dining Imagery */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-surface-200 border-4 border-pearl">
              <img
                src={siteConfig.maldivesFeature.image}
                alt="Luxury resort dining table setting overlooking turquoise ocean waters"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-champagne-light block mb-1 font-semibold">
                  Resort Ready
                </span>
                <p className="font-serif text-lg sm:text-xl font-medium leading-snug">
                  Curated table textiles for beachfront, villa & open-air dining.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
