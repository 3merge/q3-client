import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { get, size, isFunction } from 'lodash';
// eslint-disable-next-line
import Confirm from 'q3-ui-confirm';
import { State } from 'q3-ui-exports';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

const TableActionsDeleteMany = ({ onRemove }) => {
  const exportState = React.useContext(State);
  const checked = get(exportState, 'checked');

  const handleService = () =>
    onRemove([], () => {
      exportState.setChecked([]);
    });

  const renderButton = React.useCallback(
    (props) => (
      <IconButton
        {...props}
        color="inherit"
        disabled={!size(checked)}
      >
        <DeleteSweepIcon />
      </IconButton>
    ),
    [checked],
  );

  return isFunction(onRemove) ? (
    <Grid item>
      <Confirm
        phrase="DELETE"
        title="deleteMany"
        service={handleService}
        ButtonComponent={renderButton}
      />
    </Grid>
  ) : null;
};

export default TableActionsDeleteMany;
