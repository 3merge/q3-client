import React from 'react';
import Form from '../builders/form';
import Field from '../builders/field';
import Checkset from './checkset';

export default {
  title: 'Forms/Fields/Checkset',
  parameters: {
    component: Checkset,
    componentSubtitle: 'Bank of checkboxes',
  },
};

export const AsMultiSelect = () => (
  <Form debug initialValues={{ demo: [] }}>
    <Field
      name="demo"
      type="checkset"
      options={[
        {
          value: 'One',
          label: 'One',
        },
        {
          value: 'Two',
          label: 'Two',
        },
        {
          value: 'Three',
          label: 'Three',
        },
      ]}
    />
    <Field
      name="demo2"
      type="radio"
      options={[
        {
          value: 'One',
          label: 'One',
        },
        {
          value: 'Two',
          label: 'Two',
        },
        {
          value: 'Three',
          label: 'Three',
        },
      ]}
    />
  </Form>
);

export const AsSingle = () => (
  <Form
    debug
    initialValues={{ demo: false, friend: 'jake' }}
  >
    <Field name="demo" type="checkbox" simple />
  </Form>
);

export const AsSingleCustomValue = () => (
  <Form debug initialValues={{ demo: '', friend: 'jake' }}>
    <Field
      name="demo"
      type="checkbox"
      checkedValue="*"
      simple
    />
  </Form>
);

export const AsSwitch = () => (
  <Form debug initialValues={{ demo: true }}>
    <Field name="lorem" type="checkbox" />
  </Form>
);
