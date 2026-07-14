// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Northwest University — Follow Your Faith. Find Your Future.',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        {
          name: 'description',
          content:
            'Request your free info packet from Northwest University. Christian community in Kirkland, WA. 100% of programs include real internships. 94% of grads employed or in grad school within 6 months.'
        },
        { name: 'theme-color', content: '#0068bb' },
        { property: 'og:title', content: 'Northwest University — Follow Your Faith. Find Your Future.' },
        {
          property: 'og:description',
          content: 'A modern Christian university on 56 acres in Kirkland, WA. Real-world internships in every program.'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/snow-lake.jpg' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://use.typekit.net', crossorigin: '' },
        // TODO: swap for the official NU Typekit kit from the brand portal
        { rel: 'stylesheet', href: 'https://use.typekit.net/rxn3jgc.css' }
      ]
    }
  },

  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      // TODO (Marketing): set FORMSPREE_URL=https://formspree.io/f/YOUR_FORM_ID in .env
      // This is the endpoint for all lead form submissions (hero form, mini CTAs, scholarship gate)
      FORMSPREE_URL: '',
    }
  },

  // Static-site generation so the page can be deployed as a plain landing page.
  nitro: {
    preset: 'static'
  }
})