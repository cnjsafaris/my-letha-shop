import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function fixOrderFunctions() {
  try {
    console.log('🔧 Creating order number generation function...')
    
    const createFunctionSQL = `
      -- Drop existing function if it exists
      DROP FUNCTION IF EXISTS generate_order_number();
      
      -- Create sequence if it doesn't exist
      CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;
      
      -- Create function to generate order numbers
      CREATE OR REPLACE FUNCTION generate_order_number()
      RETURNS TEXT AS $$
      BEGIN
        RETURN 'LS' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(NEXTVAL('order_number_seq')::TEXT, 4, '0');
      END;
      $$ LANGUAGE plpgsql;
      
      -- Create trigger function to auto-generate order numbers
      CREATE OR REPLACE FUNCTION set_order_number()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.order_number IS NULL THEN
          NEW.order_number := generate_order_number();
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      
      -- Drop existing trigger if it exists
      DROP TRIGGER IF EXISTS trigger_set_order_number ON public.orders;
      
      -- Create trigger to auto-generate order numbers
      CREATE TRIGGER trigger_set_order_number
        BEFORE INSERT ON public.orders
        FOR EACH ROW
        EXECUTE FUNCTION set_order_number();
    `
    
    const { error } = await supabase.rpc('exec', { query: createFunctionSQL })
    
    if (error) {
      console.error('❌ Error creating function:', error.message)
      
      // Try alternative approach - execute parts separately
      console.log('🔧 Trying alternative approach...')
      
      // Create sequence
      const { error: seqError } = await supabase
        .from('_pg_stat_user_functions') // This won't work, but let's try a different approach
        
      // Let's try creating the function using a more direct approach
      console.log('🔧 Creating function manually...')
      
      return false
    }
    
    console.log('✅ Order functions created successfully!')
    
    // Test the function
    console.log('🧪 Testing order number generation...')
    const { data: orderNum, error: testError } = await supabase
      .rpc('generate_order_number')
    
    if (testError) {
      console.error('❌ Test error:', testError.message)
      return false
    }
    
    console.log('✅ Order number generation test successful! Sample:', orderNum)
    return true
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    return false
  }
}

fixOrderFunctions().then(success => {
  if (success) {
    console.log('\n🎉 Order functions are working correctly!')
  } else {
    console.log('\n❌ Failed to fix order functions - may need manual SQL execution')
    process.exit(1)
  }
})