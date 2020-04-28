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

export const handleSubmit = (onSubmit, onSuccess) => (
  values,
  actions,
) =>
  onSubmit()
    .then(() => {
      onSuccess();
      actions.resetForm();
    })
    .catch(() => {
      // noop
    });

//= ===============================================================================
// Partials
//= ===============================================================================

export const ModalContentForm = ({ onSubmit }) => (
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

export const DeleteModalInterior = ({
  title,
  renderTrigger,
  service,
  ...rest
}) => (
  <Auth op="Delete">
    <Dialog
      title={title}
      description="delete"
      renderTrigger={renderTrigger}
      renderContent={(close) => (
        <ModalContentForm
          onSubmit={handleSubmit(service, close)}
        />
      )}
      {...rest}
    />
  </Auth>
);

DeleteModalInterior.propTypes = {
  title: PropTypes.string.isRequired,
  renderTrigger: PropTypes.func.isRequired,
  service: PropTypes.shape({
    then: PropTypes.func,
    catch: PropTypes.func,
  }).isRequired,
};

const DeleteModal = ({ id, ...rest }) => {
  const { remove } = React.useContext(RepeaterState);

  return remove && id ? (
    <DeleteModalInterior
      service={remove(id)}
      title="delete"
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
      {...rest}
    />
  ) : null;
};

DeleteModal.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteModal;
