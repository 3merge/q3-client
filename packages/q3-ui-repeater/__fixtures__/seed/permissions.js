export const COLLECTION_NAME = 'test';

const genPermission = (op, fields = '*') => ({
  ownership: 'Any',
  coll: COLLECTION_NAME,
  fields,
  op,
});

export default {
  state: {
    init: true,
    profile: {
      id: 1,
    },
    permissions: [
      genPermission('Read', '!people.company'),
      genPermission('Update', '!people.lastName'),
      genPermission('Create', '*'),
      genPermission('Delete', '*'),
    ],
  },
};
