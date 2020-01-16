import React from 'react';
import { withLocation } from 'with-location';
import TablePagination from '@material-ui/core/TablePagination';

export default withLocation(
  ({ pushTo, total, getFrom }) => (
    <TablePagination
      page={getFrom('page') || 0}
      onChangePage={(e, num) =>
        num >= 0 ? pushTo({ page: num }) : null
      }
      rowsPerPageOptions={[]}
      count={total}
      rowsPerPage={25}
    />
  ),
);
