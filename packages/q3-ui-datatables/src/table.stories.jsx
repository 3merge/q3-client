import React from 'react';
import AccountBox from '@material-ui/icons/AccountBox';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import Box from '@material-ui/core/Box';

import EventIcon from '@material-ui/icons/Event';
import {
  purple,
  green,
  blue,
} from '@material-ui/core/colors';
import { Status } from 'q3-components';
import TableView, {
  TableProgress,
  TableCheck,
  withPropsResolver,
} from '.';

export default {
  title: 'Q3 Datatables|Table',
  parameters: {
    component: TableView,
    componentSubtitle: 'For data-rich UIs and list views',
  },
};

const fn = withPropsResolver(Status, {
  toDate: true,
  resolve: () => {
    return {
      icon: EventIcon,
      color: purple[900],
    };
  },
});

const price = withPropsResolver(Status, {
  toPrice: true,
  resolve: (v) => ({
    color: v > 50 ? green[900] : blue[900],
  }),
});

export const Full = () => (
  <LocationProvider initialPath="/">
    <Box p={4} style={{ backgroundColor: 'whitesmoke' }}>
      <TableView
        id="for-testing"
        aliasForName="fullName"
        total={50}
        data={[
          {
            name: 'Jonny',
            description: 'This is a description',
            email: 'jonny@3merge.ca',
            photo: 'https://i.pravatar.cc/150?img=17',
            status: 'Done',
            color: 'success',
            value: 100,
            verified: true,
          },
          {
            name: 'Helen',
            description: 'This is a description',
            email: 'helen@3merge.ca',
            photo: 'https://i.pravatar.cc/150?img=18',
            status: 'Not Ready',
            color: 'danger',
            value: 2,
            updatedAt: new Date().toISOString(),
            numberOfRecords: 66,
          },
          {
            name: 'Nolan',
            description: 'This is a description',
            email: 'nolan@3merge.ca',
            photo: 'https://i.pravatar.cc/150?img=19',
            status: 'Done',
            color: 'success',
            value: 87,
            verified: true,
            numberOfRecords: 99,
            updatedAt: new Date().toISOString(),
          },
          {
            name: 'Brie',
            description: 'This is a description',
            email: 'brie@3merge.ca',
            photo: 'https://i.pravatar.cc/150?img=20',
            status: 'Under Review',
            color: 'warning',
            value: 55,
            updatedAt: new Date().toISOString(),
            numberOfRecords: 12,
            cost: {
              dealer: '12.99',
            },
          },
        ]}
        allColumns={[
          'status',
          'progress',
          'verified',
          'email',
          'updatedAt',
          'numberOfRecords',
          'cost.dealer',
        ]}
        resolvers={(v) => ({
          ...v,
          disableLink: v.id === 2,
          two: <TableCheck show={v.two} />,
          progress: <TableProgress value={v.progress} />,
          verified: <TableCheck show={v.verified} />,
          updatedAt: fn(v.updatedAt),
          'cost.dealer': price(v.cost ? v.cost.dealer : 0),
          email: (
            <a href={`mailTo:${v.email}`}>{v.email}</a>
          ),
          status: (
            <Status label={v.status} color={v.color} />
          ),
        })}
        actions={[
          {
            label: 'Yikes',
            onClick: () => null,
            icon: AccountBox,
          },
        ]}
      />
    </Box>
    <LocationDebugger />
  </LocationProvider>
);

export const Empty = () => (
  <Box p={4} style={{ backgroundColor: 'whitesmoke' }}>
    <TableView data={[]} />
  </Box>
);
