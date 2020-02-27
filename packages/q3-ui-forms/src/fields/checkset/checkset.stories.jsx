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

const options = ['One', 'Two', 'Three', 'Four', 'Five'].map(
  (value) => ({
    label: value,
    value,
  }),
);

export const Default = () => (
  <Form debug initialValues={{ demo: [] }}>
    <Field name="demo2" type="radio" options={options} />
  </Form>
);

export const WithLimitedVisible = () => (
  <Form debug initialValues={{ demo: [] }}>
    <Field
      name="demo"
      type="checkset"
      options={options}
      maxVisible={3}
    />
  </Form>
);
