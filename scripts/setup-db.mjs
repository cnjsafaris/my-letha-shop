import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupDatabase() {
  console.log('🔍 Checking database connection...');
  
  try {
    // Test connection
    const { data: testData, error: testError } = await supabase
      .from('categories')
      .select('count', { count: 'exact' });

    if (testError) {
      console.error('❌ Database connection failed:', testError);
      return;
    }

    console.log('✅ Database connected successfully');
    console.log(`📊 Categories table has ${testData.length} records`);

    // Check products table
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('count', { count: 'exact' });

    if (productsError) {
      console.error('❌ Products table error:', productsError);
      return;
    }

    console.log(`📦 Products table has ${products.length} records`);

    // Get actual product data to see what exists
    const { data: existingProducts } = await supabase
      .from('products')
      .select('name, sku, is_featured')
      .limit(10);
    
    console.log('📋 Existing products:', existingProducts);

    // Get existing categories
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('name, slug');
    
    console.log('📂 Existing categories:', existingCategories);

    // Always add more sample data for better testing
    console.log('📝 Adding additional sample products...');
    await addSampleProducts();

  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

async function addSampleProducts() {
  try {
    // First, ensure categories exist
    const categories = [
      { name: 'Designer Handbags', slug: 'designer-handbags', is_luxury: true },
      { name: 'Luxury Wallets', slug: 'luxury-wallets', is_luxury: true },
      { name: 'Premium Belts', slug: 'premium-belts', is_luxury: false },
      { name: 'Designer Shoes', slug: 'designer-shoes', is_luxury: true }
    ];

    for (const category of categories) {
      const { error } = await supabase
        .from('categories')
        .upsert(category, { onConflict: 'slug' });
      
      if (error) {
        console.error('❌ Category insert error:', error);
      } else {
        console.log(`✅ Added category: ${category.name}`);
      }
    }

    // Add sample products
    const sampleProducts = [
      {
        name: 'Premium Leather Handbag',
        description: 'Handcrafted luxury handbag made from finest Italian leather',
        price: 299.99,
        image_url: '/placeholder.jpg',
        stock_quantity: 15,
        is_featured: true,
        sku: 'LH001',
        material: 'Italian Leather',
        color: 'Brown',
        category_slug: 'designer-handbags'
      },
      {
        name: 'Executive Leather Wallet',
        description: 'Premium bifold wallet with RFID protection',
        price: 89.99,
        image_url: '/placeholder.jpg',
        stock_quantity: 25,
        is_featured: true,
        sku: 'LW001',
        material: 'Genuine Leather',
        color: 'Black',
        category_slug: 'luxury-wallets'
      },
      {
        name: 'Classic Leather Belt',
        description: 'Handcrafted belt with solid brass buckle',
        price: 79.99,
        image_url: '/placeholder.jpg',
        stock_quantity: 30,
        is_featured: false,
        sku: 'LB001',
        material: 'Full Grain Leather',
        color: 'Brown',
        category_slug: 'premium-belts'
      },
      {
        name: 'Leather Oxford Shoes',
        description: 'Handmade oxford shoes for the modern gentleman',
        price: 249.99,
        image_url: '/placeholder.jpg',
        stock_quantity: 20,
        is_featured: true,
        sku: 'LS001',
        material: 'Italian Leather',
        color: 'Black',
        category_slug: 'designer-shoes'
      }
    ];

    for (const product of sampleProducts) {
      // Get category ID
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', product.category_slug)
        .single();

      if (categoryData) {
        const productData = {
          name: product.name,
          description: product.description,
          price: product.price,
          category_id: categoryData.id,
          image_url: product.image_url,
          stock_quantity: product.stock_quantity,
          is_featured: product.is_featured,
          sku: product.sku,
          material: product.material,
          color: product.color,
          is_active: true
        };

        const { error } = await supabase
          .from('products')
          .upsert(productData, { onConflict: 'sku' });

        if (error) {
          console.error('❌ Product insert error:', error);
        } else {
          console.log(`✅ Added product: ${product.name}`);
        }
      }
    }

    console.log('🎉 Sample products added successfully!');

  } catch (error) {
    console.error('❌ Error adding sample products:', error);
  }
}

setupDatabase();