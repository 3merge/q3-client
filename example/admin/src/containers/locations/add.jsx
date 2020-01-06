import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'q3-ui-forms/lib/builders';

const AddPermissionForm = (props) => (
  <Form
    debug
    {...props}
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      phone1: '',
      streetNumber: '',
      streetLine1: '',
      streetLine2: '',
      city: '',
      postal: '',
    }}
  >
    <Field name="firstName" type="text" required />
    <Field name="lastName" type="text" required />
    <Field name="company" type="text" required />
    <Field name="email" type="email" required />
    <Field name="phone1" type="tel" required />
    <Field name="phone2" type="tel" />
    <Field name="streetNumber" type="text" required />
    <Field name="streetLine1" type="text" required />
    <Field name="streetLine2" type="text" />
    <Field name="city" type="text" required />
    <Field name="postal" type="postal" required />
    <Field
      required
      name="region"
      type="select"
      options={[{ value: 'ON', label: 'ontario' }]}
    />
    <Field
      required
      name="country"
      type="select"
      options={[{ value: 'CA', label: 'canada' }]}
    />
  </Form>
);

AddPermissionForm.propTypes = {
  collectionName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddPermissionForm;
