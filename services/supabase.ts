import { SUPABASE_ANON, SUPABASE_URL } from "@/utils/constants/env";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
