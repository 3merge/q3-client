import React from 'react';
import AbstractCollectionBuilder from 'q3-admin/lib/builders';
import CreditCard from '@material-ui/icons/CreditCard';
import { IconButton } from '@material-ui/core';
import Group from '@material-ui/icons/Group';
import Add from './Add';
import Filters from './Filters';
import General from './General';
import SubDetail from './SubDetail';

export default new AbstractCollectionBuilder({
  resourceName: 'shows',
  resourceNameSingular: 'show',
  icon: CreditCard,
  parent: 'entertainment',
  // disableSegmentAll: true,
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
    }),
  )
  .genHeader({
    titleProp: 'name',
  })
  .genNew(Add)
  .genFilter(Filters)
  .genViews({
    General,
    SubDetail,
  })
  .genList({
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
  })
  .genListSettings({
    //  customRowActionsAnchor: 'start',
    defaultColumns: ['createdAt', 'updatedAt'],
    defaultSortPreference: 'name',
    blacklistColumns() {
      return [];
    },
  })
  .genDetail({
    audit: ['foo', 'bar'],
    disablePaper: true,
    protectView: () =>
      // if (name === 'subdetail') return data.name === 'foo';
      true,
    registerActions: () => [],
    registerOptions: () => [
      {
        href: 'https:google.com',
        title: 'Number of seasons',
        description: '6 seasons',
      },
      {
        href: '',
        title: 'Type',
        description: 'Cartoon',
      },
      {
        href: 'https:google.com',
        title: 'Genre',
        description: 'Comedy',
      },
    ],
    defineActionProps(state) {
      return {
        uploads:
          state?.name !== 'Rick and Morty'
            ? {
                disableDrop: true,
                disableDelete: true,
              }
            : {},
      };
    },
  })

  .build();
