// ============================================
// SUPABASE CONFIG
// Replace these with your actual values from:
// https://supabase.com/dashboard/project/<id>/settings/api
// ============================================
const SUPABASE_URL = 'https://orqdpcwcyfksrrigsteh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ycWRwY3djeWZrc3JyaWdzdGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNTc4MDMsImV4cCI6MjA5NDkzMzgwM30.7ti3CxVSUwfiyMQZ98GeJo6HFd_p5ufHyox1NjLDQY4';

// Supabase anon key is intentionally public — it's protected by Row Level Security
let supabaseClient = null;

if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
