import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import Container from '@material-ui/core/Container';
import Form from '../builders/form';
import Field from '../builders/field';
import Next from '../builders/next';

const opts = [
  { value: 'CA', label: 'Canada' },
  { value: 'MX', label: 'Mexico' },
  { value: 'US', label: 'United States' },
];

storiesOf('Forms|Fields/Select', module).add(
  'With static options',
  () => (
    <MockApi>
      <Form
        debug
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          actions.setFieldError(
            'countries',
            'No service connected!',
          );
        }}
        initialValues={{
          countries: { value: '' },
        }}
      >
        <Container>
          <Field name="name" type="text" />
          <Field
            name="countries"
            type="select"
            override={({ values }) => ({
              options: values.name ? opts : [],
            })}
          />
        </Container>
      </Form>
    </MockApi>
  ),
);
