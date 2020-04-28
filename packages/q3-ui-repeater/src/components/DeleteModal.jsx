import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from 'q3-ui/lib/iconButton';
import Dialog from 'q3-ui-dialog';
import * as yup from 'yup';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Auth from './Auth';
import RepeaterState from './state';

//= ===============================================================================
// Helpers
//= ===============================================================================

function equalsDeletePhrase(v) {
  return v === 'DELETE';
}

//= ===============================================================================
// Partials
//= ===============================================================================

const ModalContentForm = ({ onSubmit }) => (
  <Form initialValues={{ confirm: '' }} onSubmit={onSubmit}>
    <Field
      autoFocus
      validate={yup.string().test(equalsDeletePhrase)}
      name="confirm"
      type="text"
    />
  </Form>
);

ModalContentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

//= ===============================================================================
// Component
//= ===============================================================================

const DeleteModal = ({ id }) => {
  const { remove } = React.useContext(RepeaterState);
  if (!remove || !id) return null;

  const onSubmit = remove(id);
  const handleSubmit = (onSuccess) => (values, actions) =>
    onSubmit()
      .then(() => {
        onSuccess();
        actions.resetForm();
      })
      .catch(() => {
        // noop
      });

  return (
    <Auth op="Delete">
      <Dialog
        title="delete"
        description="delete"
        renderTrigger={(onClick) => (
          <IconButton
            icon={DeleteIcon}
            label="delete"
            buttonProps={{
              className: 'q3-repeater-delete-button',
              onClick,
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
        renderContent={(close) => (
          <ModalContentForm
            onSubmit={handleSubmit(close)}
          />
        )}
      />
    </Auth>
  );
};

DeleteModal.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteModal;
