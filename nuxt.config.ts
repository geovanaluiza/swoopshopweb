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
            'Official Northwest University apparel, headwear, and accessories. Pickup only on campus at the Merdian Building.'
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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  css: ['~/assets/css/tokens.css', '~/assets/css/shop.css'],

  // Static-site generation so the storefront can be deployed as a plain static site.
  nitro: {
    preset: 'static'
  }
})
