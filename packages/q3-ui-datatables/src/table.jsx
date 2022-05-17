import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import { get, pick, compact } from 'lodash';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Exports, { Actionbar } from 'q3-ui-exports';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import { array, object } from 'q3-ui-helpers';
import classNames from 'classnames';
import ColumnSelectAll from './ColumnSelectAll';
import useStyles from './utils/useStyles';
import { extractIds } from './utils/helpers';
import ColumnReorderDialog from './ColumnReorderDialog';
import ColumnSort from './ColumnSort';
import Cell from './Cell';
import CellAction from './CellAction';
import RowHeader from './RowHeader';
import Pagination from './Pagination';
import useColumns from './useColumns';
import withEmpty from './withEmpty';
import TableActions from './TableActions';
import TableActionsDeleteMany from './TableActionsDeleteMany';
import useDataTable from './useDataTable';

const ExportsStandIn = (props) =>
  React.createElement(React.Fragment, props);

const filterByPossibleKeys =
  (payload, blacklist = []) =>
  (a = []) =>
    array.hasLength(blacklist) && array.hasLength(a)
      ? a.filter((v) => !blacklist.includes(v))
      : a;

const TableView = (props) => {
  const {
    allColumns,
    defaultColumns,
    blacklistColumns,
    customRowActionsAnchor,
    disableAvatar,
    disableExportsProvider,
    id,
    aliasForName,
    total,
    renderCustomRowActions,
    resolvers,
    data,
    sort,
    onSort,
    virtuals,
    className,
    children,
    style,
  } = props;

  const { checkForMultiselectActions, shouldRenderTools } =
    useDataTable(props);

  const enableMultiselect = checkForMultiselectActions();

  const filterer = filterByPossibleKeys(
    data,
    blacklistColumns,
  );

  const { activeColumns, columns, setColumns } = useColumns(
    id,
    filterer(defaultColumns),
    filterer(allColumns),
  );

  const { root, flexRow, grids, cellWidth, tableBody } =
    useStyles({
      columns,
    });

  const processed = data.map((row) =>
    pick(
      typeof resolvers === 'function'
        ? { ...row, ...resolvers(row) }
        : row,
      [
        ...activeColumns,
        'name',
        'description',
        'imgSrc',
        'url',
        'id',
        'icon',
        'iconBg',
      ],
    ),
  );

  const isNotVirtual = (column) => {
    const sortable = Array.isArray(virtuals)
      ? !virtuals.includes(column)
      : true;

    return sortable ? onSort : null;
  };

  const renderCustomRowActionsAnchor = (...parts) => {
    const el = compact(parts);

    return customRowActionsAnchor === 'end'
      ? el.reverse()
      : el;
  };

  const ExportsProvider = disableExportsProvider
    ? ExportsStandIn
    : Exports;

  return (
    <ExportsProvider>
      <Paper
        elevation={0}
        className={classNames(grids, className)}
        style={style}
      >
        {children}
        {shouldRenderTools() && (
          <Box
            bgcolor="background.muted"
            p={1}
            style={{
              borderBottom:
                '1px solid var(--background-muted)',
            }}
            width="100%"
            mb={0.5}
          >
            <Grid
              alignItems="center"
              justifyContent="space-between"
              container
              spacing={1}
            >
              {enableMultiselect && (
                <Grid item>
                  <ColumnSelectAll ids={extractIds(data)} />
                </Grid>
              )}
              <Grid item>
                <Grid container spacing={1}>
                  <TableActionsDeleteMany {...props} />
                  <TableActions {...props} />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
        <Box
          style={{ flex: 1 }}
          position="relative"
          maxWidth="100%"
          overflow="auto"
          width="100%"
          height="100%"
        >
          <ColumnReorderDialog
            onDone={setColumns}
            defaultColumns={activeColumns}
            disabled={!columns.length}
            columns={columns}
          >
            {(openColumnConfigurator) => (
              <Table className={root}>
                <TableHead className={tableBody}>
                  <TableRow
                    className={flexRow}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      openColumnConfigurator(e);
                    }}
                  >
                    <ColumnSort
                      onSort={isNotVirtual(aliasForName)}
                      title={aliasForName}
                      sort={sort}
                      style={{
                        textAlign: 'center',
                      }}
                    />
                    {renderCustomRowActionsAnchor(
                      object.isFn(
                        renderCustomRowActions,
                      ) && (
                        <CellAction
                          key="custom-actions-header"
                          component="th"
                        />
                      ),
                      activeColumns.map((column, idx) => (
                        <ColumnSort
                          title={column}
                          sort={sort}
                          onSort={isNotVirtual(column)}
                          className={cellWidth}
                          key={`${column}-${idx}`}
                        />
                      )),
                    )}
                  </TableRow>
                </TableHead>
                <TableBody className={tableBody}>
                  {processed.map((row, ind) => (
                    <TableRow
                      key={`row-${row.id}-${ind}`}
                      className={flexRow}
                    >
                      <RowHeader
                        disableAvatar={disableAvatar}
                        disableMultiselect={
                          !enableMultiselect
                        }
                        {...row}
                      />
                      {renderCustomRowActionsAnchor(
                        object.isFn(
                          renderCustomRowActions,
                        ) && (
                          <CellAction
                            key={`custom-actions-${ind}`}
                          >
                            {renderCustomRowActions(
                              row,
                              data[ind],
                            )}
                          </CellAction>
                        ),
                        activeColumns.map((column, idx) => (
                          <Cell
                            id={column}
                            component="td"
                            className={cellWidth}
                            headers={`${column} ${row.name}`}
                            key={`${row.id}-${column}-${idx}`}
                            value={get(row, column)}
                          />
                        )),
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ColumnReorderDialog>
        </Box>
        <Box py={1} width="100%">
          <Pagination id={id} total={total} />
        </Box>
      </Paper>
      <Actionbar data={data} />
    </ExportsProvider>
  );
};

TableView.propTypes = {
  aliasForName: PropTypes.string,
  allColumns: PropTypes.arrayOf(PropTypes.string),
  blacklistColumns: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  className: PropTypes.string,
  customRowActionsAnchor: PropTypes.oneOf(['start', 'end']),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
  disableExportsProvider: PropTypes.bool,
  defaultColumns: PropTypes.arrayOf(PropTypes.string),
  disableAvatar: PropTypes.bool,
  disableColumnReorder: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  renderCustomRowActions: PropTypes.func,
  resolvers: PropTypes.func.isRequired,
  // eslint-disable-next-line
  style: PropTypes.object,
  total: PropTypes.number,
  virtuals: PropTypes.arrayOf(PropTypes.string),
  sort: PropTypes.string,
};

TableView.defaultProps = {
  aliasForName: 'name',
  allColumns: [],
  blacklistColumns: [],
  children: null,
  className: undefined,
  customRowActionsAnchor: 'end',
  defaultColumns: [],
  disableAvatar: false,
  disableColumnReorder: false,
  renderCustomRowActions: null,
  style: {},
  total: 0,
  virtuals: [],
  disableExportsProvider: false,
  sort: undefined,
};

export default withEmpty(TableView);
