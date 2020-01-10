import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import Container from '@material-ui/core/Container';
import Form from '../builders/form';
import Field from '../builders/field';

storiesOf('Forms|Fields/Text', module).add(
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
          name: '',
          friend: '',
        }}
      >
        <Container>
          <Field name="name" type="text" />
          <Field
            name="friend"
            type="text"
            override={({ values }) => ({
              label: values.name ? 'OVERRIDE!' : undefined,
            })}
          />
        </Container>
      </Form>
    </MockApi>
  ),
);
