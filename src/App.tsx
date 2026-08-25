import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { ProductCollection } from './components/ProductCollection';
import { CustomEmbroidery } from './components/CustomEmbroidery';
import { ContactSection } from './components/ContactSection';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize high-performance Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Global smooth click interceptor for all # anchor links with fixed header offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute('href');
        if (href && href.length > 1) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl as HTMLElement, { offset: -70, duration: 1.3 });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleEnquireTrigger = (productName?: string) => {
    if (productName) {
      setSelectedProduct(productName);
    }
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(contactEl as HTMLElement, { offset: -70, duration: 1.4 });
      } else {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-pearl text-navy selection:bg-champagne/20 selection:text-navy flex flex-col font-sans">
      {/* Sticky Navigation */}
      <Navbar onOpenEnquiry={() => handleEnquireTrigger()} />

      {/* Main Content */}
      <main className="flex-grow">
        <Hero onOpenEnquiry={() => handleEnquireTrigger()} />
        <BrandStory />
        <ProductCollection onEnquire={(product) => handleEnquireTrigger(product)} />
        <CustomEmbroidery onEnquire={(product) => handleEnquireTrigger(product)} />
        <ContactSection selectedProduct={selectedProduct} />
      </main>

      {/* Smooth Scroll To Top Button with Circular Progress Ring */}
      <ScrollToTop onScrollTop={handleScrollToTop} />


      {/* Luxury Footer */}
      <Footer />
    </div>
  );
};

export default App;
