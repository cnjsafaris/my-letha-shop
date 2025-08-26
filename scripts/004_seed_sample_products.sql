-- Updated category references to match actual category slugs from categories table
-- Insert sample luxury leather products
INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, is_featured, sku, material, color) 
SELECT 
  'Premium Italian Handbag',
  'Handcrafted luxury handbag made from finest Italian leather with gold hardware',
  299.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  15,
  true,
  'LUX-HB-001',
  'Italian Leather',
  'Brown'
FROM public.categories c WHERE c.slug = 'designer-handbags'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, is_featured, sku, material, color) 
SELECT 
  'Executive Leather Briefcase',
  'Professional briefcase perfect for business executives with laptop compartment',
  449.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  8,
  true,
  'LUX-BC-001',
  'Full Grain Leather',
  'Black'
FROM public.categories c WHERE c.slug = 'travel-bags'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, is_featured, sku, material, color) 
SELECT 
  'Luxury RFID Wallet',
  'Premium wallet with RFID protection and multiple card slots',
  89.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  25,
  true,
  'LUX-WL-001',
  'Italian Leather',
  'Brown'
FROM public.categories c WHERE c.slug = 'luxury-wallets'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color) 
SELECT 
  'Designer Leather Belt',
  'Premium leather belt with custom buckle and Italian craftsmanship',
  129.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  20,
  'LUX-BT-001',
  'Italian Leather',
  'Black'
FROM public.categories c WHERE c.slug = 'premium-belts'
ON CONFLICT (sku) DO NOTHING;

-- Insert sample everyday leather products
INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color) 
SELECT 
  'Classic Leather Belt',
  'Durable everyday leather belt with metal buckle',
  39.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  50,
  'EVD-BT-001',
  'Genuine Leather',
  'Brown'
FROM public.categories c WHERE c.slug = 'casual-belts'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color) 
SELECT 
  'Work Leather Gloves',
  'Heavy-duty leather gloves for work and outdoor activities',
  24.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  30,
  'EVD-GL-001',
  'Cowhide Leather',
  'Brown'
FROM public.categories c WHERE c.slug = 'work-accessories'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color) 
SELECT 
  'Standard Leather Wallet',
  'Practical leather wallet for everyday use with card slots',
  49.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  35,
  'EVD-WL-001',
  'Genuine Leather',
  'Black'
FROM public.categories c WHERE c.slug = 'standard-wallets'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color) 
SELECT 
  'Leather Phone Case',
  'Protective leather case for smartphones with card slots',
  19.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  40,
  'EVD-PC-001',
  'Genuine Leather',
  'Brown'
FROM public.categories c WHERE c.slug = 'phone-cases'
ON CONFLICT (sku) DO NOTHING;
