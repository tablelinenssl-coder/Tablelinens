import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { cdnImage } from '../lib/assets';
import { Check, ArrowRight, Scissors, Hotel, Utensils, ShieldCheck } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yLeft = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const yRight = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  const goto = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const pillars = [
    { icon: Scissors, label: 'Custom Embroidery', desc: 'Hotel crests & restaurant logos stitched with precision' },
    { icon: Hotel, label: 'Hospitality Ready', desc: 'For hotels, resorts, cafés, catering & events' },
    { icon: Utensils, label: 'Beautiful Tables', desc: 'Napkins, runners, cloths & cutlery serviettes' },
    { icon: ShieldCheck, label: 'Quality Tested', desc: 'Resilient fabrics for high-turnover hospitality dining' },
  ];

  return (
    <section id="about" ref={ref} className="py-24 lg:py-36 bg-pearl overflow-hidden relative">
      {/* Subtle architectural pattern background */}
      <div className="absolute inset-0 architectural-pattern opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left: Image with parallax */}
          <motion.div style={{ y: yLeft }} className="relative will-change-transform">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] bg-surface-200">
              <img
                src={cdnImage('story-craft.jpg')}
                alt="Handcrafted table linen craftsmanship in Sri Lanka"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                loading="lazy" decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-8 bg-white rounded-2xl shadow-2xl p-3.5 sm:p-5 border border-surface-200 max-w-[180px] sm:max-w-[220px] z-10"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-champagne" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-champagne font-bold">Artisanal Care</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slateText-muted font-normal leading-relaxed">
                Every hem, corner, and stitch finished with meticulous attention.
              </p>
            </motion.div>

            {/* Floating badge top-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, type: 'spring', stiffness: 300 }}
              className="absolute -top-4 -left-2 sm:-top-5 sm:-left-6 bg-navy text-white rounded-2xl p-3 sm:p-4 shadow-xl z-10"
            >
              <div className="font-serif text-xl sm:text-2xl font-medium text-champagne leading-none">100%</div>
              <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-surface-400 mt-0.5 sm:mt-1 font-medium">Handcrafted</div>
            </motion.div>
          </motion.div>

          {/* Right: Text content with parallax */}
          <motion.div style={{ y: yRight }} className="flex flex-col items-start will-change-transform">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-5">
                <span className="h-[1.5px] w-8 sm:w-10 bg-champagne" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-bold text-champagne">
                  {siteConfig.story.eyebrow}
                </span>
              </div>

              <h2 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-medium text-navy leading-[1.08] sm:leading-[1.06] mb-5 sm:mb-6">
                {siteConfig.story.headline}
              </h2>

              <div className="space-y-3 sm:space-y-4 text-slateText-muted text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-6 sm:mb-8">
                <p>{siteConfig.story.paragraph1}</p>
                <p>{siteConfig.story.paragraph2}</p>
              </div>
            </motion.div>

            {/* Feature pillars grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3 mb-8 sm:mb-10 w-full">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(15,23,42,0.1)' }}
                    className="bg-white p-3.5 sm:p-4 rounded-2xl border border-surface-200 shadow-xs transition-shadow"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-champagne mb-2 stroke-[1.5]" />
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-bold text-navy mb-0.5 sm:mb-1">{pillar.label}</div>
                    <p className="text-[11px] sm:text-xs text-slateText-muted font-normal leading-relaxed">{pillar.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Craft features list */}
            <div className="grid grid-cols-1 gap-2 w-full mb-10">
              {siteConfig.story.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.07 * i, duration: 0.45 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-champagne/15 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-champagne" />
                  </div>
                  <span className="text-sm text-navy font-medium">{f}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: '#C59B5F', color: '#0F172A' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => goto('#collection')}
              className="inline-flex items-center gap-3 bg-navy text-white px-7 py-3.5 rounded-full text-[11px] uppercase tracking-[0.22em] font-bold transition-colors duration-200 shadow-md group"
            >
              Discover Our Collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
