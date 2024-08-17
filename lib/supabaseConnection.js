import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://evwckrofnfyxkvjgdxeu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2d2Nrcm9mbmZ5eGt2amdkeGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMjQwMTIsImV4cCI6MjAzNjcwMDAxMn0.ZEM9N7WCgcFdM_Chj7fAv7gCSzH5AI_ztsgTmUxD1A0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)