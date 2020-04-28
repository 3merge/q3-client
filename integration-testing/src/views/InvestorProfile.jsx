import React from 'react';
import AttachMoney from '@material-ui/icons/AttachMoney';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { connect } from 'q3-admin/lib/containers';

export default connect(({ data, ...rest }) => (
  <Form {...rest} initialValues={data}>
    <Field name="firstName" type="text" />
    <Field name="gender" type="text" />
  </Form>
));
