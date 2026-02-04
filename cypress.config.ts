import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: false,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "src/main/test/cypress/support/index.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "src/main/test/cypress/e2e/**/*.spec.ts",
  },
});
