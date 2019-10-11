module.exports = {
  verbose: true,
  cacheDirectory: '.jest-cache',
  coverageDirectory: '.jest-coverage',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  testPathIgnorePatterns: [
    '<rootDir>/packages/(?:.+?)/lib/',
    '<rootDir>/packages/(?:.+?)/node_modules/',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/packages/(?:.+?)/lib/',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|git f|webp|svg)$':
      '<rootDir>/packages/q3-ui/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  'setupFilesAfterEnv': [
    '<rootDir>/packages/q3-ui-test-utils',
  ],
};
