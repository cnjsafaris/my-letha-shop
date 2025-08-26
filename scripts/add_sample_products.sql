-- Insert sample categories first
INSERT INTO categories (id, name, slug, description, is_luxury, image_url) VALUES
  (gen_random_uuid(), 'Designer Handbags', 'designer-handbags', 'Luxury leather handbags crafted by master artisans', true, '/placeholder.svg?height=300&width=300'),
  (gen_random_uuid(), 'Premium Wallets', 'premium-wallets', 'Handcrafted leather wallets with premium materials', true, '/placeholder.svg?height=300&width=300'),
  (gen_random_uuid(), 'Leather Belts', 'leather-belts', 'Quality leather belts for everyday wear', false, '/placeholder.svg?height=300&width=300'),
  (gen_random_uuid(), 'Work Gloves', 'work-gloves', 'Durable leather work gloves', false, '/placeholder.svg?height=300&width=300')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
WITH category_ids AS (
  SELECT id, slug FROM categories
)
INSERT INTO products (
  id, name, description, price, image_url, category_id, 
  stock_quantity, is_featured, is_active, material, color, sku
) VALUES
  -- Featured luxury products
  (gen_random_uuid(), 'Premium Leather Handbag', 'Exquisite handcrafted leather handbag made from finest Italian leather', 299.99, '/placeholder.svg?height=400&width=400', (SELECT id FROM category_ids WHERE slug = 'designer-handbags'), 15, true, true, 'Italian Leather', 'Brown', 'LH001'),
  (gen_random_uuid(), 'Executive Leather Wallet', 'Premium leather wallet with multiple card slots and bill compartments', 89.99, '/placeholder.svg?height=400&width=400', (SELECT id FROM category_ids WHERE slug = 'premium-wallets'), 25, true, true, 'Full Grain Leather', 'Black', 'LW001'),
  (gen_random_uuid(), 'Classic Leather Belt', 'Timeless leather belt perfect for business and casual wear', 59.99, '/placeholder.svg?height=400&width=400', (SELECT id FROM category_ids WHERE slug = 'leather-belts'), 30, true, true, 'Genuine Leather', 'Black', 'LB001'),
  
  -- Additional products
  (gen_random_uuid(), 'Luxury Tote Bag', 'Spacious leather tote bag perfect for work and travel', 249.99, '/placeholder.svg?height=400&width=400', (SELECT id FROM category_ids WHERE slug = 'designer-handbags'), 12, true, true, 'Italian Leather', 'Cognac', 'LH002'),
  (gen_random_uuid(), 'Professional Work Gloves', 'Heavy-duty leather work gloves for construction and manual labor', 29.99, '/placeholder.svg?height=400&width=400', (SELECT id FROM category_ids WHERE slug = 'work-gloves'), 50, true, true, 'Cowhide Leather', 'Brown', 'LG001'),
  (gen_random_uuid(), 'Minimalist Card Holder', 'Sleek leather card holder for the modern professional', 39.99, '/placeholder.svg?height=400&width=400', (SELECT id FROM category_ids WHERE slug = 'premium-wallets'), 40, true, true, 'Top Grain Leather', 'Black', 'LW002');
