import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';
import FileManagerContext from '../FileManagerContext';
import useDialog from '../useDialog';
import { DIALOG_RENAME } from '../constants';

const DialogRenameForm = ({ id }) => {
  const { patch } = React.useContext(FileManagerContext);
  const { close } = useDialog(DIALOG_RENAME);
  const update = patch(id);

  return (
    <Builders.Form
      id="q3-filemanager-rename-form"
      initialValues={{
        name: '',
      }}
      onSubmit={(values) => update(values).then(close)}
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

DialogRenameForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DialogRenameForm;
