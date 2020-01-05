import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import Container from '@material-ui/core/Container';
import Form from '../builders/form';
import Field from '../builders/field';
import Next from '../builders/next';

storiesOf('Forms|Fields/Transfer', module).add(
  'With options',
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
          countries: '*',
        }}
      >
        <Container>
          <Field
            required
            name="countries"
            type="transfer"
            options={['Canada', 'Mexico', 'United States']}
          />
          <Next submit />
        </Container>
      </Form>
    </MockApi>
  ),
);
