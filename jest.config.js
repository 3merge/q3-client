module.exports = {
  verbose: false,
  testPathIgnorePatterns: [
    '<rootDir>/packages/(?:.+?)/lib/',
    '<rootDir>/packages/(?:.+?)/node_modules/',
    '<rootDir>/e2e-tests',
    '<rootDir>/gatsby-theme-q3',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/.github/',
    '<rootDir>/.storybook/',
    '<rootDir>/.vscode/',
    '<rootDir>/packages/(?:.+?)/lib/',
    '<rootDir>/packages/(?:.+?)/node_modules/',
    '<rootDir>/packages/q3-ui-assets',
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
