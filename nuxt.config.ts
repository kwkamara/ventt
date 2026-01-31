// https://nuxt.com/docs/api/configuration/nuxt-config

import Material from '@primeuix/themes/material';

export default defineNuxtConfig({

    compatibilityDate: '2024-11-01',

    devtools: {enabled: false},

    modules: [
        '@primevue/nuxt-module',
        '@nuxt/image',
        '@nuxt/fonts'
    ],

    primevue: {
        options: {
            theme: {
                preset: Material
            }
        }
    },

    css: [
        'primeflex/primeflex.css',
        'primeicons/primeicons.css',
    ],


})