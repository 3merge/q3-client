const c = require('./packages/q3-ui-test-utils')(
  '<rootDir>/packages',
);

module.exports = {
  ...c,
  modulePathIgnorePatterns: [
    '<rootDir>/packages/(?:.+?)/lib/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/gatsby-theme-q3/lib/',
    '<rootDir>/packages/(?:.+?)/lib/',
    '<rootDir>/packages/(?:.+?)/node_modules/',
    '<rootDir>/packages/q3-ui/',
    '<rootDir>/example',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/.github/',
    '<rootDir>/.storybook/',
    '<rootDir>/.vscode/',
    '<rootDir>/example/',
    '<rootDir>/gatsby-theme-q3/',
    '<rootDir>/packages/(?:.+?)/__fixtures__/',
    '<rootDir>/packages/(?:.+?)/lib/',
    '<rootDir>/packages/(?:.+?)/node_modules/',
    '<rootDir>/packages/q3-ui-assets/',
    '<rootDir>/packages/q3-ui/',
    '.stories.',
    '.json',
  ],
};
