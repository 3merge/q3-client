import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { connect } from '../../../src/containers';

export default connect(({ data, ...rest }) => {
  return (
    <Form {...rest} initialValues={data}>
      <Field name="name" type="editor" />
    </Form>
  );
});
