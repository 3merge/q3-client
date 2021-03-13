import AbstractCollectionBuilder from 'q3-admin/lib/builders';
import Add from './Add';
import General from './General';

export default new AbstractCollectionBuilder({
  resourceName: 'characters',
  resourceNameSingular: 'character',
  parent: 'entertainment',
  lookup: ['name'],
  resolvers: ({
    id,
    name,
    description,
    createdAt,
    updatedAt,
  }) => ({
    id,
    name,
    description,
    createdAt: {
      base: createdAt,
      toDate: true,
    },
    updatedAt: {
      base: updatedAt,
      toDate: true,
    },
  }),
})
  .genUserOptions('Developer', {
    trash: false,
    logs: false,
    general: true,
  })
  .genHeader({
    titleProp: 'name',
  })
  .genNew(Add)
  .genViews({
    General,
  })
  .genList({
    defaultColumns: ['createdAt', 'updatedAt'],
    grid: true,
  })
  .genListSettings({
    defaultSortPreference: 'name',
  })
  .genDetail({})
  .build();
