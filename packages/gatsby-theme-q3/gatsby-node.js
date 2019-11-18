exports.createPages = async (
  { actions },
  themeOptions = {},
) => {
  const { createPage } = actions;
  const { generateAccountPages } = themeOptions;

  if (generateAccountPages) {
    // eslint-disable-next-line
    await require('./src/utils/loader')(createPage);
  }
};
