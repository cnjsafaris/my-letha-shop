# Deployment Instructions

## Prerequisites

1. **GitHub Repository**: https://github.com/cnjsafaris/my-letha-shop.git
2. **Database**: Supabase project with the following environment variables
3. **Node.js**: Version 18+ required

## Environment Variables

### Required Environment Variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://aqirdonqsbmcwcqeyrop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaXJkb25xc2JtY3djcWV5cm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNDU0MjQsImV4cCI6MjA3MTcyMTQyNH0.uOAZz0jGjbMuLrkpj9HoeEWe5QsSHpaXIaE2TfTWQpU
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaXJkb25xc2JtY3djcWV5cm9wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE0NTQyNCwiZXhwIjoyMDcxNzIxNDI0fQ._kSKwskOLhfOIxhbV7B3Cam55LVKLPOJ4fTffGM-2ZE
SUPABASE_JWT_SECRET=I+rcGReDp8h4T82LWVg4v3tByGnFMENkjc/QFInsyU2EAxQXtm8VGY/6+jebcuLTzY7dp3a11L9K3OpWr33KVA==

# Database connections (optional - for advanced features)
POSTGRES_URL=postgres://postgres.aqirdonqsbmcwcqeyrop:dp3A6iAMtx23uNGL@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x
POSTGRES_PRISMA_URL=postgres://postgres.aqirdonqsbmcwcqeyrop:dp3A6iAMtx23uNGL@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true
POSTGRES_URL_NON_POOLING=postgres://postgres.aqirdonqsbmcwcqeyrop:dp3A6iAMtx23uNGL@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require
```

## Vercel Deployment 🚀

### Option 1: Automatic Import from GitHub

1. Visit [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import from Git: `https://github.com/cnjsafaris/my-letha-shop.git`
4. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `pnpm build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `pnpm install` (auto-detected)

5. **Add Environment Variables** in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from above (without the database connections if not needed)

6. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# In your project directory
vercel

# Follow the prompts and add environment variables when prompted
```

### Vercel Configuration

The project includes `vercel.json` with optimized settings. Environment variables should be added in the Vercel dashboard under:
- Project Settings → Environment Variables

## Netlify Deployment 🌐

### Option 1: Git Integration

1. Visit [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose GitHub and select: `cnjsafaris/my-letha-shop`
4. Configure build settings:
   - **Build Command**: `pnpm build`
   - **Publish Directory**: `.next`
   - **Node Version**: 18 (set in Site settings → Environment variables: `NODE_VERSION=18`)

5. **Add Environment Variables**:
   - Go to Site settings → Environment variables
   - Add the required environment variables from above

6. Click "Deploy site"

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod --build

# Add environment variables via CLI or dashboard
```

### Netlify Configuration

The project includes `netlify.toml` with:
- Next.js plugin configuration
- Build settings
- Environment variables (public ones)

## Database Setup

Before deployment, ensure your Supabase database has the required tables:

1. **Run SQL Scripts** (in order):
   - `scripts/001_create_categories.sql`
   - `scripts/002_create_products.sql`
   - `scripts/003_create_admin_users.sql`
   - `scripts/004_create_profiles.sql`
   - `scripts/005_create_cart.sql`
   - `scripts/006_create_orders.sql`
   - `scripts/007_seed_sample_products.sql`

2. **Enable Row Level Security (RLS)** in Supabase dashboard
3. **Set up authentication** policies as needed

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] Authentication works (sign up/sign in)
- [ ] Products display properly  
- [ ] Cart functionality works
- [ ] Admin dashboard accessible
- [ ] Database connections working
- [ ] Environment variables configured
- [ ] SSL certificate active
- [ ] Custom domain configured (optional)

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version (should be 18+)
   - Verify all environment variables are set
   - Check build logs for specific errors

2. **Database Connection Issues**:
   - Verify Supabase environment variables
   - Check if database scripts were run
   - Ensure RLS policies are configured

3. **Authentication Problems**:
   - Check Supabase auth settings
   - Verify JWT secret is correct
   - Check redirect URLs in Supabase dashboard

4. **Styling Issues**:
   - Ensure TailwindCSS is building correctly
   - Check for PostCSS configuration errors

### Support Resources:
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.io/docs)

## Performance Optimizations

The project includes:
- ✅ Image optimization
- ✅ Code splitting
- ✅ Static generation where possible
- ✅ Edge middleware for auth
- ✅ Modern CSS (TailwindCSS v4)
- ✅ Optimized bundle sizes

## Security Features

- ✅ Environment variables for secrets
- ✅ JWT token validation
- ✅ Row Level Security (RLS)
- ✅ HTTPS enforced
- ✅ Content Security headers
- ✅ XSS protection headers