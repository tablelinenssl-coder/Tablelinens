import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { ChevronRight } from 'lucide-react';

interface HeroProps { onOpenEnquiry: () => void; }

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.75, delay: d, ease: [0.16, 1, 0.3, 1] } }),
};

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  const goto = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-midnight">
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: yImg }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Luxury hotel dining table setting"
          className="w-full h-full object-cover object-center scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/92 via-midnight/70 to-midnight/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
      </motion.div>

      {/* Animated grain texture overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
      />

      {/* Main content */}
      <motion.div
        style={{ y: yText, opacity: opacityHero }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pt-24 sm:pt-28 pb-16 sm:pb-20 w-full"
      >
        <div className="max-w-3xl">

          {/* Headline with character-level stagger effect */}
          <div className="overflow-hidden mb-2 sm:mb-3">
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={0.2}
              className="font-serif text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium text-white leading-[1.06] sm:leading-[1.04] tracking-tight"
            >
              Handcrafted
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2 sm:mb-3">
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={0.35}
              className="font-serif text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium italic text-champagne leading-[1.06] sm:leading-[1.04] tracking-tight"
            >
              with Care.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6 sm:mb-10">
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={0.48}
              className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal text-white/70 leading-[1.15] sm:leading-[1.1] tracking-tight"
            >
              Made for Exceptional Tables.
            </motion.h1>
          </div>

          {/* Supporting line */}
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={0.6}
            className="text-sm sm:text-base md:text-lg text-white/75 font-normal leading-relaxed max-w-xl mb-8 sm:mb-10"
          >
            {siteConfig.brand.supportingLine}
          </motion.p>

          {/* Value chips */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0.72}
            className="flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-2.5 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-white/10"
          >
            {['With or Without Embroidered Logos', 'Hotels, Resorts & Restaurants', 'Tailored Sizing & Hems'].map(chip => (
              <span key={chip} className="flex items-center gap-2 text-xs text-white/70 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne inline-block shrink-0" />
                <span>{chip}</span>
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0.82}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: '#DFC08C' }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-champagne text-navy font-bold text-xs uppercase tracking-[0.22em] px-8 py-4 rounded-full shadow-xl transition-colors duration-200 cursor-pointer"
            >
              <span>Enquire Now</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => goto('#collection')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs uppercase tracking-[0.2em] px-7 py-4 rounded-full backdrop-blur-sm transition-colors duration-200 cursor-pointer"
            >
              <span>Explore Collection</span>
            </motion.button>

          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/40 font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2.5 rounded-full bg-champagne" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient blend */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-pearl to-transparent z-10 pointer-events-none" />
    </section>
  );
};
