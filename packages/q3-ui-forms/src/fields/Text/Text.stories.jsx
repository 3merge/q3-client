import React from 'react';
import Form from '../../builders/form';
import Field from '../../builders/field';

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
      date: new Date().toISOString(),
    }}
  >
    <Field name="name" type="text" />
    <Field name="date" type="date" />
    <Field from="from" to="to" type="dateRange" />
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
