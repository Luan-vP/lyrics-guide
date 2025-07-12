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
        "script-src": "'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'"
      }
    },
  },
  // ssr: true,
  // nitro: {
  //   prerender: {
  //     routes: ['/poems/a-new-republic', '/poems/spherical-karens-in-a-vacuum', '/poems/n-rijsers-vet']
  //   }
  // },
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
})