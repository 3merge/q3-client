import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'q3-ui-forms/lib/builders';

const AddNote = ({ onSubmit, show }) =>
  show ? (
    <Form
      initialValues={{ message: '' }}
      onSubmit={onSubmit}
    >
      <Field
        name="message"
        type="text"
        multiline
        rows={4}
        xl={12}
        lg={12}
      />
    </Form>
  ) : null;

AddNote.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

AddNote.defaultProps = {
  show: false,
};

export default AddNote;
