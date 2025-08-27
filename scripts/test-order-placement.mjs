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

async function testOrderPlacement() {
  console.log('🧪 Testing order placement workflow...\n')
  
  try {
    // 1. Get a sample product
    console.log('1️⃣ Getting sample product...')
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .limit(1)
      .single()
    
    if (productsError || !products) {
      console.error('❌ Failed to get sample product:', productsError?.message)
      return false
    }
    
    console.log(`✅ Found product: ${products.name} - $${products.price}`)
    
    // 2. Create a test order (simulating the structure from checkout page)
    console.log('2️⃣ Creating test order...')
    
    const orderData = {
      status: 'pending',
      total_amount: products.price * 2, // Simulate quantity of 2
      payment_method: 'cash_on_delivery',
      shipping_address: {
        street: '123 Test Street',
        city: 'Test City',
        state: 'TS',
        zip: '12345'
      },
      customer_info: {
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '+1234567890'
      },
      notes: 'Test order for system verification'
    }
    
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()
    
    if (orderError) {
      console.error('❌ Failed to create test order:', orderError.message)
      return false
    }
    
    console.log(`✅ Created order: ${order.id}`)
    if (order.order_number) {
      console.log(`✅ Order number generated: ${order.order_number}`)
    }
    
    // 3. Create order items with the correct field structure
    console.log('3️⃣ Creating order items...')
    
    const orderItems = [
      {
        order_id: order.id,
        product_id: products.id,
        product_name: products.name,
        product_price: products.price,
        quantity: 2,
        subtotal: products.price * 2
      }
    ]
    
    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select()
    
    if (itemsError) {
      console.error('❌ Failed to create order items:', itemsError.message)
      // Clean up the order
      await supabase.from('orders').delete().eq('id', order.id)
      return false
    }
    
    console.log(`✅ Created ${items.length} order item(s)`)
    
    // 4. Verify the complete order
    console.log('4️⃣ Verifying complete order...')
    
    const { data: completeOrder, error: verifyError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('id', order.id)
      .single()
    
    if (verifyError) {
      console.error('❌ Failed to verify order:', verifyError.message)
      return false
    }
    
    console.log('✅ Order verification successful!')
    console.log(`   - Order ID: ${completeOrder.id}`)
    console.log(`   - Order Number: ${completeOrder.order_number || 'Not generated'}`)
    console.log(`   - Total Amount: $${completeOrder.total_amount}`)
    console.log(`   - Items Count: ${completeOrder.order_items?.length || 0}`)
    console.log(`   - Customer: ${completeOrder.customer_info.name}`)
    
    // 5. Clean up test data
    console.log('5️⃣ Cleaning up test data...')
    
    await supabase.from('order_items').delete().eq('order_id', order.id)
    await supabase.from('orders').delete().eq('id', order.id)
    
    console.log('✅ Test data cleaned up')
    
    console.log('\n🎉 ORDER PLACEMENT TEST PASSED!')
    console.log('The order placement workflow is working correctly.')
    return true
    
  } catch (error) {
    console.error('❌ Unexpected error during test:', error.message)
    return false
  }
}

testOrderPlacement().then(success => {
  if (success) {
    console.log('\n✅ Order placement functionality is working correctly!')
  } else {
    console.log('\n❌ Order placement test failed. Please check the errors above.')
    process.exit(1)
  }
})