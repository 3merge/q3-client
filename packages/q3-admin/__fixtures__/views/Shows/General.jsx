import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { connect } from '../../../src/containers';

export default connect(({ data, ...rest }) => (
  <Form {...rest} initialValues={data}>
    {/* <style>
      {'#shows #detail-action--trash { display: none; }'}
    </style> */}
    <Field name="name" type="text" />
    <Field name="name2" type="editor" />
  </Form>
));
