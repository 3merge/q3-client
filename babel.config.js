const withAlias = (folder, path = '') => ({
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: {
          'q3-admin': `${path}q3-admin/${folder}`,
          'q3-ui': `${path}q3-ui/${folder}`,
          'q3-ui-commons': `${path}q3-ui-commons/${folder}`,
          'q3-ui-forms': `${path}q3-ui-forms/${folder}`,
          'q3-ui-permissions': `${path}q3-ui-permissions/${folder}`,
          'q3-ui-rest': `${path}q3-ui-rest/${folder}`,
        },
      },
    ],
  ],
});

module.exports = {
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
    test: withAlias('src', './packages/'),
    development: withAlias('src', './packages/'),
    production: withAlias('lib'),
  },
};
