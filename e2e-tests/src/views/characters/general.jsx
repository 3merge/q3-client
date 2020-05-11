import React from 'react';
import { connect } from 'q3-admin/lib/containers';
import { Form, Field } from 'q3-ui-forms/lib/builders';

export default connect(({ data, ...rest }) => (
  <Form initialValues={data} {...rest}>
    <Field name="name" type="string" required />
    <Field name="role" type="string" required />
    <Field name="gender" type="string" required />
  </Form>
));
