import React from 'react';
import { SubDetail } from 'q3-admin/lib/components';
import { Form, Field } from 'q3-ui-forms/lib/builders';

export default () => (
  <SubDetail
    root="investments"
    cardProps={{
      title: 'company',
      attributes: ['shares'],
      editable: {
        shares: {
          type: 'number',
          min: 1,
        },
      },
    }}
    initialValues={{
      company: '',
      shares: 1,
    }}
    bulkEditorComponent={(props) => (
      <Form {...props}>
        <Field name="shares" type="number" min={1} />
      </Form>
    )}
  >
    <Form>
      <Field name="company" type="text" required />
      <Field name="shares" type="number" min={1} />
    </Form>
  </SubDetail>
);
