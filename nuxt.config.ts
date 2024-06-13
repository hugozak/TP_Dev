// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt"],
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  css: [
    '@/assets/css/main.css'
  ]
})