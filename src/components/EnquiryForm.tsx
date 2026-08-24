import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import type { EnquiryFormData } from '../types';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EnquiryFormProps {
  preselectedProduct?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ preselectedProduct }) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    productInterest: 'Table Napkins / Serviettes',
    message: '',
    withCustomLogo: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Update selected product when prop changes
  useEffect(() => {
    if (preselectedProduct) {
      const match = siteConfig.productOptions.find(
        (opt) =>
          preselectedProduct.toLowerCase().includes(opt.toLowerCase()) ||
          opt.toLowerCase().includes(preselectedProduct.toLowerCase())
      );
      setFormData((prev) => ({
        ...prev,
        productInterest: match || 'Other',
        message: prev.message || `Hi, I am interested in getting more information regarding ${preselectedProduct}.`,
      }));
    }
  }, [preselectedProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      setErrorMsg('Please provide either an email or phone number so we can contact you.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-surface-300 shadow-xl relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-10 space-y-5"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>
            <h3 className="font-serif text-3xl text-navy font-medium">
              Thank You for Your Enquiry
            </h3>
            <p className="text-slateText-muted max-w-md mx-auto text-sm sm:text-base leading-relaxed font-normal">
              We have received your details. Our team in Hokandara will review your hospitality specifications and reach out to you promptly.
            </p>

            <div className="pt-4 flex items-center justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    productInterest: 'Table Napkins',
                    message: '',
                    withCustomLogo: false,
                  });
                }}
                className="inline-flex items-center justify-center bg-navy hover:bg-champagne hover:text-navy text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-colors shadow-sm"
              >
                Submit Another Request
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="border-b border-surface-200 pb-4">
              <h3 className="font-serif text-2xl sm:text-3xl text-navy font-medium">
                Direct Hospitality Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-slateText-muted mt-1 font-normal">
                Fill in your requirements below for quick pricing and sample coordination.
              </p>
            </div>

            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2 font-medium"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* Row 1: Name & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wider font-semibold text-navy mb-2">
                  Your Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ruwan Silva"
                  className="w-full px-4 py-3 bg-pearl border border-surface-300 rounded-xl text-sm text-navy placeholder:text-slateText-light focus:bg-white focus:border-champagne transition-colors"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-xs uppercase tracking-wider font-semibold text-navy mb-2">
                  Company / Hotel / Restaurant
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Ceylon Palm Resort"
                  className="w-full px-4 py-3 bg-pearl border border-surface-300 rounded-xl text-sm text-navy placeholder:text-slateText-light focus:bg-white focus:border-champagne transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold text-navy mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tablelinen.sl@gmail.com"
                  className="w-full px-4 py-3 bg-pearl border border-surface-300 rounded-xl text-sm text-navy placeholder:text-slateText-light focus:bg-white focus:border-champagne transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-semibold text-navy mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="072 378 5565"
                  className="w-full px-4 py-3 bg-pearl border border-surface-300 rounded-xl text-sm text-navy placeholder:text-slateText-light focus:bg-white focus:border-champagne transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Product Interest Dropdown */}
            <div>
              <label htmlFor="productInterest" className="block text-xs uppercase tracking-wider font-semibold text-navy mb-2">
                What are you looking for? (Product Interest)
              </label>
              <Select
                value={formData.productInterest}
                onValueChange={(val) => setFormData((prev) => ({ ...prev, productInterest: val }))}
                placeholder="Select product interest"
                className="w-full"
              >
                <SelectTrigger id="productInterest">
                  <SelectValue placeholder="Select product interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Hospitality Textiles</SelectLabel>
                    {siteConfig.productOptions.map((opt) => (
                      <SelectItem key={opt} value={opt} id={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Checkbox for Embroidery */}
            <div className="flex items-center gap-3 p-3.5 bg-pearl rounded-xl border border-surface-300">
              <input
                type="checkbox"
                id="withCustomLogo"
                name="withCustomLogo"
                checked={formData.withCustomLogo}
                onChange={handleChange}
                className="w-4 h-4 rounded text-champagne focus:ring-champagne accent-champagne cursor-pointer"
              />
              <label htmlFor="withCustomLogo" className="text-xs text-navy font-semibold cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne shrink-0" />
                <span>Require custom logo embroidery / monogramming for our business</span>
              </label>
            </div>

            {/* Row 4: Message */}
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold text-navy mb-2">
                Message / Specific Requirements
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your table dimensions, estimated quantities, or special requests..."
                className="w-full px-4 py-3 bg-pearl border border-surface-300 rounded-xl text-sm text-navy placeholder:text-slateText-light focus:bg-white focus:border-champagne transition-colors resize-none"
              />
            </div>

            {/* Submit Actions */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01, backgroundColor: '#C59B5F', color: '#0F172A' }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-navy text-white py-4 px-8 rounded-full text-xs uppercase tracking-[0.22em] font-bold transition-colors duration-200 shadow-lg"
              >
                <span>Send Enquiry</span>
                <Send className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            <div className="text-center text-[11px] text-slateText-muted pt-1">
              No account required. We will respond directly via phone or email.
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
