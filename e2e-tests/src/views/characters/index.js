import AbstractCollectionBuilder from 'q3-admin/lib/builders';
import GroupIcon from '@material-ui/icons/Group';

export default new AbstractCollectionBuilder({
  icon: GroupIcon,
  collectionName: 'characters',
  resourceName: 'characters',
  resourceNameSingular: 'character',
})
  .genHeader({
    titleProp: 'name',
  })
  .genNew(import('./add'))
  .genFilter(import('./filters'))
  .genViews({
    general: import('./general'),
    movie: import('./movies'),
  })
  .genList({
    defaultColumns: [
      'gender',
      'role',
      'updatedAt',
      'createdAt',
    ],
    io: {
      exports: ['characterCollection'],
    },
    resolvers: ({
      id,
      name,
      role,
      updatedAt,
      createdAt,
      gender,
    }) => ({
      id,
      name,
      gender,
      role: {
        base: role,
        toChip: true,
      },
      updatedAt: {
        base: updatedAt,
        toDate: true,
      },
      createdAt: {
        base: createdAt,
        toDate: true,
      },
    }),
  })
  .genDetail({
    notes: true,
    picture: true,
  })
  .genListSettings({
    defaultSortPreference: 'firstName',
    select:
      'photo,featuredUpload,name,role,gender,updatedAt,createdAt',
    lookup: ['role', 'gender'],
    segments: {
      'Lead Roles': '?role=Lead',
    },
  })
  .build();
