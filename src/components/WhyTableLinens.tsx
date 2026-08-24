import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Scissors, Hotel, Utensils } from 'lucide-react';

export const WhyTableLinens: React.FC = () => {
  const features = [
    {
      id: 'handcrafted',
      title: 'Handcrafted with Care',
      description: 'Every piece is created with attention to detail and presentation.',
      icon: Sparkles,
      tag: 'Artisanal Standard',
    },
    {
      id: 'embroidery',
      title: 'Custom Embroidery',
      description: 'Add your brand identity through embroidered logos and personalized details.',
      icon: Scissors,
      tag: 'Bespoke Branding',
    },
    {
      id: 'hospitality',
      title: 'Hospitality Ready',
      description: 'Designed with hotels, restaurants, resorts and hospitality environments in mind.',
      icon: Hotel,
      tag: 'Commercial Durability',
    },
    {
      id: 'tables',
      title: 'Made for Beautiful Tables',
      description: 'Practical textiles with a refined visual character.',
      icon: Utensils,
      tag: 'Elevated Dining',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-pearl relative overflow-hidden">
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
              The Standard
            </span>
            <span className="h-[1px] w-6 bg-champagne" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-navy mb-4">
            Why Table Linens
          </h2>

          <p className="text-base sm:text-lg text-slateText-muted font-normal leading-relaxed">
            Thoughtful textile solutions crafted specifically to elevate hospitality dining spaces.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white p-8 rounded-2xl border border-surface-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-surface-100 group-hover:bg-navy text-navy group-hover:text-champagne flex items-center justify-center mb-6 transition-colors duration-300 border border-surface-300">
                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                  </div>

                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-champagne mb-2">
                    {item.tag}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-navy font-medium mb-3 group-hover:text-champagne transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slateText-muted font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-surface-200 flex items-center justify-between text-[11px] text-slateText-muted font-mono">
                  <span>Pillar 0{index + 1}</span>
                  <span className="text-champagne font-bold">✦</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
