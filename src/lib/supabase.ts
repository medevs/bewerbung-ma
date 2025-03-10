import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iancpdxdugoildtngqpz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhbmNwZHhkdWdvaWxkdG5ncXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MzAwNDYsImV4cCI6MjA1NDUwNjA0Nn0.lE-MwUftcBW0g4XFuUM_YwVWESgXvDwsTe62Vjl_7Ls";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
