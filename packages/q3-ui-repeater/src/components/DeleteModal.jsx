import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Dialog from 'q3-ui-dialog';
import * as yup from 'yup';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import useStyle from './useStyle';

//= ===============================================================================
// Helpers
//= ===============================================================================

function equalsDeletePhrase(v) {
  return v === 'DELETE';
}

//= ===============================================================================
// Partials
//= ===============================================================================

const DeleteModalOpenTrigger = ({ onClick }) => {
  const { t } = useTranslation('labels');
  const { removeLauncher } = useStyle();

  return (
    <IconButton
      aria-label={t('delete')}
      onClick={onClick}
      className={removeLauncher}
    >
      <DeleteIcon />
    </IconButton>
  );
};

DeleteModalOpenTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

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
      renderTrigger={(open) => (
        <DeleteModalOpenTrigger onClick={open} />
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
