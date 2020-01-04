import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Field,
  Next,
} from 'q3-ui-forms/lib/builders';

const AddPermissionForm = (props) => (
  <Form
    {...props}
    initialValues={{
      coll: '',
      role: '',
      op: '',
      ownership: '',
    }}
  >
    <Field
      name="coll"
      type="select"
      required
      options={[{ value: 'locations', label: 'locations' }]}
    />
    <Field
      name="role"
      type="select"
      required
      options={[
        {
          value: 'Administrator',
          label: 'administrator',
        },
      ]}
    />
    <Field
      name="op"
      type="select"
      required
      options={[
        {
          value: 'Create',
          label: 'create',
        },
        {
          value: 'Delete',
          label: 'delete',
        },
        {
          value: 'Read',
          label: 'read',
        },
        {
          value: 'Update',
          label: 'update',
        },
      ]}
    />
    <Field
      required
      name="ownership"
      type="select"
      options={[
        { value: 'Any', label: 'any' },
        { value: 'Own', label: 'own' },
      ]}
    />
    <Field name="fields" type="text" />
    <Next submit />
  </Form>
);

AddPermissionForm.propTypes = {
  collectionName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddPermissionForm;
