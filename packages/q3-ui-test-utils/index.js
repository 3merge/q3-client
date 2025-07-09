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

      // Workspace package mappings - try both .js and .jsx files
      '^q3-ui-locale$': [
        '<rootDir>/packages/q3-ui-locale/src/index.jsx',
        '<rootDir>/packages/q3-ui-locale/src/index.js'
      ],
      '^q3-ui-forms$': [
        '<rootDir>/packages/q3-ui-forms/src/index.js',
        '<rootDir>/packages/q3-ui-forms/src/index.jsx'
      ],
      '^q3-ui-rest$': [
        '<rootDir>/packages/q3-ui-rest/src/index.js',
        '<rootDir>/packages/q3-ui-rest/src/index.jsx'
      ],
      '^q3-ui-helpers$': [
        '<rootDir>/packages/q3-ui-helpers/src/index.js',
        '<rootDir>/packages/q3-ui-helpers/src/index.jsx'
      ],
      '^q3-ui-test-utils$': '<rootDir>/packages/q3-ui-test-utils/index.js',
      '^q3-ui-filemanager$': [
        '<rootDir>/packages/q3-ui-filemanager/src/index.js',
        '<rootDir>/packages/q3-ui-filemanager/src/index.jsx'
      ],
      '^q3-ui-confirm$': [
        '<rootDir>/packages/q3-ui-confirm/src/index.js',
        '<rootDir>/packages/q3-ui-confirm/src/index.jsx'
      ],
      '^q3-ui-dialog$': [
        '<rootDir>/packages/q3-ui-dialog/src/index.jsx',
        '<rootDir>/packages/q3-ui-dialog/src/index.js'
      ],
      '^q3-ui-assets$': [
        '<rootDir>/packages/q3-ui-assets/src/index.js',
        '<rootDir>/packages/q3-ui-assets/src/index.jsx'
      ],
      '^q3-ui-permissions$': [
        '<rootDir>/packages/q3-ui-permissions/src/index.jsx',
        '<rootDir>/packages/q3-ui-permissions/src/index.js'
      ],
      '^q3-admin$': [
        '<rootDir>/packages/q3-admin/src/index.js',
        '<rootDir>/packages/q3-admin/src/index.jsx'
      ],
      '^q3-components$': [
        '<rootDir>/packages/q3-components/src/index.js',
        '<rootDir>/packages/q3-components/src/index.jsx'
      ],

      '^gatsby-page-utils/(.*)$':
        'gatsby-page-utils/dist/$1',
      '^gatsby-core-utils/(.*)$':
        'gatsby-core-utils/dist/$1',
      '^gatsby-plugin-utils/(.*)$': [
        'gatsby-plugin-utils/dist/$1',
        'gatsby-plugin-utils/$1',
      ],
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
