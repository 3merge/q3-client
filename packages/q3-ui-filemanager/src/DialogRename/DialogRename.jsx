import React from 'react';
import Dialog from 'q3-ui-dialog';
import { Builders } from 'q3-ui-forms';
import DialogTriggerButton from '../DialogTriggerButton';
import FileManagerContext from '../FileManagerContext';
import useDialog from '../useDialog';

const DialogRename = () => {
  const id = 'q3-file-dialog-rename';
  const { patch } = React.useContext(FileManagerContext);

  const {
    close,
    data,
    handleOpen,
    isOpen,
    TransitionProps,
  } = useDialog(id);

  const ButtonComponent = React.useCallback(
    (onClick) => (
      <DialogTriggerButton
        id={id}
        onClick={(e) => {
          handleOpen(e, onClick);
        }}
      />
    ),
    [id],
  );

  return (
    <Dialog
      onClose={close}
      isOpen={isOpen}
      renderContent={() => (
        <Builders.Form
          initialValues={{
            name: '',
          }}
          onSubmit={(values) =>
            patch(data.id)(values).then(close)
          }
        >
          <Builders.Field
            autoFocus
            type="text"
            name="name"
            required
            xl={12}
            lg={12}
            md={12}
          />
        </Builders.Form>
      )}
      renderTrigger={ButtonComponent}
      title="rename"
      TransitionProps={TransitionProps}
    />
  );
};

export default React.memo(DialogRename);
