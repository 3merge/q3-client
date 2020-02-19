export const genPermission = (op) => ({
  ownership: 'Any',
  coll: 'storybook',
  fields: 'thread',
  op,
});
