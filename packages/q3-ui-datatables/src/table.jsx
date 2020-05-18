import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import { pick } from 'lodash';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Exports, { Actionbar } from 'q3-ui-exports';
import {
  ScrollSync,
  ScrollSyncPane,
} from 'react-scroll-sync';
import TableHead from '@material-ui/core/TableHead';
import { object } from 'q3-ui-helpers';
import ColumnSelectAll from './ColumnSelectAll';
import useStyles from './utils/useStyles';
import { extractIds } from './utils/helpers';
import ColumnReorderDialog from './ColumnReorderDialog';
import ColumnSort from './ColumnSort';
import Cell from './Cell';
import RowHeader from './RowHeader';
import Pagination from './Pagination';
import Scrollbar from './Scrollbar';
import useElevated from './useElevated';
import useColumns from './useColumns';
import withEmpty from './withEmpty';

const getWidth = (widths, column) => {
  if (!object.hasKeys(widths)) return {};
  const width = widths[column];
  return {
    minWidth: width,
    width,
  };
};

const TableView = ({
  id,
  allColumns,
  defaultColumns,
  aliasForName,
  total,
  renderCustomActions,
  resolvers,
  data = [],
  onSort,
  columnWidths = [],
}) => {
  const ref = React.useRef();
  const { activeColumns, columns, setColumns } = useColumns(
    id,
    defaultColumns,
    allColumns,
  );

  const elevated = useElevated(ref);

  const {
    root,
    flexRow,
    grids,
    cellWidth,
    tableBody,
  } = useStyles({
    width: ref.current ? ref.current.clientWith : '100%',
    elevated,
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
      <Paper elevation={0} className={grids}>
        <ScrollSync>
          <Box position="relative">
            <ScrollSyncPane>
              <Table
                className={root}
                style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 1000,
                }}
              >
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
                    {activeColumns.map((column) => (
                      <ColumnSort
                        title={column}
                        onSort={onSort}
                        className={cellWidth}
                        style={getWidth(
                          columnWidths,
                          column,
                        )}
                        {...column}
                      />
                    ))}
                  </TableRow>
                </TableHead>
              </Table>
            </ScrollSyncPane>
            <ScrollSyncPane>
              <Table className={root}>
                <TableBody className={tableBody}>
                  {processed.map((row) => (
                    <TableRow className={flexRow}>
                      <RowHeader {...row} />
                      {activeColumns.map((column) => (
                        <Cell
                          id={column}
                          component="td"
                          className={cellWidth}
                          headers={`${column} ${row.name}`}
                          key={`${row.id}-${column}`}
                          value={row[column]}
                          style={getWidth(
                            columnWidths,
                            column,
                          )}
                        />
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <Pagination id={id} total={total} />
                  </TableRow>
                </TableFooter>
              </Table>
            </ScrollSyncPane>
            <ScrollSyncPane>
              <Scrollbar
                columns={activeColumns}
                className={cellWidth}
                getWidth={(column) =>
                  getWidth(columnWidths, column)
                }
              />
            </ScrollSyncPane>
          </Box>
        </ScrollSync>
      </Paper>
      <Actionbar
        columns={allColumns}
        data={data}
        actions={
          renderCustomActions
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
  onSort: PropTypes.func.isRequired,
};

TableView.defaultProps = {
  aliasForName: 'name',
  total: 0,
  allColumns: [],
  defaultColumns: [],
  renderCustomActions: null,
};

export default withEmpty(TableView);
