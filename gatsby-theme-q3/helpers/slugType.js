const slug = require('./slug');

module.exports = (
  dir,
  resourceName,
  { createFieldExtension, createTypes },
) => {
  // mirrors reach router prop
  // an unlikely name otherwise
  const resolverKey = 'to';

  createFieldExtension({
    name: resolverKey,
    extend: () => ({
      resolve: (source) => slug(source, dir),
    }),
  });

  createTypes(`
    type ${resourceName} implements Node {
      ${resolverKey}: String @${resolverKey}
    }
  `);
};
