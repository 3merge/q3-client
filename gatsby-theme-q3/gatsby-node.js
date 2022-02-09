exports.onCreateWebpackConfig = ({
  actions,
  stage,
  plugins,
}) => {
  if (stage === 'build-javascript' || stage === 'develop')
    actions.setWebpackConfig({
      plugins: [
        plugins.provide({
          Buffer: ['buffer/', 'Buffer'],
          process: 'process/browser',
        }),
      ],
    });

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['ts-loader'],
        },
        {
          test: /unicode-properties[/\\]unicode-properties/,
          use: ['transform-loader?brfs'],
        },
        {
          test: /pdfkit[/\\]js[/\\]/,
          use: ['transform-loader?brfs'],
        },
        {
          test: /fontkit[/\\]index.js$/,
          use: ['transform-loader?brfs'],
        },
        {
          test: /linebreak[/\\]src[/\\]linebreaker.js/,
          use: ['transform-loader?brfs'],
        },
      ],
    },
    resolve: {
      alias: {
        'unicode-properties':
          'unicode-properties/unicode-properties.cjs.js',
        pdfkit: 'pdfkit/js/pdfkit.js',
      },
      fallback: {
        util: false,
        fs: false,
        path: false,
      },
    },
  });
};

exports.onCreateBabelConfig = function onCreateBabelConfig({
  actions,
}) {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from',
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/app/)) {
    // eslint-disable-next-line
    page.matchPath = '/app/*';
    createPage({
      ...page,
      context: {
        to: '/app',
      },
    });
  }
};
