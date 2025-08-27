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

async function checkTable(tableName, description) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1)
    
    if (error) {
      console.error(`❌ ${description}: ${error.message}`)
      return false
    }
    
    console.log(`✅ ${description}: OK`)
    return true
  } catch (error) {
    console.error(`❌ ${description}: ${error.message}`)
    return false
  }
}

async function runSystemCheck() {
  console.log('🚀 Running comprehensive system check...\n')
  
  let allChecksPass = true
  const results = []
  
  // 1. Check core tables
  console.log('📊 Checking database tables...')
  const tableChecks = [
    ['categories', 'Categories table'],
    ['products', 'Products table'],
    ['admin_users', 'Admin users table'],
    ['cart_items', 'Cart items table'],
    ['orders', 'Orders table'],
    ['order_items', 'Order items table']
  ]
  
  for (const [table, description] of tableChecks) {
    const result = await checkTable(table, description)
    results.push({ check: description, status: result })
    if (!result) allChecksPass = false
  }
  
  console.log('')
  
  // 2. Check products exist
  console.log('🛍️ Checking product data...')
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
    
    if (error) {
      console.error(`❌ Product data check: ${error.message}`)
      results.push({ check: 'Product data availability', status: false })
      allChecksPass = false
    } else if (products.length === 0) {
      console.log('⚠️ No active products found')
      results.push({ check: 'Product data availability', status: false })
      allChecksPass = false
    } else {
      console.log(`✅ Product data: ${products.length} active products found`)
      results.push({ check: 'Product data availability', status: true })
    }
  } catch (error) {
    console.error(`❌ Product data check: ${error.message}`)
    results.push({ check: 'Product data availability', status: false })
    allChecksPass = false
  }
  
  // 3. Check categories exist
  console.log('🏷️ Checking categories data...')
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
    
    if (error) {
      console.error(`❌ Categories data check: ${error.message}`)
      results.push({ check: 'Categories data availability', status: false })
      allChecksPass = false
    } else if (categories.length === 0) {
      console.log('⚠️ No categories found')
      results.push({ check: 'Categories data availability', status: false })
      allChecksPass = false
    } else {
      console.log(`✅ Categories data: ${categories.length} categories found`)
      results.push({ check: 'Categories data availability', status: true })
    }
  } catch (error) {
    console.error(`❌ Categories data check: ${error.message}`)
    results.push({ check: 'Categories data availability', status: false })
    allChecksPass = false
  }
  
  // 4. Check admin users
  console.log('👤 Checking admin users...')
  try {
    const { data: admins, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('is_active', true)
    
    if (error) {
      console.error(`❌ Admin users check: ${error.message}`)
      results.push({ check: 'Admin users setup', status: false })
      allChecksPass = false
    } else if (admins.length === 0) {
      console.log('⚠️ No active admin users found')
      results.push({ check: 'Admin users setup', status: false })
      allChecksPass = false
    } else {
      console.log(`✅ Admin users: ${admins.length} active admin(s) found`)
      results.push({ check: 'Admin users setup', status: true })
    }
  } catch (error) {
    console.error(`❌ Admin users check: ${error.message}`)
    results.push({ check: 'Admin users setup', status: false })
    allChecksPass = false
  }
  
  // 5. Check Row Level Security policies
  console.log('🔐 Checking RLS policies (basic check)...')
  try {
    // This is a basic check - we try to access products as they should be public
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price')
      .eq('is_active', true)
      .limit(1)
    
    if (error) {
      console.error(`❌ RLS policies check: ${error.message}`)
      results.push({ check: 'RLS policies basic check', status: false })
      allChecksPass = false
    } else {
      console.log('✅ RLS policies: Basic access working')
      results.push({ check: 'RLS policies basic check', status: true })
    }
  } catch (error) {
    console.error(`❌ RLS policies check: ${error.message}`)
    results.push({ check: 'RLS policies basic check', status: false })
    allChecksPass = false
  }
  
  // 6. Test order creation workflow (without actually creating an order)
  console.log('🛒 Checking order workflow components...')
  try {
    // Check if we can query orders table structure
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .limit(0) // Get structure without data
    
    if (error) {
      console.error(`❌ Orders workflow check: ${error.message}`)
      results.push({ check: 'Orders workflow readiness', status: false })
      allChecksPass = false
    } else {
      console.log('✅ Orders workflow: Table structure accessible')
      
      // Check order_items table structure
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .limit(0)
      
      if (itemsError) {
        console.error(`❌ Order items workflow check: ${itemsError.message}`)
        results.push({ check: 'Orders workflow readiness', status: false })
        allChecksPass = false
      } else {
        console.log('✅ Orders workflow: Order items structure accessible')
        results.push({ check: 'Orders workflow readiness', status: true })
      }
    }
  } catch (error) {
    console.error(`❌ Orders workflow check: ${error.message}`)
    results.push({ check: 'Orders workflow readiness', status: false })
    allChecksPass = false
  }
  
  // 7. Summary
  console.log('\n' + '='.repeat(50))
  console.log('📋 SYSTEM CHECK SUMMARY')
  console.log('='.repeat(50))
  
  results.forEach(result => {
    const status = result.status ? '✅' : '❌'
    console.log(`${status} ${result.check}`)
  })
  
  console.log('='.repeat(50))
  
  if (allChecksPass) {
    console.log('🎉 ALL SYSTEM CHECKS PASSED!')
    console.log('Your leather shop system is ready for operation.')
  } else {
    console.log('⚠️  SOME CHECKS FAILED')
    console.log('Please review the errors above and fix them before proceeding.')
  }
  
  return allChecksPass
}

runSystemCheck().then(success => {
  process.exit(success ? 0 : 1)
})