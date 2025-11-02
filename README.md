# Secure College Platform

> Your Gateway to Dream Engineering Colleges

A comprehensive Next.js 14 platform connecting students with engineering colleges across India. Built with modern web technologies and a professional, brand-aligned design system.

## 🎨 Brand Identity

- **Primary Color**: Blue (#6B9EFF) - Trust, professionalism, education
- **Secondary Color**: Black (#000000) - Elegance, clarity
- **Brand Personality**: Professional, trustworthy, modern, student-focused

## 🚀 Tech Stack

- **Framework**: Next.js 14.2+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: Shadcn/ui (customized with brand colors)
- **Icons**: Lucide React
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Code Quality**: ESLint + Prettier
- **Deployment**: Vercel (Mumbai region)

## 📁 Project Structure

```
secure-college/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with SEO
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles + design system
│   ├── icon.svg          # Favicon
│   ├── apple-icon.svg    # Apple touch icon
│   └── favicon.ico       # Traditional favicon
├── components/             # React components
│   ├── ui/               # Shadcn UI components
│   ├── common/           # Reusable components
│   └── sections/         # Page sections
├── lib/                   # Utilities & configuration
│   ├── utils.ts         # Helper functions
│   └── constants.ts     # Site-wide constants
├── types/                # TypeScript definitions
├── public/               # Static assets
│   └── images/          # Images (logo.svg)
├── tailwind.config.ts   # Tailwind configuration
└── components.json      # Shadcn configuration
```

## 🎨 Design System

### Color Palette

#### Primary Blue Scale (from logo #6B9EFF)
- 50: `#F0F5FF` - Lightest
- 100: `#E0EBFF`
- 200: `#C7DBFF`
- 300: `#A3C4FF`
- **400: `#6B9EFF`** - Primary
- 500: `#4A7FFF`
- 600: `#2E5FE6`
- 700: `#1E47CC`
- 800: `#1433A3`
- 900: `#0D2266` - Darkest

#### Neutral Grays
- 50: `#FAFAFA`
- 100: `#F5F5F5`
- 200: `#E5E5E5`
- 300: `#D4D4D4`
- 400: `#A3A3A3`
- 500: `#737373`
- **600: `#525252`** - Secondary text
- 700: `#404040`
- 800: `#262626`
- 900: `#171717`

### Typography

- **Base Font**: System font stack (San Francisco, Segoe UI, Roboto)
- **Base Size**: 16px
- **Line Height**: 1.5 (base), 1.25 (headings)
- **Weight Scale**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing Scale

4px increment-based spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px

### Border Radius

- sm: 6px
- base: 8px
- md: 10px
- lg: 12px
- xl: 16px
- full: 9999px

## 🧩 Components

### UI Components (Shadcn)
- `Button` - Primary and secondary actions
- `Card` - Container for content
- `Input` - Form inputs
- `Badge` - Status indicators
- `Label` - Form labels

### Common Components
- `Logo` - Secure College brand logo
- `SearchBar` - College search functionality
- `StarRating` - Rating display with stars
- `StatCard` - Statistics display card
- `CollegeCard` - College listing card

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account (for authentication)

### Installation

```bash
# Clone the repository
git clone https://github.com/Yuvraj-Bajpai/SecureCollege.git
cd SecureCollege

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Edit .env.local and add your Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=your-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size

## 🎯 Features

- ✅ Brand-aligned design system
- ✅ Responsive layout
- ✅ SEO optimized
- ✅ Type-safe with TypeScript
- ✅ Modern UI with Tailwind CSS
- ✅ Accessible components
- ✅ Dark mode ready (CSS variables)
- ✅ Professional typography

## 🔧 Configuration

### Tailwind CSS

The design system is implemented via CSS variables in `app/globals.css` and mapped to Tailwind in `tailwind.config.ts`.

### TypeScript

Strict mode enabled. Types defined in `types/index.ts`.

### Next.js

- App Router enabled
- Image optimization configured
- React strict mode on

## 📖 Key Pages

- `/` - Homepage with hero, stats, features, and CTA
- `/colleges` - College listings with filters
- `/colleges/[slug]` - Individual college profiles
- `/login` - User authentication
- `/signup` - User registration
- `/contact` - Contact form and FAQ
- `/compare` - College comparison (to be built)
- `/virtual-tours` - Virtual campus tours (to be built)
- `/premium` - Premium features (to be built)
- `/resources` - Educational resources (to be built)

## 🤝 Contributing

This is a brand-aligned educational platform. When making changes:

1. Follow the design system guidelines
2. Use brand colors (#6B9EFF, #000000)
3. Maintain TypeScript strict mode
4. Write accessible components
5. Follow Next.js best practices

## 📄 License

Proprietary - All rights reserved.

---

Built with ❤️ for students seeking their dream engineering college.

