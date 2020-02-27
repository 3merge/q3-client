import React from 'react';
import Form from '../../builders/form';
import Field from '../../builders/field';
import Checkbox from '.';

export default {
  title: 'Q3 Forms|Fields/Checkbox',
  parameters: {
    component: Checkbox,
    componentSubtitle:
      'Checkbox with optional variants and text elements',
  },
};

export const Default = () => (
  <Form debug initialValues={{ lorem: false }}>
    <Field name="lorem" type="checkbox" />
  </Form>
);

export const WithCustomValue = () => (
  <Form debug initialValues={{ lorem: '' }}>
    <Field
      name="lorem"
      type="checkbox"
      checkedValue="*"
      simple
    />
  </Form>
);

export const AsSwitch = () => (
  <Form debug initialValues={{ lorem: true }}>
    <Field name="lorem" type="checkbox" variant="switch" />
  </Form>
);
