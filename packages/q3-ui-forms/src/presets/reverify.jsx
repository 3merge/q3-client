import React from 'react';
import Axios from 'axios';
import { navigate } from '@reach/router';
import Field from '../builders/field';
import Form from '../builders/form';
import useFormHandler from '../providers/formik';

const { onStart, onComplete } = useFormHandler('formik');

export const handleSubmit = (values, actions) => {
  onStart(actions);
  return Axios.post('/reverify', values)
    .then(({ data }) => {
      onComplete(null, actions);
      navigate('/verify');
      return data;
    })
    .catch(() => {
      return null;
    });
};

const Reverify = () => (
  <Form
    onSubmit={handleSubmit}
    initialValues={{
      email: '',
    }}
  >
    <Field name="email" type="email" />
    />
  </Form>
);

export default Reverify;
