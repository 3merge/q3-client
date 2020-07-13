import React from 'react';
import ColumnReorder from './ColumnReorder';

export default {
  title: 'Q3 Datatables|Reorder',
};

export const Example = () => (
  <ColumnReorder
    columns={['Column One', 'Column Two', 'Column Three']}
    defaultColumn={['Column Two']}
  >
    {(values) => JSON.stringify(values)}
  </ColumnReorder>
);
