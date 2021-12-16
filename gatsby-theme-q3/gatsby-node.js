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
    resolve: {
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
        contentful_id: 'APP',
        to: '/app',
      },
    });
  }
};
