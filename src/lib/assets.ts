const SUPABASE_CDN_BASE =
  import.meta.env.VITE_SUPABASE_STORAGE_URL ||
  'https://rmtrdiazwgyumeszvwdj.supabase.co/storage/v1/object/public/assets/images';

/**
 * Returns the high-speed Supabase Storage CDN URL for an image asset.
 * @param filename - e.g. 'table-napkins.jpg' or '/images/table-napkins.jpg'
 */
export function cdnImage(filename: string): string {
  if (!filename) return '';
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  const clean = filename.replace(/^\/?(images\/)?/, '');
  return `${SUPABASE_CDN_BASE}/${clean}`;
}
