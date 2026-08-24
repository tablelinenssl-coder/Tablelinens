import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import type { GalleryItem } from '../types';
import { X, ZoomIn } from 'lucide-react';

export const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = [
    'All',
    'Table Napkins',
    'Table Runners',
    'Table Cloths',
    'Cutlery Serviettes',
    'Aprons',
    'Custom Embroidery',
  ];

  const filteredItems =
    filter === 'All'
      ? siteConfig.gallery
      : siteConfig.gallery.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-pearl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-champagne" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne">
              Visual Narrative
            </span>
            <span className="h-[1px] w-6 bg-champagne" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-navy mb-4">
            Textile Details & Atmospheres
          </h2>

          <p className="text-base sm:text-lg text-slateText-muted font-normal leading-relaxed">
            An editorial look into our handcrafted fabrics, table settings, and bespoke embroidery.
          </p>
        </motion.div>

        {/* Gallery Filter Chips with layoutId Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-semibold transition-colors duration-200 ${
                filter === cat
                  ? 'text-white'
                  : 'bg-white text-slateText-muted hover:bg-surface-200 hover:text-navy border border-surface-300'
              }`}
            >
              {filter === cat && (
                <motion.div
                  layoutId="activeGalleryFilter"
                  className="absolute inset-0 bg-navy rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Responsive Grid with Layout Animation */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => {
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="group relative overflow-hidden rounded-2xl bg-surface-200 cursor-pointer border border-surface-300 shadow-sm hover:shadow-xl transition-shadow duration-300 aspect-[4/3]"
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/images/story-craft.jpg';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Dark Overlay Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                  {/* Hover Details */}
                  <div className="absolute bottom-0 inset-x-0 p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-widest text-champagne-light font-semibold">
                        {item.category}
                      </span>
                      <ZoomIn className="w-4 h-4 text-white/80" />
                    </div>
                    <h4 className="font-serif text-lg text-white font-medium">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Animated Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-midnight/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-surface-300"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-navy/80 hover:bg-navy text-white flex items-center justify-center transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/10] bg-navy overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.alt}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/images/story-craft.jpg';
                  }}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6 bg-white flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-champagne font-semibold">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-serif text-2xl text-navy font-medium mt-1">
                    {selectedImage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-xs uppercase tracking-wider text-slateText-muted hover:text-navy font-semibold"
                >
                  Close (ESC)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
