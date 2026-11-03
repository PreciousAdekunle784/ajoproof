# AjoProof

The AjoProof landing page: *Your Ajo. Now With Proof.*

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Motion (Framer Motion) · Lucide icons.

```bash
npm install
npm run dev      # http://localhost:3200
npm run build && npm start
```

## Where to change things

| What | Where |
|---|---|
| App links (Get Started, Sign In, savers page), contact and lender emails, nav items | `src/config/site.ts` |
| App URL (where Get Started and Sign In go) | `NEXT_PUBLIC_APP_URL` (default `http://localhost:3000`) |
| Public site URL for canonical / Open Graph | `NEXT_PUBLIC_SITE_URL` (default `https://ajoproof.ng`) |
| Colours and font | `@theme` at the top of `src/app/globals.css` |
| Hero copy | `src/components/hero/Hero.tsx` |
| Phone screen and floating cards (sample data) | `src/components/hero/PhoneMockup.tsx`, `FloatingCards.tsx` |
| Card positions around the phone (mobile / tablet / desktop) | `src/components/hero/HeroVisual.tsx` |
| Background strips, glow, vignette | `src/components/hero/HeroBackground.tsx` |
| Sections below the fold | `src/components/sections/*` |
| Social preview image | `src/app/opengraph-image.tsx` |

## Structure

```
src/app/            layout (metadata, font), page, globals.css, OG image, robots, sitemap, icon
src/config/site.ts  every URL in one place
src/components/
  Navbar.tsx        transparent, gains a background on scroll; mobile menu
  hero/             Hero, HeroBackground, HeroVisual, PhoneMockup, FloatingCards
  sections/         ValueProps, HowItWorks, Audiences, Security, FinalCta
  ui/               Logo, ButtonLink, Reveal, Section helpers, AjoGrid, MotionProvider
```

## Notes

- **Honest content.** Phone screens and cards are illustrative mockups with sample data (Mama Bisi, day 24 of 31).
  There are no user numbers, testimonials, named partners, regulatory claims or certifications. The lender report is labelled "sample".
- **AjoProof doesn't hold money.** The copy says so in the Security section and the footer: funds are held by licensed financial partners.
- **Performance.** The hero entrance, the card drift and the stamp sequence are CSS (they run before JavaScript loads,
  on the compositor). Motion handles the scroll reveals and the How It Works timeline, loaded through `LazyMotion` with
  only the DOM animation features. Plus Jakarta Sans is self-hosted and preloaded with a size-matched fallback; the Latin
  Extended subset (which carries ₦) is fetched only when needed.
  Mobile Lighthouse on a local production build: Performance 91–93, Accessibility 100, Best Practices 100, SEO 100, CLS 0.
- **Reduced motion.** With "reduce motion" on, nothing floats, stamps appear already placed and reveals don't move.
- **Deploying.** Import the repo into Vercel (framework: Next.js, root directory: the repo root). Set
  `NEXT_PUBLIC_SITE_URL` to the live domain and `NEXT_PUBLIC_APP_URL` to wherever the AjoProof app runs.
