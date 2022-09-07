import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ColumnConfigurationContext from '../ColumnConfigurationContext';
import withColumnConfigurationProvider from '../withColumnConfigurationProvider';
import { REORDER_COLUMN, makeColumnId } from '../constants';

const ColumnReorderButton = withColumnConfigurationProvider(
  () => {
    const { changeField } = React.useContext(
      ColumnConfigurationContext,
    );

    const handleClick = () => {
      changeField(REORDER_COLUMN);
    };

    return (
      <IconButton
        aria="column controls"
        color="inherit"
        id={makeColumnId(REORDER_COLUMN)}
        onClick={handleClick}
      >
        <ViewColumnIcon />
      </IconButton>
    );
  },
);

export default ColumnReorderButton;
