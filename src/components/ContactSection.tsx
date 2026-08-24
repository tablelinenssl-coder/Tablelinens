import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { EnquiryForm } from './EnquiryForm';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  selectedProduct?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedProduct }) => {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 bg-white border-t border-surface-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact Details & Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-[1px] w-6 bg-champagne" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne">
                Connect With Us
              </span>
            </div>

            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-medium text-navy leading-tight mb-3 sm:mb-4">
              Let's Create Something Beautiful for Your Table
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slateText-muted font-normal leading-relaxed mb-6 sm:mb-8">
              Looking for table linens for your hotel, restaurant, resort, event or hospitality business? Get in touch with us to discuss your requirements.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 w-full mb-8">
              
              {/* WhatsApp / Phone Direct Card */}
              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                href={`https://wa.me/${siteConfig.contact.whatsappRaw}?text=${encodeURIComponent(
                  'Hello Table Linens, I would like to enquire about your handcrafted table linens.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-pearl hover:bg-white border border-surface-300 rounded-2xl transition-all duration-200 group shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-surface-200 text-navy flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-slateText-muted">
                      Direct Messaging & WhatsApp
                    </div>
                    <div className="text-base font-semibold text-navy">
                      {siteConfig.contact.phoneDisplay}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-champagne group-hover:translate-x-1 transition-transform">
                  Message →
                </span>
              </motion.a>

              {/* Direct Phone Card */}
              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                href={siteConfig.contact.phoneTel}
                className="flex items-center justify-between p-4 bg-pearl hover:bg-white border border-surface-300 rounded-2xl transition-all duration-200 group shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-surface-200 text-navy flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-slateText-muted">
                      Telephone
                    </div>
                    <div className="text-base font-semibold text-navy">
                      {siteConfig.contact.phoneDisplay}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-champagne group-hover:translate-x-1 transition-transform">
                  Call Us →
                </span>
              </motion.a>

              {/* Direct Email Card */}
              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center justify-between p-4 bg-pearl hover:bg-white border border-surface-300 rounded-2xl transition-all duration-200 group shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-surface-200 text-navy flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-slateText-muted">
                      Email Inquiries
                    </div>
                    <div className="text-sm font-semibold text-navy break-all">
                      {siteConfig.contact.email}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-champagne group-hover:translate-x-1 transition-transform">
                  Email →
                </span>
              </motion.a>

              {/* Facebook Page Card */}
              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                href={siteConfig.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-pearl hover:bg-white border border-surface-300 rounded-2xl transition-all duration-200 group shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-surface-200 text-navy flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-champagne fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-slateText-muted">
                      Social & Updates
                    </div>
                    <div className="text-sm font-semibold text-navy">
                      Facebook Page
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-champagne group-hover:translate-x-1 transition-transform">
                  Visit →
                </span>
              </motion.a>

              {/* Office Address Card */}
              <div className="flex items-start gap-3.5 p-4 bg-pearl border border-surface-300 rounded-2xl shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-surface-200 text-navy flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-champagne" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slateText-muted">
                    Office & Workshop Location
                  </div>
                  <div className="text-sm font-semibold text-navy">
                    {siteConfig.contact.fullAddress}
                  </div>
                  <div className="text-xs text-slateText-muted mt-0.5 font-normal">
                    Visits & sample reviews by prior appointment
                  </div>
                </div>
              </div>

            </div>

            {/* Reassurance Badges */}
            <div className="grid grid-cols-2 gap-3 w-full pt-2">
              <div className="flex items-center gap-2 text-xs text-navy font-semibold">
                <Clock className="w-4 h-4 text-champagne" />
                <span>Prompt B2B Response</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-navy font-semibold">
                <ShieldCheck className="w-4 h-4 text-champagne" />
                <span>Custom Samples Available</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <EnquiryForm preselectedProduct={selectedProduct} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
