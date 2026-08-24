import { supabase } from '../lib/supabase';
import type { EnquiryFormData } from '../types';

export interface SubmitEnquiryResult {
  success: boolean;
  enquiryId?: string;
  message?: string;
  error?: string;
}

const EDGE_FUNCTION_URL =
  import.meta.env.VITE_SUPABASE_FUNCTION_URL ||
  'https://rmtrdiazwgyumeszvwdj.supabase.co/functions/v1/send-enquiry';

export async function submitEnquiry(formData: EnquiryFormData): Promise<SubmitEnquiryResult> {
  try {
    // 1. Try submitting via the Supabase Edge Function (handles database persistence + Resend mailing)
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name.trim(),
        company: formData.company?.trim() || undefined,
        email: formData.email?.trim() || undefined,
        phone: formData.phone?.trim() || undefined,
        productInterest: formData.productInterest || 'Table Napkins / Serviettes',
        withCustomLogo: formData.withCustomLogo ?? false,
        message: formData.message?.trim() || undefined,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        enquiryId: data.enquiryId,
        message: data.message || 'Your enquiry has been received successfully.',
      };
    }

    // If Edge function returned an error status, try direct database insert fallback
    console.warn('Edge function returned non-200, attempting direct Supabase fallback...');
    const { data: dbData, error: dbError } = await supabase
      .from('enquiries')
      .insert({
        name: formData.name.trim(),
        company: formData.company?.trim() || null,
        email: formData.email?.trim() || null,
        phone: formData.phone?.trim() || null,
        product_interest: formData.productInterest || 'Table Napkins / Serviettes',
        with_custom_logo: formData.withCustomLogo ?? false,
        message: formData.message?.trim() || null,
        status: 'new',
      })
      .select('id')
      .single();

    if (dbError) {
      throw dbError;
    }

    return {
      success: true,
      enquiryId: dbData?.id,
      message: 'Your enquiry has been saved successfully.',
    };
  } catch (error: any) {
    console.error('Failed to submit enquiry:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while submitting your enquiry. Please try again.',
    };
  }
}
