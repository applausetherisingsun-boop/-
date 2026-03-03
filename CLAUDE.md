# CLAUDE.md — SHIROKUMA Longevity Science Platform

This file provides AI assistants (Claude Code and others) with the context needed to work effectively in this repository.

---

## Project Overview

**SHIROKUMA** is a Next.js web application delivering a Japanese longevity science platform for a global audience. It bridges peer-reviewed research with curated Japanese health practices across six health axes.

**Core value proposition:** Free diagnostic tool → personalized product recommendations → science library → membership for ongoing research access → seller marketplace for certified Japanese longevity products.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI library | React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Linting | ESLint 9 (flat config) |

---

## Directory Structure

```
/
├── public/                     # Static assets (SVGs, favicon)
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout: wraps all pages with Nav + Footer
│   │   ├── page.tsx            # Homepage (hero, 6-axis overview, CTAs)
│   │   ├── globals.css         # Global CSS styles
│   │   ├── core/               # CORE membership page
│   │   │   └── page.tsx
│   │   ├── diagnosis/          # Diagnosis tool
│   │   │   ├── page.tsx        # Server wrapper with SEO metadata
│   │   │   └── DiagnosisTool.tsx  # "use client" interactive quiz component
│   │   ├── marketplace/        # Product marketplace
│   │   │   └── page.tsx
│   │   ├── science/            # Science library / research articles
│   │   │   └── page.tsx
│   │   └── seller/             # Seller application flow
│   │       └── page.tsx
│   ├── components/
│   │   └── layout/
│   │       ├── Navigation.tsx  # Sticky header, responsive mobile menu
│   │       └── Footer.tsx      # Bilingual footer (EN/JP)
│   └── lib/
│       └── diagnosis.ts        # Diagnosis engine: questions, scoring, axis configs
├── eslint.config.mjs           # ESLint 9 flat config (Next.js + TypeScript rules)
├── next.config.ts              # Next.js config (minimal, extend as needed)
├── postcss.config.mjs          # PostCSS for Tailwind v4
└── tsconfig.json               # TypeScript config (strict, path alias @/*)
```

---

## Development Commands

```bash
npm run dev      # Start dev server → http://localhost:3000
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint across the codebase
```

> There is currently no test runner configured. If adding tests, prefer **Vitest** (compatible with the Vite-adjacent Next.js toolchain) or **Jest** with `ts-jest`.

---

## Key Conventions

### Next.js App Router Patterns

- **Server Components** are the default. All pages in `src/app/` are server components unless they explicitly include `"use client"` at the top.
- **Client Components** (interactive UI, state, hooks) live alongside their page file (e.g., `DiagnosisTool.tsx` next to `diagnosis/page.tsx`). The `page.tsx` is the thin server wrapper providing metadata.
- Metadata for SEO is exported from `page.tsx` server components using `export const metadata = { ... }`.
- The root layout (`src/app/layout.tsx`) includes `<Navigation />` and `<Footer />` for every page.

### TypeScript

- **Strict mode is enabled** — no implicit `any`, no loose null checks.
- Path alias `@/*` maps to `./src/*`. Always use `@/` imports rather than relative paths that traverse more than one level.
- Types for domain concepts (e.g., `AxisKey`, `Question`, `AxisConfig`) are defined in `src/lib/diagnosis.ts` and should be imported from there, not redefined.

### Styling

- **Tailwind CSS v4** utility classes are used throughout. Do not introduce a separate CSS-in-JS solution.
- Custom color palette used consistently across components:
  - Background dark: `#1a1a18`
  - Gold accent: `#c9a96e`
  - Green accent: `#7a9e7e`
- Responsive design: always include mobile-first breakpoints (`sm:`, `md:`, `lg:`).
- Framer Motion (`motion.*` components) is available for animations. Use it for entrance animations and interactive feedback.

### Component Style

- Prefer functional components with TypeScript props interfaces defined inline or just above the component.
- Keep components focused — large pages are acceptable since they are self-contained routes, but extract shared UI elements to `src/components/`.
- Lucide React icons are the standard icon library. Import individual icons, not the whole package.

---

## Domain Model: The 6 Axes

The platform organizes all content around six longevity health axes. These are defined in `src/lib/diagnosis.ts` and used consistently across the diagnosis tool, marketplace, science library, and homepage.

| Axis Key | Label | Focus |
|---|---|---|
| `inflammation` | Inflammation | Anti-inflammatory markers, chronic inflammation |
| `gut` | Gut Microbiome | Digestive health, fermented foods |
| `neural` | Neural Vitality | Cognitive health, brain function |
| `metabolic` | Metabolic Health | Blood sugar, energy metabolism |
| `hormonal` | Hormonal Balance | Stress hormones, endocrine health |
| `social` | Social Vitality | Connection, purpose, community |

When adding new features (products, articles, questions), map them to one or more of these axes using the `AxisKey` type.

---

## Diagnosis Engine (`src/lib/diagnosis.ts`)

Core scoring logic:

- **25 questions** across the 6 axes (4–5 per axis), each with 5 answer options scored 1–5.
- `calculateScores(answers)` → returns a `Record<AxisKey, number>` (0–100 per axis).
- `getOverallScore(scores)` → weighted average across axes.
- `getScoreLabel(score)` → one of: `"Critical" | "Needs Work" | "Moderate" | "Good" | "Excellent"`.
- `axisConfigs` array holds per-axis metadata: icon component, color, key insights, and protocol recommendations.

When modifying diagnosis logic, ensure all 25 questions remain balanced (no axis should have fewer than 4 questions) and that scoring remains on the 0–100 scale.

---

## Adding New Pages

1. Create `src/app/<route>/page.tsx` as a Server Component.
2. Export `metadata` for SEO.
3. If the page needs client interactivity, create a companion `<PageName>Client.tsx` with `"use client"`.
4. Add a link to `src/components/layout/Navigation.tsx` (desktop nav array + mobile menu list).
5. Add a link to `src/components/layout/Footer.tsx` if appropriate.

---

## No Tests Currently

The project has **no test infrastructure**. Do not assume tests exist or that `npm test` works. If asked to add tests:

- Recommend Vitest + React Testing Library for component tests.
- Unit test `src/lib/diagnosis.ts` scoring functions first (pure functions, easy to test).

---

## No CI/CD Currently

There are no GitHub Actions workflows. If adding CI:

- Lint: `npm run lint`
- Build check: `npm run build`
- Test (when added): `npm test`

---

## Git Workflow

- **Main branch:** `master`
- Feature branches use the prefix `claude/` for AI-generated work.
- Commit messages follow conventional style: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.

---

## Deployment

The project is designed for deployment on **Vercel** (standard Next.js App Router output). No custom server or Docker configuration exists. The `.next/` build output directory is gitignored.

---

## Key Files Quick Reference

| Purpose | File |
|---|---|
| All axis/question data and scoring | `src/lib/diagnosis.ts` |
| Root layout + global nav/footer | `src/app/layout.tsx` |
| Homepage | `src/app/page.tsx` |
| Interactive diagnosis quiz | `src/app/diagnosis/DiagnosisTool.tsx` |
| Product marketplace (client) | `src/app/marketplace/page.tsx` |
| Science library | `src/app/science/page.tsx` |
| Membership page | `src/app/core/page.tsx` |
| Seller application | `src/app/seller/page.tsx` |
| Navigation component | `src/components/layout/Navigation.tsx` |
| Footer component | `src/components/layout/Footer.tsx` |
| TypeScript config | `tsconfig.json` |
| ESLint config | `eslint.config.mjs` |
