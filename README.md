# Explorenu — Northwest University landing

A Nuxt 3 + Vue 3 port of the "Request Info" landing page for
Northwest University (Kirkland, WA). Built on the official NU
design system tokens (colors, type, spacing, radius, shadow).

## Stack
- Nuxt 3 (SSR + static prerender via `nitro.preset: 'static'`)
- Vue 3 `<script setup>` SFCs
- Vanilla CSS, organized as design tokens + components
- Zero runtime JS dependencies besides Vue/Nuxt

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to .output/public
```

## Project layout
```
app.vue                 # Nuxt root
pages/index.vue         # Single landing page (composes all sections)
components/
  SiteHeader.vue
  SiteFooter.vue
  HeroSection.vue
  LeadForm.vue          # The "Request Info" form (hero placement)
  TrustBar.vue
  WhySection.vue        # Animated stat counters
  ProgramsSection.vue   # Tabbed program grid
  LifeSection.vue       # Campus life editorial
  StoriesSection.vue    # Testimonials
  FinalCta.vue          # Mini form (footer CTA)
composables/
  useReveal.ts          # IntersectionObserver reveal
  useCountUp.ts         # Animated stat counters
  useStickyHeader.ts
  usePrograms.ts        # Program data + tab state
  useLeadForm.ts        # Form state, validation, submit
assets/css/
  tokens.css            # Design system tokens (colors, type, space, …)
  main.css              # Component styles
server/api/
  lead.post.ts          # Optional POST /api/lead handler
public/                 # Hero + campus photography (auto-copied from /assets)
```

## Image assets
The 14 campus photos that ship under `public/` were curated from
`../display-web/public/images/`. To swap in new photography, drop
the new files into `public/` and update the `image` paths in
`composables/usePrograms.ts` and the `<img src>` calls in
`components/{HeroSection,LifeSection,StoriesSection}.vue`.

## TODO markers
- `nuxt.config.ts` — Typekit kit ID
- `composables/usePrograms.ts` — Program descriptions
- `components/StoriesSection.vue` — Real testimonials
- `composables/useLeadForm.ts` + `server/api/lead.post.ts` —
  Wire the form to the real CRM / ESP endpoint
