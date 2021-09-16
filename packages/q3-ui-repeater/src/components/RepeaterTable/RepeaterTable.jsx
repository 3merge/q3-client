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
import { map, get, isEqual } from 'lodash';
import { useTranslation } from 'react-i18next';
import { SelectAll } from 'q3-ui-exports';
import List from '../List';
import withMapRepeater from '../withMapRepeater';
import { override } from '../../helpers';
import usePagination from '../../usePagination';
import RepeaterCollapse from '../RepeaterCollapse';
import useStyle from '../useStyle';

export const gt = (v, num = 0) => v > num;

export const stringifyIds = (xs) =>
  map(xs?.data, (item) => item?.id).join(',');

export const hasDataPropChangedShape = (prev, curr) =>
  isEqual(prev?.data, curr?.data) &&
  stringifyIds(prev) === stringifyIds(curr);

const RepeaterTable = ({
  data,
  children,
  initialValues,
  disableEditor,
  disableRemove,
  disableMultiselect,
  renderNestedTableRow,
  perPage,
  groupName,
  ...rest
}) => {
  const {
    totalPage,
    total,
    onChange,
    list,
    page,
  } = usePagination(perPage, data);
  const cls = useStyle();
  const { t } = useTranslation('labels');

  return (
    gt(total, 0) && (
      <RepeaterCollapse
        label={groupName}
        toggles={
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
          ) : null
        }
      >
        <Box pb={1}>
          {groupName && <Box className={cls.divide} />}
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
                      <SelectAll ids={map(list, 'id')} />
                    </span>
                  )}
                  {t(rest?.th || 'identifier')}
                </TableCell>
                {map(
                  get(rest, 'cardProps.attributes', []),
                  (attr) => (
                    <TableCell key={attr} component="th">
                      {t(attr)}
                    </TableCell>
                  ),
                )}

                <TableCell />
              </TableRow>
            </TableHead>
            <List
              {...rest}
              data={list}
              renderNestedTableRow={renderNestedTableRow}
            >
              {children}
            </List>
          </Table>
        </Box>
        {gt(totalPage, 1) && (
          <Box
            display="flex"
            justifyContent="center"
            pb={1}
          >
            <Pagination
              page={page}
              color="primary"
              count={totalPage}
              onChange={onChange}
              size="small"
            />
          </Box>
        )}
      </RepeaterCollapse>
    )
  );
};

RepeaterTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  renderNestedTableRow: PropTypes.func,
  perPage: PropTypes.number,
  ...override.propTypes,
};

RepeaterTable.defaultProps = {
  data: [],
  edit: null,
  renderNestedTableRow: null,
  perPage: 15,
  ...override.defaultProps,
};

export default withMapRepeater(
  React.memo(
    RepeaterTable,
    (prev, curr) =>
      hasDataPropChangedShape(prev, curr) &&
      prev.perPage === curr.perPage,
  ),
);
