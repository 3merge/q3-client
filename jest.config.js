module.exports = {
  verbose: false,
  modulePathIgnorePatterns: [
    '<rootDir>/gatsby-theme-q3/lib/',
    '<rootDir>/packages/(?:.+?)/lib/',
    '<rootDir>/cypress/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/packages/(?:.+?)/lib/',
    '<rootDir>/packages/(?:.+?)/node_modules/',
    '<rootDir>/packages/q3-blocks/',
    '<rootDir>/packages/q3-components/',
    '<rootDir>/packages/q3-ui/',
    '<rootDir>/example',
    '<rootDir>/gatsby-theme-q3',
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
    '<rootDir>/packages/q3-blocks/',
    '<rootDir>/packages/q3-components/',
    '<rootDir>/packages/q3-ui/',
    '.stories.',
    '.json',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|git f|webp|svg)$':
      '<rootDir>/packages/q3-ui/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [
    '<rootDir>/packages/q3-ui-test-utils',
    'jest-localstorage-mock',
  ],
};
