import React from 'react';
import { withLocation } from 'with-location';
import TablePagination from '@material-ui/core/TablePagination';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default withLocation(
  ({ id, pushTo, total, getFrom, params }) => {
    const theme = useTheme();
    const isLaptop = useMediaQuery(
      theme.breakpoints.up('sm'),
    );

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
        rowsPerPageOptions={
          isLaptop ? [10, 25, 50, 100, 250] : []
        }
        page={Number(getFrom('page') || 0)}
        component="div"
      />
    );
  },
);
