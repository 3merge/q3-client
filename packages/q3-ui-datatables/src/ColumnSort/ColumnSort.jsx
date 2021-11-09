import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import TableCell from '@material-ui/core/TableCell';
import withSort from '../withSort';
import useStyles from '../utils/useStyles';

const ColumnSortText = withSort(({ label }) => label);

const ColumnSort = ({
  className,
  title,
  onSort,
  ...props
}) => {
  const { tableHead } = useStyles();
  const { t } = useTranslation('labels');

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
          <ColumnSortText
            onSort={onSort}
            title={title}
            label={t(title)}
          />
        ) : (
          t(title)
        )}
      </div>
    </TableCell>
  );
};

ColumnSort.defaultProps = {
  onSort: undefined,
};

ColumnSort.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onSort: PropTypes.func,
};

export default ColumnSort;
