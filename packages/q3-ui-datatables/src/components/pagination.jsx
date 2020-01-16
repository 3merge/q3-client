import React from 'react';
import { withLocation } from 'with-location';
import TablePagination from '@material-ui/core/TablePagination';
import { getPage } from '../utils/helpers';

export default withLocation(
  ({ locationParams, updateParams, total }) => (
    <TablePagination
      page={getPage(locationParams)}
      onChangePage={(e, num) =>
        num >= 0 ? updateParams({ page: num }) : null
      }
      rowsPerPageOptions={[]}
      count={total}
      rowsPerPage={25}
    />
  ),
);
