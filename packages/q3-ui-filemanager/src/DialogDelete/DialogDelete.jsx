import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Confirm from 'q3-ui-confirm';
import FileManagerBatchContext from '../FileManagerBatchContext';
import DialogTriggerButton from '../DialogTriggerButton';
import FileManagerContext from '../FileManagerContext';
import { withQueryParamIds } from '../utils';
import useDialog from '../useDialog';
import { DIALOG_DELETE } from '../constants';

const DialogDelete = () => {
  const { remove, poll } = React.useContext(
    FileManagerContext,
  );

  const { close, handleOpen, isOpen, TransitionProps } =
    useDialog(DIALOG_DELETE);

  const { selected } = React.useContext(
    FileManagerBatchContext,
  );

  const ButtonComponent = React.useCallback(
    ({ onClick }) => (
      <DialogTriggerButton
        id={DIALOG_DELETE}
        onClick={(e) => {
          handleOpen(e, onClick);
        }}
      />
    ),
    [],
  );

  return (
    <Confirm
      isOpen={isOpen}
      onClose={close}
      ButtonComponent={ButtonComponent}
      TransitionProps={TransitionProps}
      title="delete"
      icon={DeleteIcon}
      phrase="DELETE"
      service={() =>
        remove(withQueryParamIds(selected))()
          .then(close)
          .then(poll)
      }
    />
  );
};

DialogDelete.propTypes = {};

export default React.memo(DialogDelete);
