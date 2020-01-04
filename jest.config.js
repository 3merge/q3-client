module.exports = {
  verbose: true,
  testPathIgnorePatterns: [
    '<rootDir>/packages/(?:.+?)/lib/',
    '<rootDir>/packages/(?:.+?)/node_modules/',
    '<rootDir>/example/',
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
