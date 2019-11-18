const withPackageOpts = (s) => `./packages/${s}/src`;
const withBundledDir = (s) => `${s}/lib`;

const alias = [
  'q3-admin',
  'q3-axios-mock',
  'q3-ui',
  'q3-ui-commons',
  'q3-ui-forms',
  'q3-ui-permissions',
  'q3-ui-rest',
].reduce(
  (acc, curr) =>
    Object.assign(acc, {
      [withBundledDir(curr)]: withPackageOpts(curr),
      [curr]: withPackageOpts(curr), // default exports
    }),
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
  plugins: ['@babel/plugin-proposal-export-namespace-from'],
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
