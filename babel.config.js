const os = require('os');

const withPackageOpts = (s) => `./packages/${s}/src`
const withPackageTests = (s) => `./packages/${s}/tests`;

const withTests = (s) => `${s}/tests`;
const withBundledDir = (s) => `${s}/lib`;

const alias = [
  'q3-admin',
  'q3-components',
  'q3-ui-assets',
  'q3-ui-charts',
  'q3-ui-comments',
  'q3-ui-confirm',
  'q3-ui-locale',
  'q3-ui',
  'q3-ui-audit',
  'q3-ui-datatables',
  'q3-ui-dialog',
  'q3-ui-emaileditor',
  'q3-ui-exports',
  'q3-ui-filters',
  'q3-ui-filemanager',
  'q3-ui-forms',
  'q3-ui-helpers',
  'q3-ui-navbar',
  'q3-ui-notifications',
  'q3-ui-queryparams',
  'q3-ui-permissions',
  'q3-ui-queuelogs',
  'q3-ui-repeater',
  'q3-ui-rte',
  'q3-ui-test-utils',
  'q3-ui-rest',
  'q3-ui-thread',
  'q3-ui-sse',
  'q3-ui-dropdownmenu',
].reduce(
  (acc, curr) => {
    const exportDefinitions = {
      [withBundledDir(curr)]: withPackageOpts(curr),
      [withTests(curr)]: withPackageTests(curr),
    }

    if (os.type() !== 'Darwin') {
      exportDefinitions[curr] = withPackageOpts(curr);
    }

    return Object.assign(acc, exportDefinitions)
  },
  {},
);

const withAlias = {
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.json'],
        root: ['.'],
        alias,
      },
    ],
  ],
};

const config = {
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-optional-chaining',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        'targets': {
          'node': 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
  env: {
    test: withAlias,
    // Only apply aliases in test environment to preserve workspace linking
    development: {},
    production: {},
  },
};

module.exports = config;
