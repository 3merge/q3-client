import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Link } from '@reach/router';
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
  Skeleton,
  Pagination,
  SelectAll,
} from './components';

export const TableViewSkeleton = () => (
  <Wrapper>
    <Skeleton />
  </Wrapper>
);

export const TableView = ({ children, total, actions }) => {
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
                <TableCell className={getClassName(i)}>
                  {t(`labels:${header}`)}
                </TableCell>
              ))}
              <TableCell className={boxes}>
                <SelectAll ids={extractIds(children)} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
          <TableFooter />
        </Table>
      </ActionBar>
    </Wrapper>
  );
};

TableView.propTypes = {
  total: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
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
};

export default TableView;
