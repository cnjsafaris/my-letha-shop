import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for admin access

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkOrdersTables() {
  try {
    console.log('🔍 Checking orders table...')
    
    // Check orders table
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .limit(1)
    
    if (ordersError) {
      console.error('❌ Orders table error:', ordersError.message)
      return false
    }
    
    console.log('✅ Orders table exists and is accessible!')
    
    // Check order_items table
    console.log('🔍 Checking order_items table...')
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .limit(1)
    
    if (itemsError) {
      console.error('❌ Order items table error:', itemsError.message)
      return false
    }
    
    console.log('✅ Order items table exists and is accessible!')
    
    // Test order creation workflow
    console.log('🔍 Testing order number generation function...')
    const { data: orderNum, error: orderNumError } = await supabase
      .rpc('generate_order_number')
    
    if (orderNumError) {
      console.error('❌ Order number function error:', orderNumError.message)
      return false
    }
    
    console.log('✅ Order number generation works! Sample:', orderNum)
    
    return true
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    return false
  }
}

checkOrdersTables().then(success => {
  if (success) {
    console.log('\n🎉 All orders-related tables are working correctly!')
  } else {
    console.log('\n❌ There are issues with the orders tables')
    process.exit(1)
  }
})