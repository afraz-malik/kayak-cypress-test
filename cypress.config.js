const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'cjfajn',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integrations/**/*.js",
    //pageLoadTimeout: 600000
  },
});
