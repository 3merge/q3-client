import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import SubDetail from 'q3-admin/lib/containers/subDetail';

export default () => (
  <SubDetail
    root="movies"
    cardProps={{
      title: 'title',
      attributes: ['year'],
    }}
    initialValues={{
      title: '',
      year: '',
    }}
    bulkEditorComponent={(props) => (
      <Form {...props}>
        <Field name="year" type="date" />
      </Form>
    )}
  >
    <Form debug>
      <Field name="title" type="text" required />
      <Field name="year" type="date" />
    </Form>
  </SubDetail>
);
