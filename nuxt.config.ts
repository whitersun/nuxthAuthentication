import { fileURLToPath, URL } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
      }
    }
  },

  ssr: false,

  modules: [
    '@nuxthq/ui',
    'nuxt-icon',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    'nuxt-mongoose',
    '@hypernym/nuxt-anime',
  ],

  mongoose: {
    uri: process.env.MONGODB_URL,
    modelsDir: 'models',
    options: {
      dbName: process.env.MONGODB_DB,
      serverSelectionTimeoutMS: 30000,
    }
  },

  nitro: {
    plugins: ["~/server/index.ts"]
  },

  anime: {
    composables: true
  },

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  // supabase: {
  //   url: process.env.SUPABASE_URL,
  //   key: process.env.SUPABASE_KEY,
  //   serviceKey: process.env.SUPABASE_SERVICE_KEY,
  // },

  ui: {
    icons: ['mdi', 'line-md', 'mingcute'],    
  },

  image: {
    domains: ['https://source.unsplash.com', 'https://picsum.photos'],
  },

  app: {
    head: {
      meta: [{
        name: 'Nuxt3 Auth Demo',
      }],
      script: [
        {
          src: '',
        }
      ],
      link: [
        {
          href: 'https://fonts.googleapis.com',
          rel: 'preconnect',
        },
        {
          href: 'https://fonts.gstatic.com',
          rel: 'preconnect',
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap',
          rel: 'stylesheet',
        },
      ],
    },

    layoutTransition: { name: 'page', mode: 'out-in' }

  },

  css: [
    '~/assets/scss/tailwind.scss',
    '~/assets/scss/main.scss',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

})
