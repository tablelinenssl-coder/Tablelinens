import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-midnight text-white pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-navy-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-10 sm:pb-14 border-b border-navy-light">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="font-serif text-2xl sm:text-3xl tracking-tight text-white mb-1 font-semibold">
              {siteConfig.brand.name}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-champagne font-semibold mb-3 sm:mb-4">
              {siteConfig.brand.tagline}
            </span>
            <p className="text-xs sm:text-sm text-surface-400 font-normal leading-relaxed max-w-sm mb-5 sm:mb-6">
              {siteConfig.brand.description}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-light text-[10px] sm:text-[11px] text-surface-300 border border-navy-light font-medium">
              <span>Hospitality Linen & Textile Supplier</span>
            </div>
          </div>

          {/* Quick Navigation Col */}
          <div className="lg:col-span-3">
            <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-champagne mb-3 sm:mb-4">
              Explore
            </div>
            <ul className="space-y-2 sm:space-y-2.5">
              {siteConfig.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-xs sm:text-sm text-surface-400 hover:text-white transition-colors flex items-center gap-2 font-medium py-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-champagne inline-block" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Col */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-champagne mb-3 sm:mb-4">
              Connect
            </div>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-surface-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span className="font-normal">{siteConfig.contact.fullAddress}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-champagne shrink-0" />
                <a
                  href={siteConfig.contact.phoneTel}
                  className="hover:text-white transition-colors font-medium"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-champagne shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors break-all font-medium"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-champagne shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <a
                  href={siteConfig.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-surface-500 gap-3 text-center sm:text-left">
          <p>© {siteConfig.brand.year} {siteConfig.brand.name}. All rights reserved.</p>
          <p className="font-normal text-surface-500">
            Handcrafted with Care in Hokandara, Sri Lanka.
          </p>
        </div>

      </div>
    </footer>
  );
};
