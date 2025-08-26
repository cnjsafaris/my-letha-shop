# Leather Shop E-commerce Platform

A modern, full-featured leather goods e-commerce platform built with Next.js, TypeScript, and Supabase.

## Features

- 🛒 Complete e-commerce functionality
- 👤 User authentication and profiles  
- 🔐 Admin dashboard for product management
- 📱 Responsive design with dark/light mode
- 🎨 Modern UI with luxury leather theme
- 💳 Shopping cart and checkout system
- 📦 Order management and tracking
- 🏷️ Category-based product browsing
- 🔍 Product search functionality

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS v4, shadcn/ui
- **Database**: Supabase (PostgreSQL)  
- **Authentication**: Supabase Auth
- **Deployment**: Vercel / Netlify ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/cnjsafaris/my-letha-shop.git
   cd my-letha-shop
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

The project includes SQL scripts in the `/scripts` folder to set up your Supabase database:

1. Categories table setup
2. Products table setup  
3. Admin users table
4. Cart and orders functionality
5. User profiles
6. Sample data

Run these scripts in your Supabase SQL editor in order.

## Deployment

### Vercel Deployment

1. Push to GitHub repository
2. Import project in Vercel dashboard
3. Add environment variables in Vercel settings
4. Deploy automatically

Environment variables needed:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`
- All database connection strings

### Netlify Deployment  

1. Push to GitHub repository
2. Connect repository in Netlify dashboard
3. Build command: `pnpm build`
4. Publish directory: `.next`
5. Add environment variables in Netlify settings

The project includes a `netlify.toml` configuration file with Next.js plugin setup.

## Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   └── checkout/          # Checkout flow
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── admin/            # Admin-specific components  
├── lib/                  # Utility functions and config
│   └── supabase/         # Supabase client setup
├── hooks/                # Custom React hooks
├── scripts/              # Database setup scripts
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.