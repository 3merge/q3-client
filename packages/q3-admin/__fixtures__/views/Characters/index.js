import AbstractCollectionBuilder from 'q3-admin/lib/builders';
import Add from './Add';
import Filters from './Filters';
import General from './General';

export default new AbstractCollectionBuilder({
  resourceName: 'characters',
  resourceNameSingular: 'character',
  parent: 'entertainment',
})
  .genHeader({
    titleProp: 'name',
  })
  .genNew(Add)
  .genFilter(Filters)
  .genViews({
    General,
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
