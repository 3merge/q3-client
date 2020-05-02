const { get } = require('lodash');
const { resolve } = require('path');
const {
  appendSiblingsToContext,
  paginateArchiveContext,
} = require('./pagination');

module.exports = ({
  archiveComponentRelativePath,
  createPage,
  detailComponentRelativePath,
  nodesKeyName,
  slug,
}) => async ({ data, errors }) => {
  if (errors) throw errors;
  const { nodes = [] } = get(data, nodesKeyName, {
    nodes: [],
  });

  const archives = appendSiblingsToContext(nodes).map(
    (context) =>
      createPage({
        path:
          // see slugType for more details on this field
          context.to || `/${slug}/${context.contentful_id}`,
        component: resolve(detailComponentRelativePath),
        context,
      }),
  );

  const entries = paginateArchiveContext(nodes, slug).map(
    ({ path, ...context }) =>
      createPage({
        component: resolve(archiveComponentRelativePath),
        path,
        context,
      }),
  );

  await Promise.all(archives);
  await Promise.all(entries);
};
