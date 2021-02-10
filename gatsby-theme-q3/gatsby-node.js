const StringReplacePlugin = require('string-replace-webpack-plugin');

exports.onCreateWebpackConfig = ({
  actions,
  getConfig,
}) => {
  const config = getConfig();
  config.node = { fs: 'empty' };

  Object.assign(config.resolve.alias, {
    'unicode-properties':
      'unicode-properties/unicode-properties.cjs.js',
    'pdfkit': 'pdfkit/js/pdfkit.js',
  });

  Object.assign(config.module, {
    rules: [
      ...config.module.rules,
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
      {
        enforce: 'pre',
        test: /unicode-properties[\/\\]unicode-properties/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern:
                "var fs = _interopDefault(require('fs'));",
              replacement() {
                return "var fs = require('fs');";
              },
            },
          ],
        }),
      },
      {
        test: /unicode-properties[\/\\]unicode-properties/,
        loader: 'transform-loader?brfs',
      },
      {
        test: /pdfkit[/\\]js[/\\]/,
        loader: 'transform-loader?brfs',
      },
      {
        test: /fontkit[\/\\]index.js$/,
        loader: 'transform-loader?brfs',
      },
      {
        test: /linebreak[\/\\]src[\/\\]linebreaker.js/,
        loader: 'transform-loader?brfs',
      },
    ],
  });

  actions.replaceWebpackConfig(config);
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
        contentful_id: 'APP',
        to: '/app',
      },
    });
  }
};
