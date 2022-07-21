import React from 'react';
import { Builders } from 'q3-ui-forms';
import FileManagerContext from '../FileManagerContext';
import useDialog from '../useDialog';
import { DIALOG_RENAME } from '../constants';

const DialogRenameForm = () => {
  const { patch } = React.useContext(FileManagerContext);
  const { close, data } = useDialog(DIALOG_RENAME);

  return (
    <Builders.Form
      initialValues={{
        name: '',
      }}
      onSubmit={(values) =>
        patch(data?.id)(values).then(close)
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
  );
};

export default DialogRenameForm;
