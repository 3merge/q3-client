import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';
import { get, pick } from 'lodash';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Exports, { Actionbar } from 'q3-ui-exports';
import TableHead from '@material-ui/core/TableHead';
import { array, object } from 'q3-ui-helpers';
import classNames from 'classnames';
import ColumnSelectAll from './ColumnSelectAll';
import useStyles from './utils/useStyles';
import { extractIds } from './utils/helpers';
import ColumnReorderDialog from './ColumnReorderDialog';
import ColumnSort from './ColumnSort';
import Cell from './Cell';
import RowHeader from './RowHeader';
import Pagination from './Pagination';
import useColumns from './useColumns';
import withEmpty from './withEmpty';

const filterByPossibleKeys = (payload, blacklist = []) => (
  a = [],
) =>
  array.hasLength(blacklist) && array.hasLength(a)
    ? a.filter((v) => !blacklist.includes(v))
    : a;

const TableView = ({
  allColumns,
  defaultColumns,
  blacklistColumns,
  id,
  aliasForName,
  total,
  renderCustomActions,
  renderCustomRowActions,
  resolvers,
  data = [],
  onSort,
  virtuals,
  className,
  children,
  actionbarPosition,
  style,
}) => {
  const filterer = filterByPossibleKeys(
    data,
    blacklistColumns,
  );

  const { activeColumns, columns, setColumns } = useColumns(
    id,
    filterer(defaultColumns),
    filterer(allColumns),
  );

  const {
    root,
    flexRow,
    grids,
    cellWidth,
    tableBody,
  } = useStyles({
    columns,
  });

  const processed = data.map((row) =>
    pick(
      typeof resolvers === 'function'
        ? { ...row, ...resolvers(row) }
        : row,
      [
        // append required HEADER props
        ...activeColumns,
        'name',
        'description',
        'imgSrc',
        'url',
        'id',
      ],
    ),
  );

  return (
    <Exports>
      <Paper
        elevation={0}
        className={classNames(grids, className)}
        style={style}
      >
        {children}
        <Box
          style={{ flex: 1 }}
          position="relative"
          maxWidth="100%"
          overflow="auto"
          width="100%"
        >
          <Table className={root}>
            <TableHead className={tableBody}>
              <TableRow className={flexRow}>
                <ColumnSelectAll
                  ids={extractIds(data)}
                  title={aliasForName}
                  onSort={onSort}
                >
                  <ColumnReorderDialog
                    onDone={setColumns}
                    defaultColumns={activeColumns}
                    disabled={!columns.length}
                    columns={columns}
                  />
                </ColumnSelectAll>
                {object.isFn(renderCustomRowActions) ? (
                  <th aria-label="Actions" />
                ) : undefined}
                {activeColumns.map((column) => {
                  const sortable = Array.isArray(virtuals)
                    ? !virtuals.includes(column)
                    : true;

                  return (
                    <ColumnSort
                      title={column}
                      onSort={sortable ? onSort : null}
                      className={cellWidth}
                      {...column}
                    />
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody className={tableBody}>
              {processed.map((row, ind) => (
                <TableRow
                  key={`row-${ind}`}
                  className={flexRow}
                >
                  <RowHeader {...row} />
                  {object.isFn(renderCustomRowActions) ? (
                    <TableCell className={cellWidth}>
                      <div>
                        {renderCustomRowActions(
                          row,
                          data[ind],
                        )}
                      </div>
                    </TableCell>
                  ) : null}

                  {activeColumns.map((column) => (
                    <Cell
                      id={column}
                      component="td"
                      className={cellWidth}
                      headers={`${column} ${row.name}`}
                      key={`${row.id}-${column}`}
                      value={get(row, column)}
                    />
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box py={1} width="100%">
          <Pagination id={id} total={total} />
        </Box>
      </Paper>
      <Actionbar
        position={actionbarPosition}
        columns={allColumns}
        data={data}
        actions={
          object.isFn(renderCustomActions)
            ? renderCustomActions(data)
            : []
        }
      />
    </Exports>
  );
};

TableView.propTypes = {
  /**
   * Unique identifier for list cache.
   */
  id: PropTypes.string.isRequired,

  /**
   * Total number of potential documents.
   * In many cases, this number is larger than the pagination size.
   */
  total: PropTypes.number,

  /**
   * Unlike other columns, the leader is titled "name" but could represent lots of different things.
   * For sorting purposes, we can expose the true data key with this prop.
   */
  aliasForName: PropTypes.string,

  /**
   * Typically, you'd nest an array of Row components within the Table.
   * This component reads the "id" prop of each to configure mobile headers.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,

  /**
   * On row selection, the user can click from a toolbar of pre-determined actions.
   * Use this array to populate said toolbar with icons and handlers.
   */
  renderCustomActions: PropTypes.func,

  /**
   * Func for resolving TableCells with custom components/text.
   */
  resolvers: PropTypes.func.isRequired,

  /**
   * If provided, the table will allow custom column making.
   */
  allColumns: PropTypes.arrayOf(PropTypes.string),

  /**
   * If provided, the table will pre-configure these columns.
   * Otherwise, it will just look for the name and description fields.
   */
  defaultColumns: PropTypes.arrayOf(PropTypes.string),

  /**
   * If provided, the table will redact columns that match.
   * Perfect for dynamic access control settings.
   */
  blacklistColumns: PropTypes.arrayOf(PropTypes.string),

  onSort: PropTypes.func.isRequired,
};

TableView.defaultProps = {
  aliasForName: 'name',
  total: 0,
  allColumns: [],
  defaultColumns: [],
  blacklistColumns: [],
  renderCustomActions: null,
};

export default withEmpty(TableView);
