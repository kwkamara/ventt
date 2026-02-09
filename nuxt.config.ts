import Material from '@primeuix/themes/material';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',

    devtools: {enabled: true},

    modules: [
        '@primevue/nuxt-module',
        '@nuxt/fonts',
        '@nuxtjs/i18n',
    ],

    i18n: {
        defaultLocale: 'en',

        locales: [
            { code: 'en', name: 'English', file: 'en.json' },
            { code: 'nl', name: 'Nederlands', file: 'nl.json' },
            { code: 'fr', name: 'French', file: 'fr.json' },
        ]
    },

    primevue: {
        options: {
            ripple: true,
            inputVariant: 'filled',
            theme: {
                preset: Material
            }
        }
    },

    css: [
        'material-icons/iconfont/material-icons.css',
        'primeflex/primeflex.css',
        'primeicons/primeicons.css',
    ],

    fonts: {
        provider: 'local',
    },

})