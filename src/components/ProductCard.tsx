import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import { ArrowUpRight, ZoomIn } from 'lucide-react';
import { cdnImage } from '../lib/assets';

interface ProductCardProps {
  product: Product;
  onEnquire: (productName: string) => void;
  onView?: (product: Product) => void;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEnquire,
  onView,
  index,
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-surface-200 shadow-sm hover:shadow-2xl transition-shadow duration-400"
    >
      {/* Image Container with View / Zoom Click */}
      <div
        onClick={() => onView?.(product)}
        className="relative aspect-[4/3] overflow-hidden bg-surface-200 cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`View larger image of ${product.name}`}
      >
        {/* Placeholder skeleton before load */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-surface-200 via-surface-100 to-surface-200 animate-pulse" />
        )}
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          src={product.image}
          alt={product.altText}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('table-napkins.jpg')) {
              target.src = cdnImage('table-napkins.jpg');
            }
            setIsLoaded(true);
          }}
          className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full border border-surface-200 shadow-sm">
          <span className="font-serif text-[11px] font-semibold text-navy">{product.number}</span>
        </div>
        <div className="absolute top-3.5 right-3.5 bg-navy/90 backdrop-blur-sm text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
          {product.category}
        </div>

        {/* Hover Zoom Prompt */}
        <div className="absolute inset-0 bg-navy/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 bg-white/95 text-navy px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <ZoomIn className="w-3.5 h-3.5 text-champagne" />
            <span>View Image</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div>
          {product.subtitle && (
            <div className="text-[9.5px] uppercase tracking-[0.22em] text-champagne font-bold mb-1">
              {product.subtitle}
            </div>
          )}
          <h3
            onClick={() => onView?.(product)}
            className="font-serif text-xl text-navy font-medium group-hover:text-champagne transition-colors leading-tight mb-2 cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="text-sm text-slateText-muted font-normal leading-relaxed mb-4">
            {product.description}
          </p>
          <div className="space-y-1.5 mb-4">
            {product.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slateText-main">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 bg-surface-100 border border-surface-200 px-3 py-1.5 rounded-lg text-[10px] text-navy mb-3.5 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne shrink-0" />
          With or Without Embroidered Logo
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button
            type="button"
            onClick={() => onView?.(product)}
            className="inline-flex items-center justify-center gap-1.5 bg-surface-100 hover:bg-surface-200 text-navy border border-surface-300 py-2.5 px-3 rounded-xl text-[11px] uppercase tracking-[0.14em] font-bold transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5 text-champagne" />
            <span>Preview</span>
          </button>

          <motion.button
            whileHover={{ backgroundColor: '#0F172A', color: '#ffffff' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onEnquire(product.name)}
            className="inline-flex items-center justify-center gap-1.5 bg-navy text-white hover:bg-champagne hover:text-navy py-2.5 px-3 rounded-xl text-[11px] uppercase tracking-[0.14em] font-bold transition-colors shadow-xs group/btn"
          >
            <span>Enquire</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
