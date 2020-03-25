import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import useStyles from './utils/useStyles';
import { extractIds, extractKeys } from './utils/helpers';
import {
  ActionBar,
  ColumnHeader,
  Wrapper,
  Pagination,
  SelectAll,
} from './components';

const TableHeader = ({
  children,
  columns,
  aliasForName,
}) => {
  const { mobile, boxes, tableHead } = useStyles();

  return (
    <TableHead>
      <TableRow className={mobile}>
        <TableCell className={boxes}>{children}</TableCell>
        {columns.map((header, i) => (
          <ColumnHeader
            key={header}
            title={header}
            storageKey={i === 0 ? aliasForName : header}
            clsasName={tableHead}
          />
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  aliasForName: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};

TableHeader.defaultProps = {
  columns: [],
};

export const TableView = ({
  id,
  children,
  aliasForName,
  total,
  actions,
}) => {
  const { t } = useTranslation();
  const activeColumns = extractKeys(children);
  const { root } = useStyles();

  return (
    <Wrapper>
      <ActionBar actions={actions}>
        <Table stickyHeader className={root}>
          <caption>
            {t('labels:showingResults', { total })}
          </caption>
          <TableHeader
            aliasForName={aliasForName}
            columns={activeColumns}
          >
            <SelectAll ids={extractIds(children)} />
          </TableHeader>

          <TableBody>
            {children.map((c) =>
              React.cloneElement(c, {
                activeColumns,
              }),
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <Pagination id={id} total={total} />
            </TableRow>
          </TableFooter>
        </Table>
      </ActionBar>
    </Wrapper>
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
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,

  /**
   * On row selection, the user can click from a toolbar of pre-determined actions.
   * Use this array to populate said toolbar with icons and handlers.
   */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object,
      label: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};

TableView.defaultProps = {
  aliasForName: 'name',
  total: 0,
  actions: [],
};

export default TableView;
