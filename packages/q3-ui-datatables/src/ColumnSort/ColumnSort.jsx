import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TableCell from '@material-ui/core/TableCell';
import withSort from '../withSort';
import useStyles from '../utils/useStyles';

const ColumnSortText = withSort(({ title }) => {
  const { t } = useTranslation();
  return t(`labels:${title}`);
});

const ColumnSort = ({ className, title, ...props }) => {
  const { tableHead } = useStyles();

  return (
    <TableCell
      component="div"
      variant="head"
      className={tableHead}
      style={{
        borderBottomWidth: '0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
      {...props}
    >
      <div
        id={title}
        data-q3-cell={title}
        className={className}
      >
        <ColumnSortText title={title} />
      </div>
    </TableCell>
  );
};

ColumnSort.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default ColumnSort;
