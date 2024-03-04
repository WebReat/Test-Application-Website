import routerOptions from './router.options'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image'
  ],
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  typescript: {
    typeCheck: true,
    strict: true
  },
  ssr: true,
  app: {
    head: {
      script:
        process.env.NODE_ENV === 'production'
          ? []
          : [
              {
                src: 'https://snippet.meticulous.ai/v1/meticulous.js',
                ['data-project-id']: '3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w',
                ['data-is-production-environment']: false
              }
            ]
    }
  },
  router: {
    options: routerOptions
  },
  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN,
    appleDeveloperToken: process.env.APPLE_DEVELOPER_TOKEN,

    public: {
      environment: process.env.NODE_ENV,
      appName: process.env.APP_NAME,
      githubRepoName: process.env.GITHUB_REPO_NAME,
      githubRepoOwner: process.env.GITHUB_REPO_OWNER
    }
  },
  components: {
    dirs: [
      {
        path: '~/components/containers',
        global: true
      },
      '~/components/common'
    ]
  },
  colorMode: {
    classSuffix: ''
  },
  i18n: {
    vueI18n: '~/i18n.config.ts',
    // lazy: true,
    // langDir: "lang",
    strategy: 'prefix_and_default',
    defaultLocale: 'de',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    locales: [
      {
        code: 'de',
        name: 'Deutsch'
        // file: "de.json",
      },
      {
        code: 'en',
        name: 'English'
        // file: "en.json",
      },
      {
        code: 'fr',
        name: 'Français'
        // file: "fr.json",
      },
      {
        code: 'it',
        name: 'Italiano'
        // file: "it.json",
      }
    ]
  }
})
