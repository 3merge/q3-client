exports.onCreateWebpackConfig = ({
  actions,
  stage,
  plugins,
}) => {
  const config = {
    resolve: {
      fallback: {
        fs: false,
        path: false,
      },
    },
  };

  if (stage === 'build-javascript' || stage === 'develop')
    config.plugins = [
      plugins.provide({
        process: 'process/browser',
      }),
    ];

  actions.setWebpackConfig(config);
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
