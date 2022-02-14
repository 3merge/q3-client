import React from 'react';
import AbstractCollectionBuilder from 'q3-admin/lib/builders';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import moment from 'moment';
import General from './General';
import Filter from '../../../src/components/Filter';

export default new AbstractCollectionBuilder({
  resourceName: 'characters',
  resourceNameSingular: 'character',
  parent: 'entertainment',
  lookup: ['name'],
  icon: AspectRatioIcon,
  segments(user) {
    return user.firstName === 'Dirk'
      ? {
          test: '?foo',
        }
      : {};
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
    start: moment(createdAt).toDate(),
    end: moment(createdAt).add(3, 'hours').toDate(),
    title: [name, description].join(' - '),
    editable: true,
    durationEditable: false,
  }),
})
  .genFilter(() => (
    <Filter
      data={{
        createdAt: {
          type: 'Date',
        },
      }}
    />
  ))
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
    getBackgroundEvents() {
      return Promise.resolve([
        {
          id: 1,
          title: 'Stat holiday',
          start: moment().startOf('day').toDate(),
          end: moment().endOf('day').toDate(),
        },
      ]);
    },
  })
  .genListSettings({})
  .genDetail({
    picture: true,
    disableUnsavedChanges: true,
  })
  .build();
