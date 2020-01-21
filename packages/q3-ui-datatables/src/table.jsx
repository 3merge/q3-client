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
  Wrapper,
  Pagination,
  SelectAll,
} from './components';

export const TableView = ({
  children,
  total,
  actions,
  fixedWidths,
}) => {
  const { t } = useTranslation();
  const { leader, mobile, boxes } = useStyles();

  const getClassName = (v) => {
    if (v === 0) return leader;
    return null;
  };

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
                <TableCell
                  className={getClassName(i)}
                  style={{ width: fixedWidths[i] }}
                >
                  {t(`labels:${header}`)}
                </TableCell>
              ))}
              <TableCell className={boxes}>
                <SelectAll ids={extractIds(children)} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
          <TableFooter>
            <Pagination total={total} />
          </TableFooter>
        </Table>
      </ActionBar>
    </Wrapper>
  );
};

TableView.propTypes = {
  /**
   * Total number of potential documents.
   * In many cases, this number is larger than the pagination size.
   */
  total: PropTypes.number,

  /**
   * For desktop screens, you can explicitly set column widths.
   * To achieve an "auto" width, you must counter-intuitively provide "100%".
   * Note that the array's index corresponds with columns left-to-right.
   */
  fixedWidths: PropTypes.arrayOf(PropTypes.number),

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
  total: 0,
  actions: [],
  fixedWidths: [],
};

export default TableView;
