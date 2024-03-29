import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'q3-ui-locale';
import TableCell from '@material-ui/core/TableCell';
import withSort from '../withSort';
import useStyles from '../utils/useStyles';

const ColumnSortText = withSort(({ label }) => label);

const ColumnSort = ({
  className,
  title,
  sort,
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
      style={{
        borderBottom: 0,
        whiteSpace: 'nowrap',
      }}
      {...props}
    >
      <div id={title} data-q3-cell={title}>
        {onSort ? (
          <ColumnSortText
            sort={sort}
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
  sort: undefined,
  title: undefined,
};

ColumnSort.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string.isRequired,
  onSort: PropTypes.func,
  sort: PropTypes.string,
};

export default ColumnSort;
