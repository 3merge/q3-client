import React from 'react';
import { TableVertical } from '../../../src/components';

export default () => (
  <TableVertical
    columns={[
      {
        field: 'name',
      },
      {
        field: 'createdAt',
        formatter: 'datetime',
      },
      {
        label: 'Movies',
        field: 'movies',
        formatter: 'count',
      },
      {
        label: 'Box Office',
        field: 'boxOffice',
        formatter: 'price',
      },
      {
        label: 'Address',
        formatter: 'address',
      },
    ]}
  />
);
