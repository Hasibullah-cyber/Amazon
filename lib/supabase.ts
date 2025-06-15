import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://lqbivpzpknvjxjjeogve.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxYml2cHpwa252anhqamVvZ3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDc2ODYsImV4cCI6MjA2NTU4MzY4Nn0.lN_3IBa8-PVi_bs04omZkIYU4nC68RJu92eiUoFchto"
)
