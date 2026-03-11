const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://www.saucedemo.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: false,
      json: true,
      embeddedScreenshots: true,
      inlineAssets: true
    },
    video: true, // Optional: Records video of the run
    screenshotOnRunFailure: true, // Captures screen on error
  },
});
