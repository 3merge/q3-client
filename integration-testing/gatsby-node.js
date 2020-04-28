exports.onCreateWebpackConfig = ({
  actions,
  getConfig,
}) => {
  const config = getConfig();
  config.node = { fs: 'empty' };
  actions.replaceWebpackConfig(config);
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/app/)) {
    // eslint-disable-next-line
    page.matchPath = '/app/*';
    createPage({
      ...page,
      context: {
        contentful_id: 'app',
        to: 'app',
      },
    });
  }
};
