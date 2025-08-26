-- Insert sample luxury leather products
INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sku, materials, care_instructions) 
SELECT 
  'Premium Italian Leather Handbag',
  'Handcrafted luxury handbag made from finest Italian leather with gold-plated hardware',
  299.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  15,
  'LH001',
  ARRAY['Italian Leather', 'Gold-plated Hardware'],
  'Clean with leather conditioner. Store in dust bag when not in use.'
FROM public.categories c WHERE c.slug = 'designer-handbags'

UNION ALL

SELECT 
  'Executive Leather Wallet',
  'Premium full-grain leather wallet with RFID protection and multiple card slots',
  89.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  50,
  'LW001',
  ARRAY['Full-grain Leather', 'RFID Blocking Material'],
  'Wipe clean with damp cloth. Apply leather conditioner monthly.'
FROM public.categories c WHERE c.slug = 'luxury-wallets'

UNION ALL

SELECT 
  'Handcrafted Leather Belt',
  'Premium leather belt with custom brass buckle, available in multiple sizes',
  79.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  30,
  'LB001',
  ARRAY['Premium Leather', 'Brass Buckle'],
  'Clean with leather cleaner. Condition regularly to maintain suppleness.'
FROM public.categories c WHERE c.slug = 'premium-belts'

UNION ALL

SELECT 
  'Classic Leather Loafers',
  'Elegant leather loafers perfect for business and casual wear',
  199.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  25,
  'LS001',
  ARRAY['Genuine Leather', 'Rubber Sole'],
  'Use shoe trees when not wearing. Polish regularly with leather cream.'
FROM public.categories c WHERE c.slug = 'designer-shoes'

UNION ALL

SELECT 
  'Professional Leather Briefcase',
  'Spacious leather briefcase with laptop compartment and organizational pockets',
  249.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  20,
  'LT001',
  ARRAY['Top-grain Leather', 'YKK Zippers'],
  'Clean with leather cleaner. Avoid exposure to excessive moisture.'
FROM public.categories c WHERE c.slug = 'travel-office'

UNION ALL

SELECT 
  'Everyday Leather Wallet',
  'Simple and practical leather wallet for daily use with essential card slots',
  39.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  100,
  'SW001',
  ARRAY['Genuine Leather'],
  'Wipe clean with damp cloth as needed.'
FROM public.categories c WHERE c.slug = 'standard-wallets'

UNION ALL

SELECT 
  'Casual Leather Belt',
  'Comfortable leather belt perfect for everyday wear',
  29.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  75,
  'CB001',
  ARRAY['Genuine Leather', 'Metal Buckle'],
  'Clean with damp cloth. Air dry if wet.'
FROM public.categories c WHERE c.slug = 'casual-belts'

UNION ALL

SELECT 
  'Work Leather Gloves',
  'Durable leather work gloves for construction and outdoor activities',
  24.99,
  c.id,
  '/placeholder.svg?height=400&width=400',
  60,
  'WG001',
  ARRAY['Heavy-duty Leather', 'Reinforced Palm'],
  'Allow to air dry after use. Store in dry place.'
FROM public.categories c WHERE c.slug = 'work-accessories';
