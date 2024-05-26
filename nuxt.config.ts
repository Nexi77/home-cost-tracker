// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/styles/main.scss', 'vue-toastification/dist/index.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  modules: ['@formkit/nuxt', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiUrl: '',
    }
  },
})
