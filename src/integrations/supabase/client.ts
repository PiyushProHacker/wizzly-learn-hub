// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vkflrnarraryvzaxqjzh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrZmxybmFycmFyeXZ6YXhxanpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NDk3MDAsImV4cCI6MjA2MzEyNTcwMH0.vJZ7ZY5G3gBFIbLzItX7xw2Ld9ez0dqKVRbaXoe8dzQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);