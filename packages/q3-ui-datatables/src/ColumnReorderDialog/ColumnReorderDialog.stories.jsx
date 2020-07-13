import React from 'react';
import ColumnReorderDialog from './ColumnReorderDialog';

export default {
  title: 'Q3 Datatables|Reorder Dialog',
};

export const Example = () => (
  <ColumnReorderDialog
    columns={['Column One', 'Column Two', 'Column Three']}
    onDone={(checked) =>
      alert(`Will show ${checked.join(',')}`)
    }
  />
);
