import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';

export const CraftProcess: React.FC = () => {
  return (
    <section id="process" className="py-20 lg:py-28 bg-white border-y border-surface-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-champagne" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne">
              The Journey
            </span>
            <span className="h-[1px] w-6 bg-champagne" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-navy mb-4">
            From Fabric to Finished Detail
          </h2>

          <p className="text-base sm:text-lg text-slateText-muted font-normal leading-relaxed">
            Our straightforward 4-step craft process ensures every table linen meets the exact standards of your establishment.
          </p>
        </motion.div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {siteConfig.process.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="relative flex flex-col bg-pearl p-8 rounded-2xl border border-surface-300 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Step Number */}
              <div className="font-serif text-3xl sm:text-4xl font-medium text-champagne mb-6 flex items-center justify-between">
                <span>{step.step}</span>
                <span className="text-xs font-sans uppercase tracking-widest text-slateText-muted font-semibold">
                  Step 0{idx + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl text-navy font-medium mb-3 group-hover:text-champagne transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slateText-muted font-normal leading-relaxed">
                {step.description}
              </p>

              {/* Bottom Indicator */}
              <div className="mt-8 pt-4 border-t border-surface-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-champagne" />
                <span className="text-[11px] uppercase tracking-wider text-slateText-muted font-medium">
                  Craft Phase {step.step}
                </span>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};
