const aliases = require('module-alias-jest/register');

module.exports = {
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  moduleNameMapper: aliases.jest,
};
