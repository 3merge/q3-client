import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableSortLabel,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import useStyle from './styles';
import ColumnConfigurationContext from '../ColumnConfigurationContext';
import { makeColumnId } from '../constants';
import withColumnConfigurationProvider from '../withColumnConfigurationProvider';

const Head = (props) => {
  const {
    displayName,
    field,
    onSortChange,
    sortable,
    sorted,
    showLabel = true,
  } = props;
  const { changeField } = React.useContext(
    ColumnConfigurationContext,
  );

  const { t } = useTranslation('labels');
  const { head: cls } = useStyle(props);
  const text =
    showLabel !== false ? displayName || t(field) : '';

  return (
    <TableCell
      id={makeColumnId(field)}
      className={cls}
      component="th"
      onContextMenu={(e) => {
        e.preventDefault();
        changeField(field);
      }}
    >
      {sortable ? (
        <TableSortLabel
          active={Boolean(sorted)}
          direction={sorted}
          onClick={onSortChange}
        >
          {text}
        </TableSortLabel>
      ) : (
        text
      )}
    </TableCell>
  );
};

Head.defaultProps = {
  showLabel: true,
  sortable: false,
  sorted: undefined,
};

Head.propTypes = {
  field: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  sortable: PropTypes.bool,
  sorted: PropTypes.oneOf(['asc', 'desc']),
  showLabel: PropTypes.bool,
};

export default withColumnConfigurationProvider(Head);
