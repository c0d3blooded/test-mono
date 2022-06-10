import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.3";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

export const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_API_SECRET_KEY") ?? ""
);

export const supabaseApp = createClient(
  Deno.env.get("PUBLIC_SUPABASE_URL") ?? "",
  Deno.env.get("PUBLIC_SUPABASE_API_KEY") ?? ""
);
