exports.onCreateWebpackConfig = ({
  actions,
  getConfig,
}) => {
  const config = getConfig();
  config.node = { fs: 'empty' };
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
