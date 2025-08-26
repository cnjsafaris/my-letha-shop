import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function confirmUser(email) {
  console.log(`🔍 Looking for user: ${email}`);
  
  try {
    // Get user by email
    const { data: users, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('❌ Error fetching users:', error);
      return;
    }

    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('✅ User found:', user.email);
    console.log('📧 Confirmed:', user.email_confirmed_at ? 'Yes' : 'No');

    if (user.email_confirmed_at) {
      console.log('✅ User is already confirmed');
      return;
    }

    // Confirm the user
    const { data, error: confirmError } = await supabase.auth.admin.updateUserById(
      user.id,
      { 
        email_confirm: true 
      }
    );

    if (confirmError) {
      console.error('❌ Error confirming user:', confirmError);
      return;
    }

    console.log('🎉 User successfully confirmed!');
    console.log('✅ User can now log in');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Command line usage
const email = process.argv[2];

if (!email) {
  console.log('Usage: node confirm-user.mjs <email>');
  console.log('Example: node confirm-user.mjs demo@admin.com');
  process.exit(1);
}

confirmUser(email);