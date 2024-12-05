import codeCoverageTask from "@cypress/code-coverage/task";

module.exports = (on, config) => {
  codeCoverageTask(on, config);
  return config;
};
