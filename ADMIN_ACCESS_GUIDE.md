# 🛡️ LS LETHASHOP Admin Access Guide

## 📋 Admin Dashboard Overview

The LS LETHASHOP admin dashboard provides comprehensive e-commerce management capabilities including:

- **📦 Product Management**: Add, edit, delete, and manage product inventory
- **📊 Order Management**: View, process, and track customer orders  
- **👥 User Management**: Monitor customer accounts and activities
- **📈 Analytics Dashboard**: Sales reports and business insights
- **⚙️ System Settings**: Configure store settings and preferences

---

## 🔐 Admin User System

### How Admin Access Works

1. **Admin Table**: The system uses a dedicated `admin_users` table to control admin privileges
2. **Authentication**: Regular user signup through Supabase Auth
3. **Authorization**: Admin privileges granted via `admin_users` table entry
4. **Route Protection**: Middleware checks admin status for `/admin/*` routes

### Current Admin Users

| Email | Role | Status | Access Level |
|-------|------|--------|--------------|
| `jabezmageto78@gmail.com` | admin | ✅ Active | Full Admin |
| `cnjsafaris@gmail.com` | admin | ✅ Active | Full Admin |

---

## 🚀 How to Access Admin Dashboard

### Method 1: Use Existing Admin Account

1. **Go to Login**: Navigate to `/auth/login`
2. **Sign In** with existing admin credentials:
   - Email: `cnjsafaris@gmail.com` or `jabezmageto78@gmail.com`
   - Password: [Use the password for these accounts]
3. **Access Admin**: Navigate to `/admin` or click admin menu

### Method 2: Create New Admin User

#### Step 1: Create Regular User Account
```bash
# Navigate to the app
http://localhost:3000/auth/sign-up

# Fill registration form:
- Full Name: [Your Name]
- Email: [your-email@domain.com]
- Password: [Strong Password]
```

#### Step 2: Add Admin Privileges
```bash
# Use the admin management script
cd /path/to/leather-shop
node scripts/manage-admins.mjs add your-email@domain.com
```

#### Step 3: Confirm Email (if required)
- Check your email for confirmation link
- Click the confirmation link
- Account is now confirmed and has admin privileges

---

## 🛠️ Admin Management Commands

### List All Users
```bash
node scripts/manage-admins.mjs users
```

### List Current Admins
```bash
node scripts/manage-admins.mjs list
```

### Add New Admin
```bash
node scripts/manage-admins.mjs add user@example.com
```

### Example Output:
```
👥 Current admin users:
1. Admin User (jabezmageto78@gmail.com)
   Role: admin, Active: true
   Created: 26/08/2025

2. Jabez (cnjsafaris@gmail.com)
   Role: admin, Active: true  
   Created: 26/08/2025
```

---

## 🔧 Testing Admin Functionality

### Quick Test Process:

1. **✅ User Registration**: New users can sign up successfully
2. **✅ Email Confirmation**: Users receive confirmation emails
3. **✅ Admin Assignment**: Script can promote users to admin
4. **✅ Login Protection**: `/admin` routes require authentication
5. **✅ Admin Dashboard**: Accessible after admin login

### Test Accounts Created:
- `admin@lethashop.com` (needs email confirmation)
- `demo@admin.com` (needs email confirmation)

---

## 🚨 Security Notes

### Admin Route Protection
- **Middleware**: All `/admin/*` routes protected by authentication middleware
- **Role Check**: System verifies user exists in `admin_users` table
- **Session**: Uses Supabase Auth sessions for security
- **Auto-redirect**: Unauthenticated users redirected to login

### Database Security
- **Row Level Security (RLS)**: Enabled on all tables
- **Admin Policies**: Admin users can manage all data
- **User Policies**: Regular users limited to their own data
- **API Protection**: Server-side validation on all operations

---

## 🎯 Admin Dashboard Features

### Product Management
- ✅ View all products in grid/table format
- ✅ Add new products with images and details
- ✅ Edit existing product information
- ✅ Manage inventory and stock levels
- ✅ Set featured products for homepage
- ✅ Organize products by categories

### Order Management  
- ✅ View all customer orders
- ✅ Process and update order status
- ✅ Generate order confirmations
- ✅ Track shipping and delivery
- ✅ Handle returns and refunds
- ✅ Export order data

### Analytics & Reports
- 📊 Sales performance metrics
- 📈 Revenue tracking and trends  
- 👥 Customer activity insights
- 📦 Product performance analytics
- 💰 Financial reporting tools

---

## 🔄 Deployment Admin Setup

### Vercel/Netlify Deployment

When deploying to production:

1. **Environment Variables**: Ensure all Supabase credentials are set
2. **Database Migration**: Run all SQL scripts in `/scripts/` folder
3. **Admin User**: Create initial admin user via script
4. **Email Configuration**: Configure SMTP for user confirmations
5. **Domain Setup**: Update allowed domains in Supabase settings

### Production Admin Account
```bash
# After deployment, create first admin:
node scripts/manage-admins.mjs add your-production-email@domain.com
```

---

## 📞 Support & Troubleshooting

### Common Issues:

**Cannot Access Admin Dashboard**
- ✅ Verify user exists in `admin_users` table
- ✅ Check email is confirmed in auth.users
- ✅ Ensure user is logged in properly
- ✅ Verify middleware is working

**Database Connection Issues**
- ✅ Check Supabase credentials in `.env.local`
- ✅ Verify database tables exist
- ✅ Test connection with setup script

**Email Confirmation Issues**  
- ✅ Check Supabase email settings
- ✅ Verify SMTP configuration
- ✅ Check spam/junk folders

### Quick Diagnostic Commands:
```bash
# Check database connection
node scripts/setup-db.mjs

# List all users and admins  
node scripts/manage-admins.mjs users
node scripts/manage-admins.mjs list

# Test admin assignment
node scripts/manage-admins.mjs add test@example.com
```

---

## 🎉 Conclusion

The LS LETHASHOP admin system is fully functional with:

- ✅ **Secure Authentication**: Supabase Auth integration
- ✅ **Role-Based Access**: Admin privileges system  
- ✅ **Protected Routes**: Middleware-based protection
- ✅ **Management Tools**: Admin user management scripts
- ✅ **Database Security**: RLS and proper policies
- ✅ **Production Ready**: Deployment-ready configuration

**Next Steps**: Sign in with admin credentials and explore the full admin dashboard!

---

*Last Updated: January 2025*
*Version: 1.0*