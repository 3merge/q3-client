import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import Container from '@material-ui/core/Container';
import Form from '../builders/form';
import Field from '../builders/field';

const opts = [
  { value: 'CA', label: 'Canada' },
  { value: 'MX', label: 'Mexico' },
  { value: 'US', label: 'United States' },
];

storiesOf('Forms|Fields/Autocomplete', module)
  .add('With static options', () => (
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
          <Field
            name="countries"
            type="autocomplete"
            options={[
              { value: 'CA', label: 'Canada' },
              { value: 'MX', label: 'Mexico' },
              { value: 'US', label: 'United States' },
            ]}
          />
        </Container>
      </Form>
    </MockApi>
  ))
  .add('As required', () => (
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
          <Field
            required
            name="countries"
            type="autocomplete"
            options={[
              { value: 'CA', label: 'Canada' },
              { value: 'MX', label: 'Mexico' },
              { value: 'US', label: 'United States' },
            ]}
          />
        </Container>
      </Form>
    </MockApi>
  ))
  .add('After fail', () => (
    <MockApi>
      <Form
        debug
        onSubmit={(values, actions) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              actions.setSubmitting(false);
              actions.setFieldError(
                'countries',
                'No service connected!',
              );

              Object.assign(actions, {
                isTouched: true,
              });

              resolve();
            }, 200);
          });
        }}
        initialValues={{
          countries: { value: '' },
        }}
      >
        <Container>
          <Field
            required
            name="countries"
            type="autocomplete"
            loadOptions={() =>
              new Promise((resolve) =>
                setTimeout(() => {
                  resolve(opts);
                }, 200),
              )
            }
          />
        </Container>
      </Form>
    </MockApi>
  ));
