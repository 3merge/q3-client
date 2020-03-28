import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from 'q3-ui/lib/iconButton';
import Dialog from 'q3-ui-dialog';
import * as yup from 'yup';
import { Form, Field } from 'q3-ui-forms/lib/builders';

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

const DeleteModal = ({ next }) => {
  const handleSubmit = (onSuccess) => (values, actions) =>
    next()
      .then(() => {
        onSuccess();
        actions.resetForm();
      })
      .catch(() => {
        /**
         * We'll do nothing to keep the dialog open.
         * The field-level validation will report errors for us.
         */
      });

  return next ? (
    <Dialog
      title="delete"
      description="delete"
      renderTrigger={(onClick) => (
        <IconButton
          icon={DeleteIcon}
          label="delete"
          buttonProps={{
            onClick,
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
      renderContent={(close) => (
        <ModalContentForm onSubmit={handleSubmit(close)} />
      )}
    />
  ) : null;
};

DeleteModal.propTypes = {
  next: PropTypes.func.isRequired,
};

export default DeleteModal;
