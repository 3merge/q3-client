import React from 'react';
import { withLocation } from 'with-location';
import TablePagination from '@material-ui/core/TablePagination';

export default withLocation(
  ({ id, pushTo, total, getFrom, params }) => {
    const [rows, setRowsPerPage] = React.useState(
      Number(getFrom('limit') || 25),
    );

    const onChangeRowsPerPage = React.useCallback((e) => {
      const {
        target: { value },
      } = e;

      pushTo({ limit: value, page: 0 });
      localStorage.setItem(id, params.toString());
      setRowsPerPage(value);
    }, []);

    const onChangePage = React.useCallback(
      (e, num) => (num >= 0 ? pushTo({ page: num }) : null),
      [],
    );

    return (
      <TablePagination
        count={total}
        rowsPerPage={rows}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100, 250]}
        page={Number(getFrom('page') || 0)}
      />
    );
  },
);
