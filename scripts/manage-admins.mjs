import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addAdminUser(email) {
  console.log(`🔍 Looking for user with email: ${email}`);
  
  try {
    // First check if user exists in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('❌ Error fetching auth users:', authError);
      return;
    }

    const user = authUser.users.find(u => u.email === email);
    
    if (!user) {
      console.log('❌ User not found. User must sign up first.');
      return;
    }

    console.log('✅ User found:', user.email);

    // Add user to admin_users table
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .upsert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.email.split('@')[0],
        role: 'admin',
        is_active: true
      }, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      })
      .select()
      .single();

    if (adminError) {
      console.error('❌ Error adding admin user:', adminError);
      return;
    }

    console.log('🎉 User successfully added as admin:', adminUser);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

async function listAdmins() {
  console.log('👥 Current admin users:');
  
  try {
    const { data: admins, error } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at');

    if (error) {
      console.error('❌ Error fetching admins:', error);
      return;
    }

    if (admins.length === 0) {
      console.log('📭 No admin users found.');
      return;
    }

    admins.forEach((admin, index) => {
      console.log(`${index + 1}. ${admin.full_name || 'Unknown'} (${admin.email})`);
      console.log(`   Role: ${admin.role}, Active: ${admin.is_active}`);
      console.log(`   Created: ${new Date(admin.created_at).toLocaleDateString()}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function listAllUsers() {
  console.log('👤 All registered users:');
  
  try {
    const { data: authData, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('❌ Error fetching users:', error);
      return;
    }

    if (authData.users.length === 0) {
      console.log('📭 No users found.');
      return;
    }

    authData.users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`);
      console.log(`   Name: ${user.user_metadata?.full_name || 'Not provided'}`);
      console.log(`   Confirmed: ${user.email_confirmed_at ? 'Yes' : 'No'}`);
      console.log(`   Created: ${new Date(user.created_at).toLocaleDateString()}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Command line interface
const command = process.argv[2];
const email = process.argv[3];

switch (command) {
  case 'add':
    if (!email) {
      console.log('Usage: node manage-admins.mjs add <email>');
      console.log('Example: node manage-admins.mjs add admin@lethashop.com');
      process.exit(1);
    }
    await addAdminUser(email);
    break;
    
  case 'list':
    await listAdmins();
    break;
    
  case 'users':
    await listAllUsers();
    break;
    
  default:
    console.log('Available commands:');
    console.log('  add <email>  - Add user as admin');
    console.log('  list         - List all admin users');
    console.log('  users        - List all registered users');
    console.log('');
    console.log('Examples:');
    console.log('  node manage-admins.mjs add admin@lethashop.com');
    console.log('  node manage-admins.mjs list');
    console.log('  node manage-admins.mjs users');
}