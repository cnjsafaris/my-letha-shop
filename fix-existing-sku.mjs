import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://aqirdonqsbmcwcqeyrop.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaXJkb25xc2JtY3djcWV5cm9wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE0NTQyNCwiZXhwIjoyMDcxNzIxNDI0fQ._kSKwskOLhfOIxhbV7B3Cam55LVKLPOJ4fTffGM-2ZE'
);

try {
  console.log('Fixing products with empty string SKUs...');
  
  // Update products with empty string SKUs to NULL
  const { data, error } = await supabase
    .from('products')
    .update({ sku: null })
    .eq('sku', '')
    .select('id, name, sku');
    
  if (error) {
    console.error('Error updating products:', error);
  } else {
    console.log('Successfully updated', data.length, 'products:');
    data.forEach(product => {
      console.log(`- ID: ${product.id}, Name: ${product.name}, New SKU: ${product.sku}`);
    });
  }
  
  // Verify the fix
  console.log('\nVerifying fix...');
  const { data: allProducts, error: fetchError } = await supabase
    .from('products')
    .select('id, name, sku')
    .is('sku', null);
    
  if (fetchError) {
    console.error('Error fetching products:', fetchError);
  } else {
    console.log('Products with NULL SKUs:', allProducts.length);
  }
  
} catch (err) {
  console.error('Script error:', err);
}