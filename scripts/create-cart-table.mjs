import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
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

async function createCartTable() {
  try {
    console.log('🛠️ Creating cart table...')
    
    const sql = readFileSync(join(__dirname, '005_create_cart.sql'), 'utf8')
    
    const { error } = await supabase.rpc('exec_sql', { sql })
    
    if (error) {
      console.error('❌ Error creating cart table:', error)
      return
    }
    
    console.log('✅ Cart table created successfully!')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Create the SQL execution function if it doesn't exist
async function createExecSqlFunction() {
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE OR REPLACE FUNCTION exec_sql(sql text)
      RETURNS void AS $$
      BEGIN
        EXECUTE sql;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `
  })
  
  if (error && !error.message.includes('already exists')) {
    console.error('Error creating exec_sql function:', error)
  }
}

await createExecSqlFunction()
await createCartTable()