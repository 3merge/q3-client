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

import orders from '../__fixtures__/orders.json';
import TableView from '.';

export default {
  title: 'Q3 Datatables|Table',
  parameters: {
    component: TableView,
    componentSubtitle: 'For data-rich UIs and list views',
  },
};

export const HeavyData = () => (
  <LocationProvider initialPath="/">
    <Box p={4} style={{ backgroundColor: '#F5F7F9' }}>
      <TableView
        // eslint-disable-next-line
        onSort={console.log}
        id="for-testing"
        aliasForName="seq"
        total={orders.total}
        data={orders.orders}
        blacklistColumns={['unknown', 'draft']}
        defaultColumns={[
          'unknown',
          'seq',
          'status',
          'createdAt',
          'updatedAt',
          'tax',
          'subtotal',
          'total',
          'currency',
          'paymentOption',
          'shippingOption',
          'draft',
        ]}
        virtuals={['status']}
        columnWidths={{
          seq: 65,
          tax: 115,
          draft: 45,
          updatedAt: 165,
          createdAt: 165,
        }}
        resolvers={(v) => ({
          ...v,
          name: v.seq,
          imgSrc: 'https://i.pravatar.cc/150?img=20',
          description: `${v.id} ${v.id}`,
          url: v.id,
          currency: {
            base: v.currency,
            toChip: true,
          },
          draft: {
            base: v.draft,
            toTruthy: true,
          },
          seq: {
            base: v.seq,
            toAction: true,
            icon: AccountBox,
          },
          paymentOption: {
            base: v.paymentOption,
            helperText: (
              <>
                <p>
                  This is great. But what about super long
                  and complex tool tips?
                </p>
                <ul>
                  <li>Rate = this</li>
                </ul>
              </>
            ),
          },
          tax: {
            base: v.tax,
            toPrice: true,
          },
          subtotal: {
            base: v.subtotal,
            toPrice: true,
          },
          total: {
            base: v.total,
            toPrice: true,
          },
          createdAt: {
            base: v.createdAt,
            toDate: true,
            renderProps: {
              color: 'success',
            },
          },
          updatedAt: {
            base: v.updatedAt,
            toDate: true,
            renderProps: {
              color: 'danger',
            },
          },
          status: {
            base: v.status,
            toString: true,
            toDot: true,
            renderProps: {},
          },
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
  <Box p={4} style={{ backgroundColor: '#F5F7F9' }}>
    <TableView data={[]}>Render Me!</TableView>
  </Box>
);
