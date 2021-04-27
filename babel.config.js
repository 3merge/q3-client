const os = require('os');

const withPackageOpts = (s) =>
  os.type() !== 'Darwin'
    ? `./packages/${s}/src`
    : `/packages/${s}/src`;

const withPackageTests = (s) => `./packages/${s}/tests`;

const withTests = (s) => `${s}/tests`;
const withBundledDir = (s) => `${s}/lib`;

const alias = [
  'q3-admin',
  'q3-blocks',
  'q3-components',
  'q3-ui-assets',
  'q3-ui-charts',
  'q3-ui-confirm',
  'q3-ui-locale',
  'q3-ui',
  'q3-ui-datatables',
  'q3-ui-dialog',
  'q3-ui-exports',
  'q3-ui-filemanager',
  'q3-ui-forms',
  'q3-ui-helpers',
  'q3-ui-notifications',
  'q3-ui-queryparams',
  'q3-ui-permissions',
  'q3-ui-repeater',
  'q3-ui-rte',
  'q3-ui-test-utils',
  'q3-ui-rest',
].reduce((acc, curr) => {
  return Object.assign(acc, {
    [withBundledDir(curr)]: withPackageOpts(curr),
    [withTests(curr)]: withPackageTests(curr),
    [curr]: withPackageOpts(curr), // default exports
  });
}, {});

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
    development: withAlias,
    production: withAlias,
  },
};

module.exports = config;
