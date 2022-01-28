import AbstractCollectionBuilder from 'q3-admin/lib/builders';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import Add from './Add';
import Filters from './Filters';
import General from './General';

export default new AbstractCollectionBuilder({
  resourceName: 'characters',
  resourceNameSingular: 'character',
  parent: 'entertainment',
  lookup: ['name'],
  icon: AspectRatioIcon,
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
  .genHeader({
    titleProp: 'name',
  })
  .genNew(Add)
  .genViews({
    General,
  })
  .genList({
    defaultColumns: ['createdAt', 'updatedAt'],
  })
  .genListSettings({
    defaultSortPreference: 'name',
  })
  .genDetail({
    picture: true,
    disableUnsavedChanges: true,
  })
  .build();
