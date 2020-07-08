import AbstractCollectionBuilder from 'q3-admin/lib/builders';

export default new AbstractCollectionBuilder({
  resourceName: 'characters',
  resourceNameSingular: 'character',
  parent: 'entertainment',
})
  .genHeader({
    titleProp: 'name',
  })
  .genNew(import('./Add'))
  .genFilter(import('./Filters'))
  .genViews({
    general: import('./General'),
  })
  .genList({
    defaultColumns: ['createdAt', 'updatedAt'],

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
  .genListSettings({
    defaultSortPreference: 'name',
  })
  .genDetail({
    picture: true,
  })
  .build();
