import React from 'react';
import AbstractCollectionBuilder from 'q3-admin/lib/builders';
import CreditCard from '@material-ui/icons/CreditCard';
import { green } from '@material-ui/core/colors';
import Add from './Add';
import Filters from './Filters';
import General from './General';
import useIo from '../../../src/hooks/useIo';

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
    }),
  )
  .genHeader({
    titleProp: 'name',
  })
  .genNew(Add)
  .genFilter(Filters)
  .genViews({
    General,
  })
  .genList({
    io: {
      exports: ['orders'],
      imports: [],
      // eslint-disable-next-line
      renderer: () => <p>Look at me!</p>,
    },
    renderCustomRowActions: (row) => {
      const { exportCollection } = useIo(row.id);
      return <p>FN</p>;
    },
  })
  .genListSettings({
    defaultSortPreference: 'name',
  })
  .genDetail({
    picture: true,
    files: true,
    notes: true,
    audit: true,
    registerOptions: () => {
      return [
        {
          id: 'id123',
          icon: CreditCard,
          href: 'https:google.com',
          title: 'test',
          description: 'test',
          color: green[900],
        },
      ];
    },
  })
  .genDetailSettings({
    // disableUnsavedChanges: true,
  })
  .build();
