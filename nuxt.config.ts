import Material from '@primeuix/themes/material';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',

    devtools: {enabled: false},

    modules: [
        '@primevue/nuxt-module',
        '@nuxt/fonts'
    ],

    primevue: {
        options: {
            ripple: true,
            inputVariant: 'filled',

            theme: {
                preset: Material
            }

        }
    },


    aos: {
        duration: 800,
    },

    css: [
        'primeflex/primeflex.css',
    ],

    fonts: {
        provider: 'local',
    },

})
