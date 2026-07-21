// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'SwoopShop · Official Northwest University Store',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        {
          name: 'description',
          content:
            'Official Northwest University apparel, headwear, and accessories. Pickup only on campus at the Student Center – Pecota.'
        },
        { name: 'theme-color', content: '#0068bb' },
        { property: 'og:title', content: 'SwoopShop · Official Northwest University Store' },
        {
          property: 'og:description',
          content: 'Eagles gear up. The whole flock does. Pickup only on campus.'
        },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&display=swap'
        }
      ]
    }
  },

  css: ['~/assets/css/tokens.css', '~/assets/css/shop.css'],

  runtimeConfig: {
    public: {
      // Shopify Storefront API — set in .env:
      //   NUXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
      //   NUXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=shpat_public_token
      shopifyDomain: process.env.NUXT_PUBLIC_SHOPIFY_DOMAIN ?? '',
      shopifyStorefrontToken: process.env.NUXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? '',
    }
  },

  // Static-site generation so the storefront can be deployed as a plain static site.
  nitro: {
    preset: 'static'
  }
})
