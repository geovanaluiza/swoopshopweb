# SwoopShop · Northwest University official storefront

PICKUP-ONLY e-commerce site built with Nuxt 3. Sells official NU apparel, headwear,
and accessories — orders are picked up at the Merdian Building on campus.

## Stack
- Nuxt 3 (Vue 3, Vite)
- TypeScript
- Plain CSS using the official Northwest University Design System tokens
  (see `assets/css/tokens.css`)
- Static-site generation (Nitro `static` preset)

## Routes
- `/` — landing: hero, featured, categories, collections, pickup banner, newsletter
- `/product/[slug]` — product detail with size + color selectors and pickup-only note
- `/cart` — bag with pickup details
- `/checkout` — pickup form (name, email, phone, pickup slot) + order confirmation

## Design system
Strict consumers of NU design tokens (`assets/css/tokens.css`). No raw color or
spacing literals in component styles — only design-system CSS variables. Pages
styles in `assets/css/shop.css`.

## Scripts
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production static build into .output/public
npm run preview  # serve the build locally
```

## File map
```
assets/css/
  tokens.css       NU design system tokens
  shop.css         page + component styles
components/
  ShopHeader.vue
  ShopFooter.vue
  ProductCard.vue
  CategorySection.vue
  CollectionsGrid.vue
  PickupBanner.vue
  InstagramGrid.vue
  NewsletterBand.vue
composables/
  useProducts.ts   mock catalog (12 products)
  useCart.ts       cart state + localStorage
  useCheckout.ts   checkout form + pickup slot data
pages/
  index.vue        landing
  product/[slug].vue
  cart.vue
  checkout.vue
```
