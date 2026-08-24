import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { Scissors, Check, ArrowRight } from 'lucide-react';

interface CustomEmbroideryProps {
  onEnquire: (productName: string) => void;
}

export const CustomEmbroidery: React.FC<CustomEmbroideryProps> = ({ onEnquire }) => {
  const [activeTab, setActiveTab] = useState<'with' | 'without'>('with');

  return (
    <section id="embroidery" className="py-20 lg:py-28 bg-midnight text-white relative overflow-hidden">
      
      {/* Background Accent Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-champagne/15 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy-subtle/30 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      {/* Decorative Thread-like Animated SVG Line */}
      <div className="absolute inset-x-0 top-12 opacity-30 pointer-events-none overflow-hidden">
        <svg className="w-full h-12" viewBox="0 0 1200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            d="M0 24 Q 150 48, 300 24 T 600 24 T 900 24 T 1200 24"
            stroke="#C59B5F"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-champagne" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne">
              {siteConfig.embroidery.eyebrow}
            </span>
            <span className="h-[1px] w-6 bg-champagne" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-5 text-white">
            {siteConfig.embroidery.headline}
          </h2>

          <p className="text-base sm:text-lg text-surface-400 font-normal leading-relaxed max-w-2xl mx-auto">
            {siteConfig.embroidery.body}
          </p>

          {/* Interactive Option Toggle */}
          <div className="mt-6 sm:mt-8 inline-flex flex-col xs:flex-row p-1.5 rounded-2xl xs:rounded-full bg-navy-light/80 border border-navy-light relative shadow-inner w-full xs:w-auto max-w-md">
            <button
              onClick={() => setActiveTab('with')}
              className={`relative px-4 sm:px-6 py-2.5 rounded-xl xs:rounded-full text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold transition-colors duration-200 cursor-pointer ${
                activeTab === 'with' ? 'text-navy font-bold' : 'text-surface-400 hover:text-white'
              }`}
            >
              {activeTab === 'with' && (
                <motion.div
                  layoutId="embroideryTabPill"
                  className="absolute inset-0 bg-champagne rounded-xl xs:rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">With Embroidered Logo</span>
            </button>

            <button
              onClick={() => setActiveTab('without')}
              className={`relative px-4 sm:px-6 py-2.5 rounded-xl xs:rounded-full text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold transition-colors duration-200 cursor-pointer ${
                activeTab === 'without' ? 'text-navy font-bold' : 'text-surface-400 hover:text-white'
              }`}
            >
              {activeTab === 'without' && (
                <motion.div
                  layoutId="embroideryTabPill"
                  className="absolute inset-0 bg-champagne rounded-xl xs:rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">Without Logo (Minimalist)</span>
            </button>
          </div>
        </motion.div>

        {/* Split Screen Showcase with AnimatePresence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Image Preview */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/10] bg-navy border border-navy-light"
              >
                <img
                  src={
                    activeTab === 'with'
                      ? '/images/embroidery-with-logo.jpg'
                      : '/images/embroidery-without-logo.jpg'
                  }
                  alt={
                    activeTab === 'with'
                      ? 'Close-up of precise logo embroidery stitched on hospitality table linen'
                      : 'Pristine minimalist unbranded linen napkin in natural beige'
                  }
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/images/story-craft.jpg';
                  }}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />

                {/* In-Image Tag */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-champagne-light block mb-1 font-semibold">
                      {activeTab === 'with' ? 'Custom Monogram & Logo Service' : 'Natural Fabric Purity'}
                    </span>
                    <span className="font-serif text-lg font-medium">
                      {activeTab === 'with' ? 'Precision Stitched Brand Identity' : 'Understated Clean Finish'}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-champagne/20 backdrop-blur-md border border-champagne/40 flex items-center justify-center shrink-0">
                    <Scissors className="w-4 h-4 text-champagne" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Detailed Explanation & Customization Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-light border border-navy-light text-[11px] uppercase tracking-widest text-champagne mb-4 font-semibold">
              <span>{activeTab === 'with' ? 'Signature Branding' : 'Timeless Simplicity'}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug mb-4 text-white">
              {activeTab === 'with'
                ? 'Elevate Guest Perception with Bespoke Embroidery'
                : 'Classic Understated Elegance for Any Theme'}
            </h3>

            <p className="text-surface-400 font-normal text-base leading-relaxed mb-6">
              {activeTab === 'with'
                ? 'From boutique hotel emblems and resort crests to contemporary restaurant typography, our embroidery delivers clean, durable, colorfast detailing tailored precisely for repeated commercial laundry cycles.'
                : 'For establishments favoring clean lines, natural organic weaves, and flexible seasonal settings, our unbranded handcrafted linens provide pure tactile warmth and timeless aesthetic harmony.'}
            </p>

            {/* Feature List */}
            <div className="space-y-3 mb-8 w-full">
              {(activeTab === 'with'
                ? [
                    'Embroidery placement tailored to your preferred napkin fold',
                    'High-tenacity, colorfast threads resistant to hospitality washing',
                    'Works across napkins, cutlery folders, runners, and aprons',
                    'Digital proofing before batch embroidery production',
                  ]
                : [
                    'Pure focus on fabric weave texture and natural linen drape',
                    'Versatile for alternating event themes and table setups',
                    'Available in pure linen, cotton blends, and poly-cotton',
                    'Hand-finished hemstitching and tailored mitred corners',
                  ]
              ).map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-navy-light border border-navy-light flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-champagne" />
                  </div>
                  <span className="text-sm text-surface-200 font-normal">{point}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onEnquire('Custom Embroidery')}
                className="inline-flex items-center justify-center gap-3 bg-champagne hover:bg-champagne-light text-navy px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-200 shadow-lg"
              >
                <span>Discuss Customisation</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
