import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import TableCell from '@material-ui/core/TableCell';
import Sticky from 'react-stickynode';
import withSort from '../withSort';
import useStyles from '../utils/useStyles';

const ColumnSortText = withSort(({ title }) => {
  const { t } = useTranslation();
  return t(`labels:${title}`);
});

const ColumnSort = ({
  className,
  title,
  onSort,
  ...props
}) => {
  const { tableHead } = useStyles();

  return (
    <TableCell
      component="th"
      variant="head"
      className={classnames(tableHead, className)}
      style={{ borderBottom: 0 }}
      {...props}
    >
      <div id={title} data-q3-cell={title}>
        {onSort ? (
          <ColumnSortText onSort={onSort} title={title} />
        ) : (
          title
        )}
      </div>
    </TableCell>
  );
};

ColumnSort.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default ColumnSort;
