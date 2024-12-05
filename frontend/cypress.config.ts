import { defineConfig } from "cypress";
import codeCoverage from "@cypress/code-coverage/task";

export default defineConfig({
  e2e: {
    baseUrl: "http://frontend-book",
    setupNodeEvents(on, config) {
      // Set up the code coverage task
      codeCoverage(on, config);
      return config;
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
