-- Insert sample leather products
INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, is_featured, sku, material, color) 
SELECT 
  'Premium Leather Handbag',
  'Handcrafted luxury handbag made from finest Italian leather',
  299.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  15,
  true,
  'LH001',
  'Italian Leather',
  'Brown'
FROM public.categories c WHERE c.slug = 'designer-handbags'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, is_featured, sku, material, color)
SELECT 
  'Executive Leather Wallet',
  'Premium bifold wallet with RFID protection',
  89.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  25,
  true,
  'LW001',
  'Genuine Leather',
  'Black'
FROM public.categories c WHERE c.slug = 'luxury-wallets'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color)
SELECT 
  'Classic Leather Belt',
  'Handcrafted belt with solid brass buckle',
  79.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  30,
  'LB001',
  'Full Grain Leather',
  'Brown'
FROM public.categories c WHERE c.slug = 'premium-belts'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color)
SELECT 
  'Leather Oxford Shoes',
  'Handmade oxford shoes for the modern gentleman',
  249.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  20,
  'LS001',
  'Italian Leather',
  'Black'
FROM public.categories c WHERE c.slug = 'designer-shoes'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color)
SELECT 
  'Vintage Leather Jacket',
  'Classic motorcycle-style leather jacket',
  399.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  12,
  'LJ001',
  'Cowhide Leather',
  'Black'
FROM public.categories c WHERE c.slug = 'luxury-jackets'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color)
SELECT 
  'Professional Briefcase',
  'Spacious briefcase perfect for business professionals',
  199.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  18,
  'LT001',
  'Saffiano Leather',
  'Brown'
FROM public.categories c WHERE c.slug = 'travel-bags'
ON CONFLICT (sku) DO NOTHING;

-- Add some everyday products
INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color)
SELECT 
  'Everyday Wallet',
  'Simple and practical wallet for daily use',
  29.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  50,
  'EW001',
  'Genuine Leather',
  'Brown'
FROM public.categories c WHERE c.slug = 'standard-wallets'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color)
SELECT 
  'Casual Leather Belt',
  'Comfortable belt for everyday wear',
  24.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  40,
  'CB001',
  'Genuine Leather',
  'Black'
FROM public.categories c WHERE c.slug = 'casual-belts'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color)
SELECT 
  'Leather Phone Case',
  'Protective case for your smartphone',
  19.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  60,
  'PC001',
  'PU Leather',
  'Black'
FROM public.categories c WHERE c.slug = 'phone-cases'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, material, color)
SELECT 
  'Leather Keychain',
  'Stylish keychain with metal ring',
  9.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  100,
  'KC001',
  'Genuine Leather',
  'Brown'
FROM public.categories c WHERE c.slug = 'keychains'
ON CONFLICT (sku) DO NOTHING;
