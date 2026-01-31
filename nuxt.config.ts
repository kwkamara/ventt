// https://nuxt.com/docs/api/configuration/nuxt-config

import Material from '@primeuix/themes/material';

export default defineNuxtConfig({

    compatibilityDate: '2024-11-01',

    devtools: {enabled: true},

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
        'primeflex/themes/primeone-light.css',
        'primeicons/primeicons.css',
    ],


    app: {
        //baseURL: "/ventt/",

        head: {
            title: "Ventt - Smart Ecommerce",
            meta: [
                {
                    name: "description",
                    content: "Discover Ventt, the ultimate online shopping platform for a seamless and modern retail experience. Shop the latest trends, enjoy fast delivery, and explore exclusive deals tailored just for you."
                },
                {
                    name: "keywords",
                    content: "online shopping, ecommerce, modern shopping platform, Ventt, shop online, fast delivery, exclusive deals, retail experience"
                },
                {
                    name: "author",
                    content: "Ventt"
                },
                {
                    property: "og:title",
                    content: "Ventt - Your Modern Online Shopping Destination"
                },
                {
                    property: "og:description",
                    content: "Discover Ventt, the ultimate online shopping platform for a seamless and modern retail experience. Shop the latest trends, enjoy fast delivery, and explore exclusive deals tailored just for you."
                },
                {
                    property: "og:type",
                    content: "website"
                },
                {
                    property: "og:url",
                    content: "https://www.ancesys.com/ventt"
                },

                // { property: "og:image", content: "https://www.ancesys.com/ventt/ventt-logo.jpg" },

                {
                    name: "twitter:card",
                    content: "summary_large_image"
                },
                {
                    name: "twitter:title",
                    content: "Ventt - Your Modern Online Shopping Destination"
                },
                {
                    name: "twitter:description",
                    content: "Discover Ventt, the ultimate online shopping platform for a seamless and modern retail experience. Shop the latest trends, enjoy fast delivery, and explore exclusive deals tailored just for you."
                },

                // { name: "twitter:image", content: "https://www.ancesys.com/ventt/ventt-logo.jpg" }
            ]
        }

    },

    image: {
        format: ['webp'],
        domains: ['ancesys.com']
    }
})