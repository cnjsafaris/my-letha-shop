-- Create admin users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admin users can only see their own data
CREATE POLICY "admin_users_select_own" ON public.admin_users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "admin_users_update_own" ON public.admin_users FOR UPDATE USING (auth.uid() = id);

-- Insert the specified admin user (will be created when they sign up)
-- This is a placeholder - the actual user will be created through auth
