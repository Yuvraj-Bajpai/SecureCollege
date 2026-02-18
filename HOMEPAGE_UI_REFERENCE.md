---
title: "Homepage UI Reference"
description: "Design tokens, layout patterns, and interaction rules used on the Secure College homepage."
---

# Overall Principles

- Dark, cinematic base with subtle blue/cyan glows and particles
- Glassmorphism for key surfaces (cards, inputs, social icons)
- Strong primary blue gradient CTAs reused across hero, finder, and footer
- Motion: soft fades and slides via Framer Motion + Tailwind keyframes

# Fonts & Typography

- Fonts are loaded in [layout.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/app/layout.tsx#L1-L27)
  - Primary: Inter (`--font-inter`) for body and general text
  - Headings: Poppins (`--font-poppins`) for hero and section titles
- Global text styles in [globals.css](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/app/globals.css#L150-L186)
  - Body:
    - `font-family: var(--font-inter, ...)`
    - Base size `var(--font-size-base)` (16px)
    - Line height `var(--line-height-normal)`
  - Headings:
    - `font-family: var(--font-poppins, var(--font-inter, ...))`
    - `font-weight: var(--font-weight-bold)`
    - `line-height: var(--line-height-tight)`
    - `letter-spacing: -0.02em`
- Key homepage text sizes
  - Hero title: `text-5xl md:text-6xl` (Poppins)
  - Hero subtitle: `text-lg md:text-xl` with `text-gray-300`
  - Section titles: `text-3xl sm:text-4xl`, `font-semibold`
  - Body/description text: `text-base` or `text-sm` with `text-[#A1A1AA]` on dark background

# Colors & Tokens

## Core tokens (from Tailwind + CSS variables)

- Configured in [tailwind.config.ts](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/tailwind.config.ts#L20-L73)
  - `primary` scale: `var(--color-blue-50..900)` mapped to Tailwind `primary-*`
  - `background`: `var(--color-background)`
  - `surface`: `var(--color-surface)`
  - `card.DEFAULT`: `var(--color-card-bg)`
  - `card.border`: `var(--color-card-border)`
  - `text.DEFAULT` / `text.secondary`
  - `border.DEFAULT` / `border.strong`
- Light theme CSS variables (early section of [globals.css](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/app/globals.css#L51-L92))
  - Primary brand: `--color-primary: #6B9EFF`
  - Grays `--color-gray-50..900` for neutral text/background
- Dark theme overrides (later in [globals.css](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/app/globals.css#L150-L169))
  - `--color-background: #020617` (near-slate/black)
  - `--color-surface: #0B1120`
  - `--color-text: #E5E7EB`
  - `--color-text-secondary: #B0B0B0`
  - `--color-primary: #6B9EFF` preserved for consistency

## Homepage-specific colors

Defined directly as Tailwind-style hex utility classes in [app/page.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/app/page.tsx):

- Background and global gradient
  - Wrapper: `bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A]`
  - Radial glow at top: `bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.1),transparent)]`
- Glow blobs (global background elements)
  - `bg-[#5B8DEF]/10` (blue glow)
  - `bg-indigo-500/10`
  - `bg-cyan-500/10`
- Hero title highlight
  - Accent span: `text-[#5B8DEF]`
- Neutral body text on dark
  - `text-gray-300`, `text-[#A1A1AA]`, `text-white/70`, `text-white/60`
- Glass cards / surfaces
  - Main finder card: `bg-[#121212] border border-white/5`
  - Feature cards: `bg-white/5 border border-white/10`
  - Other content cards: `bg-[#121212] border border-white/5`

# Layout & Spacing

- Page wrapper
  - `relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden`
  - Fixed particle + glow layer: `fixed inset-0 pointer-events-none z-0`
  - Content layer: `relative z-10`
- Containers
  - Hero content: `max-w-7xl mx-auto px-6 pt-32 pb-16`
  - Sections: `container mx-auto px-4`
- Section spacing
  - Major sections use `py-20`
  - Final CTA section uses `py-16` to tighten bottom spacing

# Components & Glassmorphism

## Rank-based Quick Finder card

Location: [app/page.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/app/page.tsx#L222-L417)

- Card
  - `Card` with `className="mx-auto max-w-5xl overflow-visible rounded-2xl border border-white/5 bg-[#121212] transition-shadow hover:shadow-primary-glow"`
  - Glass feel via dark semi-transparent background and light border
- Heading
  - `text-2xl sm:text-3xl font-bold text-white`
  - Inline `textShadow: '0 0 14px rgba(91, 141, 239, 0.25)'`
- Subtitle
  - `text-[#A1A1AA]` with `mt-2 mb-6`
- Inputs
  - General:
    - Height: `h-12`
    - Background: `bg-white/50` or `dark:bg-slate-900/50`
    - Border: `border-white/20`
    - Blur: `backdrop-blur-sm`
  - Rank input:
    - `type="number"`, `min={1}`, `max={999999}`
    - Clamps negative values in `onInput`
  - Dropdown triggers (branch/state):
    - `flex h-12 w-full items-center justify-between`
    - Same glass background and border as inputs
- Dropdown menus
  - Container:
    - `absolute z-50 mt-2 w-full max-h-[300px] overflow-y-auto overflow-x-hidden`
    - `rounded-xl border border-white/20 bg-white shadow-2xl backdrop-blur-xl dark:bg-slate-900`
    - Custom scrollbars: `scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-transparent`
  - Sticky search header:
    - `sticky top-0 z-10 border-b border-slate-100 bg-white/80 p-2 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80`
  - Options:
    - Active: `bg-primary/10 font-semibold text-primary`
    - Inactive: `text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800`

## Feature cards ("premium guidance suite")

Location: [app/page.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/app/page.tsx#L422-L480)

- Grid:
  - `mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`
- Card:
  - `Card` with `className="h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-shadow hover:shadow-primary-glow"`
  - Stronger glass effect via `bg-white/5` and `backdrop-blur-xl`
- Icon pill:
  - `inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary`
- Text:
  - Title: `text-lg font-semibold text-white`
  - Description: `text-sm text-[#A1A1AA]`

## Testimonial cards

Location: [app/page.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/app/page.tsx#L568-L627)

- Card:
  - `Card` with `className="h-full border border-white/5 bg-[#121212] text-white transition-shadow hover:shadow-primary-glow"`
- Stars:
  - Uses `Star` icon with `className="h-5 w-5 fill-yellow-400 text-yellow-400"`
- Text:
  - Quote: `text-sm leading-relaxed text-white/80`
  - Name: `text-base font-semibold text-white`
  - College: `text-xs text-white/60`

## Social icons (footer)

Location: [Footer.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/components/common/Footer.tsx#L65-L82)

- Social icon link:
  - `w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/80 shadow-sm transition-all`
  - Hover:
    - `hover:text-white`
    - `hover:border-primary/60`
    - `hover:bg-primary/30`
    - `hover:shadow-primary/40`
    - `hover:-translate-y-0.5 hover:scale-110`

## Newsletter block (footer top)

Location: [Footer.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/components/common/Footer.tsx#L20-L44)

- Section background:
  - `bg-gradient-to-r from-[#0B1120] via-[#020617] to-[#020617] border-b border-white/10`
- Email input:
  - `flex-1 h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-primary`
- Subscribe button:
  - Gradient CTA: `bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900`
  - `text-white font-semibold shadow-lg hover:shadow-xl h-12 px-8`

# CTAs & Buttons

- Primary hero CTA (Rank finder)
  - Location: [app/page.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/app/page.tsx#L402-L413)
  - Styles:
    - `w-full max-w-md h-14`
    - `bg-gradient-to-r from-primary-600 to-primary-800`
    - `hover:from-primary-700 hover:to-primary-900`
    - `text-white text-lg font-semibold shadow-xl hover:shadow-xl`
  - Label: `Find My College` (matches navbar CTA)
- Secondary CTAs (bottom card)
  - Dark solid:
    - `bg-slate-900 text-white shadow-xl hover:bg-slate-800`
    - Dark-mode inversion: `dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100`
  - Outline glass:
    - `border-slate-300 bg-white/70 text-slate-900 hover:bg-white`
    - Dark: `dark:border-white/20 dark:bg-slate-900/40 dark:text-white`

# Background Effects & Cursor/Particles

## Particle background

Component: [ParticleBackground.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/components/common/ParticleBackground.tsx#L1-L67)

- Uses `@tsparticles/react` with `@tsparticles/slim` engine
- Key settings:
  - `background.color` transparent; particles render over page gradient
  - `fullScreen.enable = false`, `zIndex = 0` so it sits under content inside wrapper
  - Interactivity:
    - `onHover.mode = 'repulse'` with `distance: 140`, `duration: 0.6`
    - This creates cursor-based particle repulsion
  - Particles:
    - Colors: `['#5B8DEF', '#A78BFA', '#93B8FF']`
    - Links: `color: 'rgba(91, 141, 239, 0.25)'`, `opacity: 0.4`
    - Motion: `speed: 1.2`, `random: true`, `outModes.default = 'bounce'`

## Glow blobs

Defined in homepage wrapper background ([app/page.tsx](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/app/page.tsx#L175-L183)):

- Large radial gradient at top for atmospheric glow
- Multiple absolutely positioned divs:
  - Positions: top-right, top-left, bottom-right, mid-right
  - Colors: blue/indigo/cyan variants with `/10` alpha
  - Blur radii: `blur-3xl`, `blur-[120px]`, `blur-[100px]`
  - Slow pulsing via `animate-pulse` on two blobs

# Animations & Motion

## Framer Motion usage

- Hero intro:
  - `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` with `duration: 0.6`
- Rank finder card:
  - Appears with `initial` + `whileInView` and `viewport={{ once: true }}`
- Feature / testimonial / step cards:
  - `initial={{ opacity: 0, y: 20 }}`
  - `whileInView={{ opacity: 1, y: 0 }}` with staggered `delay`
  - `whileHover={{ y: -5 }}` for lift on hover
- CTAs:
  - `whileHover={{ scale: 1.05 }}` and `whileTap={{ scale: 0.95 }}` on important buttons

## Tailwind-based keyframes

Defined in [globals.css](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/app/globals.css#L220-L242) and [tailwind.config.ts](file:///c:/Users/Lenovo/OneDrive/Documents/SecureCollege/tailwind.config.ts#L121-L144):

- `animate-blob`: organic blob movement for potential background elements
- `animate-fade-in`: `fadeInUp` from 30px below with 0.6s ease-out
- Tailwind `animation` entries:
  - `'fade-in'`, `'slide-up'`, `'slide-down'` for reusable transitions

# Reuse Guidelines for Other Pages

- Use the same dark background shell as the homepage:
  - Wrapper: `bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white`
  - Optional: include `<ParticleBackground />` inside a `relative` container if you want particles
- For key cards:
  - Default dark card: `border border-white/5 bg-[#121212] hover:shadow-primary-glow`
  - Glassmorphic variant: `border border-white/10 bg-white/5 backdrop-blur-xl`
- For section headings:
  - `text-3xl sm:text-4xl font-semibold text-white` with optional text shadow
- For secondary text:
  - Prefer `text-[#A1A1AA]` on dark backgrounds; `text-gray-300` for slightly brighter copy
- For primary CTAs:
  - Reuse the gradient button styles from the navbar and hero:  
    `bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold shadow-lg hover:shadow-xl`

