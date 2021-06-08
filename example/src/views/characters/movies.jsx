import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import SubDetail from 'q3-admin/lib/containers/subDetail';

export default () => (
  <SubDetail
    root="movies"
    cardProps={{
      title: 'title',
      attributes: ['year'],
      editable: {
        year: {
          type: 'date',
          under: 'movies',
        },
      },
    }}
    bulkEditorComponent={(props) => (
      <Form {...props}>
        <Field name="movies.year" type="date" />
      </Form>
    )}
  >
    <Form under="movies">
      <Field
        name="title"
        under="movies"
        type="text"
        required
      />
      <Field name="year" under="movies" type="date" />
    </Form>
  </SubDetail>
);
