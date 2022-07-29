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

      '^gatsby-page-utils/(.*)$':
        'gatsby-page-utils/dist/$1', // Workaround for https://github.com/facebook/jest/issues/9771
      '^gatsby-core-utils/(.*)$':
        'gatsby-core-utils/dist/$1', // Workaround for https://github.com/facebook/jest/issues/9771
      '^gatsby-plugin-utils/(.*)$': [
        'gatsby-plugin-utils/dist/$1',
        'gatsby-plugin-utils/$1',
      ], // Workaround for https://github.com/facebook/jest/issues/9771
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
    transformIgnorePatterns: [
      '/node_modules/(?!react-dnd|core-dnd|@react-dnd|dnd-core|react-dnd-html5-backend|react-dnd-touch-backend)',
    ],
  };
};
