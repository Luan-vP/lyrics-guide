// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui', 'floating-vue/nuxt', 'nuxt-security'],
  security: {
    headers: {
      contentSecurityPolicy: {
        'base-uri': ["'self'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'img-src': ["'self'", 'data:', 'https:', 'blob:'],
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'", // This is crucial for Strudel
          'https://strudel.cc',
          'https://cdn.jsdelivr.net',
          'https://unpkg.com',
          'data:',
          'blob:'
        ],
        'default-src': ["'self'"],
        'frame-src': ["'self'", 'https://strudel.cc'],
        'media-src': ["'self'", 'https://raw.githubusercontent.com', 'https://strudel.cc'],
        'connect-src': ["'self'", 'https://raw.githubusercontent.com', 'https://strudel.cc', 'https://cdn.jsdelivr.net'],
        'worker-src': ["'self'", 'blob:']
      },
      crossOriginEmbedderPolicy: false, // Disable COEP entirely
      crossOriginOpenerPolicy: false,   // Disable COOP entirely
      crossOriginResourcePolicy: false  // Disable CORP entirely
    },
  },
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
})