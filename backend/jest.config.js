const aliases = require('module-alias-jest/register');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  moduleNameMapper: aliases.jest,
};
