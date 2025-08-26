-- Create categories table for organizing leather products
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  is_luxury BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Categories are public readable, admin only for write operations
CREATE POLICY "categories_select_all" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_insert_admin" ON public.categories FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "categories_update_admin" ON public.categories FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "categories_delete_admin" ON public.categories FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Insert default categories
INSERT INTO public.categories (name, description, slug, is_luxury) VALUES
('Designer Handbags', 'Luxury handbags, clutches, and purses', 'designer-handbags', true),
('Luxury Wallets', 'Premium wallets and cardholders', 'luxury-wallets', true),
('Premium Belts', 'High-end belts with custom buckles', 'premium-belts', true),
('Designer Shoes', 'Luxury leather footwear', 'designer-shoes', true),
('Luxury Jackets', 'Premium leather jackets and coats', 'luxury-jackets', true),
('Travel Bags', 'Briefcases, laptop bags, and luggage', 'travel-bags', true),
('Home Décor', 'Leather furniture and decorative items', 'home-decor', true),
('Standard Wallets', 'Everyday wallets and cardholders', 'standard-wallets', false),
('Casual Belts', 'Regular belts for daily use', 'casual-belts', false),
('Work Accessories', 'Work gloves, tool belts, and utility items', 'work-accessories', false),
('Phone Cases', 'Leather phone cases and tech accessories', 'phone-cases', false),
('Keychains', 'Key holders and keychains', 'keychains', false)
ON CONFLICT (slug) DO NOTHING;
