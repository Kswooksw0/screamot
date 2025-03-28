import { createClient } from "@supabase/supabase-js";

// ✅ Replace with your actual Supabase project details
const SUPABASE_URL = "https://yhkghyaepbcpjrstqule.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inloa2doeWFlcGJjcGpyc3RxdWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjgzODksImV4cCI6MjA1ODc0NDM4OX0.1N38L6ZTRRbGz7rruCDmSojVT6K3938qic2gkZai594";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
