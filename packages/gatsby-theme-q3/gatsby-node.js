exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  // eslint-disable-next-line
  await require('./src/utils/loader')(createPage);
};
