import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import {
  Box,
  Table,
  Grid,
  IconButton,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { map, get } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { SelectAll } from 'q3-ui-exports';
import { object } from 'q3-ui-helpers';
import List from '../List';
import withMapRepeater from '../withMapRepeater';
import { override } from '../../helpers';
import usePagination from '../../usePagination';
import RepeaterCollapse from '../RepeaterCollapse';
import RepeaterTableContext from '../RepeaterTableContext/RepeaterTableContext';
import useStyle from '../useStyle';

export const gt = (v, num = 0) => v > num;

const RepeaterTable = ({
  data,
  children,
  disableMultiselect,
  renderNestedTableRow,
  perPage,
  groupName,
  ...rest
}) => {
  const { totalPage, total, onChange, list, page } =
    usePagination(perPage, data);
  const cls = useStyle();
  const { t } = useTranslation('labels');
  const tableState = React.useMemo(
    () => ({
      data: list,
    }),
    [list],
  );

  const PaginationHeader = React.useMemo(
    () =>
      gt(totalPage, 1) ? (
        <Grid container>
          <Grid item>
            <IconButton
              disabled={page === 1}
              onClick={() => onChange({}, page - 1)}
            >
              <NavigateBeforeIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              disabled={page === totalPage}
              onClick={() => onChange({}, page + 1)}
            >
              <NavigateNextIcon />
            </IconButton>
          </Grid>
        </Grid>
      ) : null,
    [page, totalPage],
  );

  const PaginationFooter = React.useMemo(
    () =>
      gt(totalPage, 1) && (
        <Box display="flex" justifyContent="center" pb={1}>
          <Pagination
            page={page}
            count={totalPage}
            onChange={onChange}
            size="small"
          />
        </Box>
      ),
    [page, totalPage],
  );

  const TableElement = React.useMemo(
    () => (
      <RepeaterTableContext.Provider value={tableState}>
        <Table>
          <TableHead>
            <TableRow className={cls.tableHeader}>
              <TableCell component="th">
                {!disableMultiselect && (
                  <span
                    style={{
                      marginLeft: '-5px',
                      paddingRight: '6px',
                    }}
                  >
                    <SelectAll ids={map(data, 'id')} />
                  </span>
                )}
                {t(rest?.th || 'identifier')}
              </TableCell>
              {map(
                get(rest, 'cardProps.attributes', []),
                (attr) => (
                  <TableCell key={attr} component="th">
                    <span
                      className={cls.tableHeaderSpan}
                      title={t(attr)}
                    >
                      {t(attr)}
                    </span>
                  </TableCell>
                ),
              )}
              <TableCell />
            </TableRow>
          </TableHead>
          <List
            {...rest}
            renderNestedTableRow={renderNestedTableRow}
          >
            {children}
          </List>
        </Table>
      </RepeaterTableContext.Provider>
    ),
    [
      object.toJSON({
        disableMultiselect,
        list,
        rest,
      }),
    ],
  );

  return (
    gt(total, 0) && (
      <RepeaterCollapse
        label={groupName}
        toggles={PaginationHeader}
      >
        <Box pb={1}>
          {groupName && <Box className={cls.divide} />}
          {TableElement}
        </Box>
        {PaginationFooter}
      </RepeaterCollapse>
    )
  );
};

RepeaterTable.propTypes = {
  children: PropTypes.node,
  data: PropTypes.arrayOf(PropTypes.object),
  disableMultiselect: PropTypes.bool,
  groupName: PropTypes.string,
  perPage: PropTypes.number,
  renderNestedTableRow: PropTypes.func,
  ...override.propTypes,
};

RepeaterTable.defaultProps = {
  children: null,
  disableMultiselect: false,
  data: [],
  groupName: undefined,
  perPage: 15,
  renderNestedTableRow: null,
  ...override.defaultProps,
};

export default withMapRepeater(React.memo(RepeaterTable));
