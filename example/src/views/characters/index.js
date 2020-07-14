import AbstractCollectionBuilder from 'q3-admin/lib/builders';
import GroupIcon from '@material-ui/icons/Group';
import Add from './Add';
import Filter from './Filter';
import General from './general';
import Movies from './movies';

export default new AbstractCollectionBuilder({
  icon: GroupIcon,
  collectionName: 'characters',
  resourceName: 'characters',
  resourceNameSingular: 'character',
})
  .genHeader({
    titleProp: 'name',
  })
  .genNew(Add)
  .genFilter(Filter)
  .genViews({
    General,
    Movies,
  })
  .genList({
    defaultColumns: ['gender', 'updatedAt', 'createdAt'],
    io: {
      exports: ['characterCollection'],
      imports: ['characterCollection'],
    },
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
    resolvers: ({
      id,
      name,
      role,
      updatedAt,
      createdAt,
    }) => ({
      id,
      name,
      description: role,
      gender: {
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
  .build();
