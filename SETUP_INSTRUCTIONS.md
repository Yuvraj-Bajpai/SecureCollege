# Setup Instructions for Secure College

## Prerequisites

- Node.js 18.x or higher
- npm (comes with Node.js)

## Installation Steps

### 1. Install Node.js (If Not Already Installed)

Visit https://nodejs.org/ and download the LTS version.

**Windows Installation:**
1. Run the downloaded installer
2. Click "Next" through the wizard
3. Make sure "Add to PATH" is checked
4. Complete installation
5. Restart your terminal/IDE

**Verify Installation:**
```bash
node --version
npm --version
```

### 2. Install Project Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Run Development Server

```bash
npm run dev
```

Or use the setup script:
- **Windows**: Double-click `setup.bat`
- **PowerShell**: Run `.\setup.ps1`

### 4. Access the Website

Open your browser and visit:
- **URL**: http://localhost:3000

The website should load with:
- Secure College branding
- Professional homepage
- All components working

## Available Commands

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm start            # Run production build

# Quality
npm run lint         # Run ESLint
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Option 1: Use different port
npm run dev -- -p 3001

# Option 2: Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

### Dependencies Won't Install

```bash
# Clear cache
npm cache clean --force

# Remove node_modules
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Fresh install
npm install
```

### Build Errors

```bash
# Clear Next.js cache
Remove-Item -Recurse -Force .next

# Rebuild
npm run build
```

## Project Structure

```
SecureCollege/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── ui/               # Shadcn UI
│   └── common/           # Custom components
├── lib/                   # Utilities
├── public/images/         # Static assets
│   └── logo.png          # Your logo
└── package.json          # Dependencies
```

## Next Steps

After successful setup:

1. Customize your content in `app/page.tsx`
2. Add more pages in the `app/` directory
3. Modify components in `components/`
4. Update brand colors in `app/globals.css`
5. Deploy to production when ready

## Need Help?

- Check `README.md` for detailed documentation
- Review `QUICK_START.md` for quick reference
- All components are fully typed with TypeScript

---

**Status**: Ready to develop!

