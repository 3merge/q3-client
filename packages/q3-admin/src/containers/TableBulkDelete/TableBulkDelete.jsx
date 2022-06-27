import React from 'react';
import { get, size } from 'lodash';
import Confirm from 'q3-ui-confirm';
import { State } from 'q3-ui-exports';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { Dispatcher } from '../state';
import AuthDelete from '../AuthDelete';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { useTrashFail } from '../trash/Trash';

export const TableBulkDeleteButton = (props) => {
  const exportState = React.useContext(State);
  const checked = get(exportState, 'checked');

  return (
    <ButtonWithIcon
      {...props}
      disabled={!size(checked)}
      label="deleteMany"
      icon={DeleteSweepIcon}
      transparent
    />
  );
};

export const TableBulkDelete = () => {
  const catchHandler = useTrashFail();
  const { removeBulk } = React.useContext(Dispatcher);
  const exportState = React.useContext(State);
  const checked = get(exportState, 'checked');

  const ButtonRenderer = React.useCallback(
    (props) => <TableBulkDeleteButton {...props} />,
    [],
  );

  const handleService = (args) =>
    removeBulk(checked)(args)
      .then(() => {
        exportState.setChecked([]);
      })
      .catch(catchHandler);

  return (
    <Confirm
      phrase="DELETE"
      title="deleteMany"
      service={handleService}
      ButtonComponent={ButtonRenderer}
    />
  );
};

TableBulkDelete.defaultProps = {};
TableBulkDelete.propTypes = {};

export default () => (
  <AuthDelete>
    <TableBulkDelete />
  </AuthDelete>
);
