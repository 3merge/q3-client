import React from 'react';
import Dialog from 'q3-ui-dialog';
import { get } from 'lodash';
import DialogTriggerButton from '../DialogTriggerButton';
import useDialog from '../useDialog';
import DialogAboutTable from '../DialogAboutTable';
import { DIALOG_ABOUT } from '../constants';

const DialogAbout = () => {
  const {
    close,
    data = {},
    handleOpen,
    isOpen,
    TransitionProps,
  } = useDialog(DIALOG_ABOUT);

  const ButtonComponent = React.useCallback(
    (onClick) => (
      <DialogTriggerButton
        id={DIALOG_ABOUT}
        onClick={(e) => {
          handleOpen(e, onClick);
        }}
      />
    ),
    [],
  );

  const ContentComponent = React.useCallback(
    () => <DialogAboutTable {...data} />,
    [data],
  );

  return (
    <Dialog
      TransitionProps={TransitionProps}
      isOpen={isOpen}
      onClose={close}
      renderContent={ContentComponent}
      renderTrigger={ButtonComponent}
      title={get(data, 'name', 'fileInformation')}
    />
  );
};

export default React.memo(DialogAbout);
