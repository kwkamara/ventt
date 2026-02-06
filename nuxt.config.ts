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
        'material-icons/iconfont/material-icons.css',
        'material-icons/iconfont/outlined.css',
        'primeflex/primeflex.css',
        'primeicons/primeicons.css',
    ],

    fonts: {
        provider: 'local',
    },

})
