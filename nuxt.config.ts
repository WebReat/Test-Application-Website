import { fallbackLocale, languages, locale } from './assets/lang/index';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: ['de', 'en', 'fr', 'it'],
    legacy: false,
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: languages,
  },
});
