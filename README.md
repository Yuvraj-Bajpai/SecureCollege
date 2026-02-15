# Secure College Platform

> Your Gateway to Dream Engineering Colleges

A comprehensive Next.js 14 platform connecting students with engineering colleges across India. Built with modern web technologies, Supabase backend, and a professional, brand-aligned design system.

## 🚀 Tech Stack

- **Framework**: Next.js 14.2+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: Shadcn/ui (customized with brand colors)
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Animation**: Framer Motion
- **Code Quality**: ESLint + Prettier
- **Deployment**: Vercel (Mumbai region)

## 📁 Project Structure

```
secure-college/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── health/        # Health check endpoint
│   ├── auth/              # Authentication routes
│   │   └── callback/     # OAuth callback handler
│   ├── colleges/          # College listings and profiles
│   │   ├── [slug]/       # Dynamic college profile pages (SSG)
│   │   └── page.tsx      # College listings page (SSR)
│   ├── contact/           # Contact page
│   ├── dashboard/         # User dashboard
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── globals.css        # Global styles + design system
│   ├── layout.tsx         # Root layout with SEO
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── common/           # Reusable components
│   └── ThemeToggle.tsx    # Theme switching
├── lib/                   # Utilities & configuration
│   ├── data/             # Seed data
│   │   └── colleges-seed.json  # 37 college dataset
│   ├── supabase.ts       # Supabase client
│   ├── utils.ts          # Helper functions
│   └── constants.ts      # Site-wide constants
├── scripts/              # Database scripts
│   ├── seed-colleges.cjs # College seeding script
│   └── seed-colleges.ts  # TypeScript seed script
├── types/                # TypeScript definitions
├── public/               # Static assets
│   └── images/           # Images (logo, logo-dark)
├── docs/                 # Documentation
└── .github/              # GitHub workflows
```

## 🎯 Key Features

### 🏫 College Database
- **37 Engineering Colleges** with complete profiles
- **Server-Side Rendering** for SEO optimization
- **Static Site Generation** for individual college pages
- **Dynamic Routing** for individual college pages
- **Search & Filtering** capabilities
- **Responsive Design** for all devices

### 📊 Data Management
- **Supabase Integration** with PostgreSQL backend
- **Real-time Data** fetching and updates
- **Type-safe** database operations
- **Seed Script** for database population
- **Robust Error Handling** for connection failures

### 🎨 Design System
- **Brand Colors**: Blue (#6B9EFF) primary palette
- **Professional Typography**: System font stack
- **Responsive Grid**: Tailwind CSS utilities
- **Dark Mode Ready**: CSS variables implementation
- **Accessible Components**: WCAG compliant

### 🔐 Authentication
- **Supabase Auth** integration
- **OAuth Support** for social logins
- **Protected Routes** with session management
- **User Dashboard** for personalized experience

## 🚀 Performance & SEO

### Server-Side Rendering (SSR)
- **College Listings Page**: Fully server-rendered for optimal SEO
- **Revalidation**: Automatic data refresh every 60 seconds
- **Static Generation**: Individual college profiles pre-rendered at build time

### Static Site Generation (SSG)
- **37 College Profiles**: All individual college pages statically generated
- **Incremental Static Regeneration**: Pages revalidate every 120 seconds
- **Error Handling**: Graceful fallbacks when Supabase is unavailable

### SEO Optimization
- **Meta Tags**: Comprehensive SEO metadata for all pages
- **Structured Data**: Rich snippets for college information
- **Performance**: Optimized loading with static generation
- **Accessibility**: WCAG compliant design patterns

## 📊 Database Schema

The platform uses a Supabase PostgreSQL database with the following main tables:

### `colleges` Table
- `id` (uuid) - Primary key
- `name` (text) - College name
- `slug` (text) - URL-friendly identifier
- `city` (text) - City location
- `state` (text) - State location
- `estd` (integer) - Establishment year
- `affiliation` (text) - University affiliation
- `approvals` (text[]) - Approval bodies (AICTE, NBA, etc.)
- `rating` (numeric) - College rating (0-5)
- `highestpackage` (text) - Highest placement package
- `averagepackage` (text) - Average placement package
- `placementpercent` (numeric) - Placement percentage
- `description` (text) - College description
- `created_at` (timestamp) - Record creation time

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Supabase account (for database and auth)
- Git for version control

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Yuvraj-Bajpai/SecureCollege.git
cd SecureCollege

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Edit .env.local and add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Seed the database with 37 colleges
npm run seed:colleges

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Available Scripts

- `npm run dev` - Start development server (port 3001)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run analyze` - Analyze bundle size
- `npm run seed:colleges` - Populate database with sample data

## 🎨 Pages & Routes

### Main Routes
- `/` - Homepage with featured colleges and statistics
- `/colleges` - College listings with search and filters (SSR)
- `/colleges/[slug]` - Individual college profiles (37 dynamic routes, SSG)
- `/contact` - Contact information and form
- `/login` - User authentication
- `/signup` - User registration
- `/dashboard` - User dashboard (protected)

### API Endpoints
- `/api/health` - Health check endpoint
- `/auth/callback` - OAuth authentication callback

## 🔧 Configuration

### Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Rendering Strategies
- **SSR (Server-Side Rendering)**: Used for `/colleges` page with `export const revalidate = 60`
- **SSG (Static Site Generation)**: Used for college profiles with `generateStaticParams()` and `export const revalidate = 120`
- **ISR (Incremental Static Regeneration)**: Automatic revalidation for fresh data

### Error Handling
- **Connection Failures**: Graceful fallbacks when Supabase is unavailable
- **404 Handling**: Proper `notFound()` implementation for missing colleges
- **Logging**: Detailed console warnings for development debugging

### Tailwind CSS
Custom design system implemented via CSS variables in `app/globals.css` and mapped to Tailwind in `tailwind.config.ts`.

### TypeScript
Strict mode enabled with comprehensive type definitions in `types/index.ts`.

## 📊 Data Features

### College Data Includes
- Basic information (name, location, establishment year)
- Academic details (affiliation, approvals)
- Placement statistics (packages, percentages)
- Infrastructure information
- Notable recruiters
- Comprehensive descriptions

### Search & Filtering
- Search by college name
- Filter by location (city, state)
- Sort by rating, placement packages
- Category-based filtering

## 🎯 Recent Improvements

### SSR Implementation Completed ✅
- College listings page fully server-rendered for SEO
- Automatic revalidation every 60 seconds for fresh data
- Optimized performance with static generation patterns

### 404 Error Resolution ✅
- Comprehensive error handling in dynamic routes
- Graceful fallbacks when Supabase connections fail
- Detailed logging for development debugging

### All 37 College Profiles Verified ✅
- Complete dataset of 37 engineering colleges
- All profiles accessible through dynamic routes
- Static generation ensures optimal performance

### SEO Optimization ✅
- Meta tags and structured data implementation
- Performance optimizations through static generation
- Accessibility improvements for better user experience

## 🚀 Deployment

The platform is optimized for deployment on Vercel with:
- Automatic builds and deployments
- Environment variable management
- Performance monitoring
- Analytics integration

## 📞 Support

For questions or support, please refer to the documentation or create an issue in the repository.

---

Built with ❤️ using Next.js 14 and modern web technologies.