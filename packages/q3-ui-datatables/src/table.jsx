import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import useStyles from './utils/useStyles';
import { extractIds, extractKeys } from './utils/helpers';
import {
  ActionBar,
  ColumnHeader,
  Wrapper,
  Pagination,
  SelectAll,
} from './components';

export const TableView = ({
  id,
  children,
  aliasForName,
  total,
  actions,
}) => {
  const { t } = useTranslation();
  const { mobile, boxes } = useStyles();

  return (
    <Wrapper>
      <ActionBar actions={actions}>
        <Table stickyHeader>
          <caption>
            {t('labels:showingResults', { total })}
          </caption>
          <TableHead>
            <TableRow className={mobile}>
              {extractKeys(children).map((header, i) => (
                <ColumnHeader
                  id={id}
                  key={header}
                  title={header}
                  storageKey={
                    i === 0 ? aliasForName : header
                  }
                />
              ))}
              <TableCell className={boxes}>
                <SelectAll ids={extractIds(children)} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
          <TableFooter>
            <Pagination id={id} total={total} />
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
