import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkCartTable() {
  try {
    console.log('🔍 Checking cart table...')
    
    // Try to query the cart_items table
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .limit(1)
    
    if (error) {
      if (error.message.includes('does not exist')) {
        console.log('❌ Cart table does not exist')
        return false
      } else {
        console.error('❌ Error checking cart table:', error)
        return false
      }
    }
    
    console.log('✅ Cart table exists and is accessible!')
    return true
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
    return false
  }
}

const exists = await checkCartTable()
process.exit(exists ? 0 : 1)