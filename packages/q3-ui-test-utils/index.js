module.exports = (prefix) => {
  const makeFilePathForActiveProjectDir = (filename) =>
    // usually will just load from node_modules
    [prefix, 'q3-ui-test-utils', filename]
      .filter(Boolean)
      .join('/');

  return {
    globals: {
      __PATH_PREFIX__: '',
    },
    moduleNameMapper: {
      '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        makeFilePathForActiveProjectDir(
          'fixtures/mockFile.js',
        ),
    },
    setupFilesAfterEnv: [
      makeFilePathForActiveProjectDir('setup.js'),
      'jest-localstorage-mock',
    ],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: [
      'node_modules',
      '\\.cache',
      'public',
    ],
    transform: {
      '^.+\\.jsx?$':
        makeFilePathForActiveProjectDir('preprocess.js'),
    },
  };
};
