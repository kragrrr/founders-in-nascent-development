// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pugythqlgvynghbloqoo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Z3l0aHFsZ3Z5bmdoYmxvcW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNzg4NzEsImV4cCI6MjA2NDc1NDg3MX0.T452UCL2PDSh2p-w4jgW20m2rAH3g_wAurQ4Yck-_Bk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);