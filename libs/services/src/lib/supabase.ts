// The app supabase client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''; // the base url for supabase
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || ''; // the basic anonymous API key
const supabaseAdminKey = process.env.SUPABASE_SERVICE_KEY || supabaseAnonKey; // the service role key

/* client-side instance */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
/* server-side only instance (ONLY USE THIS SERVER SIDE) */
export const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey);
