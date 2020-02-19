import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import Container from '@material-ui/core/Container';
import Form from '../builders/form';
import Field from '../builders/field';

storiesOf('Q3 Forms|Fields/File', module).add(
  'Default',
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
          <Field type="file" name="places" />
        </Container>
      </Form>
    </MockApi>
  ),
);
