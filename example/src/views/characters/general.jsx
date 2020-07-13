import React from 'react';
import { connect } from 'q3-admin/lib/containers';
import { Form, Field } from 'q3-ui-forms/lib/builders';

export default connect(({ data, ...rest }) => (
  <Form initialValues={data} {...rest}>
    <Field name="name" type="text" required />
    <Field name="role" type="text" required />
    <Field
      name="gender"
      type="select"
      options={['Male', 'Female']}
      required
    />
  </Form>
));
