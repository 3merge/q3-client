import AbstractCollectionBuilder from 'q3-admin/lib/builders';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import moment from 'moment';
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
    start: moment(createdAt).toDate(),
    end: moment(createdAt).add(3, 'hours').toDate(),
    title: [name, description].join(' - '),
    editable: true,
    durationEditable: false,
  }),
})
  .genHeader({
    titleProp: 'name',
  })
  .genViews({
    General,
  })
  .genList({
    ui: 'calendar',
    runOnInit: false,
    fromKey: 'createdAt',
  })
  .genListSettings({})
  .genDetail({
    picture: true,
    disableUnsavedChanges: true,
  })
  .build();
