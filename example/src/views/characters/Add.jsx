import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';

export default (props) => (
  <Form {...props}>
    <Field name="name" type="text" required />
    <Field name="role" type="text" required />
    <Field
      name="gender"
      type="select"
      options={['Male', 'Female']}
      required
    />
  </Form>
);
