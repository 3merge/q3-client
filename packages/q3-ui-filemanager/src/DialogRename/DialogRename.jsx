import React from 'react';
import Dialog from 'q3-ui-dialog';
import DialogTriggerButton from '../DialogTriggerButton';
import useDialog from '../useDialog';
import DialogRenameForm from '../DialogRenameForm';
import { DIALOG_RENAME } from '../constants';

const DialogRename = () => {
  const {
    close,
    data,
    handleOpen,
    isOpen,
    TransitionProps,
  } = useDialog(DIALOG_RENAME);

  const ButtonComponent = React.useCallback(
    (onClick) => (
      <DialogTriggerButton
        id={DIALOG_RENAME}
        onClick={(e) => {
          handleOpen(e, onClick);
        }}
      />
    ),
    [],
  );

  const ContentComponent = React.useCallback(
    () =>
      data?.id ? <DialogRenameForm id={data?.id} /> : null,
    [data?.id],
  );

  return (
    <Dialog
      TransitionProps={TransitionProps}
      isOpen={isOpen}
      onClose={close}
      renderContent={ContentComponent}
      renderTrigger={ButtonComponent}
      title="rename"
    />
  );
};

export default React.memo(DialogRename);
