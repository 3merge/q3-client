import React from 'react';
import { Form, Field } from '../../builders';

export default {
  title: 'Q3 Forms/Fields/Text',
  parameters: {
    component: Field,
    componentSubtitle:
      'HTML text field with enhanced validation',
  },
};

export const Validation = () => (
  <Form
    debug
    id="WATCHER"
    onSubmit={(values) => {
      // eslint-disable-next-line
      console.log(values);
    }}
    initialValues={{
      name: '',
      friend: '',
      postal: '',
      email: '',
      tel: '',
      date: '',
      password: '',
    }}
  >
    <Field name="name" type="text" />
    <Field name="password" type="password" />
    <Field name="date" type="date" />
    <Field name="createdAt" type="dateRange" />
    <Field
      name="loremVars"
      vars={{ hello: 'world' }}
      type="text"
    />
    <Field name="tel" required type="tel" />
    <Field name="email" required type="email" />
    <Field name="postal" required type="postal" />
    <Field name="multi" type="multitext" />

    <Field
      name="friend"
      type="text"
      disabled
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
