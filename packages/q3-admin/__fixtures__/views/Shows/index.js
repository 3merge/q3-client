import React from 'react';
import AbstractCollectionBuilder from 'q3-admin/lib/builders';
import CreditCard from '@material-ui/icons/CreditCard';
import { green } from '@material-ui/core/colors';
import { IconButton } from '@material-ui/core';
import Group from '@material-ui/icons/Group';
import moment from 'moment';
import Add from './Add';
import Filters from './Filters';
import General from './General';

export default new AbstractCollectionBuilder({
  resourceName: 'shows',
  resourceNameSingular: 'show',
  // parent: 'entertainment',
  segments: {
    'Date Range': '?demo<=2021-08-01&demo>=2021-01-01',
    'Testing 1':
      '?demo<=2021-08-01&demo>=2021-01-01&search=Test',
    'Testing 2':
      '?demo<=2021-08-01&demo>=2021-01-01&search=Testing',
    'Testing 3':
      '?demo<=2021-08-01&demo>=2021-01-01&search=Testing3',
  },
  lookup: ['name'],
})
  .genUserOptions('Developer', {
    all: true,
  })
  .genResolver(
    ({ id, name, description, createdAt, updatedAt }) => ({
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
    }),
  )
  .genHeader({
    titleProp: 'name',
  })
  .genNew(Add)
  .genFilter(Filters)
  .genViews({
    General,
    General2: General,
  })
  .genList({
    //  customRowActionsAnchor: 'start',
    defaultColumns: ['createdAt', 'updatedAt'],
    io: {
      exports: ['orders'],
      imports: [],
      // eslint-disable-next-line
      renderer: () => <p>Look at me!</p>,
    },

    renderCustomRowActions: () => (
      <IconButton>
        <Group />
      </IconButton>
    ),
    runOnInit: false,
  })
  .genListSettings({
    defaultSortPreference: 'name',
  })
  .genDetail({
    picture: true,
    files: true,
    notes: true,
    audit: {
      foo: 'foo,bar,quuz',
    },
    registerActions: () => [
      {
        label: 'custom action',
        onClick() {
          alert('Action clicked');
        },
      },
    ],
    registerOptions: () => [
      {
        id: 'id123',
        icon: CreditCard,
        href: 'https:google.com',
        title: 'test',
        description: 'test',
        color: green[900],
      },
    ],
  })
  .genDetailSettings({
    // disableUnsavedChanges: true,
  })
  .build();
