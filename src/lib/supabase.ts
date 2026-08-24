import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rmtrdiazwgyumeszvwdj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtdHJkaWF6d2d5dW1lc3p2d2RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NjMzNjMsImV4cCI6MjEwMzEzOTM2M30.AHDMhJRDH5RzX5LbPN5BUIU088XDDJLvFE2Fap0mQWA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
