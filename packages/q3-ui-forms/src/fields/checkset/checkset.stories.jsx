import React from 'react';
import Form from '../../builders/form';
import Field from '../../builders/field';
import Checkset from '.';
import { options } from '../__fixtures__/options';

export default {
  title: 'Q3 Forms|Fields/Checkset',
  parameters: {
    component: Checkset,
    componentSubtitle: 'Collapsible sets of checkboxes',
  },
};

export const Default = () => (
  <Form debug initialValues={{ demo: [] }}>
    <Field name="demo2" type="checkset" options={options} />
  </Form>
);
