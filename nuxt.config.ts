// https://nuxt.com/docs/api/configuration/nuxt-config

import Lara from '@primevue/themes/lara';


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules:[
    '@primevue/nuxt-module'
  ],

  primevue: {
    options: {
      theme: {
        preset: Lara
      }
    }
  },

  css :[
      'primeflex/primeflex.css',
      'primeflex/themes/primeone-light.css'
  ]
})
