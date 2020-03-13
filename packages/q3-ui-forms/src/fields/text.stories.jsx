import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import Container from '@material-ui/core/Container';
import Form from '../builders/form';
import Field from '../builders/field';

export default {
  title: 'Q3 Forms|Fields/Text',
  parameters: {
    component: Field,
    componentSubtitle:
      'HTML text field with enhanced validation',
  },
};

export const Validation = () => (
  <Form
    debug
    onSubmit={Promise.resolve()}
    initialValues={{
      name: '',
      friend: '',
      postal: '',
      email: '',
      tel: '',
    }}
  >
    <Field name="name" type="text" />
    <Field
      name="loremVars"
      vars={{ hello: 'world' }}
      type="text"
    />
    <Field name="tel" required type="tel" />
    <Field name="email" required type="email" />
    <Field name="postal" required type="postal" />
    <Field
      name="friend"
      type="text"
      override={({ values }) => ({
        label: values.name ? 'OVERRIDE!' : undefined,
      })}
    />
  </Form>
);

export const CustomLabel = () => (
  <Form
    debug
    onSubmit={Promise.resolve()}
    initialValues={{
      name: '',
    }}
  >
    <Field name="lorem" type="text" />
  </Form>
);
