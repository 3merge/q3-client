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

const OptionalUi = () => null;

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
    description: {
      base: 'this is a stencen that gowes on for quite a bit ans dsiw wiosadasd josajojoiasd jjajdij',
      toLong: true,
    },
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

    registerActions: () => [
      {
        icon: CreditCard,
        label: 'subscribe',
        renderContent: () => (
          // eslint-disable-next-line
          <p>Look at what I can do.</p>
        ),
        requireCheckedState: true,
      },
    ],

    renderCustomRowActions: () => (
      <IconButton>
        <Group />
      </IconButton>
    ),
  })
  .genListSettings({
    //  customRowActionsAnchor: 'start',
    defaultColumns: [
      'description',
      'createdAt',
      'updatedAt',
    ],
    defaultSortPreference: 'name',
    blacklistColumns() {
      return [];
    },
  })
  .genDetail({
    audit: ['foo', 'bar'],
    // autoOpenSummary: false,
    disablePaper: true,
    protectView: () =>
      // if (name === 'subdetail') return data.name === 'foo';
      true,
    registerActions: () => [
      {
        icon: CreditCard,
        label: 'subscribe',
        // autoOpen: true,
        id: 'subscribe',
        renderContent: () => (
          // eslint-disable-next-line
          <p>Look at what I can do.</p>
        ),
      },
      {
        icon: CreditCard,
        label: 'subscribe2',
        onClick() {
          // eslint-disable-next-line
          alert('SUBSCRIBE 2');
        },
      },
    ],
    registerAlerts: () => [
      {
        id: '1',
        title: 'info',
        description: 'info',
        severity: 'info',
      },
      {
        id: '2',
        title: 'success',
        description: 'success',
        severity: 'success',
      },
      {
        id: '3',
        title: 'error',
        description: 'error',
        severity: 'error',
      },
      {
        id: '4',
        title: 'warning',
        description: 'warning',
        severity: 'warning',
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
    renderContent(el) {
      return el;
    },
    // renderSummaryComponent() {
    //   return <div>Extra Extra</div>;
    // },
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
