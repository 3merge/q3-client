import React from 'react';
import Form from '../../builders/form';
import Field from '../../builders/field';
import Checkset from '.';

export default {
  title: 'Q3 Forms|Fields/Checkset',
  parameters: {
    component: Checkset,
    componentSubtitle: 'Collapsible sets of checkboxes',
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
