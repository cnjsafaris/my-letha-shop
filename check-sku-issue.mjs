import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://aqirdonqsbmcwcqeyrop.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaXJkb25xc2JtY3djcWV5cm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNDU0MjQsImV4cCI6MjA3MTcyMTQyNH0.uOAZz0jGjbMuLrkpj9HoeEWe5QsSHpaXIaE2TfTWQpU'
);

try {
  console.log('Checking products table for SKU values...');
  
  const { data, error } = await supabase
    .from('products')
    .select('id, name, sku')
    .order('id', { ascending: true });
    
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Found', data.length, 'products:');
    data.forEach(product => {
      console.log(`ID: ${product.id}, Name: ${product.name}, SKU: '${product.sku}' (type: ${typeof product.sku})`);
    });
    
    // Check for empty string SKUs
    const emptySkus = data.filter(p => p.sku === '');
    console.log('\nProducts with empty string SKUs:', emptySkus.length);
    emptySkus.forEach(product => {
      console.log(`- ID: ${product.id}, Name: ${product.name}`);
    });
    
    // Check for null SKUs
    const nullSkus = data.filter(p => p.sku === null);
    console.log('\nProducts with null SKUs:', nullSkus.length);
    nullSkus.forEach(product => {
      console.log(`- ID: ${product.id}, Name: ${product.name}`);
    });
  }
} catch (err) {
  console.error('Script error:', err);
}