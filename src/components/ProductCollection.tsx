import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';
import { X, ArrowUpRight, Check } from 'lucide-react';

interface ProductCollectionProps {
  onEnquire: (productName: string) => void;
}

const CATEGORIES = ['All', 'Dining Linens', 'Table Presentation', 'Service & Hospitality'];

export const ProductCollection: React.FC<ProductCollectionProps> = ({ onEnquire }) => {
  const [active, setActive] = useState('All');
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const filtered =
    active === 'All'
      ? siteConfig.products
      : siteConfig.products.filter((p) => p.category === active);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setViewingProduct(null);
      }
    };
    if (viewingProduct) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [viewingProduct]);

  const handleEnquireFromModal = (productName: string) => {
    setViewingProduct(null);
    onEnquire(productName);
  };

  return (
    <section id="collection" className="py-20 sm:py-24 lg:py-36 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="h-[1.5px] w-6 sm:w-8 bg-champagne" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-bold text-champagne">
              Curated Catalog
            </span>
            <span className="h-[1.5px] w-6 sm:w-8 bg-champagne" />
          </div>
          <h2 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-medium text-navy mb-3 sm:mb-4">
            Our Collection
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slateText-muted font-normal leading-relaxed">
            Handcrafted table linens and hospitality textiles, tailored for dining excellence.
          </p>
        </motion.div>

        {/* Filter tabs with spring pill */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-bold transition-colors duration-200 cursor-pointer ${
                active === cat
                  ? 'text-white'
                  : 'text-slateText-muted hover:text-navy bg-surface-100 border border-surface-300'
              }`}
            >
              {active === cat && (
                <motion.div
                  layoutId="catPill"
                  className="absolute inset-0 bg-navy rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
              <span className="relative z-10">
                {cat === 'All' ? `All (0${siteConfig.products.length})` : cat}
              </span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                onEnquire={onEnquire}
                onView={(p) => setViewingProduct(p)}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 sm:mt-16 bg-midnight rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-2xl overflow-hidden relative"
        >
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-champagne/15 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-1.5 sm:mb-2">
              Need custom dimensions or bulk supply?
            </h3>
            <p className="text-xs sm:text-sm text-surface-400 font-normal max-w-xl">
              We work directly with hotel procurement teams, architects, and event planners to tailor linen specifications.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: '#DFC08C' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onEnquire('General Collection Enquiry')}
              className="w-full sm:w-auto bg-champagne text-navy px-7 sm:px-8 py-3.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold transition-colors shadow-lg cursor-pointer"
            >
              Request Catalog
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* Interactive High-Resolution Product Lightbox Modal */}
      <AnimatePresence>
        {viewingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-midnight/90 backdrop-blur-md flex items-center justify-center p-3.5 sm:p-6 lg:p-8"
            onClick={() => setViewingProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative max-w-4xl w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-surface-300 grid grid-cols-1 md:grid-cols-2 max-h-[92vh] md:max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setViewingProduct(null)}
                className="absolute top-3.5 right-3.5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-navy/80 hover:bg-navy text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Modal Left: High-Resolution Image */}
              <div className="relative bg-surface-100 aspect-[4/3] sm:aspect-square md:aspect-auto max-h-64 sm:max-h-80 md:max-h-none overflow-hidden">
                <img
                  src={viewingProduct.image}
                  alt={viewingProduct.altText}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full border border-surface-200 shadow-sm">
                  <span className="font-serif text-[11px] sm:text-xs font-semibold text-navy">
                    {viewingProduct.number}
                  </span>
                </div>
                <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 bg-navy/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-2.5 sm:px-3 py-1 rounded-full">
                  {viewingProduct.category}
                </div>
              </div>

              {/* Modal Right: Detailed Product Information & CTA */}
              <div className="p-5 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
                <div>
                  {viewingProduct.subtitle && (
                    <div className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.25em] text-champagne font-bold mb-1.5 sm:mb-2">
                      {viewingProduct.subtitle}
                    </div>
                  )}
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-navy font-medium mb-2.5 sm:mb-3 leading-tight">
                    {viewingProduct.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slateText-muted leading-relaxed mb-5 sm:mb-6">
                    {viewingProduct.description}
                  </p>

                  <div className="mb-5 sm:mb-6">
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-navy mb-2 sm:mb-2.5">
                      Tailoring & Craft Specifications
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      {viewingProduct.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 sm:gap-2.5 text-xs text-slateText-main">
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-champagne/15 flex items-center justify-center shrink-0">
                            <Check className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-champagne" />
                          </div>
                          <span className="text-xs sm:text-sm">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-surface-100 border border-surface-200 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs text-navy font-semibold mb-5 sm:mb-6">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-champagne shrink-0" />
                    <span>{viewingProduct.customization}</span>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-surface-200">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#C59B5F', color: '#0F172A' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEnquireFromModal(viewingProduct.name)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-navy text-white py-3 sm:py-3.5 px-6 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.18em] font-bold transition-colors duration-200 shadow-md cursor-pointer"
                  >
                    <span>Enquire About This Product</span>
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
