import AbstractCollectionBuilder from 'q3-admin/lib/builders';

export default new AbstractCollectionBuilder({
  resourceName: 'shows',
  resourceNameSingular: 'show',
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
    defaultColumns: [],
    io: {
      exports: ['orders'],
      imports: [],
    },
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
    files: true,
    notes: true,
  })
  .build();
