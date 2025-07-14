// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui', 'floating-vue/nuxt', 'nuxt-security'],
  // content: {
  //   documentDriven: true
  // },
  security: {
    headers: {
      contentSecurityPolicy: {
        "default-src": "'self'",
        "script-src": "'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'",
        "frame-src": "'self' https://strudel.cc",
        "media-src": "'self' https://raw.githubusercontent.com",
        "connect-src": "'self' https://raw.githubusercontent.com",
        "img-src": "'self' data: https:"
      },
      // Disable problematic headers for HTTP deployment
      crossOriginOpenerPolicy: process.env.NODE_ENV === 'production' ? 'same-origin' : false,
      crossOriginResourcePolicy: 'cross-origin',
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'production' ? 'require-corp' : false
    },
  },
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
})