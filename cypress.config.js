const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://id.alohi.com',
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      // nothing related to uncaught:exception here ❌
    },
  },
  env: {
    FREE_EMAIL: 'zubkayare@gmail.com',
    FREE_PASSWORD: 'Tester525!.',
    ENTERPRISE_EMAIL: 'zubeir.abubakar525@gmail.com',
    ENTERPRISE_PASSWORD: 'Tester525!.',
    INVALID_EMAIL: 'Tester@gmail.com',
    INVALID_PASSWORD: 'Tester525!.'
  }
});
