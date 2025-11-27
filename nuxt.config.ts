// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui', 'floating-vue/nuxt', 'nuxt-security'],
  security: {
    headers: {
      contentSecurityPolicy: {
        "default-src": "'self'",
        "script-src": "'self' 'unsafe-eval' 'unsafe-inline' https://strudel.cc https://cdn.jsdelivr.net https://unpkg.com data: blob:",
        "frame-src": "'self' https://strudel.cc",
        "media-src": "'self' https://raw.githubusercontent.com https://strudel.cc",
        "connect-src": "'self' https://raw.githubusercontent.com https://strudel.cc https://cdn.jsdelivr.net",
        "img-src": "'self' data: https: blob:",
        "style-src": "'self' 'unsafe-inline' https://strudel.cc https://cdn.jsdelivr.net",
        "font-src": "'self' data: https:",
        "worker-src": "'self' blob:"
      },
      // Use credentialless instead of require-corp for better iframe compatibility
      crossOriginEmbedderPolicy: 'credentialless',
      crossOriginOpenerPolicy: 'same-origin-allow-popups',
      crossOriginResourcePolicy: 'cross-origin'
    },
  },
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
})