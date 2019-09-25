module.exports = {
  plugins: [
    'rewire',
    '@babel/plugin-proposal-export-namespace-from',
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
};
