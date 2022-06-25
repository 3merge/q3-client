import React from 'react';
import AbstractCollectionBuilder from 'q3-admin/lib/builders';
import CreditCard from '@material-ui/icons/CreditCard';
import { IconButton } from '@material-ui/core';
import Group from '@material-ui/icons/Group';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import Add from './Add';
import Filters from './Filters';
import General from './General';
import SubDetail from './SubDetail';

export default new AbstractCollectionBuilder({
  resourceName: 'shows',
  resourceNameSingular: 'show',
  icon: CreditCard,
  parent: 'entertainment',
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
  .genResolver(({ id, name, createdAt, updatedAt }) => ({
    id,
    name,
    description:
      'this is a stencen that gowes on for quite a bit ans dsiw wiosadasd josajojoiasd jjajdij',
    createdAt: {
      base: createdAt,
      toDate: true,
    },
    updatedAt: {
      base: updatedAt,
      toDate: true,
    },
    icon: name === 'Archer' ? CreditCard : undefined,
    iconBg: name === 'Archer' ? '#FF4785' : undefined,
  }))
  .genHeader({
    titleProp: 'name',
  })
  .genCreate(Add)
  .genFilter(Filters)
  .genViews({
    General,
    SubDetail,
  })
  .genList({
    uis: [
      { ui: 'table' },
      {
        ui: 'calendar',
        runOnInit: false,
        fromKey: 'demo',
      },
      {
        ui: {
          label: 'custom',
          icon: AcUnitIcon,
          // eslint-disable-next-line
          component: () => <p>CUSTOM COMPONENT</p>,
        },
      },
    ],
    // ui: {
    //   label: 'custom',
    //   // eslint-disable-next-line
    //   component: () => <p>CUSTOM COMPONENT</p>,
    // },
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
    registerAlerts: () => [
      {
        id: '2',
        title: 'info',
        description: 'info',
        severity: 'info',
      },
    ],
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
