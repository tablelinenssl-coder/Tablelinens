import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { ArrowUpRight } from 'lucide-react';

interface HospitalitySectionProps {
  onEnquire: (sectorTitle: string) => void;
}

export const HospitalitySection: React.FC<HospitalitySectionProps> = ({ onEnquire }) => {
  return (
    <section id="hospitality" className="py-20 lg:py-28 bg-pearl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-18"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-champagne" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne">
              Industry Focus
            </span>
            <span className="h-[1px] w-6 bg-champagne" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-navy mb-4">
            Made for Hospitality
          </h2>

          <p className="text-base sm:text-lg text-slateText-muted font-normal leading-relaxed">
            From intimate dining rooms to busy hotel kitchens and guest experiences, our textiles are created to combine presentation, practicality and care.
          </p>
        </motion.div>

        {/* 4 Category Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.hospitalitySectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-surface-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-200">
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Sector Badge */}
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold text-navy shadow-xs">
                  {sector.badge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-navy font-medium group-hover:text-champagne transition-colors mb-2">
                    {sector.title}
                  </h3>
                  <p className="text-sm text-slateText-muted font-normal leading-relaxed mb-6">
                    {sector.description}
                  </p>
                </div>

                <button
                  onClick={() => onEnquire(`Hospitality Enquiry: ${sector.title}`)}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-navy group-hover:text-champagne transition-colors pt-2 border-t border-surface-300 w-full justify-between"
                >
                  <span>Enquire For {sector.title}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
