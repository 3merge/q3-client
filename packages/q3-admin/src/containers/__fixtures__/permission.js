export const coll = 'storybook';

export const genAnyPermission = (rest) => ({
  ownership: 'Any',
  fields: '*',
  coll,
  ...rest,
});

export const genPermission = (op) => ({
  ownership: 'Any',
  fields: 'thread',
  coll,
  op,
});
