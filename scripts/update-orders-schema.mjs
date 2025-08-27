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

async function checkAndUpdateOrdersSchema() {
  console.log('🔍 Checking orders table schema...\n')
  
  try {
    // First, let's see what columns exist
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .limit(0) // Just get the schema
    
    if (orderError) {
      console.error('❌ Error checking orders table:', orderError.message)
      return false
    }
    
    console.log('✅ Orders table accessible')
    
    // Try to create a test order without payment_status to see what fields are missing
    console.log('🧪 Testing order creation to identify missing columns...')
    
    const testOrder = {
      order_number: 'TEST-' + Date.now(),
      status: 'pending',
      total_amount: 10.00,
      payment_method: 'cash_on_delivery',
      shipping_address: { street: 'Test' },
      customer_info: { name: 'Test', email: 'test@example.com', phone: '123' }
    }
    
    const { data: createdOrder, error: createError } = await supabase
      .from('orders')
      .insert(testOrder)
      .select()
    
    if (createError) {
      console.log(`🔍 Creation error (expected): ${createError.message}`)
      
      if (createError.message.includes('payment_status')) {
        console.log('⚠️  payment_status column is missing from database schema')
        console.log('📝 The database schema needs to be updated')
        
        // Note: We can't directly execute DDL with Supabase client in this way
        console.log('\n💡 To fix this, you need to:')
        console.log('1. Access your Supabase dashboard')
        console.log('2. Go to SQL Editor')
        console.log('3. Run the following SQL:')
        console.log('')
        console.log('ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT \'pending\' CHECK (payment_status IN (\'pending\', \'paid\', \'failed\'));')
        console.log('')
        
        return false
      } else if (createError.message.includes('order_number')) {
        console.log('⚠️  Order number generation might have issues')
        
        // Test without order_number to see if it auto-generates
        delete testOrder.order_number
        const { data: order2, error: error2 } = await supabase
          .from('orders')
          .insert(testOrder)
          .select()
        
        if (error2) {
          console.log(`🔍 Still error: ${error2.message}`)
          return false
        } else {
          console.log('✅ Order created successfully without manual order_number!')
          console.log('🧹 Cleaning up test order...')
          await supabase.from('orders').delete().eq('id', order2[0].id)
          return true
        }
      } else {
        console.log('🔍 Different error encountered')
        return false
      }
    } else {
      console.log('✅ Test order created successfully!')
      console.log('🧹 Cleaning up test order...')
      if (createdOrder && createdOrder.length > 0) {
        await supabase.from('orders').delete().eq('id', createdOrder[0].id)
      }
      return true
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    return false
  }
}

checkAndUpdateOrdersSchema().then(success => {
  if (success) {
    console.log('\n✅ Orders table schema is ready!')
  } else {
    console.log('\n⚠️  Orders table needs schema updates - see instructions above')
  }
})