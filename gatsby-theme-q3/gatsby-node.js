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
